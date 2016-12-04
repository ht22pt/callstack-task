import React from 'react';
import sugar from 'sugar';
import style from './style';

export default function TableBodyCell(props) {
  let value = props.value;
  if (props.type === 'number') {
    value = sugar.Number.format(props.value);
  } else if (props.type === 'date') {
    value = new Date(props.value).toLocaleDateString();
  }

  let tdstyle = Object.assign(
    {},
    style.cell,
    style[`cell_${props.type}`]
  );

  return (
    <td style={tdstyle}>
      {String(value)}
    </td>
  );
}

TableBodyCell.propTypes = {
  value: React.PropTypes.any.isRequired,
};
