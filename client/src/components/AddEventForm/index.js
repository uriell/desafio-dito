import React from 'react';
import { Divider, Tooltip, Button, Form, Input, Icon } from 'antd';
import PropTypes from 'prop-types';

import './index.css';

function sharedRules(message) {
  return {
    rules: [{
      required: true,
      whitespace: true,
      pattern: /^[a-z0-9._-]+$/i,
      message,
    }],
  };
}

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class AddEventForm extends React.Component {
  state = {
    propNameError: null,
  }

  onRemoveProperty = (propName) => {
    const { form } = this.props;

    const properties = form.getFieldValue('properties');

    form.setFieldsValue({
      properties: properties.filter(prop => prop !== propName)
    });
  }

  onAddProperty = (propName) => {
    const { form } = this.props;
    const { propNameError } = this.state;

    const properties = form.getFieldValue('properties');
    const forbidden = ['key', 'timestamp', 'custom_data'];

    if (!properties.includes(propName) && !forbidden.includes(propName) && /^[a-z0-9._-]+$/i.test(propName)) {
      const nextProperties = properties.concat(propName);

      if (propNameError) {
        this.setState({ propNameError: null });
      }

      form.setFieldsValue({
        properties: nextProperties,
        customPropName: '',
      });
    } else {
      this.setState({
        propNameError: 'Especifique um nome válido para a propriedade!',
      });
    }
  }

  onSubmit = (e) => {
    const { onSubmit } = this.props;

    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const event = {};

        event.key = values.key;
        event.timestamp = new Date().toISOString();
        event.custom_data = [];

        for (let i = 0, { length } = values.properties; i < length; i++) {
          const property = values.properties[i];

          event.custom_data.push({ key: property, value: values[property] });
        }

        onSubmit(event);
      }
    });
  }

  onReset = () => {
    this.props.form.resetFields();
  }

  render() {
    const { form } = this.props;
    const { propNameError } = this.state;
    const { getFieldDecorator, getFieldsError } = form;

    getFieldDecorator('properties', { initialValue: [] });

    const customPropertyNames = form.getFieldValue('properties');
    const customPropertyFields = customPropertyNames.map(propName => (
      <Form.Item key={propName} label={propName}>
        {getFieldDecorator(propName)(<Input className="Form-FormCustomProp" placeholder={`Valor para ${propName}`} />)}
        <Tooltip title={`Remover ${propName}`}>
          <Icon
            type="minus-circle-o"
            className="Form-FormRemovePropIcon"
            onClick={() => this.onRemoveProperty(propName)}
          />
        </Tooltip>
      </Form.Item>
    ));

    const nameError = form.isFieldTouched('key') && form.getFieldError('key');

    return (
      <Form
        className="Form"
        layout="vertical"
        onSubmit={this.onSubmit}
      >
        <Form.Item label="Nome do Evento" validateStatus={nameError ? 'error' : ''} help={nameError || ''}>
          {getFieldDecorator('key', sharedRules('Especifique um nome válido para o evento!'))(<Input placeholder="Nome" />)}
        </Form.Item>
        <Divider>Propriedades Personalizadas</Divider>
        {customPropertyFields}
        <Form.Item validateStatus={propNameError ? 'error' : ''} help={propNameError || ''}>
          {getFieldDecorator('customPropName')(<Input.Search
            onChange={this.onCustomPropInputChange}
            onSearch={this.onAddProperty}
            placeholder="Nome da Propriedade"
            enterButton="Adicionar"
          />)}
        </Form.Item>
        <Divider />
        <Form.Item>
          <Button type="primary" htmlType="submit" disabled={hasErrors(getFieldsError())}>Adicionar</Button>
          <Button className="Form-FormClearButton" onClick={this.onReset}>Limpar</Button>
        </Form.Item>
      </Form>
    );
  }
}

AddEventForm.propTypes = {
  form: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default AddEventForm;