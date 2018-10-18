/**
 * Created by Administrator on 2016/6/21.
 */
var MapObject=function(){

    proj4.defs("EPSG:2426","+proj=tmerc +lat_0=0 +lon_0=87 +k=1 +x_0=500000 +y_0=0 +ellps=krass +towgs84=15.8,-154.4,-82.3,0,0,0,0 +units=m +no_defs");
    proj4.defs("EPSG:4326","+proj=longlat +datum=WGS84 +no_defs");
    proj4.defs("EPSG:31467","+proj=tmerc +lat_0=0 +lon_0=9 +k=1 +x_0=3500000 +y_0=0 +ellps=bessel +towgs84=598.1,73.7,418.2,0.202,0.045,-2.455,6.7 +units=m +no_defs");

    this.center_p=[84.87,45.582];

    //矢量数据WMS地址
    //this.vec_wms='http://10.72.187.60:9000/TMapServer/MapServer/wms/Z2lzdGVzdDoxMjM0NTY=';


   //定义底图
    var crs='EPSG:3857';//WEB墨卡托为EPSG:3857
    var projection = ol.proj.get(crs);
    var projectionExtent = projection.getExtent();
    var size = ol.extent.getWidth(projectionExtent) / 256;

    var resolutions = new Array(20);
    var matrixIds = new Array(20);
    for (var z = 0; z < 20; ++z) {
        // generate resolutions and matrixIds arrays for this WMTS
        resolutions[z] = size / Math.pow(2, z);
        matrixIds[z] = z;
    }

    var cva_resolutions = new Array(18);
    var cva_matrixIds = new Array(18);

    for (var d = 0; d < 18; ++d) {
        // generate resolutions and matrixIds arrays for this WMTS
        cva_resolutions[d] = size / Math.pow(2, d);
        cva_matrixIds[d] = d;
    }

    this.layers=[];


    this.tdt_img=new ol.layer.Tile({
        visible:true,
        opacity: 1,
        source: new ol.source.WMTS({
            url: 'http://10.72.4.208:10000/tdtproxy/wmts/{layer}/{TileMatrixSet}/{TileMatrix}/{TileCol}/{TileRow}.png',
            layer: 'imgw_tdt',
            matrixSet: 'epsg3857',
            isBaseLayer:true,
            format: 'image/png',
            projection: projection,
            requestEncoding:'REST',
			maxZoom:18,
            tileGrid: new ol.tilegrid.WMTS({
                origin: ol.extent.getTopLeft(projectionExtent),
                resolutions: resolutions,
                matrixIds: matrixIds
            }),
            style: 'default'
        })
    });
    this.tdt_img.setZIndex(2);
    this.layers['tdt_img']= this.tdt_img;

    this.tdt_vec=new ol.layer.Tile({
        visible:false,
        opacity: 1,
        source: new ol.source.WMTS({
            url: 'http://10.72.4.208:10000/tdtproxy/wmts/{layer}/{TileMatrixSet}/{TileMatrix}/{TileCol}/{TileRow}.png',
            layer: 'vecw_tdt',
            matrixSet: 'epsg3857',
            format: 'image/png',
            projection: projection,
            requestEncoding:'REST',
            maxZoom:18,
            tileGrid: new ol.tilegrid.WMTS({
                origin: ol.extent.getTopLeft(projectionExtent),
                resolutions: resolutions,
                matrixIds: matrixIds
            }),
            style: 'default'
        })
    });
    this.tdt_vec.setZIndex(1);
    this.layers['tdt_vec']= this.tdt_vec;

    this.tdt_cia=new ol.layer.Tile({
        visible:true,
        opacity: 1,
        source: new ol.source.WMTS({
            url: 'http://10.72.4.208:10000/wmts/tdtproxy/{layer}/{TileMatrixSet}/{TileMatrix}/{TileCol}/{TileRow}.png',
            layer: 'ciaw_tdt',
            matrixSet: 'epsg3857',
            format: 'image/png',
            projection: projection,
            requestEncoding:'REST',
            tileGrid: new ol.tilegrid.WMTS({
                origin: ol.extent.getTopLeft(projectionExtent),
                resolutions: resolutions,
                matrixIds: matrixIds
            }),
            style: 'default'
        })
    });
    this.layers['tdt_cia']= this.tdt_cia;


    this.tdt_cva=new ol.layer.Tile({
        visible:true,
        opacity: 1,
        source: new ol.source.WMTS({
            url: 'http://10.72.4.208:10000/tdtproxy/wmts/{layer}/{TileMatrixSet}/{TileMatrix}/{TileCol}/{TileRow}.png',
            layer: 'cvaw_tdt',
            matrixSet: 'epsg3857',
            format: 'image/png',
            projection: projection,
            requestEncoding:'REST',
            tileGrid: new ol.tilegrid.WMTS({
                origin: ol.extent.getTopLeft(projectionExtent),
                resolutions: resolutions,
                matrixIds: matrixIds
            }),
            style: 'default'
        })
    });
    this.layers['tdt_cva']= this.tdt_cva;
};

MapObject.prototype={

    initMap:function() {

        var layerArray = _.values(mapobj.layers);
        map = new ol.Map({
            layers: layerArray,
            //overlays:[],
            //renderer: 'canvas',
            target: 'map',
            // controls: ol.control.defaults({
                // attributionOptions: /** @type {olx.control.AttributionOptions} */ ({
                    // collapsible: true
                // })
            // }).extend([
                // /*new ol.control.FullScreen({
                 // source: 'body'
                 // }),*/
                // new ol.control.ScaleLine({})
            // ]),
            view: new ol.View({
                center: ol.proj.fromLonLat(this.center_p),
                projection: ol.proj.get("EPSG:3857"),
                zoom: 13//,
               // maxZoom: 18,
               // minZoom: 8
            })//,
            //logo:false
        });
       // map.on('dblclick', mapobj.mapclick);
    },
    mapclick:function(evt){
         mapobj.flyToCoords(evt.coordinate);
    },
    flyToCoords:function(coords) {

        var duration = 2000;
        var start =+ new Date();
        var view=map.getView();

        var pan = ol.animation.pan({
            duration: duration,
            source: /** @type {ol.Coordinate} */ (view.getCenter()),
            start: start
        });

        var bounce = ol.animation.bounce({
            duration: duration,
            resolution: 4 * view.getResolution(),
            start: start
        });
        map.beforeRender(pan, bounce);
		view.setZoom(view.getZoom()+1);
        view.setCenter(coords);
        
    }
};

mapobj=new MapObject();

