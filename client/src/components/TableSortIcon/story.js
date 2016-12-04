import React from 'react';
import { storiesOf } from '@kadira/storybook';
import TableSortIcon from './';

const stories = storiesOf('TableSortIcon', module);

stories.add('sorted ascending', function () {
  return <TableSortIcon dir="asc" />;
});

stories.add('sorted descending', function () {
  return <TableSortIcon dir="desc" />;
});
