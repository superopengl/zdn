import React from 'react';

import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import { Layout, Modal, Row, Col, Skeleton, Typography } from 'antd';
import PropTypes from 'prop-types';

import { getTask, getTask$ } from 'services/taskService';
import MyTaskSign from '../pages/MyTask/MyTaskSign';
import TaskFormWizard from '../pages/MyTask/TaskFormWizard';
import MyTaskReadView from '../pages/MyTask/MyTaskReadView';
import * as queryString from 'query-string';
import { MessageFilled } from '@ant-design/icons';
import { TaskStatus } from 'components/TaskStatus';
import { Loading } from 'components/Loading';
import { TaskIcon } from 'components/entityIcon';
import { catchError } from 'rxjs/operators';
import { TaskFormPanel } from '../pages/MyTask/TaskFormPanel';
import { TaskChatPanel } from 'components/TaskChatPanel';

const { Text } = Typography;


const ContainerStyled = styled(Layout.Content)`
margin: 4rem auto 0 auto;
padding: 2rem 1rem;
// text-align: center;
max-width: 1000px;
width: 100%;
height: 100%;

.ant-layout-sider-zero-width-trigger {
  top: 0;
  left: -60px;
  width: 40px;
  border: 1px solid rgb(217,217,217);
  border-radius:4px;
}
`;


const LayoutStyled = styled.div`
  margin: 0 auto 0 auto;
  background-color: #ffffff;
  height: 100%;
`;

const TaskModalContent = (props) => {
  const { task, type, currentUserId } = props;

  return <Row gutter={[20, 20]}>
    <Col span={12}>
      <TaskFormPanel value={task} type={type} />
    </Col>
    <Col span={12}>
      <TaskChatPanel taskId={task.id} currentUserId={currentUserId} />
    </Col>
  </Row>
};

// export default withRouter(AdminTaskModal);

export function showTaskModal(taskId, taskName, currentUserId) {
  const modalRef = Modal.info({
    title: <><TaskIcon /> {taskName}</>,
    content: <Skeleton active />,
    icon: null,
    closable: true,
    maskClosable: true,
    destroyOnClose: true,
    footer: null,
    width: 800,
  });

  const subscription$ = getTask$(taskId)
    .pipe(
      catchError(e => {
        modalRef.update({
          content: <Text type="danger">Error: {e.message}</Text>
        })
      })
    )
    .subscribe(task => {
      modalRef.update({
        content: <TaskModalContent task={task} type='client' currentUserId={currentUserId} />,
        afterClose: () => {
          subscription$.unsubscribe();
        }
      })
    });
}