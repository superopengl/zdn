import React from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import { Typography, Button, Form, Input } from 'antd';
import { signUpOrg$ } from 'services/authService';
import { notify } from 'util/notify';
import * as queryString from 'query-string';
import { FormattedMessage } from 'react-intl';
import { useIntl } from 'react-intl';
const { Title, Text, Paragraph } = Typography;


const ContainerStyled = styled.div`
  margin: 0 auto;
  padding: 2rem 1rem;
  text-align: center;
  width: 100%;

  .ant-typography {
    color: rgba(255,255,255,0.8);

    // a {
    //   color: rgba(255,255,255,0.6);
    // }
  }

`;

const OrgSignUpForm = (props) => {

  const { onOk } = props;

  const intl = useIntl();
  const [loading, setLoading] = React.useState(false);

  const handleSignIn = (values) => {
    if (loading) {
      return;
    }

    setLoading(true);

    const { email } = values;

    signUpOrg$(email).subscribe(
      () => {
        onOk();
        // Guest
        notify.success(
          '🎉 Successfully signed up!',
          <>Congratulations and thank you very much for signing up ZeeWorkFlow. The invitation email has been sent out to <Text strong>{email}</Text>.</>
        );
      }
    ).add(() => {
      setLoading(false)
    });
  }

  return (
    <ContainerStyled>
      <Title level={2}>
        <FormattedMessage id="menu.signUpOrg" />
      </Title>
      <Form layout="vertical" onFinish={handleSignIn} style={{ textAlign: 'left' }} initialValues={{ role: 'member' }}>
        <Form.Item>
          <Text>We will send an email to the email address. This user will be the root administrator of the organasation.</Text>
        </Form.Item>
        <Form.Item label="" name="email" rules={[{ required: true, type: 'email', whitespace: true, max: 100, message: ' ' }]}>
          <Input placeholder={intl.formatMessage({ id: 'placeholder.rootEmailAddress' })} type="email" autoComplete="email" allowClear={true} maxLength="100" autoFocus={true} />
        </Form.Item>
        {/* <Form.Item label="" name="agreement" valuePropName="checked" style={{ marginBottom: 0 }} rules={[{
          validator: (_, value) =>
            value ? Promise.resolve() : Promise.reject('You have to agree to continue.'),
        }]}>
          <Checkbox disabled={sending}>I have read and agree to the <a target="_blank" href="/terms_and_conditions">terms & conditions</a> and <a target="_blank" href="/privacy_policy">privacy policy</a>.</Checkbox>
        </Form.Item> */}
        <Text>
          <FormattedMessage id="text.byClickingAgreement"
            values={{
              tc: <a target="_blank" href="/terms_and_conditions">
                <FormattedMessage id="menu.tc" />
              </a>,
              pp: <a target="_blank" href="/privacy_policy">
                <FormattedMessage id="menu.pp" />
              </a>
            }}
          />
        </Text>
        <Form.Item style={{ marginTop: '1rem' }}>
          <Button block type="primary" htmlType="submit" disabled={loading}>
            <FormattedMessage id="menu.signUpOrg" />
          </Button>
        </Form.Item>
        {/* <Form.Item>
                  <Button block type="link" onClick={() => goBack()}>Cancel</Button>
                </Form.Item> */}
      </Form>
    </ContainerStyled>
  );
}

OrgSignUpForm.propTypes = {};

OrgSignUpForm.defaultProps = {};

export default withRouter(OrgSignUpForm);
