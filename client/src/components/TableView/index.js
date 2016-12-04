import React from 'react';
import TableBody from '../TableBody';
import TableHead from '../TableHead';
import style from './style';

export default function TableView(props) {
  return (
    <table style={style.table}>
      <TableHead headers={props.headers} setSort={props.setSort} />
      <TableBody headers={props.headers} content={props.content} />
    </table>
  );
}

TableView.propTypes = {
  headers: React.PropTypes.array.isRequired,
  content: React.PropTypes.array,
  setSort: React.PropTypes.func,
};
