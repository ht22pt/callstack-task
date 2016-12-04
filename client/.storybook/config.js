import * as storybook from '@kadira/storybook';
import centered from '@kadira/react-storybook-decorator-centered';
import 'antd/dist/antd.css';

function load() {
  const req = require.context('../src/components', true, /story\.js$/);
  req.keys().forEach(req);
}

storybook.addDecorator(centered);
storybook.configure(load, module);
