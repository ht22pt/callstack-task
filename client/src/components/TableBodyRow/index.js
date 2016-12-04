import React from 'react';
import TableBodyCell from '../TableBodyCell';

export default function TableBodyRow(props) {
  return (
    <tr>
      {props.headers.map((header, i) => (
        <TableBodyCell
          key={`col-${i}`}
          type={header.type}
          value={props.row[header.id]}
        />
      ))}
    </tr>
  );
}

TableBodyRow.propTypes = {
  headers: React.PropTypes.array.isRequired,
  row: React.PropTypes.object.isRequired,
};
