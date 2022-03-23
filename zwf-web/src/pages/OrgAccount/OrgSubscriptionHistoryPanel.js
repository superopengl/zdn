import { Tag, Space, Table, Button, Typography } from 'antd';
import React from 'react';
import { withRouter } from 'react-router-dom';
import { TimeAgo } from 'components/TimeAgo';
import { DownloadOutlined } from '@ant-design/icons';
import { downloadReceipt } from 'services/subscriptionService';
import { ArrowRightOutlined } from '@ant-design/icons';
import MoneyAmount from 'components/MoneyAmount';
import { orderBy } from 'lodash';
import * as moment from 'moment';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const {Text} = Typography;

const StyledReceiptTable = styled(Table)`
.ant-table {
  margin: -8px !important;
}
`;

const OrgSubscriptionHistoryPanel = (props) => {
  const { data } = props;
  const [list, setList] = React.useState(data || []);

  React.useEffect(() => {
    setList(data);
  }, [data]);

  const handleReceipt = async (payment) => {
    const data = await downloadReceipt(payment.id);
    const fileUrl = URL.createObjectURL(data);
    window.open(fileUrl);
  }

  const columnDef = [
    {
      title: 'Subscription from',
      align: 'left',
      render: (value, item) => {
        return <Space>
          <TimeAgo value={item.start} showAgo={false} accurate={false} />
          {/* <DoubleRightOutlined /> */}
          {/* {item.recurring && <Tag>auto renew</Tag>} */}
          {item?.status === 'alive' && <Tag>current</Tag>}
          {/* {moment(item.createdAt).isAfter(moment()) && <Tag color="warning">new purchase</Tag>} */}
          {/* {moment().isBefore(moment(item.start).startOf('day')) && <Tag>Furture</Tag>} */}
        </Space>
      }
    },
    {
      title: 'End',
      align: 'left',
      render: (value, item) => {
        return item.end ? <TimeAgo value={item.end} showAgo={false} accurate={false} />: null;
      }
    },
    {
      title: 'Days',
      align: 'center',
      render: (value, item) => {
        return item.end ? <Text>{moment(item.end).diff(moment(item.start), 'days') + 1}</Text>: null;
      }
    },
    {
      title: 'Licenses',
      dataIndex: 'seats',
      align: 'center',
      render: (value, item) => {
        return value
      }
    },
    {
      title: 'Billing',
      dataIndex: 'payments',
      align: 'center',
      width: 370,
      render: (payments, item) => {
        return <StyledReceiptTable
          columns={[
            {
              title: 'link',
              dataIndex: 'amount',
              align: 'right',
              width: '33%',
              render: (amount, item) => <MoneyAmount value={amount} />
            },
            {
              title: 'link',
              dataIndex: 'createdAt',
              align: 'right',
              width: '34%',
              render: (createdAt, item) => <TimeAgo value={createdAt} showAgo={false} accurate={false} />
            },
            {
              title: 'link',
              dataIndex: 'id',
              width: '33%',
              align: 'right',
              render: (id, item) => <Button type="link" onClick={() => handleReceipt(item)} icon={<DownloadOutlined />}>Receipt</Button>
            },
          ]}
          bordered={false}
          rowKey="id"
          showHeader={false}
          dataSource={orderBy(payments, [x => moment(x.paidAt).toDate()], 'asc')}
          pagination={false}
          scroll={false}
          locale={{
            emptyText: '15 day single license free trial'
          }}
        // style={{ width: '100%', minWidth: 370 }}
        />
      }
    },
  ];

  return (
    <Table
      // showHeader={false}
      showHeader={true}
      style={{ width: '100%' }}
      scroll={{ x: 'max-content' }}
      dataSource={list}
      columns={columnDef}
      size="small"
      pagination={false}
      rowKey="id"
      bordered={false}
    />
  );
};

OrgSubscriptionHistoryPanel.propTypes = {
  data: PropTypes.array.isRequired
};

OrgSubscriptionHistoryPanel.defaultProps = {
  data: []
};

export default withRouter(OrgSubscriptionHistoryPanel);
