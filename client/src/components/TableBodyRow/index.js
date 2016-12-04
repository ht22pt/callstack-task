import React from 'react';
import TableBodyCell from '../TableBodyCell';
import style from './style';

export default function TableBodyRow(props) {
  const isHighlighted = props.headers.reduce((_highlighted, h) => {
    return _highlighted || h.highlight && h.highlight === props.row[h.id];
  }, false)

  let trstyle = {};
  if (isHighlighted) {
    trstyle = Object.assign({}, trstyle, style.highlight)
  }

  return (
    <tr style={trstyle}>
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
