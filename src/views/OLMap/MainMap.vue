<template>
  <div class="picture-map2">
    <div id="map2" />
    <AreaHappyPopInfo
      v-if="areaHappyShow"
      :lgtd="popInfo.lgtd"
      :lttd="popInfo.lttd"
      :info="popInfo"
    />
    <!-- <TownOverlay
      v-for="item in townss"
      :key="item.adcd"
      :detail="item"
      :lgtd="item.lgtd"
      :lttd="item.lttd"
    /> -->
  </div>
</template>

<script>
import MapFactory from "./factory/MapFactory";
import mapConfig from "./config/mapConfig";
import BaseVectorLayer from './layers/base/BaseVectorLayer'
import { basicTotalLayer, canalLayer, hillpondLayer, hillpondManageLayer, hillpondWaterLayer, lakeLayer, lakeManageLayer, lakeWaterLayer, orgHighLightLayer, otherwaterLayer, otherwaterManageLayer, otherwaterWaterLayer, pointLayer, reservoirLayer, reservoirManageLayer, reservoirWaterLayer, riverLayer, riverManageLineLayer, riverPointLayer, statisticsLayer } from "./config/layerConfig";
// import AMap from 'AMap'
import DCLayer from "./layers/impl/DCLayer";
import LayerParams from "./common/LayerParams";
import MainShadowLayer from "./layers/imgShade/MainShadowLayer";
import TdtImgClipLayer from './layers/imgShade/TdtImgClipLayer';
import OrgBoundaryLayer from './layers/common/OrgBoundaryLayer'
import moment from "moment";
import StatisticsLayer from './layers/StatisticsLayer'
// import TownOverlay from './overlays/TownOverlay'
import AreaHappyPopInfo from './components/WaterAreaPopInfo'
import BasicTotalLayer from './layers/BasicTotalLayer'
import { getCenter } from 'ol/extent'
import DCWMSLayer from './layers/impl/DCWMSLayer'
import store from "@/store";
import * as LayerEnum from '@/utils/LayerEnum';
import MainMapWMSLayer from './layers/impl/MainMapWMSLayer'
import MainMapWMSWithLinesLayer from './layers/impl/MainMapWMSWithLinesLayer' // 包括水域及其范围线、临水线
import { getFeatures } from './common/common';
import GeoJSON from 'ol/format/GeoJSON';
import { geoserverPath } from './config/geoserverConfig';
import RiverLayer from './layers/impl/RiverLayer';

