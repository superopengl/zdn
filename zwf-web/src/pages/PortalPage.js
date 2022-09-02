// import 'App.css';
import { Button, Row, Col, Image, Layout, Space, Typography } from 'antd';
import HomeFooter from 'components/HomeFooter';
import React from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { GlobalContext } from 'contexts/GlobalContext';
import smoothscroll from 'smoothscroll-polyfill';
import { Outlet } from 'react-router-dom';
import { Tabs } from 'antd';
import { OrgRegisterModal } from 'components/OrgRegisterModal';

const { Text } = Typography;

smoothscroll.polyfill();

const StyledLayoutPage = styled(Layout)`
.ant-layout-header {
  background-color: white;
}

.ant-tabs-nav {
  margin: 0;
}

.ant-tabs-nav::before {
  border: none;
}

.ant-tabs-ink-bar {
  height: 3px !important;
}
`;


const scrollToElement = (selector) => {
  document.querySelector(selector)?.scrollIntoView({
    behavior: 'smooth',
    block: "start",
    inline: "nearest"
  });
}


export const PortalPage = () => {

  const navigate = useNavigate();
  const [visible, setVisible] = React.useState(false);
  const context = React.useContext(GlobalContext);

  const { role } = context;
  const isGuest = role === 'guest';

  const handleMenuChange = (path) => {
    navigate(path);
  }

  const handleShowModal = () => {
    setVisible(true);
  }

  const handleHideModal = () => {
    setVisible(false);
  }

  return <StyledLayoutPage>
    <Layout.Header>
      <Space style={{ justifyContent: 'space-between', width: '100%' }}>
        <Link to="/">
          <Image src="/images/logo-horizontal-blue.png" preview={false} height={32} />
        </Link>
        <Row gutter={30} align="middle">
          <Col>
            <Tabs defaultActiveKey="/" onChange={handleMenuChange}>
              <Tabs.TabPane tab="Home" key="/"></Tabs.TabPane>
              <Tabs.TabPane tab="Resources" key="/resource"></Tabs.TabPane>
              <Tabs.TabPane tab="Pricing" key="/#pricing"></Tabs.TabPane>
              <Tabs.TabPane tab="Contact Us" key="/#contactus"></Tabs.TabPane>
            </Tabs>
          </Col>
          {isGuest && <Col>
            <Link to="/login">
              <Button type="primary" ghost>Log in</Button>
            </Link>
          </Col>}
          {isGuest && <Col>
            <Button type="primary" onClick={handleShowModal}>Try it Now</Button>
          </Col>}
          {!isGuest && <Col>
            <Link to="/task">
              <Button type="primary">Go to App</Button>
            </Link>
          </Col>}
        </Row>
      </Space>
    </Layout.Header>
    <Layout.Content>
      <Outlet />
    </Layout.Content>
    <HomeFooter />
    <OrgRegisterModal
      visible={visible}
      onOk={handleHideModal}
      onCancel={handleHideModal}
    />
  </StyledLayoutPage>
}

PortalPage.propTypes = {};

PortalPage.defaultProps = {};
