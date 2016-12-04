import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import TableBodyCell from './';

const stories = storiesOf('TableBodyCell', module);

stories.addDecorator(function (fn) {
  return (
    <table>
      <tbody><tr>{fn()}</tr></tbody>
    </table>
  );
});

stories.add('with value', function () {
  return (
    <TableBodyCell value="Value 1" />
  );
});
