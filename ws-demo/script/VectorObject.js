/**
 * Created by Administrator on 20170209.
 */

var VectorObject=function(){

    this.PoliceSource=new ol.source.Vector({
        features:new ol.Collection()
    });

    this.PoliceVector = new ol.layer.Vector({
        source :  this.PoliceSource,
        style: new ol.style.Style({
            fill: new ol.style.Fill({
                color: '#EEB422'
            }),
            stroke: new ol.style.Stroke({
                color: '#EEB422',
                width: 2
            }),
            image:new ol.style.Circle({
                radius: 3,
                fill: new ol.style.Fill({
                    color: '#EEB422'
                })
            })
        })
    });
    this.PoliceObject=[];


    this.TraceSource=new ol.source.Vector({
        features:new ol.Collection()
    });

    this.TraceVector = new ol.layer.Vector({
        source :  this.TraceSource,
        style: new ol.style.Style({
            fill: new ol.style.Fill({
                color: '#00ff00'
            }),
            stroke: new ol.style.Stroke({
                color: '#00ff00',
                width: 2
            }),
            image:new ol.style.Circle({
                radius: 3,
                fill: new ol.style.Fill({
                    color: '#00ff00'
                })
            })
        })
    });
    this.TraceObject=[];

    this.TraceColor=[];

};
VectorObject.prototype={
    init:function(){
     map.addLayer(this.PoliceVector);
     this.PoliceVector.setZIndex(10);
     map.addLayer(this.TraceVector);
     this.TraceVector.setZIndex(9);
    }

};
vectorobj=new VectorObject();