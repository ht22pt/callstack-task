import { Button, Input, Pagination, Popover } from 'antd';
import graphqlify, {Enum} from 'graphqlify';
import React from 'react';
import TableView from '../../components/TableView';
import SubmitForm from '../SubmitForm';
import style from './style';

export default class PokeTable extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = this.defaultState();
    this.syncCount();
    this.syncData();
  }

  defaultState() {
    return {
      page: 1,
      pageSize: 10,
      total: 0,
      sort: 'id',
      order: 'asc',
      query: null,
      rows: [],
      isFormVisible: false,
    };
  }

  defaultHeaders() {
    return [
      { id: 'id', title: 'Id', type: 'text' },
      { id: 'name', title: 'User Name', type: 'text' },
      { id: 'title', title: 'Post Title', type: 'text' },
      { id: 'views', title: 'Views', type: 'number' },
      { id: 'likes', title: 'Likes', type: 'number' },
      { id: 'created', title: 'Created At', type: 'date' },
    ];
  }

  syncCount() {
    const query = {
      postCount: {}
    };
    if (this.state.query) {
      query.postCount.params = query.postCount.params || {};
      query.postCount.params.filters = [
        { field: "name", value: this.state.query },
      ];
    }
    // TODO improve error handling
    this.props.api.query(graphqlify(query))
      .then(res => this.setState({ total: res.postCount }))
      .catch(() => alert('please start the example data server'));
  }

  syncData() {
    const query = {
      posts: {
        fields: {
          id: {},
          name: {},
          title: {},
          views: {},
          likes: {},
          created: {},
        },
        params: {
          skip: this.state.pageSize * (this.state.page - 1),
          limit: this.state.pageSize,
          sort: Enum(this.state.sort.toUpperCase()),
          order: Enum(this.state.order.toUpperCase()),
        },
      }
    };
    if (this.state.query) {
      query.posts.params.filters = [
        { field: "name", value: this.state.query },
      ];
    }
    // TODO improve error handling
    this.props.api.query(graphqlify(query))
      .then(res => this.setState({ rows: res.posts }))
      .catch(() => alert('please start the example data server'));
  }

  submitItem(row) {
    const mutation = {
      addPost: {
        params: {
          id: parseInt(row.id, 10),
          name: row.name,
          title: row.title,
          views: row.views,
          likes: row.likes,
          created: row.created,
        },
      },
    }
    // TODO improve error handling
    // TODO don't catch errors here
    return this.props.api.mutate(graphqlify(mutation))
      .catch(() => alert('please start the example data server'));
  }

  setSort(sort) {
    let changes = {};
    if (this.state.sort === sort && this.state.order === 'asc') {
      changes = { sort, order: 'desc', page: 1 };
    } else {
      changes = { sort, order: 'asc', page: 1 };
    }
    this.setState(changes, () => this.syncData());
  }

  setPage(page) {
    const changes = { page };
    this.setState(changes, () => this.syncData());
  }

  setPageSize(page, pageSize) {
    const changes = { page, pageSize };
    this.setState(changes, () => this.syncData());
  }

  setSearch(query) {
    const changes = { query };
    this.setState(changes, () => Promise.all([this.syncCount(), this.syncData()]));
  }

  showForm() {
    const changes = { isFormVisible: true };
    this.setState(changes);
  }

  hideForm() {
    const changes = { isFormVisible: false };
    this.setState(changes);
  }

  insertRow(row) {
    if (this.state.page !== 1) {
      return;
    }
    const rows = this.state.rows.slice();
    rows.unshift(row);
    rows.pop();
    const changes = { rows };
    this.setState(changes);
  }

  createPost(values) {
    Promise.resolve(null)
      .then(() => this.insertRow(values))
      .then(() => this.hideForm())
      .then(() => this.submitItem(values))
      .then(() => Promise.all([this.syncCount(), this.syncData()]))
  }

  getHeaders() {
    const headers = this.defaultHeaders();
    const sorted = headers.find(h => h.id === this.state.sort);
    sorted.sorted = this.state.order;
    return headers;
  }

  getContent() {
    return this.state.rows;
  }

  render() {
    const headers = this.getHeaders();
    const content = this.getContent();

    return (
      <div style={style.wrap}>
        <div style={style.search}>
          <Popover content={"Show form to create a new post"}>
            <Button
              type="ghost"
              icon="edit"
              onClick={(...args) => this.showForm(...args)}
            >Create</Button>
          </Popover>
          <Popover content={"Enter username and press Enter"}>
            <Input.Search
              placeholder="username"
              onSearch={(...args) => this.setSearch(...args)}
            />
          </Popover>
        </div>
        <SubmitForm
          headers={headers}
          visible={this.state.isFormVisible}
          onCancel={(...args) => this.hideForm(...args)}
          onSubmit={(...args) => this.createPost(...args)}
        />
        <TableView
          headers={headers}
          content={content}
          setSort={(...args) => this.setSort(...args)}
        />
        <div style={style.paging}>
          <Pagination
            showSizeChanger
            pageSizeOptions={[ '5', '10', '15', '20' ]}
            onChange={(...args) => this.setPage(...args)}
            onShowSizeChange={(...args) => this.setPageSize(...args)}
            current={this.state.page}
            total={this.state.total}
          />
        </div>
      </div>
    );
  }
}
