import { EnterOutlined } from '@ant-design/icons';
import { Button, Form, Input, Space, Row, Col } from 'antd';
import PropTypes from 'prop-types';
import React from 'react';
import 'react-chat-elements/dist/main.css';
import { addTaskComment$ } from 'services/taskTrackingService';
import { finalize } from 'rxjs/operators';

export const TaskMessageForm = React.memo((props) => {
  const { taskId, loading: propLoading, onDone } = props;

  const [loading, setLoading] = React.useState(propLoading);
  const [form] = Form.useForm();
  const textareaRef = React.useRef(null);

  React.useEffect(() => {
    if (!loading) {
      textareaRef.current?.focus();
    }
  }, [loading]);

  React.useEffect(() => {
    setLoading(propLoading);
  }, [propLoading]);

  const handleSendMessage = (values) => {
    const { message } = values;
    if (!message?.trim()) {
      return;
    }

    setLoading(true)
    addTaskComment$(taskId, message).pipe(
      finalize(() => setLoading(false))
    ).subscribe(() => {
      onDone?.()
      form.resetFields();
      textareaRef.current.focus();
    });
  }

  return <Form onFinish={handleSendMessage}
    form={form}>
    <Form.Item name="message">
      <Input.TextArea
        showCount
        autoSize={{ minRows: 3, maxRows: 20 }}
        maxLength={1000}
        placeholder="Type here and press enter to send"
        allowClear
        autoFocus={true}
        disabled={loading}
        onPressEnter={e => handleSendMessage({ message: e.target.value })}
        ref={textareaRef}
      />
    </Form.Item>
    <Form.Item>
      <Row justify="start" gutter={8} style={{position: 'relative', top: -16}}>
        <Col>
          <Button type="primary" htmlType="submit" disabled={loading}>Save</Button>
        </Col>
        <Col>
          <Button htmlType="reset" disabled={loading}>Cancel</Button>
        </Col>
      </Row>
    </Form.Item>
  </Form>

});

TaskMessageForm.propTypes = {
  taskId: PropTypes.string.isRequired,
  loading: PropTypes.bool,
  onDone: PropTypes.func,
};

TaskMessageForm.defaultProps = {
  width: 500,
  loading: false,
  onDone: () => { },
};

