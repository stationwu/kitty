//index.js
//获取应用实例
const app = getApp()

var loginBackend = function (that,code) {
  wx.request({
    url: "https://stationwu.cn/User/" + code,
    success: function (res) {
      //console.info(that.data.list);
      var list = [];
      for (var i = 0; i < res.data.kitties.length; i++) {
        list.push(res.data.kitties[i]);
      }
      wx.setStorageSync('openid', res.data.openCode);
      //page++;
      that.setData({
        kitties: list,
        wallet: res.data.wallet,
        hidden: true,
        isFirst: false
      });
    }
  });
}

var getLatestInfo = function (that, code) {
  wx.request({
    url: "https://stationwu.cn/UserInfo/"+code,
    method: "GET",
    success: function (res) {
      //console.info(that.data.list);
      var list = [];
      for (var i = 0; i < res.data.kitties.length; i++) {
        list.push(res.data.kitties[i]);
      }
      wx.setStorageSync('openid', res.data.openCode);
      //page++;
      that.setData({
        kitties: list,
        wallet: res.data.wallet,
        hidden: true,
        isFirst: false
      });
    }
  });
}

Page({
  data: {
    kitties:[],
    wallet:0,
    userInfo: {},
    hasUserInfo: false,
    isFirst:true,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    // 所以此处加入 callback 以防止这种情况
    var that = this;
    wx.getUserInfo({
      success: res => {
        app.globalData.userInfo = res.userInfo
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
        wx.login({
          success: function (res) {
            var code = res.code;
            // --------- 发送凭证 ------------------
            loginBackend(that, code);
          }
        });
      }
    })
  },
  onShow:function(e){
    var that = this;
    if (wx.getStorageSync('openid') !== "" && that.data.isFirst === false ){
      
      that.setData({
        kitties: [],
        wallet: 0
      });
      getLatestInfo(that, wx.getStorageSync('openid') );
    }
  },
  getUserInfo:function(e){
    var that = this;
    wx.getUserInfo({
      success: res => {
        app.globalData.userInfo = res.userInfo
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
        wx.login({
          success: function (res) {
            var code = res.code;
            // --------- 发送凭证 ------------------
            loginBackend(that, code);
          }
        });
      }
    })
  },
  imageTap: function(e){
    wx.navigateTo({
      url: "../detail/detail?id=" + e.target.dataset.id
    });
  }
})
