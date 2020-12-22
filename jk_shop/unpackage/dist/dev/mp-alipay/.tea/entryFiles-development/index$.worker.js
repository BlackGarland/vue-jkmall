if(!self.__appxInited) {
self.__appxInited = 1;


require('./config$');


      if( navigator.userAgent && (navigator.userAgent.indexOf('LyraVM') > 0 || navigator.userAgent.indexOf('AlipayIDE') > 0) ) {
        var AFAppX = self.AFAppX.getAppContext ? self.AFAppX.getAppContext().AFAppX : self.AFAppX;
      } else {
        importScripts('https://appx/af-appx.worker.min.js');
        var AFAppX = self.AFAppX;
      }
      self.getCurrentPages = AFAppX.getCurrentPages;
      self.getApp = AFAppX.getApp;
      self.Page = AFAppX.Page;
      self.App = AFAppX.App;
      self.my = AFAppX.bridge || AFAppX.abridge;
      self.abridge = self.my;
      self.Component = AFAppX.WorkerComponent || function(){};
      self.$global = AFAppX.$global;
      self.requirePlugin = AFAppX.requirePlugin;
    

if(AFAppX.registerApp) {
  AFAppX.registerApp({
    appJSON: appXAppJson,
  });
}



function success() {
require('../../app');
require('../../components/uni/uni-badge/uni-badge?hash=ec7c5687c7f2ffa836caf3a93e877914426baff6');
require('../../components/uni/uni-grid/uni-grid?hash=ec7c5687c7f2ffa836caf3a93e877914426baff6');
require('../../components/uni/uni-grid-item/uni-grid-item?hash=ec7c5687c7f2ffa836caf3a93e877914426baff6');
require('../../components/goodlist/goodlist?hash=ec7c5687c7f2ffa836caf3a93e877914426baff6');
require('../../components/uni/uni-list/uni-list?hash=ec7c5687c7f2ffa836caf3a93e877914426baff6');
require('../../components/uni/uni-icons/uni-icons?hash=ec7c5687c7f2ffa836caf3a93e877914426baff6');
require('../../components/uni/uni-list-item/uni-list-item?hash=3fb12b3d25576de1a885bbc0fa3bfd2e48915bb9');
require('../../components/uni/uni-goods-nav/uni-goods-nav?hash=b8e6b2119b1ccaf048d43ce22ce5535c1f2646d7');
require('../../pages/index/index?hash=23d72be0ae58a15eb9b55df3ace728415e27eb78');
require('../../pages/news/news?hash=6beffb741dc6b8d0a099c45e5b8354a7963fad4f');
require('../../pages/member/member?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/cart/cart?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/goods/goods?hash=ede7abb71270c0179b1c1ba153c0d7eb4ee0e65a');
require('../../pages/contact/contact?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/pics/pics?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/newsdetail/newsdetail?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/goodsdetail/goodsdetail?hash=7c6814382b380cf0866c5dee96a711bb3d31c5a5');
}
self.bootstrapApp ? self.bootstrapApp({ success }) : success();
}