const Database = require('./database');

module.exports = function createContext(options) {
  return { db: new Database(options.data) };
};
