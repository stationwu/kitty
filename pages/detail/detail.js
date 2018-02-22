// pages/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:0,
    kitty:{},
    button:"",
    price:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (option) {
    this.setData({
      id: option.id,
    });
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this;
    wx.request({
      url: "https://stationwu.cn/Kitty/" + this.data.id,
      success: function (res) {
        //console.info(that.data.list);
        that.setData({
          kitty: res.data,
          price: res.data.price
        });

        if (res.data.forSale === true){
          that.setData({
            button: "取消挂牌"
          });
        }else{
          that.setData({
            button: "挂牌"
          });
        }
      }
    });
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },

  sale: function(){
    var that = this;
    if (that.data.button === "挂牌"){
      wx.request({
        url: "https://stationwu.cn/Sale?openCode=" + wx.getStorageSync('openid') + "&kittyId=" + this.data.id + "&price=" + that.data.price,
        success: function (res) {
          that.setData({
            button: "取消挂牌"
          });
        }
      });
    }else{
      wx.request({
        url: "https://stationwu.cn/SaleCancel?openCode=" + wx.getStorageSync('openid') + "&kittyId=" + this.data.id,
        success: function (res) {
          that.setData({
            button: "挂牌"
          });
        }
      });
    }
  },
  recover: function(){
    wx.request({
      url: "https://stationwu.cn/Recover?openCode=" + wx.getStorageSync('openid') + "&kittyId=" + this.data.id + "&price=" + this.data.price,
      success: function (res) {
        wx.navigateBack({
          delta: 1
        })
      }
    });
  }
})