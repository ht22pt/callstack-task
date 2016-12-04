import { Button, Form, Input, InputNumber, DatePicker, Modal } from 'antd';
import moment from 'moment';
import React from 'react';

export default class SubmitForm extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = this.defaultState();
  }

  defaultState() {
    const values = this.props.headers.reduce((_values, h) => {
      let value = '';
      if (h.type === 'number') {
        value = 0;
      } else if (h.type === 'date') {
        value = Date.now();
      }
      return Object.assign(_values, { [h.id]: value });
    }, {});
    return { values };
  }

  cancelForm() {
    this.props.onCancel();
  }

  resetForm() {
    this.setState({ values: {} });
  }

  submitForm() {
    const values = this.state.values;
    this.props.onSubmit(values);
  }

  updateHandler(h, getValue) {
    return (...args) => {
      const changes = { [h.id]: getValue(...args) };
      const values = Object.assign({}, this.state.values, changes);
      this.setState({ values });
    };
  }

  getFields() {
    return this.props.headers.map(h => {
      const value = this.state.values[h.id];
      let input = null;
      if (h.type === 'number') {
        const update = this.updateHandler(h, val => val);
        input = <InputNumber onChange={update} />;
      } else if (h.type === 'date') {
        const update = this.updateHandler(h, val => val.valueOf());
        input = <DatePicker defaultValue={moment(value)} onChange={update} />;
      } else {
        const update = this.updateHandler(h, e => e.target.value);
        input = <Input onChange={update} />;
      }
      return (
        <Form.Item
          key={h.id}
          label={h.title}
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 14 }}
        >
          {input}
        </Form.Item>
      );
    });
  }

  getFooter() {
    return [
      <Button
        key="reset"
        type="dashed"
        icon="close"
        onClick={() => this.resetForm()}
      >Reset</Button>,
      <Button
        key="submit"
        type="primary"
        icon="check"
        onClick={() => this.submitForm()}
      >Submit</Button>,
    ];
  }

  render() {
    return (
      <Modal
        visible={this.props.visible}
        title="Create new post"
        onCancel={() => this.cancelForm()}
        footer={this.getFooter()}
      >
        <Form horizontal>
          {this.getFields()}
        </Form>
      </Modal>
    );
  }
}
