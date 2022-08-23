<template>
  <div class="picture-map2">
    <div id="map2" />
  </div>
</template>

<script>
import Point from "ol/geom/Point";
import Feature from "ol/Feature";
import Style from "ol/style/Style";
import Icon from "ol/style/Icon";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import Fill from "ol/style/Fill";
import Text from "ol/style/Text";
import GeoJSON from "ol/format/GeoJSON";
import Stroke from "ol/style/Stroke";
import MapFactory from "./factory/MapFactory";
import mapConfig from "./config/mapConfig";
import LayerSwitch from "./layers/LayerSwitch";
import ShadeLayer from "./layers/ShadeLayer";
import OrgAdcdWmsLayer from "./layers/OrgAdcdWmsLayer";
// import LayerParams from './common/LayerParams'
import BaseVectorLayer from "./layers/base/BaseVectorLayer";
import { riverPointLayer } from "./config/layerConfig";
// import AMap from 'AMap'
import DCLayer from "./layers/impl/DCLayer";
import LayerParams from "./common/LayerParams";
import MainShadowLayer from "./layers/imgShade/MainShadowLayer";
import TdtImgClipLayer from './layers/imgShade/TdtImgClipLayer';
import OrgBoundaryLayer from './layers/common/OrgBoundaryLayer'

export default {
  name: "FirstMap",
  components: {  },
  provide() {
    return { getMap: this.getMap };
  },
  props: {},
  data() {
    return {
      adcd: "330327",
      curLayer: "", // 当前图层
      baseLayers: [], // 所有加载的图层
      lgtd: "",
      lttd: "",
      address: "",
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
        // shadeLayer: new ShadeLayer(),
        mainShadeLayer: new MainShadowLayer(), // 地图下偏移的阴影
        boundary: new OrgBoundaryLayer(), // 边界线
        // orgAdcdWmsLayer: new OrgAdcdWmsLayer(),
      };
      // 加载遮罩
      // this.layers.shadeLayer.load(this.adcd, this.map, true)
      // 加载立体感效果的图层
      this.layers.mainShadeLayer.load({
        map: this.map,
        adcd: this.adcd,
      });
      // 加载下级行政区划边界
      this.layers.boundary.load(this.map, this.adcd)
      // this.layers.orgAdcdWmsLayer.load(this.map,this.adcd)
      this.initClick();
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
        const clickLayers = ["1111"];
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
          console.log("fea", clickFeature);
        } else {
          // 没有元素选中，则移动所在点位，并重新加载范围内点位
          this.curLong = evt.coordinate[0];
          this.curLat = evt.coordinate[1];
          this.addLocateLayer(evt.coordinate);
          this.getAddressFromCoord(evt.coordinate);
          this.reloadLayers();
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
