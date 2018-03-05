# cp-client-pc

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install or yarn install

# serve with hot reload at localhost:8080
npm run dev or yarn dev 

# build for production with minification
npm run build or yarn build

# build for production and view the bundle analyzer report
npm run build --report

# 项目目录
.
├── README.md  // 说明文档
├── app.js
├── build
│   ├── build.js
│   ├── check-versions.js
│   ├── createStream.js
│   ├── logo.png
│   ├── utils.js
│   ├── vue-loader.conf.js
│   ├── webpack.base.conf.js
│   ├── webpack.dev.conf.js
│   └── webpack.prod.conf.js
├── config
│   ├── classify.js
│   ├── dev.env.js
│   ├── index.js
│   └── prod.env.js
├── dist
│   ├── index.html
│   └── static
│       ├── css
│       │   ├── app.5038788a24de33fc3d35ccda6acf13a9.css
│       │   └── app.5038788a24de33fc3d35ccda6acf13a9.css.gz
│       ├── fonts
│       │   └── element-icons.6f0a763.ttf
│       ├── img
│       │   ├── AGgame.67b698b.png
│       │   ├── MGgame.8a3568a.png
│       │   ├── adrid.441f0be.png
│       │   ├── bg-ag.f57dc70.png
│       │   ├── cpgame.18756d7.png
│       │   ├── down.18b3178.png
│       │   ├── ico-airship-s.4ab2570.png
│       │   ├── ico-cqssc-s.b78b4ff.png
│       │   ├── ico-jsks-s.50248bd.png
│       │   ├── ico-nav-jsks.04d955c.png
│       │   ├── ico-nav-luckyship.2960149.png
│       │   ├── ico-nav-pk10.53219b3.png
│       │   ├── ico-nav-six.3d82be5.png
│       │   ├── ico-nav-ssc.0600b93.png
│       │   ├── ico-nav-ten.b7bff98.png
│       │   ├── ico-nav-xync.fee1dc5.png
│       │   ├── iosapp.679e545.png
│       │   ├── mobile-left.5621ba0.png
│       │   └── mobile-right-txt.b89c67f.png
│       └── js
│           ├── 0.30fd5f96fd9073554462.js
│           ├── 1.9389d4d00f23fb73c602.js
│           ├── 1.9389d4d00f23fb73c602.js.gz
│           ├── 10.41694cb678e3f4fb3d43.js
│           ├── 11.7fdb8bc89bf228c154a7.js
│           ├── 12.9deec93db5e74acd4034.js
│           ├── 13.a80ceb2cc01bd50af4ff.js
│           ├── 14.73f184ced336d4af445d.js
│           ├── 15.fc194a69ec3cd1ed9b89.js
│           ├── 16.4f15334c10d9a43845e5.js
│           ├── 17.ca1d9f28086c82c65479.js
│           ├── 18.5f1fa9c62c3a45647b4c.js
│           ├── 19.cfdc8f19bb97051eb8df.js
│           ├── 2.91492554df78540d746f.js
│           ├── 2.91492554df78540d746f.js.gz
│           ├── 20.27182d73b8739e1abb77.js
│           ├── 21.56282fdb4c952f48979c.js
│           ├── 22.7e7e7558fab3caf4a91d.js
│           ├── 23.8877bd08d4bc9b302378.js
│           ├── 24.adc637bbe78ad6323378.js
│           ├── 25.10b86f93fd1f0a490679.js
│           ├── 26.ea8056bbe3caa765edc8.js
│           ├── 27.1373f31310a06541d956.js
│           ├── 28.85e493b2e1291f02f878.js
│           ├── 29.4ec370e29de1088ca281.js
│           ├── 3.84d6186e17b22e8fc6c5.js
│           ├── 4.5d3fcfd58bd73987c732.js
│           ├── 5.ccc15430b00f0edf1027.js
│           ├── 6.1b65795977b97e9d7104.js
│           ├── 7.93b2922cc1001ce499fa.js
│           ├── 7.93b2922cc1001ce499fa.js.gz
│           ├── 8.a8155602df2a36eb8723.js
│           ├── 9.e861043e80a637f567bb.js
│           ├── app.610cf337e0e82f5b1110.js
│           ├── app.610cf337e0e82f5b1110.js.gz
│           ├── manifest.10c5972fcc40ccad72e8.js
│           ├── vendor.af99e74909d8d7bfe656.js
│           └── vendor.af99e74909d8d7bfe656.js.gz
├── index.html
├── package.json
├── src
│   ├── App.vue
│   ├── api
│   │   ├── convert-date-and-timestamp.js
│   │   └── index.js  // 所有的api 存放位置
│   ├── assets
│   │   ├── images    // 图片存放的位置
│   │   │   ├── ct
│   │   │   └── public
│   │   └── styles   // 样式存放
│   │       ├── alone
│   │       ├── ct
│   │       ├── mixins.scss
│   │       ├── public
│   │       └── variable.scss
│   ├── components      // 组件
│   │   ├── Game        // 跟投注相关的组件
│   │   │   ├── dewdrop-list.vue // 露珠组件
│   │   │   ├── dragon-list.vue  // 长龙组件
│   │   │   ├── game-header.vue
│   │   │   ├── games-check-group.vue // 投注区 复选类型的组件（连码/二肖连之类的）
│   │   │   ├── games-nav.vue        // 投注区的一级导航(两面盘/数字盘/...)
│   │   │   ├── games-sub-nav.vue    // 投注区的二级导航（只有六合彩有）
│   │   │   ├── input-odds.vue       // 投注区的输入框（）
│   │   │   ├── odds-form.vue        // 投注区的预设金额和提交等等...
│   │   │   ├── submit-dialog.vue    // 投注区的投注总汇弹出框
│   │   │   └── unset-order.vue      // 悬挂右侧的 未结订单弹出框
│   │   ├── Header
│   │   │   ├── agreement.vue       // 同意和不同意 协议
│   │   │   ├── header-form.vue     // 头部的登录和注册
│   │   │   ├── header-menu.vue     // 头部展示的导航部分
│   │   │   └── header.vue          // 头部的所有（包括所有逻辑）
│   │   ├── MoneyMan
│   │   │   ├── bank-money-input.vue // 资金管理的 input输入框
│   │   │   ├── bank-money-list.vue  // 资金管理/充值/金额展示列表（101 201 ...）
│   │   │   ├── menu.vue             // （充值/提现/额度转换）导航
│   │   │   └── money-paytype-list.vue // 充值方式的菜单(在线银行/银行线下/支付宝线上/....) 
│   │   ├── footer.vue                // 页脚（包括页脚公告）
│   │   ├── index-carousel.vue        // 首页的轮播图
│   │   ├── login-update-form.vue     // 密码修改弹出框
│   │   ├── notify-list.vue           // 优惠发现导航/ 系统公告
│   │   ├── pay-update-form.vue       // 修改支付密码弹出框
│   │   ├── register-form.vue         // 注册弹出框
│   │   ├── spinner-loading.vue      // loading效果
│   │   ├── spinner.vue              // loading 效果
│   │   ├── tutorial-dialog.vue      // App下载 /ios教程或者andriod教程弹出框
│   │   ├── unset-dialog.vue         // 未结 右侧弹出框
│   │   └── user-header.vue          // 用户的个人信息
│   ├── config                       // 静态的配置文件（方便修改）
│   │   ├── dewdrop.conf.js          // 露珠相关
│   │   ├── figlet.js                
│   │   ├── header.conf.js          // 头部相关
│   │   ├── history.conf.js         // 开奖走势相关
│   │   ├── index.js               // 接口地址
│   │   ├── lottery.conf.js        // 投注区相关
│   │   ├── money.conf.js         // 资金管理相关
│   │   ├── nav.conf.js           // 投注区的所有游戏彩种的导航
│   │   └── roundnumber.conf.js  // 六合彩 部分号码的静态文件
│   ├── elemet.io.conf           // element-ui 框架
│   │   └── index.js 
│   ├── main.js                 // 入口文件
│   ├── mixins                  // vue实例內的公共函数
│   │   ├── filters.js
│   │   └── input.js
│   ├── pages
│   │   ├── BalanceRecord      // 充值记录
│   │   │   └── index.vue
│   │   ├── Bank               // 银行卡管理
│   │   │   └── index.vue
│   │   ├── Betting           // 下注记录
│   │   │   └── index.vue
│   │   ├── Games            // 投注区 （每个文件对应当前彩种的样式【仅仅是样式展示】）
│   │   │   ├── cqssc.vue   
│   │   │   ├── dice.vue
│   │   │   ├── index.vue    // 这个文件包含了投注区所有的逻辑处理
│   │   │   ├── klsf.vue
│   │   │   ├── marksix
│   │   │   ├── marksix.vue
│   │   │   ├── pcegg.vue
│   │   │   ├── pk10.vue
│   │   │   ├── speed-ship.vue
│   │   │   ├── xyft.vue
│   │   │   └── xync.vue
│   │   ├── History         // 开奖走势
│   │   │   ├── index.vue
│   │   │   ├── result-area-number-style-picker.vue
│   │   │   └── result-area.vue
│   │   ├── Index           // 首页
│   │   │   ├── about.vue
│   │   │   ├── join.vue
│   │   │   ├── media.vue
│   │   │   ├── notify.vue
│   │   │   └── question.vue
│   │   ├── MoneyMag      // 资金管理
│   │   │   ├── money_recharge.vue // 
│   │   │   ├── money_recharge_banks.vue // 银行在线充值
│   │   │   ├── money_recharge_offline.vue // 线下充值
│   │   │   ├── money_recharge_route.vue // 充值的路由入口
│   │   │   ├── money_route.vue  // 路由入口
│   │   │   ├── money_transform.vue // 额度转化
│   │   │   └── money_withdrawal.vue // 提现
│   │   ├── Rules
│   │   │   └── index.vue // 规则
│   │   ├── download.vue  // App下载
│   │   ├── home-route.vue // 投注区的左侧菜单导航和路由
│   │   ├── index.vue      // 首页的整体页面
│   │   └── userset.vue   // 未结订单弹出框整体页面
│   ├── router
│   │   ├── Games        // 投注区的路由
│   │   │   └── index.js
│   │   ├── MoneyMag    // 资金管理的路由
│   │   │   └── index.js
│   │   └── index.js   // 所有的路由入口
│   ├── store         // vuex
│   │   ├── index.js  // 入口
│   │   ├── modules  
│   │   │   ├── games.js // 投注区部分
│   │   │   ├── money.js // 资金管理
│   │   │   └── user.js  // 操作用户相关
│   │   └── mutation-types.js
│   └── utils       // 公共的函数
│       └── index.js
├── static
├── temp
│   └── temp.t
├── template
│   └── temp.sty
└── yarn.lock
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
