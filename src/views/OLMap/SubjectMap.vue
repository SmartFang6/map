<template>
  <div class="picture-map3">
    <div id="map3" />
  </div>
</template>

<script>
import MapFactory from "./factory/MapFactory";
import mapConfig from "./config/mapConfig";
import LayerSwitch from "./layers/LayerSwitch";
import ShadeLayer from "./layers/ShadeLayer";
import OrgAdcdWmsLayer from "./layers/OrgAdcdWmsLayer";
// import LayerParams from './common/LayerParams'
import BaseVectorLayer from "./layers/base/BaseVectorLayer";
import OrgBoundaryLayer from './layers/NewOrgBoundaryLayer';
import {
  riverManageLineLayer,
  riverPointLayer,
} from "./config/layerConfig";
import DCLayer from "./layers/impl/DCLayer";
import LayerParams from "./common/LayerParams";
import location from '@/assets/map/location.png'
import Point from 'ol/geom/Point'
import Feature from 'ol/Feature'
import Style from 'ol/style/Style'
import Icon from 'ol/style/Icon'
import VectorLayer from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector'
import DCWMSLayer from './layers/impl/DCWMSLayer'
import RiverManageLineLayer from './layers/impl/RiverManageLineLayer'
// import useUserInfo from '@/composables/useUserInfo'
import Fill from 'ol/style/Fill'
import store from "@/store";
import { watch } from 'vue'
import MainMapWMSLayer from './layers/impl/MainMapWMSLayer';
export default {
  name: "FirstMap",
  components: { },
  provide() {
    return { getMap: this.getMap };
  },
  props: {
    location: {
      default: () => {
        return {
          longitude: null, 
          latitude:null, 
          adcd: null,
        }
      },
      type: Object,
    },
  },
  created() {
    watch(() => this.location, location => {
      this.$nextTick(() => {
        console.log("查看 location changed =>", location);
        // 处理本地调试不显示地图问题
        if (!this.map.getTargetElement().querySelector('canvas')) {
          this.initMap()
        }
        if (location) {
          console.log('查看地图3定位切换', location);
          // 经纬度不为空则添加定位点
          if (location.longitude && location.latitude) {
            const { longitude, latitude } = location
            this.addClickLayer([longitude, latitude])
            this.map.getView().setCenter([longitude, latitude])
            this.map.getView().setZoom(16)
          } else {
            if (this.locatePointLayer) {
              this.map.removeLayer(this.locatePointLayer)
            }
          }
          // 传入的adcd不为空则添加行政区划线
          if (this.location.adcd && this.location.adcd.length > 7) { // 至少定位到街道
            if (this.location.adcd.length > 9) { // 如果定位到社区，则只取前9位adcd
              this.location.adcd = this.location.adcd.slice(0,9)
            }
            // 添加对应的乡镇边界
            this.layers.boundary.load(this.map, this.location.adcd)
          } else {
            if (this.layers.boundary) {
              this.layers.boundary.removeLayer(this.map, this)
            }
          }
        } else {
          if (this.locatePointLayer) {
            this.map.removeLayer(this.locatePointLayer)
          }
          if (this.layers.boundary) {
            this.layers.boundary.removeLayer(this.map, this)
          }
          this.initMapExtent()
        }
      });
    }, { deep: true })
  },
  data() {
    return {
      adcd: store?.state?.userInfo?.adminDivCode || "330182",// useUserInfo().adminDivCode || '330182',
      curLayer: "", // 当前图层
      baseLayers: [], // 所有加载的图层
    };
  },
  mounted() {
    this.$nextTick(()=> {
      this.initMap();
    })
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
      mapConfig.target = "map3";
      this.map = MapFactory.createMap(mapConfig);
      // 初始化图层
      this.firstLoad();
      console.log('初始化adcd', this.adcd);
    },
    firstLoad() {
      this.layers = {
        layerSwitch: new LayerSwitch(),
        riverPointLayer: new DCLayer(riverPointLayer),
        // lineManageLayer: new RiverManageLineLayer(riverManageLineLayer), // 河道管理范围线
        lineManageLayer: new MainMapWMSLayer(riverManageLineLayer), // 河道管理范围线
        boundary: new OrgBoundaryLayer(), // 乡镇边界线
        // shadeLayer: new ShadeLayer()
        // orgAdcdWmsLayer: new OrgAdcdWmsLayer(),
        // draw: new BaseVectorLayer(drawLayer)
      };
      // 加载影像图
      this.layers.layerSwitch.changeLayers("3", this.map);
      // 初始化时根据adcd进行地图缩放定位
      // this.initMapExtent()
      // // 加载遮罩
      // this.layers.shadeLayer.load(this.adcd, this.map, true)
      // // this.layers.innerShadeLayer.load(this.adcd, this.map)
      // this.layers.orgAdcdWmsLayer.load(this.map, this.adcd)
      // this.initClick();
      console.log('firstload');
      if (this.location && this.location.longitude && this.location.latitude) {
        console.log('初始化', this.location);
        if (this.location.longitude && this.location.latitude) {
          this.addClickLayer([this.location.longitude, this.location.latitude])
          this.map.getView().setCenter([this.location.longitude, this.location.latitude])
          this.map.getView().setZoom(16)
        }
        if (this.location.adcd && this.location.adcd.length > 7) { // 至少定位到街道
          if (this.location.adcd.length > 9) { // 如果定位到社区，则只取前9位adcd
            this.location.adcd = this.location.adcd.slice(0,9)
          }
          // 添加对应的乡镇边界
          this.layers.boundary.load(this.map, this.location.adcd)
        } else {
          this.initMapExtent()
        }
      }
      // 加载河道管理范围线
      // if (this.adcd === '330182') {
        this.layers.lineManageLayer.load(new LayerParams({
          vm: this,
          searchInfo: {}
        }))
      // }
      this.map.updateSize()
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
        this.addClickLayer(evt.coordinate)
      });
    },
    addClickLayer(coord) {
      if (this.locatePointLayer) {
        this.map.removeLayer(this.locatePointLayer)
      }
      // 添加定位点
      const locateFeature = new Feature({ geometry: new Point(coord) })
      const locateStyle = new Style({
        image: new Icon({
          crossOrigin: 'anonymous',
          src: location,
          anchor: [0.5, 0.75],
          scale: 1,
        }),
      })
      this.locatePointLayer = new VectorLayer({
        id: 'locatePoint',
        source: new VectorSource({ features: [locateFeature] }),
        style: locateStyle,
        zIndex: 20,
      })
      this.map.addLayer(this.locatePointLayer)
    }
  },
};
</script>
<style>
/* .clipImg canvas {
  -webkit-filter: brightness(100%) grayscale(100%);
  filter: brightness(100%) grayscale(100%);
} */
</style>
<style lang="less" scoped>
.picture-map3 {
  width: 100%;
  height: 100%;
  display: flex;
  #map3 {
    width: 100%;
    height: 100%;
  }
}
</style>
