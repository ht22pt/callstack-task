import React from 'react';
import { storiesOf } from '@kadira/storybook';
import TableHead from './';

const stories = storiesOf('TableHead', module);

stories.addDecorator(function (fn) {
  return <table>{fn()}</table>;
});

stories.add('without sort/filter', function () {
  const headers = [
    { id: 'h1', title: 'Header 1' },
    { id: 'h2', title: 'Header 2' },
    { id: 'h3', title: 'Header 3' },
  ];
  return <TableHead headers={headers} />;
});

stories.add('with sorted column', function () {
  const headers = [
    { id: 'h1', title: 'Header 1', sorted: 'asc' },
    { id: 'h2', title: 'Header 2' },
    { id: 'h3', title: 'Header 3' },
  ];
  return <TableHead headers={headers} />;
});
