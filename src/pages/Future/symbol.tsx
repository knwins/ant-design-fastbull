import type { ProDescriptionsItemProps } from '@ant-design/pro-descriptions';
import ProDescriptions from '@ant-design/pro-descriptions';
import { PageContainer } from '@ant-design/pro-layout';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { FormattedMessage, useIntl } from '@umijs/max';
import { Drawer } from 'antd';
import React, { useRef, useState } from 'react';
import type { FutureSideOrderItem, FutureSideOrderParams, FutureItem, FutureParams } from './data';
import { getFuture, queryFutureSideOrderList, queryFutureList } from './service';

const Future: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const [currentRow, setCurrentRow] = useState<FutureItem | undefined>(undefined);
  const [params, setParams] = useState<Partial<FutureParams> | undefined>(undefined);

  //国际化
  const intl = useIntl();

  const paginationProps = {
    showSizeChanger: true,
    showQuickJumper: true,
  };
  const pagination = {
    showSizeChanger: true,
    showQuickJumper: true,
    pageSize: 5,
  };

  const columns: ProColumns<FutureItem>[] = [
    {
      title: <FormattedMessage id="pages.future.coin.updateTime" />,
      dataIndex: 'updateTime',
      hideInSearch: true,
      valueType: 'date',
      width: '120px',
    
      hideInTable: true,
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
      title: 'id',
      dataIndex: 'id',
      valueType: 'text',
      hideInSearch: false,
      hideInForm: true,
      width: '60px',
    },
    {
      title: <FormattedMessage id="pages.future.coin.symbol" />,
      dataIndex: 'symbol',
      valueType: 'text',
      hideInSearch: false,
      hideInForm: true,
      width: '120px',
    },

    {
      title: <FormattedMessage id="pages.future.coin.username" />,
      dataIndex: ['user', 'name'],
      hideInSearch: true,
      valueType: 'text',
      copyable: true,
      render: (dom, entity) => {
        return (
          <a
            onClick={() => {
              const params: FutureParams = {
                userId:entity.user.id,
              };
              setParams(params);
              actionRef.current?.reloadAndRest?.();
            }}
          >
            {dom}
          </a>
        );
      },
    },

    {
      title: <FormattedMessage id="pages.future.coin.leverage" />,
      dataIndex: 'leverage',
      valueType: 'text',
      hideInSearch: true,
      hideInForm: true,
      width: 'md',
    },

    {
      title: <FormattedMessage id="pages.future.coin.capital" />,
      dataIndex: 'capital',
      valueType: 'text',
      hideInSearch: true,
      hideInForm: true,
      width: 'md',
      hideInTable: true,
    },
    {
      title: <FormattedMessage id="pages.future.coin.balance" />,
      dataIndex: 'balance',
      valueType: 'text',
      hideInSearch: true,
      hideInForm: true,
      hideInTable: true,
      width: 'md',
    },

    {
      title: <FormattedMessage id="pages.future.coin.frequency" />,
      dataIndex: 'frequency',
      valueType: 'text',
      hideInSearch: true,
      hideInForm: true,
      hideInTable: true,
      width: 'md',
    },

    {
      title: <FormattedMessage id="pages.future.coin.state" />,
      dataIndex: 'state',
      hideInSearch: true,
      valueType: 'text',
      width: '120px',
    },

    {
      title: <FormattedMessage id="pages.future.coin.runEnvironment" />,
      dataIndex: 'runEnvironment',
      valueType: 'text',
      width: '120px',
      valueEnum: {
        TEST: {
          text: '体验',
          runEnvironment: 'TEST',
        },
        PRO: {
          text: '正式',
          runEnvironment: 'PRO',
        },
      },
    },

    {
      title: <FormattedMessage id="pages.future.coin.profitSum" />,
      dataIndex: 'profitSum',
      valueType: 'text',
      hideInSearch: true,
      hideInForm: true,
      width: 'md',
    },

    {
      title: <FormattedMessage id="pages.option" />,
      dataIndex: 'option',
      valueType: 'option',
      hideInDescriptions: true,
      render: (_, record) => [
        <a
          key="detail"
          onClick={(e) => {
            setCurrentRow(record);
            setShowDetail(true);
          }}
        >
          <FormattedMessage id="pages.detail" />
        </a>,
      ],
    },
  ];

 
  const columnsOrder: ProColumns<FutureSideOrderItem>[] = [
    {
      title: <FormattedMessage id="pages.update.time" />,
      dataIndex: 'updateTime',
      hideInSearch: true,
      valueType: 'dateTime',
      width: '160px',
    },

    {
      title: <FormattedMessage id="pages.future.side.order.state" />,
      dataIndex: 'state',
      valueType: 'text',
      hideInSearch: false,
      hideInForm: true,
    },
    {
      title: <FormattedMessage id="pages.future.side.order.orderType" />,
      dataIndex: 'orderType',
      valueType: 'text',
      hideInSearch: false,
      hideInForm: true,
    },
    {
      title: <FormattedMessage id="pages.future.side.order.moneyTotal" />,
      dataIndex: 'moneyTotal',
      valueType: 'text',
      hideInSearch: false,
      hideInForm: true,
    },

    {
      title: <FormattedMessage id="pages.future.side.order.profit" />,
      dataIndex: 'profit',
      valueType: 'text',
      hideInSearch: false,
      hideInForm: true,
    },
  ];

  return (
    <PageContainer>
      <ProTable<FutureItem>
        actionRef={actionRef}
        rowKey={(record) => record.id}
        search={{
          labelWidth: 80,
        }}
        toolBarRender={() => []}
        pagination={paginationProps}
        params={params}
        request={queryFutureList}
        columns={columns}
        onChange={(pagination, filters: any, sorter: any) => {
          if (sorter) {
            sorter.order = sorter.order === 'descend' ? 'DESC' : 'ASC';
            const params: FutureParams = {
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
          <ProDescriptions<FutureItem>
            column={1}
            title={currentRow?.name}
            request={getFuture}
            params={{
              id: currentRow?.id,
            }}
            columns={columns as ProDescriptionsItemProps<FutureItem>[]}
          />
        )}

        {currentRow ? (
          <ProTable<FutureSideOrderItem, FutureSideOrderParams>
            headerTitle={intl.formatMessage({
              id: 'pages.future.side.order.long.title',
            })}
            search={false}
            pagination={pagination}
            options={false}
            params={{
              futureExtId: currentRow?.longFutureSideId,
            }}
            rowKey={(record) => record.id}
            request={queryFutureSideOrderList}
            columns={columnsOrder}
          />
        ) : (
          ''
        )}

        {currentRow ? (
          <ProTable<FutureSideOrderItem, FutureSideOrderParams>
            headerTitle={intl.formatMessage({
              id: 'pages.future.side.order.short.title',
            })}
            search={false}
            pagination={pagination}
            options={false}
            params={{
              futureExtId: currentRow?.shortFutureSideId,
            }}
            rowKey={(record) => record.id}
            request={queryFutureSideOrderList}
            columns={columnsOrder}
          />
        ) : (
          ''
        )}
      </Drawer>
    </PageContainer>
  );
};
export default Future;
