import React from 'react';
import { storiesOf } from '@kadira/storybook';
import TableBodyRow from './';

const stories = storiesOf('TableBodyRow', module);

stories.addDecorator(function (fn) {
  return <table><tbody>{fn()}</tbody></table>;
});

stories.add('with 3 fields', function () {
  const headers = [
    { id: 'h1', title: 'Header 1' },
    { id: 'h2', title: 'Header 2' },
    { id: 'h3', title: 'Header 3' },
  ];
  const row = { id: 'r1', h1: '11', h2: '12', h3: '13' };
  return <TableBodyRow headers={headers} row={row} />;
});
