module.exports = class Database {
  constructor(data) {
    this.data = data;
  }

  insert(item) {
    this.data.push(item);
  }

  count(query) {
    let data = this.data.slice();
    if (query.filters) {
      data = this._filter(query.filters, data);
    }
    return data.length;
  }

  find(query) {
    let data = this.data.slice();
    if (query.filters) {
      data = this._filter(query.filters, data);
    }
    if (query.sort) {
      const field = String(query.sort);
      const order = parseInt(query.order) || 1;
      data.sort((x, y) => order * (x[field] > y[field] ? 1 : -1));
    }
    if (query.skip) {
      const skip = parseInt(query.skip);
      data = data.slice(skip);
    }
    if (query.limit) {
      const limit = parseInt(query.limit);
      data = data.slice(0, limit);
    }
    return data;
  }

  _filter(filters, data) {
    return data.filter(row => {
      return filters.reduce((okay, filter) => {
        if (!okay) {
          return false;
        }
        const value = row[filter.field];
        return value.toString().toLowerCase().indexOf(filter.value) >= 0;
      }, true);
    });
  }
}
