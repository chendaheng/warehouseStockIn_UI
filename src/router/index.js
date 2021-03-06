import Config from '../config/index';

// -------------------------------------------- 为模版原版代码 --------------------------------------------
const Login = r => require.ensure([], () => r(require('../page/user/login')), 'login');
const Layout = r => require.ensure([], () => r(require('../page/layout')), 'layout');

// 快速入门
const Quick = r => require.ensure([], () => r(require('../page/quick/quick')), 'quick');
// 基础服务 -- 三级菜单 -- 文章管理
const Article = r => require.ensure([], () => r(require('../page/base/thrmenu/article')), 'article');
// 基础服务 -- 三级菜单 -- 评论管理
const Comment = r => require.ensure([], () => r(require('../page/base/thrmenu/comment')), 'comment');
// 基础服务 -- 三级菜单 -- 用户留存
const Left = r => require.ensure([], () => r(require('../page/base/thrmenu/left')), 'left');
// 基础服务 -- 三级菜单 -- 流失用户
const Lost = r => require.ensure([], () => r(require('../page/base/thrmenu/lost')), 'lost');

// 用户中心 -- 用户管理
const User = r => require.ensure([], () => r(require('../page/user/user')), 'user');

// 基础服务 -- 三级菜单
const thrmenuNavbar = [{
  title: '文章管理',
  index: '/thrmenu/article'
}, {
  title: '评论管理',
  index: '/thrmenu/comment'
}, {
  title: '用户留存',
  index: '/thrmenu/left'
}, {
  title: '流失用户',
  index: '/thrmenu/lost'
}];

// -------------------------------------------- 为用户新增代码 --------------------------------------------
// 入库计划 -- 入库计划画面
const StockInPlan = r => require.ensure([], () => r(require('../page/StockIn/StockInPlan')), 'StockInPlan');
// 入库模块 -- 收货画面
const StockInReceive = r => require.ensure([], () => r(require('../page/StockIn/StockInReceive')), 'StockInReceive');
// 入库模块 -- 收获检验任务列表
const StockInTestList = r => require.ensure([], () => r(require('../page/StockIn/StockInTestList')), 'StockInTestList');
// 入库模块 -- 收货检验画面
const StockInTest = r => require.ensure([], () => r(require('../page/StockIn/StockInTest')), 'StockInTest');
// 入库模块 -- 采购订单入库
const StockInPurchase = r => require.ensure([], () => r(require('../page/StockIn/StockInPurchase')), 'StockInPurchase');
// 入库模块 -- 其他入库
const StockInOther = r => require.ensure([], () => r(require('../page/StockIn/StockInOther')), 'StockInOther');
// 入库模块 -- 入库列表
const StockInList = r => require.ensure([], () => r(require('../page/StockIn/StockInList')), 'StockInList');
// 入库模块 -- 非计划收货
const StockInOutPlan = r => require.ensure([], () => r(require('../page/StockIn/StockInOutPlan')), 'StockInOutPlan');
// 入库模块 -- 入库上架
const StockInShelf = r => require.ensure([], () => r(require('../page/StockIn/StockInShelf')), 'StockInShelf');
// -------------------------------------------- 路由配置部分 --------------------------------------------
export default [{
  path: Config.route.login,
  name: 'Login',
  component: Login
}, {
  path: '/',
  name: 'Layout',
  component: Layout,
  children: [{ // 快速入门
    path: '/quick',
    name: 'Quick',
    component: Quick,
    meta: {
      bcrumd: ['快速入门']
    }
  }, { // 基础服务 -- 三级菜单 -- 文章管理
    path: '/thrmenu/article',
    name: 'Article',
    component: Article,
    meta: {
      activePath: '/thrmenu/article',
      bcrumd: ['基础服务', '三级菜单', '文章管理'],
      navbar: thrmenuNavbar
    }
  }, { // 基础服务 -- 三级菜单 -- 评论管理
    path: '/thrmenu/comment',
    name: 'Comment',
    component: Comment,
    meta: {
      activePath: '/thrmenu/article',
      bcrumd: ['基础服务', '三级菜单', '评论管理'],
      navbar: thrmenuNavbar
    }
  }, { // 基础服务 -- 三级菜单 -- 用户留存
    path: '/thrmenu/left',
    name: 'Left',
    component: Left,
    meta: {
      activePath: '/thrmenu/article',
      bcrumd: ['基础服务', '三级菜单', '用户留存'],
      navbar: thrmenuNavbar
    }
  }, { // 基础服务 -- 三级菜单 -- 流失用户
    path: '/thrmenu/lost',
    name: 'Lost',
    component: Lost,
    meta: {
      activePath: '/thrmenu/article',
      bcrumd: ['基础服务', '三级菜单', '流失用户'],
      navbar: thrmenuNavbar
    }
  }, { // 用户中心 -- 用户管理
    path: '/user',
    name: 'User',
    component: User,
    meta: {
      bcrumd: ['用户中心', '用户管理']
    }
  }, { // 入库计划画面
    path: '/stockin/stockinplan',
    name: 'StockInPlan',
    component: StockInPlan,
    meta: {
      bcrumd: ['入库', '入库计划画面']
    }
  }, { // 收货画面
    path: '/stockin/stockinreceive',
    name: 'StockInReceive',
    component: StockInReceive,
    meta: {
      bcrumd: ['入库', '收获画面'],
    }
  }, { // 收货检验任务列表
    path: '/stockin/stockintestlist',
    name: 'StockInTestList',
    component: StockInTestList,
    meta: {
      bcrumd: ['入库', '收货检验任务列表'],
    }
  }, { // 收货检验画面
    path: '/stockin/stockintest',
    name: 'StockInTest',
    component: StockInTest,
    meta: {
      bcrumd: ['入库', '收货检验画面'],
    }
  }, { // 采购订单入库
    path: '/stockin/stockinpurchase',
    name: 'StockInPurchase',
    component: StockInPurchase,
    meta: {
      bcrumd: ['入库', '采购订单入库'],
    }
  }, { // 其他入库
    path: '/stockin/stockinother',
    name: 'StockInOther',
    component: StockInOther,
    meta: {
      bcrumd: ['入库', '其他入库'],
    }
  },{ // 非计划收货
    path: '/stockin/stockinoutplan',
    name: 'StockInOutPlan',
    component: StockInOutPlan,
    meta: {
      bcrumd: ['入库', '非计划收货'],
    }
  },{ // 上架
    path: '/stockin/stockinshelf',
    name: 'StockInShelf',
    component: StockInShelf,
    meta: {
      bcrumd: ['入库', '入库上架'],
    }
  },{ // 入库列表
    path: '/stockin/stockinlist',
    name: 'StockInList',
    component: StockInList,
    meta: {
      bcrumd: ['入库', '入库列表'],
    }
  }
]
}, {
  path: '*',
  redirect: Config.route.login,
  name: 'Login',
  component: Login
}]
