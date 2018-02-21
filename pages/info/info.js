// pages/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: 0,
    kitty: {}
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
          kitty: res.data
        });

      }
    });
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  pruchase:function(){
    wx.request({
      url: "https://stationwu.cn/Purchase?openCode=" + wx.getStorageSync('openid') +"&kittyId=" + this.data.id,
      success: function (res) {
        if(res.statusCode === 500){
          wx.showModal({
            content: res.data.message,
            showCancel: false,
            success: function (res) {
              if (res.confirm) {
                console.log('用户点击确定')
              }
            }
          });
        }else{
          wx.navigateBack({
            delta: 1
          })
        }
      }
    });
  }
})