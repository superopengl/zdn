
import React from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import { TaskTemplateBuilder } from 'pages/TaskTemplate/formBuilder/TaskTemplateBuilder';
import PropTypes from 'prop-types';
import { Typography, Button, Alert, Input, Modal, Form, Tooltip, Tag, Drawer, Radio } from 'antd';

const Container = styled.div`
  margin: 0 auto 0 auto;
  max-width: 1000px;
  // padding: 10px;
  // background-color: #ffffff;
  // height: calc(100vh - 64px);
  // height: 100%;
`;

export const TaskTemplateEditorPanel = props => {
  const { value: schema, debug, onChange } = props;

  return (
    <Container>
      <TaskTemplateBuilder
        value={schema}
        onChange={onChange}
      />
      {debug && <pre><small>{JSON.stringify(schema, null, 2)}</small></pre>}
    </Container >
  );
};

TaskTemplateEditorPanel.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.object.isRequired,
  debug: PropTypes.bool.isRequired,
};

TaskTemplateEditorPanel.defaultProps = {
  debug: false
};

export default withRouter(TaskTemplateEditorPanel);
