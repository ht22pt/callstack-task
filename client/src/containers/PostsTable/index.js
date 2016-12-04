import { Button, Input, Pagination, Popover } from 'antd';
import graphqlify, {Enum} from 'graphqlify';
import React from 'react';
import TableView from '../../components/TableView';
import SubmitForm from '../SubmitForm';
import style from './style';

export default class PostsTable extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = this.defaultState();
    this.syncCount();
    this.syncData();
  }

  defaultState() {
    return {
      currentPage: 1,
      pageSize: 10,
      totalPosts: 0,
      sortField: 'id',
      sortOrder: 'asc',
      filterUser: '',
      tableRows: [],
      formVisible: false,
    };
  }

  defaultHeaders() {
    return [
      { id: 'id', title: 'Id', type: 'text' },
      { id: 'name', title: 'User Name', type: 'text', highlight: 'awqrre' },
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
    if (this.state.filterUser) {
      query.postCount.params = query.postCount.params || {};
      query.postCount.params.filters = [
        { field: "name", value: this.state.filterUser },
      ];
    }
    // TODO improve error handling
    this.props.api.query(graphqlify(query))
      .then(res => this.setState({ totalPosts: res.postCount }))
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
          skip: this.state.pageSize * (this.state.currentPage - 1),
          limit: this.state.pageSize,
          sort: Enum(this.state.sortField.toUpperCase()),
          order: Enum(this.state.sortOrder.toUpperCase()),
        },
      }
    };
    if (this.state.filterUser) {
      query.posts.params.filters = [
        { field: "name", value: this.state.filterUser },
      ];
    }
    // TODO improve error handling
    this.props.api.query(graphqlify(query))
      .then(res => this.setState({ tableRows: res.posts }))
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

  setSort(sortField) {
    let changes = {};
    if (this.state.sortField === sortField && this.state.sortOrder === 'asc') {
      changes = { sortField, sortOrder: 'desc', currentPage: 1 };
    } else {
      changes = { sortField, sortOrder: 'asc', currentPage: 1 };
    }
    this.setState(changes, () => this.syncData());
  }

  setPage(currentPage) {
    const changes = { currentPage };
    this.setState(changes, () => this.syncData());
  }

  setPageSize(currentPage, pageSize) {
    const changes = { currentPage, pageSize };
    this.setState(changes, () => this.syncData());
  }

  setSearch(filterUser) {
    const changes = { filterUser };
    this.setState(changes, () => Promise.all([this.syncCount(), this.syncData()]));
  }

  showForm() {
    const changes = { formVisible: true };
    this.setState(changes);
  }

  hideForm() {
    const changes = { formVisible: false };
    this.setState(changes);
  }

  insertRow(row) {
    if (this.state.currentPage !== 1) {
      return;
    }
    const tableRows = this.state.tableRows.slice();
    tableRows.unshift(row);
    tableRows.pop();
    const changes = { tableRows };
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
    const sorted = headers.find(h => h.id === this.state.sortField);
    sorted.sorted = this.state.sortOrder;
    return headers;
  }

  getContent() {
    return this.state.tableRows;
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
          visible={this.state.formVisible}
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
            current={this.state.currentPage}
            total={this.state.totalPosts}
          />
        </div>
      </div>
    );
  }
}
