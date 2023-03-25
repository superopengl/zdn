import { Typography, Divider, Alert } from 'antd';
import React from 'react';

import styled from 'styled-components';
import PropTypes from 'prop-types';
import { TaskFormWidget } from 'components/TaskFormWidget';
import { TaskSchemaRenderer } from 'components/TaskSchemaRenderer';
import { TaskIcon } from 'components/entityIcon';

const { Title, Paragraph } = Typography;

const Container = styled.div`
  // margin: 0 auto 0 auto;
  width: 100%;
  // max-width: 600px;
  background-color: #ffffff;
  // padding: 2rem;
  // height: calc(100vh - 64px);
  // height: 100%;
`;


export const TaskFieldsPreviewPanel = props => {

  const { name, fields, mode, style } = props;

  return (
    <Container style={style}>
      <Title level={3}><TaskIcon/> {name}</Title>
      <TaskSchemaRenderer
        fields={fields}
        mode={mode}
      />
    </Container >
  );
};

TaskFieldsPreviewPanel.propTypes = {
  name: PropTypes.string,
  fields: PropTypes.array,
  mode: PropTypes.oneOf(['client', 'agent']).isRequired,
};

TaskFieldsPreviewPanel.defaultProps = {
  name: '',
  fields: [],
  mode: 'agent',
};
