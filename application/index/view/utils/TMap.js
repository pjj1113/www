function getkeyMapByModuleType(topType, type) {
  return keyMap[topType][type]
}

var keyMap = {
  'job': {
    'basic': {
      name: '名称',
      master: {
        name: '河长',
        tel: '手机'
      },
      // 流域
      startStation: '河源位置',
      endStation: '河口位置',
      area: '面积',
      population: '流域人口',
      organ: '负责单位',
      mark: '备注',

      // 河流
      alias: '别名',
      basin: '流域',
      drainage: '水系',
      pRiver: '上级河流',
      riverLevel: '河流级别',
      administrativeDivis: '所属行政区划',
      riverLength: '河流长度',
      // startStation: '江西省寻邬县桠髻钵山',
      // endStation: '狮子洋',
      startLnglat: '起点经纬度',
      startPosition: '起点位置',
      centerLnglat: '中心经纬度',
      endLnglat: '终点经纬度',
      endPosition: '终点位置',
      basinArea: '流域面积',
      // population: '9000万',
      rainArea: '集雨面积',
      // organ: '东江流域局',
      // mark: '这个用mock构造的数据',

      // 红线
      shoreType: '岸别',
    },
    'project': {
      name: '名称',
      master: {
        name: '河长',
        tel: '手机'
      },
      //水库
      organ: '管理单位A',
      address: '地址',
      completionDate: '建成日期',
      engineeringGrade: '工程等别',
      levelDatum: '水准基面',
      projectRegistration: '工程登记',
      majorFunction: '主要功能',
      manageArea: '管理保护范围',

      //堤坝
      level: '级别',
      seismicIntensity: '地震烈度',
      // levelDatum: '水准基面这个不甚了解',
      mark: '备注',
    },
    'monitor': {
      name: '名称',
      stationName: '测站名称',
      riverName: '河流名称',
      drainageName: '水系名称',
      basinName: '流域名称',
      // lnglat: '114.23,31.143',
      stationAddress: '站址',
      administrativeDivis: '行政区划',

      floodLevel: '报汛等级',
      completionDate: '建站年月',
      initialStageDate: '始报年月',
      organ: '管理单位',
      stationShoreType: '测站岸别',
      stationPosition: '测站方位',
      stationType: '站类',
      earlyWarningLevel: '预警水位',
      earlyWarningFlow: '预警流量',
      mark: '备注',

      earlyWarningRainfall: '预警降雨量',

      targetWaterQuality: '目标水质',
    },
    'video': {
      name: '名称',
      stationName: '测站名称',
      riverName: '河流名称',
      drainageName: '水系名称',
      basinName: '流域名称',
      // lnglat: '114.23,31.143',
      stationAddress: '站址',
      administrativeDivis: '行政区划',

      organ: '管理单位',
      stationType: '站类',
      videoUrl: true
    },
    'public': {
      // name: '名称'
      stationName: '测站名称',
      riverName: '河流名称',
      drainageName: '水系名称',
      basinName: '流域名称',
      // lnglat: '114.23,31.143',
      stationAddress: '站址',
      administrativeDivis: '行政区划',

      organ: '管理单位',
      stationType: '站类',
      mark: '备注',
      imgUrl: true
    }
  },
  'monitor': {
    'quality': {
      time: '监测时间',
      currentQuality: '当前水质类别',
      targetQuality: '目标水质类别',
      achieve: '是否达标',
      widthCharts: true
    },
    'water': {
      time: '监测时间',
      level: '监测水位（m）',
      flow: '监测流量（m³/s）',
      widthCharts: true
    },
    'rain': {
      time: '监测时间',
      rainfall: '监测降雨量（毫米mm）',
      widthCharts: true
    },
    'video': {
      isVideo: true,
      videoUrl: true
    }
  },
  'statistics': {
    'patrol': {
      name: '行政区划',
      patrolNum: '巡河次数（次）',
      mileage: '巡河里程（km）',
      duration: '巡河时长（h）',
      problemNum: '巡河问题数（个）',
      mileageDensity: '问题里程密度（个/km）',
      durationDensity: '问题时长密度（个/h）',
    },
    'problem': {
      name: '行政区划',
      num: '问题数（个）',
      complete: '办结问题数据（个）',
      completeRate: '办结率（百分比）',
    }
  }
}
var T
var map
class TMap {
  // 构造
  constructor(el, obj) {
    T = obj
    // this.lng = 114.40 115.371687,32.053385
    // this.lat = 23.09
    this.lng =  115.65410189682005
    this.lat = 32.16888495787368
    this.zoom = 10
    // this.map = new T.Map(el);
    // var imageURL = "http://t0.tianditu.gov.cn/img_w/wmts?" +
    //     "SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=img&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles" +
    //     "&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=ae735d13cbec178839eb32925ca76e7c";
    // //创建自定义图层对象
    // var lay = new T.TileLayer(imageURL, {minZoom: 1, maxZoom: 18});
    // //将图层增加到地图上
    // this.map.addLayer(lay);

    const imageURL = "http://t0.tianditu.gov.cn/img_w/wmts?" +
      "SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=img&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles" +
      "&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}" +
      "&tk=ae735d13cbec178839eb32925ca76e7c";
    const imageURLT = "http://t0.tianditu.gov.cn/cia_w/wmts?" +
      "SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=cia&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles" +
      "&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}" +
      "&tk=ae735d13cbec178839eb32925ca76e7c";
    const lay = new T.TileLayer(imageURL, { minZoom: 6, maxZoom: 18 });
    const lay2 = new T.TileLayer(imageURLT, { minZoom: 6, maxZoom: 18 });
    const config = { layers: [lay, lay2] };
    this.map = new T.Map(el, config);



    this.map.centerAndZoom(new T.LngLat(this.lng, this.lat), this.zoom);
    // 用于存放当前弹窗对象的数组
    this.currentInfoWinArr = []
    map = this.map

    map.addEventListener("zoomend", this.mapZoomend);
    map.addEventListener("addoverlay", this.mapAddoverlay);
  }
  mapZoomend(type, target) {
    this.zoom = map.getZoom()
    var overlays = map.getOverlays()
    for (var i in overlays) {
      var overlay = overlays[i]
      var overlayType = overlay.getType()
      if (overlayType === 2) {
        var icon = overlay.getIcon()
        var x = 20,
          y = 20
        if (this.zoom > 12) {
          x = 32
          y = 32
        } else if (this.zoom <= 10) {
          x = 10
          y = 10
        }
        // 设置大图标
        icon.setIconSize(new T.Point(x, y))
      }
    }
  }
  mapAddoverlay(param) {
    var type = param.type
    var target = param.target
    var addoverlay = param.addoverlay
  }
  addMapControl(arr) {
    if (arr.indexOf('mapType') !== -1) {
      //创建对象
      // var ctrl = new T.Control.MapType();
      // //添加控件
      // map.addControl(ctrl);
    }
    if (arr.indexOf('zoom') !== -1) {
      //创建缩放平移控件对象
      var control = new T.Control.Zoom();
      //添加缩放平移控件
      map.addControl(control);
    }

    if (arr.indexOf('scale') !== -1) {
      //创建比例尺控件对象
      var scale = new T.Control.Scale();
      //添加比例尺控件
      map.addControl(scale);
    }
  }
  // 清除覆盖物
  clearOverLays() {
    map.clearOverLays();
  }

