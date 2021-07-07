import React from 'react';
import { Form, Typography, Input, Alert } from 'antd';
import { isEmpty } from 'lodash';
import PropTypes from 'prop-types';
import { FieldList } from './FieldList';
// import arrayMove from 'array-move';

const { Paragraph } = Typography;
// Import style

export const createEmptyField = () => {
  return {
    type: 'input',
    name: '',
    description: '',
  }
}

const checkLabels = items => {
  return items.every(x => x.label && x.type);
};

const checkOptions = items => {
  for (let i = 0; i < items.length; i += 1) {
    const currQuestion = items[i];
    if (
      currQuestion.type === 'radio' ||
      currQuestion.type === 'checkbox' ||
      currQuestion.type === 'select'
    ) {
      const currOptions = currQuestion.options;
      if (currOptions.length === 0) {
        return false;
      }

      for (let j = 0; j < currOptions.length; j += 1) {
        if (currOptions[j].value === '') {
          return false;
        }
      }
    }
  }
  return true;
};

export const TaskTemplateBuilder = (props) => {
  const { value: template, onChange } = props;

  const initialValues = {
    name: template?.name || '',
    description: template?.description || '',
    fields: isEmpty(template?.fields) ? [createEmptyField()] : template.fields
  };

  const handleValueChange = (changedValues, allValues) => {
    allValues.fields.forEach(f => {
      if (!['radio', 'checkbox', 'select'].includes(f.type)) {
        delete f.options;
      }
    })
    onChange(allValues);
  };

  return <>
    <Form
      onKeyPress={e => {
        if (e.key === 'Enter') {
          e.preventDefault();
          return false;
        }
        return true;
      }}
      colon={false}
      onValuesChange={handleValueChange}
      noValidate
      initialValues={initialValues}
    // id={formId}
    >
      <Form.Item
        name="name"
        rules={[{ required: true, message: ' ' }]}>
        <Input placeholder="Task template name" maxLength={200} allowClear autoFocus size="large" />
      </Form.Item>
      <Form.Item
        name="description"
        rules={[{ required: false, message: ' ' }]}>
        <Input.TextArea
          placeholder="Task template description"
          autosize={{ minRows: 2, maxRows: 6 }}
          maxLength={1000}
          allowClear
          showCount
        />
      </Form.Item>

      <Form.Item name="fields" noStyle rules={[
        {
          required: true,
          validator: async (rule, value, callback) => {
            if (!checkLabels(value)) {
              throw new Error(
                'All fields are required.'
              );
            }
            if (!checkOptions(value)) {
              throw new Error(
                'Please provide options for questions. All options require names.'
              );
            }
          },
        },
      ]}>
        <FieldList />
      </Form.Item>
      {/* <Form.Item>
        <Button htmlType="submit">Save</Button>
      </Form.Item> */}
    </Form>
  </>
}

TaskTemplateBuilder.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.object.isRequired
};

TaskTemplateBuilder.defaultProps = {
};
