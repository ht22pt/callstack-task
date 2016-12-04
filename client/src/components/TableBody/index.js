import React from 'react';
import TableBodyRow from '../TableBodyRow';

export default function TableBody(props) {
  const content = props.content || [];
  return (
    <tbody>
      {content.map((row, i) => (
        <TableBodyRow key={`row-${i}`} headers={props.headers} row={row} />
      ))}
    </tbody>
  );
}

TableBody.propTypes = {
  headers: React.PropTypes.array.isRequired,
  content: React.PropTypes.array,
};
