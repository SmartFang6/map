<template>
  <div class="picture-map4">
    <div id="map4" />
  </div>
</template>

<script>
import { createToken } from './global/global';
import MapFactory from "./factory/MapFactory";
import mapConfig from "./config/mapConfig";
import LayerSwitch from "./layers/LayerSwitch";
import ShadeLayer from "./layers/ShadeLayer";
import OrgAdcdWmsLayer from "./layers/OrgAdcdWmsLayer";
// import LayerParams from './common/LayerParams'
import BaseVectorLayer from "./layers/base/BaseVectorLayer";
import OrgBoundaryLayer from './layers/NewOrgBoundaryLayer';
import {
  geoserverWmsUrl,
  riverManageLineLayer,
  riverPointLayer,
  subjectLayer,
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
import SubjectLayer from './layers/impl/SubjectLayer'
// import useUserInfo from '@/composables/useUserInfo'
import Fill from 'ol/style/Fill'
import store from "@/store";
import { watch } from 'vue'
import MainMapWMSLayer from './layers/impl/MainMapWMSLayer';
import building from '@/assets/map/building.png'
import finish from '@/assets/map/finish.png'
import {
  getAdLevelBySystemAdcd,
  getFeatureTypesByAdLevel,
  getGisDataByWfs,
  getMapAdcdFromSystem,
} from "./common/commonrough";
export default {
  name: "FirstMap",
  components: { },
  provide() {
    return { getMap: this.getMap };
  },
  props: {
    subjectArea: {
      default: () => {
        return {}
      },
      type: Object
    }
  },
  watch: {
    subjectArea: {
      handler(nval) {
        if (nval.subjectArea.centerPoint) {
          this.addSubjectLayer()
        } else {
          if (this.subjectLayer) {
            this.map.removeLayer(this.subjectLayer)
          }
        }
      },
      deep: true
    }
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
    async initMap() {
      await createToken();
      mapConfig.target = "map4";
      this.map = MapFactory.createMap(mapConfig);
      // 初始化图层
      this.firstLoad();
      console.log('初始化adcd', this.adcd);
    },
    firstLoad() {
      this.layers = {
        layerSwitch: new LayerSwitch(),
        riverPointLayer: new DCLayer(riverPointLayer),
        lineManageLayer: new MainMapWMSLayer(riverManageLineLayer), // 河道管理范围线
        boundary: new OrgBoundaryLayer(), // 乡镇边界线
      };
      // 加载影像图
      this.layers.layerSwitch.changeLayers("3", this.map);
      if (this.subjectArea.subjectArea && this.subjectArea.subjectArea.centerPoint) {
        this.addSubjectLayer()
      } else {
        this.initMapExtent()
      }
    },
    // 初始化根据adcd定位
    async initMapExtent() {
      console.log('地图初始化定位');
      const mapadcd = getMapAdcdFromSystem(this.adcd);
      const adLevel = getAdLevelBySystemAdcd(this.adcd);
      const featureType = getFeatureTypesByAdLevel(adLevel);
      const params = {
        service: "WFS",
        version: "1.0.0",
        request: "GetFeature",
        outputformat: "json",
        typeName: featureType,
        cql_filter: `admin_div_code=${mapadcd}`,
      };
      const result = await getGisDataByWfs(params, geoserverWmsUrl.adcdWMS);
      const features = new GeoJSON().readFeatures(result);
      if (features.length > 0) {
        this.map.getView().fit(features[0].getGeometry().getExtent());
      }
    },
    addSubjectLayer() {
      console.log('添加点位', this.subjectArea);
      if (this.subjectLayer) {
        this.map.removeLayer(this.subjectLayer)
      }
      const lgtd = this.subjectArea.subjectArea.centerPoint.split(',')[0]
      const lttd = this.subjectArea.subjectArea.centerPoint.split(',')[1]
      const feature = new Feature({
        geometry: new Point([lgtd, lttd]),
        properties: null
      })
      let icon
      switch(this.subjectArea.subjectStatus) {
        case '1':
          icon = finish
          break
        case '2':
          icon = building
          break
        default:
          icon = building
          break
      }
      this.subjectLayer = new VectorLayer({
        id: 'subject',
        source: new VectorSource({
          features: [feature],
          
        }),
        style: new Style({
            image: new Icon({
              src: icon,
              scale: 0.8
            })
          }),
          zIndex: 20
      })
      this.map.addLayer(this.subjectLayer)
      this.map.getView().setCenter([lgtd, lttd])
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
.picture-map4 {
  width: 100%;
  height: 100%;
  display: flex;
  #map4 {
    width: 100%;
    height: 100%;
  }
}
</style>
