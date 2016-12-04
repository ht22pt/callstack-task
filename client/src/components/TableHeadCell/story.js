import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import TableHeadCell from './';

const stories = storiesOf('TableHeadCell', module);

stories.addDecorator(function (fn) {
  return (
    <table>
      <thead><tr>{fn()}</tr></thead>
    </table>
  );
});

stories.add('with id and title', function () {
  return (
    <TableHeadCell
      id="h1"
      title="Header 1"
      setSort={action('setSort')}
    />
  );
});

stories.add('with sorted column', function () {
  return (
    <TableHeadCell
      id="h1"
      title="Header 1"
      sorted="asc"
      setSort={action('setSort')}
    />
  );
});
