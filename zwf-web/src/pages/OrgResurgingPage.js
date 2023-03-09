import React from 'react';
import styled from 'styled-components';
import { Typography, Descriptions, Layout, Modal, Card, Alert } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';

import { Logo } from 'components/Logo';
import HomeFooter from 'components/HomeFooter';
import { Loading } from 'components/Loading';
import { getOrgResurgingInfo$, resurgeOrg$ } from 'services/billingService';
import { finalize } from 'rxjs';
import { DebugJsonPanel } from 'components/DebugJsonPanel';
import StripeCardPaymentWidget from 'components/checkout/StripeCardPaymentWidget';
import moment from 'moment';
import MoneyAmount from 'components/MoneyAmount';
import { Divider } from 'antd';
import { ProCard } from '@ant-design/pro-components';

const ContainerStyled = styled.div`
padding: 2rem 1rem 4rem;
margin: 1rem auto;
text-align: left;
width: 100%;
max-width: 460px;

h2 {
  font-size: 1.3rem;
}

h3 {
  font-size: 1.1rem;
}

.ant-descriptions-row {
  border-bottom: 1px solid red !important;
}

.ant-descriptions-item-label {
  color: #1C222B;
  font-weight: 600;
}

.ant-descriptions-item-content {
  justify-content: end;
  .ant-typography {
  }
}
`;
const { Title, Paragraph } = Typography;
const OrgResurgingPage = () => {
  const params = useParams();
  const { code } = params;
  const [loading, setLoading] = React.useState(true);
  const [data, setData] = React.useState();
  const [modal, contextHolder] = Modal.useModal();
  const navigate = useNavigate();

  React.useEffect(() => {
    getOrgResurgingInfo$(code).pipe(
      finalize(() => setLoading(false))
    ).subscribe(setData);
  }, []);

  const handleCheckout = (stripePaymentMethodId) => {
    resurgeOrg$(code, { stripePaymentMethodId })
      .subscribe(() => {
        modal.success({
          title: '🎉 Successfully unlocked!',
          content: <>
            <Paragraph>
              Thank you very much for your payment.
            </Paragraph>
            <Paragraph>
              The due amount has been received, and your organization is now unlocked. Please log in again to resume using ZeeWorkflow.
            </Paragraph>
          </>,
          maskClosable: true,
          closable: true,
          destroyOnClose: true,
          onOk: () => navigate('/login'),
          onCancel: () => navigate('/'),
          okText: 'Login',
          cancelText: 'Home Page'
        })

      });
  }

  const period = data?.period || {};
  const billingInfo = data?.billingInfo || {};

  return <Layout>
    <ContainerStyled>
      <div style={{ width: '100%', textAlign: 'center', marginBottom: '2rem' }}><Logo /></div>
      <Title style={{ textAlign: 'center', marginBottom: 40 }}>Resume subscription</Title>
      {/* <Paragraph>
        Your organization has an unpaid bill that needs to be settled. Kindly make payment for the amount due to resume using our system. Thank you for your cooperation.
      </Paragraph> */}
      {/* <Alert
        style={{ marginBottom: 24 }}
        type="info"
        showIcon
        message="Pay outstanding bill"
        description="Your organization has an unpaid bill that needs to be settled. Kindly make payment for the amount due to resume using our system. Thank you for your cooperation."
      /> */}
      <Loading loading={loading}>
        <ProCard split={'horizontal'} bodyStyle={{ paddingTop: 24 }}>
          <ProCard>
            <Descriptions size="large" column={1} colon={false}>
              <Descriptions.Item label="Organization">
                {data?.orgName}
              </Descriptions.Item>
              <Descriptions.Item label="Billing Period">
                {moment(period.periodFrom).format('MMM DD YYYY')} - {moment(period.periodTo).format('MMM DD YYYY')}
              </Descriptions.Item>
              <Descriptions.Item label="Period days">
                {period.periodDays} days
              </Descriptions.Item>
              <Descriptions.Item label="Billing Unit">
                {billingInfo.payableDays}
              </Descriptions.Item>
              <Descriptions.Item label="Unit price">
                <MoneyAmount value={period.unitFullPrice} delete={period.promotionCode} postfix="/ mo" />
              </Descriptions.Item>
              {period.promotionCode && <Descriptions.Item label="Unit price (after discount)">
                <MoneyAmount value={period.promotionUnitPrice} postfix="/ mo" />
              </Descriptions.Item>}
              <Descriptions.Item label="Due amount (GST included)">
                <MoneyAmount value={billingInfo.payable} style={{ fontSize: 30 }} strong />
              </Descriptions.Item>
            </Descriptions>
            <Paragraph type="warning">
              Please note that your organization currently has an outstanding bill that must be settled. As soon as the due amount is paid, the account will be unlocked immediately. Thank you for your cooperation in this matter.
            </Paragraph>
          </ProCard>
          <ProCard bodyStyle={{ padding: 24 }}>
            <StripeCardPaymentWidget
              onOk={handleCheckout}
              onLoading={loading => setLoading(loading)}
              onClientSecret={() => data?.clientSecret}
            />
          </ProCard>
        </ProCard>
        {/* <DebugJsonPanel value={data} /> */}
      </Loading>
      {contextHolder}
    </ContainerStyled>
    <HomeFooter />
  </Layout>
}

OrgResurgingPage.propTypes = {};

OrgResurgingPage.defaultProps = {};

export default OrgResurgingPage;
