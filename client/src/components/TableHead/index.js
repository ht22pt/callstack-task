import React from 'react';
import TableHeadCell from '../TableHeadCell';

export default function TableHead(props) {
  return (
    <thead>
      <tr>
        {props.headers.map(header => (
          <TableHeadCell
            key={header.id}
            id={header.id}
            type={header.type}
            title={header.title}
            sorted={header.sorted}
            setSort={props.setSort}
          />
        ))}
      </tr>
    </thead>
  );
}

TableHead.propTypes = {
  headers: React.PropTypes.array.isRequired,
  setSort: React.PropTypes.func,
};
