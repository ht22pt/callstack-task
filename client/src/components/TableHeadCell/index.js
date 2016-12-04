import React from 'react';
import TableSortIcon from '../TableSortIcon';
import style from './style';

export default function TableHeadCell(props) {
  const setSort = function () {
    if (props.setSort) {
      props.setSort(props.id);
    }
  };

  let sortIcon = null;
  if (props.sorted) {
    sortIcon = <TableSortIcon dir={props.sorted} />;
  }

  let thstyle = Object.assign(
    {},
    style.cell,
    style[`cell_${props.type}`]
  );

  return (
    <th onClick={setSort} style={thstyle}>
      {props.title}
      {sortIcon}
    </th>
  );
}

TableHeadCell.propTypes = {
  id: React.PropTypes.string.isRequired,
  title: React.PropTypes.string.isRequired,
  sorted: React.PropTypes.string,
  setSort: React.PropTypes.func,
};