  removeOverLay(overLay) {
    map.removeOverLay(overLay);
  }

  //创建坐标点集合
  buildPoints(list) {
    var points = [];
    for (var i = 0; i < list.length; i++) {
      var lnglatStr = list[i]
      var lnglat = lnglatStr.split(',')
      points.push(new T.LngLat(lnglat[0], lnglat[1]));
    }
    return points
  }
  // 创建坐标点
  buildPoint(lnglatStr) {
    var lnglat = lnglatStr.split(',')
    var point = new T.LngLat(lnglat[0], lnglat[1])
    return point
  }

  // 添加面
  addPolygon(points, data, options) {
    // 没有点时直接返回
    if (!points || !points.length) {
      return
    }
    //创建面对象
    var polygon = new T.Polygon(points, options);
    // 添加面点击事件
    var that = this
    polygon.addEventListener("click", function (e) {
      that.polyClickHandle(e, data)
    });
    //向地图上添加面
    map.addOverLay(polygon);
    return polygon
  }
  // 添加线
  addPolyline(points, data, options) {
    // 没有点时直接返回
    if (!points || !points.length) {
      return
    }
    //创建线对象
    var line = new T.Polyline(points, options);
    // 添加线点击事件
    var that = this
    line.addEventListener("click", function (e) {
      that.polyClickHandle(e, data)
    });
    //向地图上添加线
    map.addOverLay(line);

    return line
  }
  centerAndZoom(lng, lat, zoom) {
    if (!zoom) {
      zoom = map.getZoom()
    }
    this.map.centerAndZoom(new T.LngLat(lng, lat), zoom);
  }
  // 覆盖物点击事件
  polyClickHandle(e, data) {
    var lngLat = e.lnglat
    if (lngLat) {
      var lng = lngLat.lng
      var lat = lngLat.lat
    }
    // 先判断是否已经有弹窗，有的话，先清除弹窗
    if (this.currentInfoWinArr.length) {
      map.removeOverLay(this.currentInfoWinArr[0], this.addInfoWindow(lng, lat, data));
      this.currentInfoWinArr.splice(0, 1)
    } else {
      this.addInfoWindow(lng, lat, data)
    }
  }
  // 添加信息窗口
  addInfoWindow(lng, lat, data) {
    var lnglat = new T.LngLat(lng, lat);
    var infoWin = new T.InfoWindow();
    // 保存信息弹窗到弹窗数组中，用于清除弹窗覆盖物使用
    this.currentInfoWinArr.push(infoWin)
    infoWin.setLngLat(lnglat);
    var content = this.buildInfoWinContent(data)
    //设置信息窗口要显示的内容
    infoWin.setContent(content);
    //向地图上添加信息窗口
    map.addOverLay(infoWin);
  }

