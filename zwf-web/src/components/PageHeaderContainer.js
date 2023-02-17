import React from 'react';
import { Breadcrumb, Row, Col, Typography} from 'antd';
import { PageContainer } from '@ant-design/pro-components';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const {Title} = Typography;

export const PageHeaderContainer = React.memo((props) => {
  const { breadcrumb, children, icon, title, extra, ...others } = props;


  return <>
    <Breadcrumb style={{ padding: '1rem 40px 0' }}>
      {breadcrumb?.map((item, i) => <Breadcrumb.Item key={i} menu={item.menu ? {items: item.menu.map((m, j) => ({key: j, label: m}))} : null}>
        {
          i === breadcrumb.length - 1 || !item.path ? item.name :
            <Link to={item.path}>{item.name}</Link>
        }
      </Breadcrumb.Item>)}
    </Breadcrumb>
    <PageContainer
      {...others}
      header={{
        // backIcon: <LeftOutlined />,
        title: <Row align="middle" wrap={false} style={{ height: 46 }}>
          {icon && <Col>{icon}</Col>}
          <Col flex={1}>
            <Title level={3} style={{margin: 0}}>{title}</Title>
          </Col>
        </Row>,
        extra: extra?.filter(x => !!x),
        style: {
          paddingTop: 0,
          paddingLeft: 10,
        }
      }}
    >{children}</PageContainer>
  </>
});

PageHeaderContainer.propTypes = {
  breadcrumb: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    path: PropTypes.string,
    menu: PropTypes.array,
  })),
  icon: PropTypes.object,
  title: PropTypes.any,
  extra: PropTypes.array,
};

PageHeaderContainer.defaultProps = {
};

