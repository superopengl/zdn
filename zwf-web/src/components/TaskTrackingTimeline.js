import { ArrowRightOutlined, MessageFilled } from '@ant-design/icons';
import { Timeline, Space, Typography, Card, Row, Col, Button } from 'antd';
import { GlobalContext } from 'contexts/GlobalContext';
import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import { TaskIcon } from './entityIcon';
import { TimeAgo } from './TimeAgo';
import { UserNameCard } from './UserNameCard';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { TaskStatusTag } from './TaskStatusTag';
import { FileIcon } from './FileIcon';
import { getTaskDocDownloadUrl } from 'services/taskDocService';
import { TaskDocItem } from './TaskDocItem';

const { Text, Link: TextLink } = Typography

const ChatMessage = React.memo(props => {
  const { userId, message } = props;
  const context = React.useContext(GlobalContext);
  const currentUserId = context.user.id;
  const isMe = userId === currentUserId;

  return <Space style={{ flexDirection: isMe ? 'row-reverse' : 'row', alignItems: 'flex-start', width: '100%' }}>
    <strong><UserNameCard userId={userId} showName={false} showEmail={false} showTooltip={true} /></strong>
    <Card
      size="small"
      bordered={true}
      bodyStyle={{
        padding: 10,
        maxWidth: 600,
        lineBreak: 'anywhere'
      }}
      style={{
        // marginLeft: 40,
        // marginBottom: 4,
        // color: isMe ? '#000000cc' : 'normal',
        backgroundColor: isMe ? '#ffec3d' : 'rgb(236, 236, 236)',
      }}>
      {message}
    </Card>
  </Space>
});

export const TaskTrackingTimeline = React.memo((props => {
  const { dataSource, mode, ...others } = props;

  const context = React.useContext(GlobalContext);
  const navigate = useNavigate();
  const currentUserId = context.user.id;

  const multiMode = mode === 'multi';
  const singleMode = mode === 'single';

  return <>
    <Timeline mode="left" style={{ padding: 16, paddingLeft: 20 }}>
      {(dataSource ?? []).map(item => <Timeline.Item
        key={item.id}
        color={item.action === 'chat' ? (item.by === currentUserId ? 'blue' : 'gray') : 'blue'}
        // position={item.action === 'chat' && item.by === currentUserId ? 'left' : 'right'}
        dot={item.action === 'chat' ? <MessageFilled /> : null}
      // label={singleMode ? null : <TimeAgo value={item.createdAt} accurate={false} direction="horizontal" />}
      >
        <Row gutter={20} wrap={false}>
          <Col>
            <TimeAgo value={item.createdAt} accurate={true} direction="horizontal" />
          </Col>
          <Col flex={1}>
            <hr />
          </Col>
        </Row>

        <Row gutter={40} wrap={false}
          onClick={() => multiMode ? history.push(`/task/${item.taskId}`) : null}
        >
          <Col flex={1}>
            <Space direction="vertical" size="small" style={{ width: '100%' }} className="activity-title">
              {multiMode && <Space style={{ alignItems: 'baseline' }}>
                {/* <TaskIcon style={{fontSize: 24, marginRight: 0}}/>  */}
                <Link to={`/task/${item.taskId}`}><strong>{item.taskName}</strong></Link>
                <Text type="secondary">issued by <strong>{item.orgName}</strong></Text>
              </Space>}
              {item.action === 'chat' ? <ChatMessage userId={item.by} message={item.info} />
                : item.action === 'status-change' ? <Text strong><TaskStatusTag status={item.info.oldStatus} /> <ArrowRightOutlined /> <TaskStatusTag status={item.info.newStatus} /></Text>
                  : item.action === 'doc-signed' ? <Space size="small" onClick={e => e.stopPropagation()}>
                    <TextLink href={getTaskDocDownloadUrl(item.info.taskDocId)} target="_blank" >
                      <Space>
                        <FileIcon name={item.info.name} />
                        {item.info.name}
                      </Space>
                    </TextLink>
                    <strong>signed</strong>
                  </Space>
                    : <Text strong>{item.action}</Text>}
            </Space>
          </Col>
        </Row>

      </Timeline.Item>
      )}
    </Timeline>
    {dataSource.length > 0 && <Row style={{ justifyContent: 'center', marginBottom: 20 }}>
      <Text type="secondary"><small>Last activity already</small></Text>
    </Row>}
  </>
}));

TaskTrackingTimeline.propTypes = {
  dataSource: PropTypes.array.isRequired,
  mode: PropTypes.oneOf(['single', 'multi'])
};

TaskTrackingTimeline.defaultProps = {
  dataSource: [],
  mode: 'single'
};

