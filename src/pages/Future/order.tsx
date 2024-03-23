import type { ProDescriptionsItemProps } from '@ant-design/pro-descriptions';
import ProDescriptions from '@ant-design/pro-descriptions';
import { PageContainer } from '@ant-design/pro-layout';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { FormattedMessage, useIntl } from '@umijs/max';
import { Drawer } from 'antd';
import React, { useRef, useState } from 'react';
import type { FutureSideOrderItem, FutureSideOrderParams } from './data';
import { getFutureSideOrder, queryFutureSideOrderList } from './service';

const FutureExtOrder: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const [currentRow, setCurrentRow] = useState<FutureSideOrderItem | undefined>(undefined);

  const [params, setParams] = useState<Partial<FutureSideOrderParams> | undefined>(undefined);

  //国际化
  const intl = useIntl();

  const paginationProps = {
    showSizeChanger: true,
    showQuickJumper: true,
  };

  const columns: ProColumns<FutureSideOrderItem>[] = [
    {
      title: <FormattedMessage id="pages.update.time" />,
      dataIndex: 'updateTime',
      hideInSearch: true,
      valueType: 'dateTime',
      width: '180px',
    },

    {
      title: <FormattedMessage id="pages.future.side.order.symbol" />,
      dataIndex: ['future', 'symbol'],
      hideInForm: true,
      hideInDescriptions: false,
      hideInTable: true,
      hideInSearch: true,
      valueType: 'text',
    },

    {
      title: <FormattedMessage id="pages.future.side.order.username" />,
      dataIndex: ['user', 'name'],
      hideInForm: true,
      hideInDescriptions: false,
      hideInTable: true,
      hideInSearch: true,
      valueType: 'text',
    },

    {
      title: <FormattedMessage id="pages.bill.username.search" />,
      dataIndex: 'username',
      hideInForm: true,
      hideInDescriptions: true,
      hideInTable: true,
      valueType: 'text',
    },

    {
      title: <FormattedMessage id="pages.future.side.order.orderType" />,
      dataIndex: 'orderType',
      valueType: 'text',
      hideInSearch: true,
      hideInForm: true,
    },

    {
      title: <FormattedMessage id="pages.future.side.order.interval" />,
      dataIndex: 'interval',
      valueType: 'text',
      hideInSearch: true,
      hideInForm: true,
      width: 'md',
    },

    {
      title: <FormattedMessage id="pages.future.side.order.positionSide" />,
      dataIndex: 'longShort',
      valueType: 'text',
      hideInSearch: true,
      hideInForm: true,
      width: 'md',
    },

    {
      title: <FormattedMessage id="pages.future.side.order.moneyTotal" />,
      dataIndex: 'moneyTotal',
      valueType: 'text',
      hideInSearch: true,
      hideInForm: true,
      width: 'md',
    },

    {
      title: <FormattedMessage id="pages.future.side.order.tokenTotal" />,
      dataIndex: 'tokenTotal',
      valueType: 'text',
      hideInSearch: true,
      hideInForm: true,
      width: 'md',
    },

    {
      title: <FormattedMessage id="pages.future.side.order.entrustPrice" />,
      dataIndex: 'entrustPrice',
      valueType: 'digit',
      hideInSearch: true,
      hideInForm: true,
      width: 'md',
    },

    {
      title: <FormattedMessage id="pages.future.side.order.takeProfitPrice" />,
      dataIndex: 'takeProfitPrice',
      valueType: 'digit',
      hideInSearch: true,
      hideInForm: true,
      width: 'md',
    },

    {
      title: <FormattedMessage id="pages.future.side.order.stopLossPrice" />,
      dataIndex: 'stopLossPrice',
      valueType: 'digit',
      hideInSearch: true,
      hideInForm: true,
      width: 'md',
    },

    {
      title: <FormattedMessage id="pages.future.side.order.profit" />,
      dataIndex: 'profit',
      hideInSearch: true,
      valueType: 'digit',
    },
    {
      title: <FormattedMessage id="pages.future.side.order.fee" />,
      dataIndex: 'fee',
      hideInSearch: true,
      valueType: 'digit',
    },

    {
      title: <FormattedMessage id="pages.future.side.order.state" />,
      dataIndex: 'state',
      valueType: 'text',
      valueEnum: {
        ENTRUST: {
          text: '委托中',
          runEnvironment: 'ENTRUST',
        },
        HOLD: {
          text: '持仓中',
          runEnvironment: 'HOLD',
        },
        FINISHED: {
          text: '完成',
          runEnvironment: 'FINISHED',
        },
      },
    },

    {
      title: <FormattedMessage id="pages.option" />,
      dataIndex: 'option',
      valueType: 'option',
      hideInDescriptions: true,
      render: (_, record) => {
        return [
          <a
            key="detail"
            onClick={() => {
              setCurrentRow(record);
              setShowDetail(true);
            }}
          >
            <FormattedMessage id="pages.detail" />
          </a>,
        ];
      },
    },
  ];
  return (
    <PageContainer>
      <ProTable<FutureSideOrderItem>
        actionRef={actionRef}
        rowKey={(record) => record.id}
        search={{
          labelWidth: 80,
        }}
        toolBarRender={() => []}
        pagination={paginationProps}
        request={queryFutureSideOrderList}
        columns={columns}
        params={params}
        onChange={(pagination, filters: any, sorter: any) => {
          if (sorter) {
            sorter.order = sorter.order === 'descend' ? 'DESC' : 'ASC';
            const params: FutureSideOrderParams = {
              sorter: sorter.order,
              filter: sorter.field,
            };
            setParams(params);
          }
        }}
      />

      <Drawer
        width={600}
        open={showDetail}
        onClose={() => {
          setCurrentRow(undefined);
          setShowDetail(false);
        }}
        closable={false}
      >
        {currentRow?.id && (
          <ProDescriptions<FutureSideOrderItem>
            column={1}
            title={currentRow?.orderType}
            request={getFutureSideOrder}
            params={{
              id: currentRow?.id,
            }}
            columns={columns as ProDescriptionsItemProps<FutureSideOrderItem>[]}
          />
        )}
      </Drawer>
    </PageContainer>
  );
};
export default FutureExtOrder;
