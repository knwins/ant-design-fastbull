export default [
  {
    path: '/welcome',
    name: 'welcome',
    icon: 'smile',
    component: './Welcome',
  },
  
  {
    path: '/user',
    name: 'user',
    routes: [
  
      {
        name: 'list',
        path: '/user/list',
        component: './User/list',
      },
      {
        name: 'log',
        path: '/user/log',
        component: './User/log',
      },
    ],
  },

  {
    path: '/information',
    name: 'information',
    routes: [
      {
        name: 'express',
        path: '/information/express',
        component: './Information/express',
      },

      {
        name: 'article',
        path: '/information/article',
        component: './Information/article',
      },

      {
        name: 'article.type',
        path: '/information/articleType',
        component: './Information/articleType',
      },
    ],
  },

  {
    path: '/finance',
    name: 'finance',
    routes: [
      {
        name: 'bill.type',
        path: '/finance/billType',
        component: './Finance/billType',
      },

      {
        name: 'list',
        path: '/finance/bill',
        component: './Finance/bill',
      },

      {
        name: 'withdraw',
        path: '/finance/withdraw',
        component: './Finance/withdraw',
      },
      {
        name: 'invest',
        path: '/finance/invest',
        component: './Finance/invest',
      },
    ],
  },

  {
    path: '/future',
    name: 'future',
    routes: [
      {
        name: 'symbol',
        icon: 'smile',
        path: '/future/symbol',
        component: './Future/symbol',
      },

      {
        name: 'trade',
        icon: 'smile',
        path: '/future/trade',
        component: './Future/trade',
      },

      {
        name: 'strategy',
        icon: 'smile',
        path: '/future/strategy',
        component: './Future/strategy',
      },
      {
        name: 'order',
        icon: 'smile',
        path: '/future/order',
        component: './Future/order',
      },
    ],
  },

  {
    path: '/spot',
    name: 'spot',
    routes: [
      {
        name: 'symbol',
        path: '/spot/symbol',
        component: './Spot/symbol',
      },
      {
        name: 'trade',
        path: '/spot/trade',
        component: './Spot/trade',
      },

      {
        name: 'strategy',
        path: '/spot/strategy',
        component: './Spot/strategy',
      },
    ],
  },

  {
    path: '/coin',
    name: 'coin',
    routes: [
      {
        name: 'symbol',
        path: '/coin/symbol',
        component: './Coin/symbol',
      },
      {
        name: 'thrend',
        path: '/coin/thrend',
        component: './Coin/thrend',
      },

      {
        name: 'price',
        path: '/coin/price',
        component: './Coin/price',
      },
      {
        name: 'exchange',
        path: '/coin/exchange',
        component: './Coin/exchange',
      },
    ],
  },

  {
    path: '/setting',
    name: 'setting',
    icon: 'setting',
    routes: [
      {
        name: 'systemuser',
        path: '/setting/systemuser',
        component: './Setting/systemuser',
      },
      {
        name: 'role',
        path: '/setting/role',
        component: './Setting/role',
      },
      {
        name: 'config',
        path: '/setting/config',
        component: './Setting/config',
      },
      {
        name: 'privilege',
        path: '/setting/privilege',
        component: './Setting/privilege',
      },

      {
        name: 'task',
        path: '/setting/task',
        component: './Setting/task',
      },
    ],
  },

  {
    path: '/system/user/',
    layout: false,
    routes: [
      {
        path: '/system/user/login',
        layout: false,
        name: 'login',
        component: './SystemUser/login',
      },
    ],
  },

  {
    path: '*',
    layout: false,
    component: './404',
  },
];
