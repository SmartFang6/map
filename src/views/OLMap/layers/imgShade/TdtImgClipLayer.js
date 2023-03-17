/*
 * @Author: sq
 * @Date: 2023-03-17
 * @LastEditors: sq
 * @LastEditTime: 2022-03-17 11:15:13
 * @FilePath:
 * @Description: 驾驶舱裁剪天地图和天地图注记图层//出现的bug已修复（1.天地图影像图层不能返回初始状态重新裁剪2.修复之后之裁剪注记图层）注意LayerConfig中图层的zindex
 */
import BaseLayer from "../base/BaseLayer";
import { tdtImg, tdtImgAnnoLayer } from "../../config/layerConfig";
import Group from "ol/layer/Group";
/**
 * 裁剪天地图
 * @extends BaseLayer
 */
class TdtImgClipLayer extends BaseLayer {
  // 天地图裁剪功能
  /**
   * 创建图层，如果有配置采用配置，没有则使用默认
   * @param {Object} layerConfig 图层配置
   */
  constructor(layerConfig) {
    const tdtConfig = JSON.parse(JSON.stringify(tdtImg));
    tdtConfig.zIndex = 5;
    const config = layerConfig || tdtConfig;
    config.source.tilePixelRatio = window.devicePixelRatio;
    super(config);
  }

  removeLayer(map) {
    if (this.baseLayerGroup) {
      map.removeLayer(this.baseLayerGroup);
    }
    super.removeLayer(map);
  }

  initLayerGroup(baselayers, map, feature) {
    this.removeLayer(map);
    const layers = [];
    baselayers.forEach((layerid) => {
      const layer = new BaseLayer(layerid);
      layers.push(layer.getLayer());
    });
    this.baseLayerGroup = new Group({ layers });
    map.addLayer(this.baseLayerGroup);
    // 两个图层都需要进行裁剪
    for (let i = 0; i < layers.length; i++) {
      layers[i].on("postrender", (evt) => {
        // 根据多边形进行裁剪
        this.clip(evt.context, feature.getGeometry(), map);
      });
    }
  }
  load(vm, map, feature) {
    tdtImg.source.tilePixelRatio = window.devicePixelRatio;
    tdtImgAnnoLayer.source.tilePixelRatio = window.devicePixelRatio;
    this.initLayerGroup([tdtImg, tdtImgAnnoLayer], map, feature);
  }

  clip(context, boundPolygon, map) {
    const featureType = boundPolygon.getType();
    context.save();
    context.scale(window.devicePixelRatio, window.devicePixelRatio);
    const pointArr = [];
    if (featureType === "Polygon") {
      this.poinToPixel(pointArr, boundPolygon, map);
    } else {
      boundPolygon.getPolygons().forEach((polygon) => {
        this.poinToPixel(pointArr, polygon, map);
      });
    }
    context.globalCompositeOperation = "destination-in";
    context.beginPath();
    for (let i = 0; i < pointArr.length; i++) {
      const pointTmp = pointArr[i];
      for (let j = 0; j < pointTmp.length; j++) {
        if (j === 0) {
          context.moveTo(pointTmp[j][0], pointTmp[j][1]);
        } else {
          context.lineTo(pointTmp[j][0], pointTmp[j][1]);
        }
      }
    }
    context.closePath();
    context.fillStyle = "#000000";
    context.fill();
    context.restore();
  }

  poinToPixel(pointArr, polygon, map) {
    const coors = polygon.getCoordinates();
    for (let i = 0; i < coors.length; i++) {
      const coorTmp = coors[i];
      const pointTmp = [];
      for (let j = 0; j < coorTmp.length; j++) {
        pointTmp.push(map.getPixelFromCoordinate(coorTmp[j]));
      }
      pointArr.push(pointTmp);
    }
  }
}

export default TdtImgClipLayer;