  // 添加标注-打点（标记点位）
  addMarker(point, data, iconUrl) {
    //创建图片对象
    this.map.centerAndZoom(point);

    var marker
    var options = {}
    if (iconUrl) {
      var icon = new T.Icon({
        iconUrl: `/assets/szxc/assets/${this.topModuleType}/${this.moduleType}/${iconUrl}.png`
      });
      options = {
        icon: icon
      }
    }

    //创建标注对象
    marker = new T.Marker(point, options);

    // 添加标注点击事件
    var that = this
    marker.addEventListener("click", function (e) {
      console.log(e, data, '打点')
      that.polyClickHandle(e, data)
    });

    //向地图上添加标注
    map.addOverLay(marker);
    return marker
  }

   // 构建弹窗内容
   buildInfoWinContent(data) {
    var html = ''
    if (data.isVideo) {
      var val = data.videoUrl
      this.currentMediaType = 'video'
      // this.videoPath = require(`@/static/${val}`)
      // var videoPath = require(`@/static/${val}`)
      // var zoomImgPath = require(`@/assets/global/zoom.png`)
      // var nailImgPath = require(`@/assets/global/nail.png`)
      // 暂时隐藏视频
      html += `<div><video style="width:300px;height:150px;" controls="controls" autoplay src=${videoPath}></video></div>`
      html += `<div style="text-align:right;overflow:hidden;"><div style="display: flex;align-items: center;float:right;"><img style="cursor:pointer;" title="videoPath" id="zoomBtn" src=${zoomImgPath}><img style="cursor:pointer;" title="videoPath" id="nailBtn" src=${nailImgPath}></div></div>`
    } else if (data.widthLableAndCharts) {

      this.currentMediaType = 'charts'
      // 记录标注点的id，用于获取一周的数据，用于图形展示
      this.dataForCharts = Object.assign({}, data)

      for (var key in data) {
        var val = data[key]
        // 使用data的moduleType属性获取模块类型
        var keyMap = getkeyMapByModuleType(this.topModuleType, data.moduleType)
        if (keyMap && keyMap[key]) {
          html += `<div><strong>${keyMap[key]}:</strong><span>${val}</span>&nbsp;&nbsp;&nbsp;&nbsp;<a title='${key}' class='viewBtn' href='javascript:void(0);'>查看</a></div>`
        }
      }

    } else {

      for (var key in data) {
        var val = data[key]
        // 使用data的moduleType属性获取模块类型
        var keyMap = getkeyMapByModuleType(this.topModuleType, data.moduleType)
        if (keyMap && keyMap[key]) {
          if (typeof val == "object" && Object.prototype.toString.call(val).toLowerCase() == "[object object]" && !val.length) {
            var subKeyMap = keyMap[key]
            var subData = val
            for (var subKey in subData) {
              var subVal = subData[subKey]
              if (subKeyMap && subKeyMap[subKey]) {
                html += `<div><strong>${subKeyMap[subKey]}:</strong><span>${subVal}</span></div>`
              }
            }
          } else {
            if (key === 'videoUrl') {
              this.currentMediaType = 'video'
              // this.videoPath = require(`@/static/${val}`)
              // var videoPath = require(`@/static/${val}`)
              // var zoomImgPath = require(`@/assets/global/zoom.png`)
              // var nailImgPath = require(`@/assets/global/nail.png`)
              html += `<div style="text-align:right;overflow:hidden;"><div style="display: flex;align-items: center;float:right;"><span style="cursor:pointer;text-decoration:underline;" title="videoPath" id="zoomBtn">查看</span></div></div>`
            } else if (key === 'imgUrl') {
              this.currentMediaType = 'img'
              // this.imgPath = require(`@/static/${val}`)
              // var imgPath = require(`@/static/${val}`)
              html += `<div style="text-align:right;overflow:hidden;"><div style="display: flex;align-items: center;float:right;"><span style="cursor:pointer;text-decoration:underline;" title="videoPath" id="zoomBtn">查看</span></div></div>`
            } else if (key === 'widthCharts') {
              this.currentMediaType = 'charts'

              // 记录标注点的id，用于获取一周的数据，用于图形展示
              this.dataForCharts = Object.assign({}, data)

              html += `<div style="text-align:right;overflow:hidden;"><div style="display: flex;align-items: center;float:right;"><span style="cursor:pointer;text-decoration:underline;" title="videoPath" id="zoomBtn">趋势图</span></div></div>`
            } else {
              html += `<div><strong>${keyMap[key]}:</strong><span>${val}</span></div>`
            }
          }
        }
      }
    }
    var that = this
    that.vm.$nextTick(() => {

      // 订住按钮添加点击事件
      var nailDom = document.getElementById('nailBtn')
      if (nailDom) {
        nailDom.addEventListener('click', function () {
          if (that.currentMediaType === 'video' && that.videoPath) {
            that.vm.nailVideo(that.videoPath)
          } else if (that.currentMediaType === 'img' && that.imgPath) {
            that.vm.nailImg(that.imgPath)
          }
        })
      }

      // 缩放按钮添加点击事件
      var zoomDom = document.getElementById('zoomBtn')
      if (zoomDom) {
        zoomDom.addEventListener('click', function (e) {
          if (that.currentMediaType === 'video' && that.videoPath) {
            that.vm.zoomVideo(that.videoPath)
          } else if (that.currentMediaType === 'img' && that.imgPath) {
            that.vm.zoomImg(that.imgPath)
          } else if (that.currentMediaType === 'charts' && that.dataForCharts) {
            that.vm.zoomCharts(that.dataForCharts, e)
          }
        })
      }

      // // 缩放按钮添加点击事件
      // var viewDoms = document.getElementsByClass('viewBtn')
      // for (var i = 0; i < viewDoms.length; i++) {
      //   var viewDom = viewDoms[i]
      //   if (viewDom) {
      //     viewDom.addEventListener('click', function (e) {
      //       if (that.currentMediaType === 'charts' && that.dataForCharts) {
      //         that.vm.zoomCharts(that.dataForCharts, e)
      //       }
      //     })
      //   }
      // }
    })

    return html
  }
}
// export function TMap() {
//   return TMap
// }
(function(){
  window.TMap = TMap
})()