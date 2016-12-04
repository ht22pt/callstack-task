import React from 'react';
import ReactDOM from 'react-dom';
import { LocaleProvider } from 'antd';
import { Lokka } from 'lokka';
import { Transport } from 'lokka-transport-http';
import enUS from 'antd/lib/locale-provider/en_US';
import PokeTable from './containers/PokeTable';
import 'antd/dist/antd.css';

const api = new Lokka({
  transport: new Transport('http://localhost:4000')
});

const app = (
  <LocaleProvider locale={enUS}>
    <PokeTable api={api} />
  </LocaleProvider>
);

const root = document.getElementById('root');
ReactDOM.render(app, root);
