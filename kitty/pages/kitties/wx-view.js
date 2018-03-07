var GetList = function (that) {
  that.setData({
    hidden: false
  });
  wx.request({
    url: "https://stationwu.cn/Market?size=15&page=" + that.data.page,
    success: function (res) {
      //console.info(that.data.list);

      for (var i = res.data.length -1 ; i >=0 ; i--) {
        that.data.market.push(res.data[i]);
      }
      that.setData({
        market: that.data.market
      });
    }
  });
}

Page({
  data: {
    market: [],
    scrollTop: 0,
    scrollHeight: 0,
    page: 0
  },
  onLoad: function () {
    //  这里要非常注意，微信的scroll-view必须要设置高度才能监听滚动事件，所以，需要在页面的onLoad事件中给scroll-view的高度赋值
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        console.info(res.windowHeight);
        that.setData({
          scrollHeight: res.windowHeight
        });
      }
    });
  },
  onShow: function () {
    //  在页面展示之后先获取一次数据
    var that = this;
    that.setData({
      market: [],
      page: 0
    });
    GetList(that);
  },
  bindDownLoad: function () {
    //  该方法绑定了页面滑动到底部的事件
    var that = this;
    GetList(that);
  },
  scroll: function (event) {
    //  该方法绑定了页面滚动时的事件，我这里记录了当前的position.y的值,为了请求数据之后把页面定位到这里来。
    this.setData({
      scrollTop: event.detail.scrollTop
    });
  },
  searchScrollLower: function () {
    let that = this;
    that.setData({
      page: that.data.page + 1
    });
    GetList(that);
  },
  refresh: function (event) {
    //  该方法绑定了页面滑动到顶部的事件，然后做上拉刷新
    page = 0;
    this.setData({
      list: [],
      scrollTop: 0
    });
    GetList(this)
  },
  imageTap: function (e) {
    this.setData({
      market: [],
      page: 0
    });
    wx.navigateTo({
      url: "../info/info?id=" + e.target.dataset.id
    });
  }
})