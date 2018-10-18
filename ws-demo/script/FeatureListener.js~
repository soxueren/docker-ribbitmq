/**
 * Created by Administrator on 20170209.
 */
var FeatureListener=function(url){
    this._url = url==undefined?'http://localhost:8080/demo/getListener':option.url;//申请队列的地址
    this._client={};
    this._header={};
    this._config={
        'id':'001',
        'host':'/',
        'user':'guest',
        'password':'guest',
        'queue':'001',
        'exchange':'',
        'routing_key':''
    };
    //初始化时都为undefined
};
FeatureListener.prototype={
    initListener:function (){
        var _self=this;
        $.getJSON(_self._url, {}, function (data) {

            if (data != undefined) {
                try{
                    _self._config.id = data.id;
                    _self._config.host=data.host;
                    _self._config.user=data.user;
                    _self._config.password=data.password;
                    _self._config.queue = data.queue;
                    _self._config.exchange=data.exchange;
                    _self._config.routing_key=data.routing_key;
                    return true;
                }catch(e){
                    console.log(e);
                    return false;
                }

            }else{
                return false;
            }

        });
    }
};
svrlistener=new FeatureListener();