export default {
  name: "FirstMap",
  components: {  AreaHappyPopInfo },
  provide() {
    return { getMap: this.getMap };
  },
  props: {},
  data() {
    return {
      adcd: store?.state?.userInfo?.adminDivCode || "330182",
      startTime: moment(new Date()).startOf('year').format('YYYY-MM-DD 00:00:00'),
      endTime: moment(new Date()).endOf('year').format('YYYY-MM-DD 23:59:59'),
      eventCompleteStatus: '', // 是否已办结
      willExpireStatus: '', // 是否即将逾期
      expireStatus: '', // 本年逾期
      thisMonthNewStatus: '', // 本年新增
      eventGradeStatus: '', // 定性参数
      eventResponsibleUnitCode: '', // 定责参数
      eventCategoryCode: '', // 左上角事件类型
      // eventSourceDepartCode: '', // 左上角事件区域
      eventSource: '', // 事件来源
      pointAdcd: store?.state?.userInfo?.adminDivCode || "330182", // 左上角事件区域
      curLayer: LayerEnum.RIVER_LAYER, // 当前图层，默认为点位图
      baseLayers: [], // 所有加载的图层
      lgtd: "",
      lttd: "",
      address: "",
      townss: [], // 统计图
      areaHappyShow: false,
      curIndex: 0,
      popInfo: {},
      lineManageShow: false,
      threeLines: [], // 三线
      threeLineLayers: [LayerEnum.RIVER_LAYER, LayerEnum.RESERVOIR_LAYER, LayerEnum.HILLPOND_LAYER, LayerEnum.LAKE_LAYER, LayerEnum.OTHERWATER_LAYER], // 需要加载三线的图层
    };
  },
  watch: {
    currentPage(nval) {
      this.pageChange(nval);
    },
  },
  mounted() {
    this.initMap();
  },
  methods: {
    getMap(callback) {
      const _this = this;
      function getMap() {
        if (_this.map) {
          callback(_this.map);
        } else {
          setTimeout(() => {
            getMap();
          }, 200);
        }
      }
      getMap();
    },
    initMap() {
      mapConfig.target = "map2";
      this.map = MapFactory.createMap(mapConfig);
      // 初始化图层
      this.firstLoad();
    },
    firstLoad() {
      this.layers = {
        mainShadeLayer: new MainShadowLayer(), // 地图下偏移的阴影
        boundary: new OrgBoundaryLayer(), // 边界线
        // orgAdcdWmsLayer: new OrgAdcdWmsLayer(),
        // statisticsLayer: new StatisticsLayer(statisticsLayer), // 统计图
        selectLayer: new BaseVectorLayer(orgHighLightLayer), // 统计图轮播高亮
        basicTotalLayer: new BasicTotalLayer(basicTotalLayer), // 统计图
        pointLayer: new DCLayer(pointLayer), // 点位图
        // lineManageLayer: new MainMapWMSLayer(riverManageLineLayer), // 河道管理范围线
        // [LayerEnum.RIVER_LAYER]: new MainMapWMSLayer(riverLayer), // 河道
        [LayerEnum.RIVER_LAYER]: new RiverLayer(riverLayer),
        [LayerEnum.RESERVOIR_LAYER]: new MainMapWMSWithLinesLayer(reservoirLayer, reservoirManageLayer, reservoirWaterLayer), // 水库
        [LayerEnum.HILLPOND_LAYER]: new MainMapWMSWithLinesLayer(hillpondLayer, hillpondManageLayer, hillpondWaterLayer), // 山塘
        [LayerEnum.LAKE_LAYER]: new MainMapWMSWithLinesLayer(lakeLayer, lakeManageLayer, lakeWaterLayer), // 湖泊
        [LayerEnum.CANAL_LAYER]: new MainMapWMSLayer(canalLayer), // 人工水道
        [LayerEnum.OTHERWATER_LAYER]: new MainMapWMSWithLinesLayer(otherwaterLayer, otherwaterManageLayer, otherwaterWaterLayer), // 其他水域
        [LayerEnum.FINISHED_PROJ]: new DCLayer(), // 完工
        [LayerEnum.BUILDING_PROJ]: new DCLayer(), // 在建
        [LayerEnum.VIDEO_LAYER]: new DCLayer(), // 视频点
        [LayerEnum.SECTION_LAYER]: new DCLayer(), // 水质断面
      };
      // 加载立体感效果的图层
      this.layers.mainShadeLayer.load({
        map: this.map,
        adcd: this.adcd,
      });
      // 加载下级行政区划边界
      this.layers.boundary.load(this.map, this.adcd)
      // 加载下级行政区划边界
      // this.layers.orgAdcdWmsLayer.load(this.map,this.adcd)
      this.initClick();
      // 加载河道管理范围线
      // if (this.lineManageShow) {
      //   this.layers.lineManageLayer.load(new LayerParams({
      //     vm: this,
      //     searchInfo: {}
      //   }))
      // }
      // 初始化加载图层
      this.initLayers(['pointLayer'])
      // 轮播图高亮图层
      this.layers.selectLayer.addLayer(this.map)
      // 监听地图缩放，加载管理范围线
      // this.watchMapZoom()
    },
    // 切换图层
    changeLayer(layerName) {
      if (layerName !== this.curLayer) {
        this.layers[this.curLayer].removeLayer(this.map)
        this.layers[layerName].load(new LayerParams({
          vm: this,
          searchInfo: {}
        }))
        this.curLayer = layerName
      }
    },
    // 监听地图缩放
    // watchMapZoom() {
    //   this.map.getView().on('change:resolution', evt => {
    //     if(this.map.getView().getZoom() > 14) {
    //       if (!this.lineManageShow) { // 如果此时地图上没展示范围线，则加载
    //         this.layers.lineManageLayer.load(new LayerParams({
    //           vm: this,
    //           searchInfo: {}
    //         }))
    //         this.lineManageShow = true
    //       }
    //     } else {
    //       if (this.lineManageShow) {
    //         this.layers.lineManageLayer.removeLayer(this.map, this)
    //         this.lineManageShow = false
    //       }
    //     }
    //   })
    // },
    // 移除轮播
    removeInterval() {
      if (this.interval) {
        this.areaHappyShow = false
        window.clearInterval(this.interval)
        this.interval = null
      }
    },
    // 初始化轮播
    initInterval() {
      this.interval = window.setInterval(() => {
        this.layers.selectLayer.clear()// 高亮
        this.areaHappyShow = false
        const features = this.layers.basicTotalLayer.getSource().getFeatures()
        const curFeature = features[this.curIndex]
        this.layers.selectLayer.addFeatures([curFeature])// 高亮
        let properties = curFeature.getProperties()
        properties.layerid = 'basicTotalLayer'
        properties.lgtd = getCenter(curFeature.getGeometry().getExtent())[0]
        properties.lttd = getCenter(curFeature.getGeometry().getExtent())[1]
        this.popInfo = properties
        this.$nextTick(() => {
          this.areaHappyShow = true
        })
        this.curIndex++
        if (this.curIndex >= features.length) {
          this.curIndex = 0
        }
      }, 2000)
    },
    // 修改筛选条件：仅对问题图层起作用
    changeFilter(params) {
      console.log('修改筛选条件', params);
      // if (params) {
      //   this.pointParams = {...params, ...{
      //     adcd: this.adcd,
      //     startTime: this.startTime,
      //     endTime: this.endTime
      //   }}
      // }
      const allParams = ['eventCompleteStatus', 'willExpireStatus', 'expireStatus', 'thisMonthNewStatus', 'eventGradeStatus', 'eventResponsibleUnitCode', 'eventSource', 'eventCategoryCode', 'eventSourceDepartCode']
      allParams.forEach(paramName => {
        if (params[paramName] === undefined) {
          this[paramName] = ''
        } else {
          this[paramName] = params[paramName]
        }
      })
      if (params.adcd) {
        this.pointAdcd = params.adcd
      } else {
        this.pointAdcd = this.adcd
      }
      
      if (this.baseLayers.indexOf('pointLayer') === -1) { // 如果此时地图展示的不是问题点位图层，则切换图层
        this.initLayers(['pointLayer'])
      } else { // 如果此时地图展示的是问题图层，则移除后重新加载
        this.changeLayerVisible('pointLayer', false)
        this.changeLayerVisible('pointLayer', true)
      }
    },
    // 时间筛选：仅对问题图层起作用
    changeTime(val) {
      console.log('切换时间', val);
      this.startTime = val.startTime
      this.endTime = val.endTime
      if (this.baseLayers[0] === 'pointLayer') {
        // 先移除当前图层
        this.layers.pointLayer.removeLayer(this.map, this)
        // 再重新加载当前图层
        let searchInfo = {
          adcd: this.pointAdcd,
          startTime: val.startTime,
          endTime: val.endTime,
          eventCompleteStatus: this.eventCompleteStatus,
          willExpireStatus: this.willExpireStatus,
          expireStatus: this.expireStatus,
          thisMonthNewStatus: this.thisMonthNewStatus,
          eventGradeStatus: this.eventGradeStatus,
          eventSourceDepartCode: this.eventSourceDepartCode,
          eventResponsibleUnitCode: this.eventResponsibleUnitCode,
          eventCategoryCode: this.eventCategoryCode,
          eventSource: this.eventSource,
        }
        this.layers.pointLayer.load(new LayerParams({
          vm: this,
          searchInfo,
        }))
      }
    },
    // 统计图点位图切换
    changeLayerType(val) {
      console.log('切换类型', val);
      // 先移除当前图层
      this.layers[this.curLayer].removeLayer(this.map, this)
      switch(val) {
        case '1': // 统计图
          this.curLayer = 'basicTotalLayer'
          break
        case '2': // 点位图
          this.curLayer = 'pointLayer'
          break
      }
      // 再加载新图层
      let searchInfo = {
        adcd: this.adcd,
        startTime: this.startTime,
        endTime: this.endTime,
      }
      this.layers[this.curLayer].load(new LayerParams({
        vm: this,
        searchInfo,
      }))
    },
    // 初始化加载图层
    initLayers(layers) {
      console.log('initlayers', layers);
      const layerArr = layers;
      // 需要加载的图层
      const addLayers = layerArr.filter(
        (layer) => this.baseLayers.indexOf(layer) === -1
      );
      // 需要移除的图层
      const removeLayers = this.baseLayers.filter(
        (layer) => layerArr.indexOf(layer) === -1
      );
      addLayers.forEach((layer) => {
        this.changeLayerVisible(layer, true);
      });
      removeLayers.forEach((layer) => {
        this.changeLayerVisible(layer, false);
      });
    },
    // 修改图例
    changeLegend(layerid, legend) {
      console.log('legend', layerid, legend);
      this.threeLines = legend
      // 需要添加三线的图层
      // const threeLineLayers = []
      this.baseLayers.forEach(layer => {
        if (this.threeLineLayers.indexOf(layer) !== -1) {
          this.layers[layer].changeLegend(legend, this)
        }
      })
      // this.layers[layerid].changeLegend(legend, this)
    },
    // 加载/移除单个图层
    changeLayerVisible(layerid, status) {
      console.log('visible', layerid, status);
      if (status) {
        let searchInfo = {
          adcd: this.pointAdcd,
          startTime: this.startTime,
          endTime: this.endTime,
          eventCompleteStatus: this.eventCompleteStatus,
          willExpireStatus: this.willExpireStatus,
          expireStatus: this.expireStatus,
          thisMonthNewStatus: this.thisMonthNewStatus,
          eventGradeStatus: this.eventGradeStatus,
          eventSourceDepartCode: this.eventSourceDepartCode,
          eventResponsibleUnitCode: this.eventResponsibleUnitCode,
          eventCategoryCode: this.eventCategoryCode,
          eventSource: this.eventSource,
        };
        this.layers[layerid].load(
          new LayerParams({
            vm: this,
            searchInfo,
          })
        );

        // 如果需要加载水域调查图层，且图例有勾选，则再添加对应图层的三线
        if (this.threeLines.length > 0 && this.threeLineLayers.indexOf(layerid) !== -1) {
          this.layers[layerid].changeLegend(this.threeLines, this)
        } 

        this.baseLayers.push(layerid);
      } else {
        this.layers[layerid].removeLayer(this.map, this);
        this.baseLayers.splice(this.baseLayers.indexOf(layerid), 1);
      }
    },
    initClick() {
      this.map.on("click", (evt) => {
        let layerid = "";
        const clickLayers = ["point"];
        const clickFeature = this.map.forEachFeatureAtPixel(
          evt.pixel,
          (feature, layer) => {
            if (layer) {
              if (clickLayers.indexOf(layer.get("id")) !== -1) {
                layerid = layer.get("id");
                return feature;
              }
            }
            return undefined;
          }
        );
        if (clickFeature) {
          // 有元素选中
          this.$emit('showPop', clickFeature.getProperties().properties)
        } else {
          // 没有元素选中，则进行地图服务空间查询
          // 根据当前地图展示图层，对应要查询的服务名称
          let searchServers = []
          this.baseLayers.forEach((layer) => {
            switch(layer) {
              case LayerEnum.RIVER_LAYER:
                searchServers.push('WaterRegionInvestigation:vw_river_area')
                break
              case LayerEnum.RESERVOIR_LAYER:
                searchServers.push('WaterRegionInvestigation:vw_reservoir_area')
                break
              case LayerEnum.HILLPOND_LAYER:
                searchServers.push('WaterRegionInvestigation:vw_hillypond_area')
                break
              case LayerEnum.LAKE_LAYER:
                searchServers.push('WaterRegionInvestigation:vw_lake_area')
                break
              case LayerEnum.CANAL_LAYER:
                searchServers.push('WaterRegionInvestigation:vw_canal_area')
                break
              case LayerEnum.OTHERWATER_LAYER:
                searchServers.push('WaterRegionInvestigation:vw_otherwater_area')
                break
              default:
                break
            }
          })
          // 空间查询
          this.getFeatureByLocation(searchServers, evt.coordinate)
        }
      });
    },
    async getFeatureByLocation(types, coord) {
      // 通过点击的点查询空间数据
      const res = await getFeatures(this.getUrl(types, coord[0], coord[1]))
      console.log('location', types, coord, res);
      const features = new GeoJSON().readFeatures(res.data)
      if (features.length > 0) {
        // 这里只有河道需要走wms服务，所以不写什么判断了，后面有自己再加判断好了
        const feature = features[0]
        const properties = feature.getProperties()
        switch(features[0].id_.split('.')[0]) {
          case 'vw_river_area':
            properties.layerid = LayerEnum.RIVER_LAYER
            break
          case 'vw_reservoir_area':
            properties.layerid = LayerEnum.RESERVOIR_LAYER
            break
          case 'vw_hillypond_area':
            properties.layerid = LayerEnum.HILLPOND_LAYER
            break
          case 'vw_lake_area':
            properties.layerid = LayerEnum.LAKE_LAYER
            break
          case 'vw_canal_area':
            properties.layerid = LayerEnum.CANAL_LAYER
            break
          case 'vw_otherwater_area':
            properties.layerid = LayerEnum.OTHERWATER_LAYER
            break
        }
        this.$emit('showPop', properties)
      }
    },
    getUrl(types, lng, lat) {
      // 空间数据地址
      // let geoserverUrl = ''
      // if (this.curLayer === 'riverLayer' || this.curLayer === 'reservoirArea' || this.curLayer === 'poolArea') {
      //   geoserverUrl = geoserverPath.riverLakeWms
      // } else if (this.curLayer === 'ortherWaterway') {
      //   geoserverUrl = geoserverPath.oneMapCityWms
      // }
      const geoserverUrl = geoserverPath.waterRegionInvestigationWMS
      const url = `${geoserverUrl}?service=WFS&version=1.0.0&request=GetFeature
      &typeName=${types.join(',')}&outputformat=json
      &filter=${this.getQueryParams(lng, lat)}`
      return encodeURI(url)
    },
    getQueryParams(lng, lat) {
      // wfs 通过点击的点查询空间数据
      const distance = 50
      const queryXML =
        `${
          '<Filter xmlns:ogc="http://www.opengis.net/ogc" xmlns:gml="http://www.opengis.net/gml">' +
          '<And>' +
          '<DWithin>' +
          '<PropertyName>wkb_geometry</PropertyName>' +
          '<gml:Point>' +
          '<gml:coordinates>'
        }${lng},${lat}</gml:coordinates>` +
        '</gml:Point>' +
        `<ogc:Distance units="m">${distance}</ogc:Distance>` + // 设置缓冲区大小，方便点击事件的触发，暂定10m
        '</DWithin>' +
        '<PropertyIsLike xmlns="http://www.opengis.net/ogc" wildCard="*" singleChar="." escapeChar="!">' +
        '<PropertyName>county_adcd</PropertyName>' +
        `<Literal>${this.adcd}</Literal>` +
        '</PropertyIsLike>' +
        '</And>' +
        '</Filter>'
      return queryXML
    },
    // 根据地图下方问题清单点击跳转
    mapPanToSelectRow(params) {
      console.log('地图缩放至所选行', params);
      if(params.longitude && params.latitude) {
        this.map.getView().setCenter([params.longitude, params.latitude])
        this.map.getView().setZoom(16)
      }
    }
  },
};
</script>
<style>
</style>
<style lang="less" scoped>
.picture-map2 {
  width: 100%;
  height: 100%;
  display: flex;
  #map2 {
    width: 100%;
    height: 100%;
  }
}
</style>
