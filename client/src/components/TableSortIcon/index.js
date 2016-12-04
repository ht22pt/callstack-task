import React from 'react';
import { Icon } from 'antd';
import style from './style';

export default function TableSortIcon(props) {
  let type = 'up';
  if (props.dir === 'desc') {
    type = 'down';
  }

  return (
    <span style={style.icon}>
      <Icon type={type} />
    </span>
  );
}

TableSortIcon.propTypes = {
  dir: React.PropTypes.string,
};
