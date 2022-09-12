import React from 'react';
import PropTypes from 'prop-types';
import { Card, Typography, Col, Row, Space, Button, Image, Form, Input } from 'antd';
import { CheckCircleOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { SubscriptionCard } from 'components/SubscriptionCard';
import { GiCurvyKnife, GiFireAxe, GiSawedOffShotgun, GiPirateCannon } from 'react-icons/gi';
import { VscRocket } from 'react-icons/vsc';
import { AiOutlineHome } from 'react-icons/ai';
import { subscriptionDef } from 'def/subscriptionDef';
import { OrgRegisterModal } from 'components/OrgRegisterModal';
import { submitContact$ } from 'services/contactService';
import { finalize } from 'rxjs/operators';
import { notify } from 'util/notify';

const { Title, Paragraph, Text } = Typography;

const StyledRow = styled(Row)`
`;

const StyledCol = styled(Col)`
display: flex;
justify-content: center;
`;

const span = {
  xs: 24,
  sm: 24,
  md: 24,
  lg: 8,
  xl: 8,
  xxl: 8
};

const Container = styled.div`
justify-content: center;
margin-bottom: 6rem;
width: 100%;

// text-align: center;
// background: #fafafa;
// background: rgb(240, 242, 245);
`;

const InnerContainer = styled.div`
width: 100%;
// background-color:  #F1F2F5;
// background-image: linear-gradient(5deg, #F1F2F5, #F1F2F5 50%, #ffffff 50%, #ffffff 100%);
padding-top: 3rem;
.dark-card {
  max-width: 800px;
  background: #001A1F;
  box-shadow: 0px 0px 24px rgba(0, 26, 31, 0.36);
  backdrop-filter: blur(20px);
  border-radius: 12px;
  padding: 24px;
  color: #EBEDF1CC;

  .ant-typography {
    color: #EBEDF1CC;
  }
}

label {
  color: #ffffff;
}
`;



export const HomeContactUsArea = props => {
  const [loading, setLoading] = React.useState(false);
  const [form] = Form.useForm();

  const handleSubmit = values => {
    setLoading(true);
    submitContact$(values).pipe(
      finalize(() => setLoading(false))
    ).subscribe(() => {
      notify.success('Successfully submitted contact', 'Thank you for contacting ZeeWorkflow. We will reply you soon.');
      form.resetFields();
    });
  }
  return (
    <Container>
      <InnerContainer>
        <Row justify='center'>
          <Col
            flex="auto"
            className='dark-card'
            style={{ position: 'relative' }}
          >
            <Row gutter={16}>
              <Col
                style={{ position: 'relative' }}
                {...{
                  xs: 24,
                  sm: 24,
                  md: 24,
                  lg: 10,
                  xl: 10,
                  xxl: 10
                }}
              >
                <Text style={{ color: '#0FBFC4' }}>Got a question?</Text>
                <Title style={{ color: '#ffffff', marginTop: '1rem' }}>Contact Us Now</Title>
                <div style={{ position: 'absolute', bottom: -50, right: 20 }}>
                  <Image src="/images/contact-left.svg" preview={false} style={{ width: 'clamp(400px, 30vw, 460px)' }} />
                </div>
              </Col>
              <Col flex="auto">
                <Form
                  layout="vertical"
                  requiredMark={false}
                  style={{ width: '100%' }}
                  disabled={loading}
                  onFinish={handleSubmit}
                  form={form}
                >
                  <Form.Item name="name" label="Name" required rules={[{ required: true, max: 100 }]}>
                    <Input placeholder="Your name" autocomplete="name" disabled={loading} allowClear/>
                  </Form.Item>
                  <Form.Item name="email" label="Email" required rules={[{ required: true, max: 120, type: 'email' }]}>
                    <Input placeholder="Email address" autocomplete="email" disabled={loading} allowClear/>
                  </Form.Item>
                  <Form.Item name="body" label="Name" required rules={[{ required: true, max: 1000 }]}>
                    <Input.TextArea autoSize={{ minRows: 4, maxRows: 15 }} showCount maxLength={1000} placeholder="Your question" disabled={loading} allowClear/>
                  </Form.Item>
                  <Form.Item style={{textAlign: 'right'}}>
                    <Button type="primary" size="large" htmlType="submit" loading={loading}>Submit</Button>
                  </Form.Item>
                </Form>
              </Col>
            </Row>
          </Col>
        </Row>
      </InnerContainer>
    </Container>
  )
}

HomeContactUsArea.propTypes = {
};

HomeContactUsArea.defaultProps = {
};