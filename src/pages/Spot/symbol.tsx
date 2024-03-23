import { ProDescriptions, ProDescriptionsItemProps } from '@ant-design/pro-components';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { FormattedMessage, useIntl } from '@umijs/max';
import { Drawer } from 'antd';
import React, { useRef, useState } from 'react';
import { SpotItem, SpotParams } from './data';
import { querySpotList } from './service';

const Spot: React.FC = () => {
  const actionRef = useRef<ActionType>();

  const [params, setParams] = useState<Partial<SpotParams> | undefined>(undefined);
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const [currentRow, setCurrentRow] = useState<SpotItem | undefined>(undefined);

  //国际化
  const intl = useIntl();

  const paginationProps = {
    showSizeChanger: true,
    showQuickJumper: true,
  };

  const columns: ProColumns<SpotItem>[] = [
    {
      title: <FormattedMessage id="pages.update.time" />,
      dataIndex: 'lastRunTime',
      valueType: 'dateTime',
      hideInSearch: true,
      hideInForm: true,
      align: 'center',
      hideInTable: true,
    },

    {
      title: <FormattedMessage id="pages.spot.coin.username.search" />,
      dataIndex: 'username',
      hideInForm: true,
      hideInDescriptions: true,
      hideInTable: true,
      valueType: 'text',
      fieldProps: {
        placeholder: intl.formatMessage({ id: 'pages.spot.coin.username.placeholder' }),
      },
    },


     {
      title:"ID",
      dataIndex: 'id',
      hideInSearch: true,
      valueType: 'text',
    },

    {
      title: <FormattedMessage id="pages.spot.coin.symbol" />,
      dataIndex: 'symbol',
      hideInSearch: true,
      valueType: 'text',
    },

    {
      title: <FormattedMessage id="pages.spot.coin.username" />,
      dataIndex: ['user', 'name'],
      hideInSearch: true,
      valueType: 'text',
      copyable: true,
      render: (dom, entity) => {
        return (
          <a
            onClick={() => {
              const params: SpotParams = {
                userId: entity.user.id,
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
      title: <FormattedMessage id="pages.spot.coin.state" />,
      dataIndex: 'state',
      valueType: 'text',
      hideInSearch: true,
      hideInForm: true,
    },

    {
      title: <FormattedMessage id="pages.spot.coin.runEnvironment" />,
      dataIndex: 'runEnvironment',
      valueType: 'select',
      hideInSearch: false,
      hideInForm: true,
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
      title: <FormattedMessage id="pages.spot.coin.trackType" />,
      dataIndex: 'trackType',
      valueType: 'text',
      hideInSearch: true,
      hideInForm: true,
      hideInTable: true,
    },

    {
      title: <FormattedMessage id="pages.spot.coin.averagePrice" />,
      dataIndex: 'averagePrice',
      valueType: 'text',
      hideInSearch: true,
      hideInForm: true,
      hideInTable: true,
    },

    {
      title: <FormattedMessage id="pages.spot.coin.tokenTotal" />,
      dataIndex: 'tokenTotal',
      valueType: 'text',
      hideInSearch: true,
      hideInForm: true,
    },
    {
      title: <FormattedMessage id="pages.spot.coin.moneyTotal" />,
      dataIndex: 'moneyTotal',
      valueType: 'text',
      hideInSearch: true,

      hideInForm: true,
    },

    {
      title: <FormattedMessage id="pages.spot.coin.tradeNumber" />,
      dataIndex: 'tradeNumber',
      valueType: 'text',
      hideInSearch: true,
      hideInForm: true,
      hideInTable: true,
    },
    {
      title: <FormattedMessage id="pages.spot.coin.profit" />,
      dataIndex: 'profit',
      valueType: 'text',
      hideInSearch: true,
      hideInForm: true,
    },
     {
      title: '计划补仓价',
      dataIndex: 'planBuyPrice',
      valueType: 'text',
      hideInSearch: true,
      hideInForm: true,
      hideInTable: true,
     },
      {
      title: '计划补仓比例',
      dataIndex: 'planBuyPercent',
      valueType: 'text',
      hideInSearch: true,
      hideInForm: true,
      hideInTable: true,
     },
     {
      title: '计划平仓价',
      dataIndex: 'planSellPrice',
      valueType: 'text',
      hideInSearch: true,
      hideInForm: true,
      hideInTable: true,
     },
    {
      title: '最近补仓价',
      dataIndex: 'lastPrice',
      valueType: 'text',
      hideInSearch: true,
      hideInForm: true,
      hideInTable: true,
     },
    {
      title: '最近补仓数量',
      dataIndex: 'lastQuantity',
      valueType: 'text',
      hideInSearch: true,
      hideInForm: true,
      hideInTable: true,
     },
{
      title: '最近补仓时间',
      dataIndex: 'lastQuantity',
      valueType: 'dateTime',
      hideInSearch: true,
      hideInForm: true,
      hideInTable: true,
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
  return (
    <>
      <ProTable<SpotItem>
        actionRef={actionRef}
        rowKey={(record) => record.id}
        search={{
          labelWidth: 80,
        }}
        params={params}
        pagination={paginationProps}
        request={querySpotList}
        columns={columns}
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
          <ProDescriptions<SpotItem>
            column={1}
            title={currentRow?.name}
            request={async () => ({
              data: currentRow || {},
            })}
            params={{
              id: currentRow?.id,
            }}
            columns={columns as ProDescriptionsItemProps<SpotItem>[]}
          />
        )}
      </Drawer>
    </>
  );
};
export default Spot;
