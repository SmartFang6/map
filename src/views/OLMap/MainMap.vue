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
import { basicTotalLayer, orgHighLightLayer, pointLayer, riverManageLineLayer, riverPointLayer, statisticsLayer } from "./config/layerConfig";
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

export default {
  name: "FirstMap",
  components: {  AreaHappyPopInfo },
  provide() {
    return { getMap: this.getMap };
  },
  props: {},
  data() {
    return {
      adcd: "330182",
      curLayer: 'pointLayer', // 当前图层，默认为统计图
      baseLayers: [], // 所有加载的图层
      lgtd: "",
      lttd: "",
      address: "",
      startTime: moment(new Date()).startOf('year').format('YYYY-MM-DD 00:00:00'),
      endTime: moment(new Date()).endOf('year').format('YYYY-MM-DD 23:59:59'),
      townss: [], // 统计图
      areaHappyShow: false,
      curIndex: 0,
      popInfo: {},
      lineManageShow: false,
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
        lineManageLayer: new DCWMSLayer(riverManageLineLayer), // 河道管理范围线
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
      // 建德--加载河道管理范围线
      if (this.adcd === '330182' && this.lineManageShow) {
        this.layers.lineManageLayer.load(new LayerParams({
          vm: this,
          searchInfo: {}
        }))
      }
      // 初始化加载点位图
      this.layers.pointLayer.load(new LayerParams({
        vm: this,
        searchInfo: {
          adcd: this.adcd,
          startTime: this.startTime,
          endTime: this.endTime
        }
      }))
      // 初始化加载统计图
      // this.layers.basicTotalLayer.load(new LayerParams({
      //   vm: this,
      //   searchInfo: {
      //     adcd: this.adcd,
      //     startTime: this.startTime,
      //     endTime: this.endTime,
      //   }
      // }))
      this.layers.selectLayer.addLayer(this.map)
      // 监听地图缩放，加载管理范围线
      if (this.adcd === '330182') {
        this.watchMapZoom()
      }
    },
    // 监听地图缩放
    watchMapZoom() {
      this.map.getView().on('change:resolution', evt => {
        if(this.map.getView().getZoom() > 14) {
          if (!this.lineManageShow) { // 如果此时地图上没展示范围线，则加载
            this.layers.lineManageLayer.load(new LayerParams({
              vm: this,
              searchInfo: {}
            }))
            this.lineManageShow = true
          }
        } else {
          if (this.lineManageShow) {
            this.layers.lineManageLayer.removeLayer(this.map, this)
            this.lineManageShow = false
          }
        }
      })
    },
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
        console.log('cur', properties);
        properties.layerid = 'basicTotalLayer'
        properties.lgtd = getCenter(curFeature.getGeometry().getExtent())[0]
        properties.lttd = getCenter(curFeature.getGeometry().getExtent())[1]
        this.popInfo = properties
        console.log('pop', properties);
        this.$nextTick(() => {
          this.areaHappyShow = true
        })
        this.curIndex++
        if (this.curIndex >= features.length) {
          this.curIndex = 0
        }
      }, 2000)
    },
    // 时间筛选
    changeTime(val) {
      console.log('切换时间', val);
      this.startTime = val.startTime
      this.endTime = val.endTime
      // 先移除当前图层
      this.layers[this.curLayer].removeLayer(this.map, this)
      // 再重新加载当前图层
      let searchInfo = {
        adcd: this.adcd,
        startTime: val.startTime,
        endTime: val.endTime,
      }
      this.layers[this.curLayer].load(new LayerParams({
        vm: this,
        searchInfo,
      }))
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
    // 加载/移除单个图层
    changeLayerVisible(layerid, status) {
      if (status) {
        let searchInfo = {};
        this.layers[layerid].load(
          new LayerParams({
            vm: this,
            searchInfo,
          })
        );

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
        }
      });
    },
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
