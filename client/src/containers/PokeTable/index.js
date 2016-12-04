import { Button, Input, Pagination } from 'antd';
import graphqlify, {Enum} from 'graphqlify';
import React from 'react';
import TableView from '../../components/TableView';
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
    };
  }

  defaultHeaders() {
    return [
      { id: 'id', title: 'Id', type: 'text' },
      { id: 'name', title: 'Name', type: 'text' },
      { id: 'title', title: 'Title', type: 'text' },
      { id: 'views', title: 'Views', type: 'number' },
      { id: 'likes', title: 'Likes', type: 'number' },
      { id: 'created', title: 'Created', type: 'date' },
    ];
  }

  syncCount() {
    const query = {
      usersCount: {}
    };
    if (this.state.query) {
      query.usersCount.params = query.usersCount.params || {};
      query.usersCount.params.filters = [
        { field: "name", value: this.state.query },
      ];
    }
    this.props.api.query(graphqlify(query))
      .then(res => this.setState({ total: res.usersCount }))
      .catch(() => alert('please start the example data server'));
  }

  syncData() {
    const query = {
      users: {
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
      query.users.params.filters = [
        { field: "name", value: this.state.query },
      ];
    }
    this.props.api.query(graphqlify(query))
      .then(res => this.setState({ rows: res.users }))
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
    this.setState(changes, () => [this.syncCount(), this.syncData()]);
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
    return (
      <div style={style.wrap}>
        <div style={style.search}>
          <Button type="ghost" icon="plus">Insert</Button>
          <Input.Search
            placeholder="find user"
            onSearch={(...args) => this.setSearch(...args)}
          />
        </div>
        <TableView
          headers={this.getHeaders()}
          content={this.getContent()}
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
