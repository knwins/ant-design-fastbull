import { request } from '@umijs/max';
import host from '../../host';
import type { UserItem, UserLogItem } from './data';

export async function queryUserList(
  params: {
    current?: number;
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return request<{
    data: UserItem[];
    total?: number;
    success?: boolean;
  }>(host.api+'api/manage/user/list', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

export async function queryUserLogList(
  params: {
    current?: number;
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return request<{
    data: UserLogItem[];
    total?: number;
    success?: boolean;
  }>(host.api+'api/manage/user/log/list', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}


export async function getUser(data: { [id: string]: any }, options?: { [id: string]: any }) {
  return request<UserItem>(host.api+'api/manage/user/get', {
    data,
    method: 'GET',
    ...(options || {}),
  });
}

/** 更新PUT /api/manage/user/update */
export async function updateUser(data: { [id: string]: any }, options?: { [id: string]: any }) {
  return request<{
    data: UserItem;
    errorMessage?: string;
    success?: boolean;
  }>(host.api+'api/manage/user/update', {
    data,
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    ...(options || {}),
  });
}

/** 删除 DELETE /api/manage/user/delete */
export async function removeUser(data: { [id: string]: any }, options?: { [id: string]: any }) {
  return request<{
    success?: boolean;
    errorMessage?: string;
  }>(host.api+'api/manage/user/delete', {
    data,
    method: 'DELETE',
    ...(options || {}),
  });
}




