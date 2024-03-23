import { UserItem } from '../User/data';

export type FutureItem = {
  id: string;
  name: string;
  symbol: string;
  state: string;
  runEnvironment: string;
  capital?: number;
  balance: number;
  leverage: number;
  updateTime: Date;
  profitSum: number;
  userId: string;
  longFutureSideId: string;
  shortFutureSideId: string;
  user: UserItem;
};
export type pagination = {
  total: number;
  pageSize: number;
  current: number;
};

export type FutureParams = {
  userId?: string;
  username?: string;
  filter?: Record<string, any[]>;
  sorter?: Record<string, any>;
} & Partial<FutureItem>;

export type FutureStrategyItem = {
  id: string;
  name: string;
  state: string;
  side: string;
  monitorIntervals: string;
  maxOrderNumber?: number;
  everyTradePercent: number;
};

export type FutureStrategyParams = {
  filter?: Record<string, any[]>;
  sorter?: Record<string, any>;
} & Partial<FutureStrategyItem>;

export type FutureTradeItem = {
  id: string;
  createTime: Date;
  side: string;
  longShort: string;
  orderId: string;
  clientOrderId: string;
  price?: number;
  rUnitQty: number;
  lUnitQty: number;
  origRUnitQty: number;
  origLUnitQty: number;
  fee: number;
  feeAsset: string;
  realizedProfit: number;
  runEnvironment: string;
  syncCount: number;
  trackType: string;
  status: string;
  userMsg: string;
  systemMsg: string;
  number: string;
  future: FutureItem;
};

export type FutureTradeParams = {
  filter?: Record<string, any[]>;
  sorter?: Record<string, any>;
} & Partial<FutureTradeItem>;

export type FutureSideOrderItem = {
  id: string;
  updateTime: Date;
  orderType: string;
  interval: string;
  state: string;
  longShort: string;
  moneyTotal: number;
  tokenTotal: number;
  entrustPrice?: number;
  stopLossPrice?: number;
  takeProfitPrice: number;
  profit: number;
  fee: number;
};

export type FutureSideOrderParams = {
  futureSideId?: string;
  filter?: Record<string, any[]>;
  sorter?: Record<string, any>;
} & Partial<FutureExtOrderItem>;
