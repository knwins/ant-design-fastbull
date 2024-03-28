import { PageContainer } from '@ant-design/pro-layout';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { FormattedMessage, useIntl } from '@umijs/max';
import { Typography } from 'antd';
import React, { useRef } from 'react';
import type { CoinThrendItem } from './data';
import { queryCoinThrendList } from './service';
const { Paragraph } = Typography;

const Thrend: React.FC = () => {
  const actionRef = useRef<ActionType>();
  //国际化
  const intl = useIntl();

  const paginationProps = {
    showSizeChanger: true,
    showQuickJumper: true,
  };

  const columns: ProColumns<CoinThrendItem>[] = [
    {
      title: <FormattedMessage id="pages.update.time" />,
      dataIndex: 'updateTime',
      valueType: 'dateTime',
      hideInSearch: true,
      hideInForm: true,
      align: 'center',
      width: '180px',
    },

    {
      title: <FormattedMessage id="pages.coin.thrend.symbol" />,
      dataIndex: 'symbol',
      valueType: 'text',
    },

    {
      title: <FormattedMessage id="pages.coin.thrend.symbolType" />,
      dataIndex: 'symbolType',
      hideInSearch: true,
      valueType: 'text',
    },

    {
      title: <FormattedMessage id="pages.coin.thrend.threndType" />,
      dataIndex: 'threndType',
      valueType: 'select',
    },

    {
      title: <FormattedMessage id="pages.coin.thrend.longShort" />,
      dataIndex: 'longShort',
      valueType: 'select',
      valueEnum: {
        LONG: {
          text: 'LONG',
          longShort: 'LONG',
        },
        SHORT: {
          text: 'SHORT',
          longShort: 'SHORT',
        },
      },
    },

    {
      title: <FormattedMessage id="pages.coin.thrend.interval" />,
      dataIndex: 'interval',
      valueType: 'text',
      hideInForm: true,
    },
    {
      title: <FormattedMessage id="pages.coin.thrend.message" />,
      dataIndex: 'message',
      valueType: 'text',
      hideInSearch: true,
      hideInForm: true,
      width: '280px',
      fieldProps: { size: 'small' },
      render: (text, record, _, action) => {
        if (record.message) {
          return [
            <Paragraph title={record.message} ellipsis={{ rows: 2, expandable: true }}>
              {record.message}
            </Paragraph>,
          ];
        }
        return '-';
      },
    },
  ];
  return (
    <PageContainer>
      <ProTable<CoinThrendItem>
        actionRef={actionRef}
        rowKey={(record) => record.id}
        search={{
          labelWidth: 80,
        }}
        pagination={paginationProps}
        request={queryCoinThrendList}
        columns={columns}
      />
    </PageContainer>
  );
};
export default Thrend;
