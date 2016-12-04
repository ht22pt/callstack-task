import React from 'react';
import { storiesOf } from '@kadira/storybook';
import TableBody from './';

const stories = storiesOf('TableBody', module);

stories.addDecorator(function (fn) {
  return <table>{fn()}</table>;
});

stories.add('without content', function () {
  const headers = [
    { id: 'h1', title: 'Header 1' },
    { id: 'h2', title: 'Header 2' },
    { id: 'h3', title: 'Header 3' },
  ];
  return <TableBody headers={headers} />;
});

stories.add('with 3 rows', function () {
  const headers = [
    { id: 'h1', title: 'Header 1' },
    { id: 'h2', title: 'Header 2' },
    { id: 'h3', title: 'Header 3' },
  ];
  const content = [
    { id: 'r1', h1: '11', h2: '12', h3: '13' },
    { id: 'r2', h1: '21', h2: '22', h3: '23' },
    { id: 'r3', h1: '31', h2: '32', h3: '33' },
  ];
  return <TableBody headers={headers} content={content} />;
});
