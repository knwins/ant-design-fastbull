// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';
import host from '../../host';
import type { FutureItem, FutureSideOrderItem, FutureTradeItem } from './data';

export async function queryFutureList(
  params: {
    current?: number;
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return request<{
    data: FutureItem[];
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  }>(host.api + 'api/manage/future/list', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

export async function getFuture(params: { [id: string]: any }, options?: { [id: string]: any }) {
  return request<{
    data: FutureItem;
    success?: boolean;
  }>(host.api + 'api/manage/future/get', {
    params: {
      ...params,
    },
    method: 'POST',
    ...(options || {}),
  });
}

//------------------FutureStrategy--------
export async function queryFutureStrategyList(
  params: {
    current?: number;
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return request<{
    data: FutureItem[];
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  }>(host.api + 'api/manage/future/strategy/list', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

export async function addFutureStrategy(
  data: { [id: string]: any },
  options?: { [id: string]: any },
) {
  return request<{
    success?: boolean;
    errorMessage?: string;
  }>(host.api + 'api/manage/future/strategy/add', {
    data,
    method: 'POST',
    ...(options || {}),
  });
}

export async function updateFutureStrategy(
  data: { [key: string]: any },
  options?: { [key: string]: any },
) {
  return request<{
    success?: boolean;
    errorMessage?: string;
  }>(host.api + 'api/manage/future/strategy/update', {
    data,
    method: 'PUT',
    ...(options || {}),
  });
}

export async function removeFutureStrategy(
  data: { [id: string]: any },
  options?: { [id: string]: any },
) {
  return request<{
    success?: boolean;
    errorMessage?: string;
  }>(host.api + 'api/manage/future/strategy/delete', {
    data,
    method: 'DELETE',
    ...(options || {}),
  });
}

//------------------FutureTrade--------
export async function queryFutureTradeList(
  params: {
    current?: number;
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return request<{
    data: FutureTradeItem[];
    total?: number;
    success?: boolean;
  }>(host.api + 'api/manage/future/trade/list', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

export async function getFutureTrade(
  params: { [id: string]: any },
  options?: { [id: string]: any },
) {
  return request<{
    data: FutureTradeItem;
    success?: boolean;
  }>(host.api + 'api/manage/future/trade/get', {
    params: {
      ...params,
    },
    method: 'POST',
    ...(options || {}),
  });
}

export async function queryFutureSideOrderList(
  params: {
    current?: number;
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return request<{
    data: FutureSideOrderItem[];
    total?: number;
    success?: boolean;
  }>(host.api + 'api/manage/future/side/order/list', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

export async function getFutureSideOrder(
  params: { [id: string]: any },
  options?: { [id: string]: any },
) {
  return request<{
    data: FutureSideOrderItem;
    success?: boolean;
  }>(host.api + 'api/manage/future/side/order/get', {
    params: {
      ...params,
    },
    method: 'POST',
    ...(options || {}),
  });
}
