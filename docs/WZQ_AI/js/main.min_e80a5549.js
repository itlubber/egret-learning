var __reflect=this&&this.__reflect||function(e,t,r){e.__class__=t,r?r.push(t):r=[t],e.__types__=e.__types__?r.concat(e.__types__):r},__extends=this&&this.__extends||function(e,t){function r(){this.constructor=e}for(var i in t)t.hasOwnProperty(i)&&(e[i]=t[i]);r.prototype=t.prototype,e.prototype=new r},__awaiter=this&&this.__awaiter||function(e,t,r,i){return new(r||(r=Promise))(function(a,n){function o(e){try{l(i.next(e))}catch(t){n(t)}}function s(e){try{l(i["throw"](e))}catch(t){n(t)}}function l(e){e.done?a(e.value):new r(function(t){t(e.value)}).then(o,s)}l((i=i.apply(e,t||[])).next())})},__generator=this&&this.__generator||function(e,t){function r(e){return function(t){return i([e,t])}}function i(r){if(a)throw new TypeError("Generator is already executing.");for(;l;)try{if(a=1,n&&(o=n[2&r[0]?"return":r[0]?"throw":"next"])&&!(o=o.call(n,r[1])).done)return o;switch(n=0,o&&(r=[0,o.value]),r[0]){case 0:case 1:o=r;break;case 4:return l.label++,{value:r[1],done:!1};case 5:l.label++,n=r[1],r=[0];continue;case 7:r=l.ops.pop(),l.trys.pop();continue;default:if(o=l.trys,!(o=o.length>0&&o[o.length-1])&&(6===r[0]||2===r[0])){l=0;continue}if(3===r[0]&&(!o||r[1]>o[0]&&r[1]<o[3])){l.label=r[1];break}if(6===r[0]&&l.label<o[1]){l.label=o[1],o=r;break}if(o&&l.label<o[2]){l.label=o[2],l.ops.push(r);break}o[2]&&l.ops.pop(),l.trys.pop();continue}r=t.call(e,l)}catch(i){r=[6,i],n=0}finally{a=o=0}if(5&r[0])throw r[1];return{value:r[0]?r[1]:void 0,done:!0}}var a,n,o,s,l={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return s={next:r(0),"throw":r(1),"return":r(2)},"function"==typeof Symbol&&(s[Symbol.iterator]=function(){return this}),s},AIPlayer=function(){function e(e){this.chessData=e}return e.prototype.getNextPoint=function(){for(var e=[],t=1;t<this.chessData.length-1;t++)for(var r=1;r<this.chessData[t].length-1;r++)if(0==this.chessData[t][r]){var i=this.computerTotolScore(t,r);e.push({xIndex:t,yIndex:r,score:i})}return e.sort(function(e,t){return e.score>=t.score?-1:1}),e[0]},e.prototype.computeScore=function(e,t,r){var i=this.chessData,a=t,n=r,o={live1:!1,live2:!1,count:1},s={live1:!1,live2:!1,count:1},l={live1:!1,live2:!1,count:1},c={live1:!1,live2:!1,count:1},h=[o,s,l,c],u=0,f=0,d=0,p=0;u=a-4>=0?a-4:0,d=n-4>=0?n-4:0,f=a+4>=i.length-1?i.length-1:a+4,p=n+4>=i.length-1?i.length-1:n+4;for(var v=a;v>=u;v--)if(v!=a){if(0==i[v][n]){o.live1=!0;break}if(i[v][n]!=e){o.live1=!1;break}o.count++}for(var y=a;f>=y;y++)if(y!=a){if(0==i[y][n]){o.live2=!0;break}if(i[y][n]!=e){o.live2=!1;break}o.count++}for(var g=n;g>=d;g--)if(g!=n){if(0==i[a][g]){s.live1=!0;break}if(i[a][g]!=e){s.live1=!1;break}s.count++}for(var _=n;p>=_;_++)if(_!=n){if(0==i[a][_]){s.live2=!0;break}if(i[a][_]!=e){s.live2=!1;break}s.count++}for(var x=a,m=n;x>=u&&m>=d;x--,m--)if(x!=a){if(0==i[x][m]){l.live1=!0;break}if(i[x][m]!=e){l.live1=!1;break}l.count++}for(var E=a,b=n;f>=E&&p>=b;E++,b++)if(E!=a){if(0==i[E][b]){l.live2=!0;break}if(i[E][b]!=e){l.live2=!1;break}l.count++}for(var w=a,S=n;w>=u&&p>=S;w--,S++)if(w!=a){if(0==i[w][S]){c.live1=!0;break}if(i[w][S]!=e){c.live1=!1;break}c.count++}for(var w=a+1,S=n-1;f>=w&&S>=d;w++,S--)if(w!=a){if(0==i[w][S]){c.live2=!0;break}if(i[w][S]!=e){c.live2=!1;break}c.count++}return h},e.prototype.getScoreLevels=function(e){var t={live5:0,live4:0,dead4:0,live3:0,dead3:0,live2:0,dead2:0,live1:0};return e.forEach(function(e,r,i){switch(e.count){case 5:t.live5=1;break;case 4:t.live4+=e.live1&&e.live2?1:0,t.dead4+=e.live1&&e.live2?0:1;break;case 3:t.live3+=e.live1&&e.live2?1:0,t.dead3+=e.live1&&e.live2?0:1;break;case 2:t.live2+=e.live1&&e.live2?1:0,t.dead2+=e.live1&&e.live2?0:1;break;default:t.live1+=1}}),t},e.prototype.getHighestScore=function(e){var t=0;return t=1==e.live5?12e3:1==e.live4||2==e.dead4||1==e.dead4&&1==e.live3?5500:2==e.live3?2700:1==e.dead3&&1==e.live3?1300:1==e.dead4?310:1==e.live3?630:2==e.live2?150:1==e.dead3?70:1==e.live2?30:1==e.dead2?10:0},e.prototype.computerTotolScore=function(e,t){var r=this.computeScore(EPlayer.black,e,t),i=this.computeScore(EPlayer.white,e,t),a=this.getScoreLevels(r),n=this.getScoreLevels(i),o=this.getHighestScore(a),s=this.getHighestScore(n);return o+s},e}();__reflect(AIPlayer.prototype,"AIPlayer");var AssetAdapter=function(){function e(){}return e.prototype.getAsset=function(e,t,r){function i(i){t.call(r,i,e)}if(RES.hasRes(e)){var a=RES.getRes(e);a?i(a):RES.getResAsync(e,i,this)}else RES.getResByUrl(e,i,this,RES.ResourceItem.TYPE_IMAGE)},e}();__reflect(AssetAdapter.prototype,"AssetAdapter",["eui.IAssetAdapter"]);var ChessData=function(){function e(e){this.max=e,this.lastPlayer=null,this.max=e,this.initializeArray()}return e.prototype.initializeArray=function(){for(var e=new Array(this.max),t=0;t<this.max;t++){e[t]=new Array(this.max);for(var r=0;r<this.max;r++)e[t][r]=0}this.data=e},e.prototype.update=function(e,t,r){e>=0&&e<this.max&&t>=0&&t<this.max&&(this.data[e][t]=r,this.lastXIndex=e,this.lastYIndex=t,this.lastPlayer=r)},e.prototype.judge=function(e,t,r){for(var i=this.data,a=0,n=0,o=0,s=0,l=e;l>=0&&i[l][t]==r;l--)a++;for(var l=e+1;15>l&&i[l][t]==r;l++)a++;for(var l=t;l>=0&&i[e][l]==r;l--)n++;for(var l=t+1;15>l&&i[e][l]==r;l++)n++;for(var l=e,c=t;l>=0&&c>=0&&i[l][c]==r;l--,c--)o++;for(var l=e+1,c=t+1;15>l&&15>c&&i[l][c]==r;l++,c++)o++;for(var l=e,c=t;l>=0&&15>c&&i[l][c]==r;l--,c++)s++;for(var l=e+1,c=t-1;15>l&&c>=0&&i[l][c]==r;l++,c--)s++;return a>=5||n>=5||o>=5||s>=5?!0:void 0},e.prototype.reset=function(){this.lastXIndex=this.lastYIndex=0,this.lastPlayer=null;for(var e=this.data,t=0;t<this.max;t++){e[t]=new Array(this.max);for(var r=0;r<this.max;r++)e[t][r]=0}},e}();__reflect(ChessData.prototype,"ChessData");var EPlayer;!function(e){e[e.black=1]="black",e[e.white=2]="white"}(EPlayer||(EPlayer={}));var LabelTag=function(e){function t(){var t=e.call(this)||this;return t.skinName="LabelTagSkin",t}return __extends(t,e),t.prototype.partAdded=function(t,r){e.prototype.partAdded.call(this,t,r)},t.prototype.childrenCreated=function(){e.prototype.childrenCreated.call(this)},t}(eui.Component);__reflect(LabelTag.prototype,"LabelTag",["eui.UIComponent","egret.DisplayObject"]);var LoadingUI=function(e){function t(){var t=e.call(this)||this;return t.createView(),t}return __extends(t,e),t.prototype.createView=function(){this.textField=new egret.TextField,this.addChild(this.textField),this.textField.y=300,this.textField.width=480,this.textField.height=100,this.textField.textAlign="center"},t.prototype.onProgress=function(e,t){this.textField.text="Loading..."+e+"/"+t},t}(egret.Sprite);__reflect(LoadingUI.prototype,"LoadingUI",["RES.PromiseTaskReporter"]);var Main=function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return __extends(t,e),t.prototype.createChildren=function(){e.prototype.createChildren.call(this),egret.lifecycle.addLifecycleListener(function(e){}),egret.lifecycle.onPause=function(){egret.ticker.pause()},egret.lifecycle.onResume=function(){egret.ticker.resume()};var t=new AssetAdapter;egret.registerImplementation("eui.IAssetAdapter",t),egret.registerImplementation("eui.IThemeAdapter",new ThemeAdapter),this.runGame()["catch"](function(e){console.log(e)})},t.prototype.runGame=function(){return __awaiter(this,void 0,void 0,function(){var e;return __generator(this,function(t){switch(t.label){case 0:return[4,this.loadResource()];case 1:return t.sent(),this.createGameScene(),[4,RES.getResAsync("description_json")];case 2:return e=t.sent(),[2]}})})},t.prototype.loadResource=function(){return __awaiter(this,void 0,void 0,function(){var e,t;return __generator(this,function(r){switch(r.label){case 0:return r.trys.push([0,4,,5]),e=new LoadingUI,this.stage.addChild(e),[4,RES.loadConfig("resource/default.res.json","resource/")];case 1:return r.sent(),[4,this.loadTheme()];case 2:return r.sent(),[4,RES.loadGroup("preload",0,e)];case 3:return r.sent(),this.stage.removeChild(e),[3,5];case 4:return t=r.sent(),console.error(t),[3,5];case 5:return[2]}})})},t.prototype.loadTheme=function(){var e=this;return new Promise(function(t,r){var i=new eui.Theme("resource/default.thm.json",e.stage);i.addEventListener(eui.UIEvent.COMPLETE,function(){t()},e)})},t.prototype.createGameScene=function(){this.chessData=new ChessData(MAX_LINES),this.aiPlayer=new AIPlayer(this.chessData.data),this.createChessBoard(),this.createTopPanel(),this.createOpButton()},t.prototype.createBitmapByName=function(e){var t=new egret.Bitmap,r=RES.getRes(e);return t.texture=r,t},t.prototype.createTopPanel=function(){this.ltSteps=new LabelTag;var e=this.ltSteps;e.label_title.text="步骤",e.label_value.text="0",e.label_value.textColor=0,e.x=50,e.y=50,e.width=300,e.height=50,this.addChild(e);var t=new LabelTag;t.label_title.text="白方",t.label_value.text="玩家",t.x=50,t.y=100,t.width=300,t.height=50,this.addChild(t),t=new LabelTag,t.label_title.text="黑方",t.label_value.text="AI",t.x=50,t.y=150,t.width=300,t.height=50,this.addChild(t)},t.prototype.createOpButton=function(){var e=new eui.Button;e.label="重新开始",e.addEventListener(egret.TouchEvent.TOUCH_TAP,function(e){this.ltSteps.label_value.text="0",this.chessData.reset(),this.chessRect.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onPlay,this),this.removeChild(this.chessRect),this.createChessBoard()},this),e.bottom=50,e.left=this.stage.stageWidth/2,this.addChild(e)},t.prototype.createChessBoard=function(){var e=MAX_LINES,t=this.stage.stageWidth,r=.9*t,i=new eui.Rect(r,r);i.fillColor=16777215,i.x=0,i.y=100,i.horizontalCenter=0,i.verticalCenter=0,this.chessRect=i,this.gapHeight=~~(r/(e-1));var a=this.gapHeight,n=new egret.Shape;n.graphics.lineStyle(2,0);for(var o=0;e>o;o++)n.graphics.moveTo(0,a*o),n.graphics.lineTo(r,a*o);for(var o=0;e>o;o++)n.graphics.moveTo(a*o,0),n.graphics.lineTo(a*o,r);this.chessBoard=n,i.addChild(this.chessBoard),this.addChild(this.chessRect),this.chessRect.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onPlay,this)},t.prototype.onPlay=function(e){var t=MAX_LINES,r=this.gapHeight,i=e.localX,a=e.localY,n=this.getPosIndexes(i,a,r);if(0!==n.xIndex&&n.xIndex!==t-1&&0!==n.yIndex&&n.yIndex!==t-1&&0===this.chessData.data[n.xIndex][n.yIndex]&&(this.chessData.lastPlayer===EPlayer.black||null==this.chessData.lastPlayer)){this.play(EPlayer.white,n.xIndex,n.yIndex),this.ltSteps.label_value.text=+this.ltSteps.label_value.text+1+"";var o=this.aiPlayer.getNextPoint();this.play(EPlayer.black,o.xIndex,o.yIndex)}},t.prototype.play=function(e,t,r){this.chessData.update(t,r,e);var i=this.gapHeight,a=this.createBitmapByName(e===EPlayer.white?"white_png":"black_png");a.x=t*i,a.y=r*i,a.width=a.height=.66*i,a.anchorOffsetX=a.width/2,a.anchorOffsetY=a.height/2,this.chessRect.addChild(a);var n=this.chessData.judge(t,r,e);n&&(alert("You "+(2===e?"Win":"Lose")+" ！！！"),this.chessRect.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onPlay,this))},t.prototype.getPosIndexes=function(e,t,r){var i=Math.round(e/r),a=Math.round(t/r);return{xIndex:i,yIndex:a}},t}(eui.UILayer);__reflect(Main.prototype,"Main");var MAX_LINES=15,DebugPlatform=function(){function e(){}return e.prototype.getUserInfo=function(){return __awaiter(this,void 0,void 0,function(){return __generator(this,function(e){return[2,{nickName:"username"}]})})},e.prototype.login=function(){return __awaiter(this,void 0,void 0,function(){return __generator(this,function(e){return[2]})})},e}();__reflect(DebugPlatform.prototype,"DebugPlatform",["Platform"]),window.platform||(window.platform=new DebugPlatform);var ThemeAdapter=function(){function e(){}return e.prototype.getTheme=function(e,t,r,i){function a(e){t.call(i,e)}function n(t){t.resItem.url==e&&(RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR,n,null),r.call(i))}var o=this;if("undefined"!=typeof generateEUI)egret.callLater(function(){t.call(i,generateEUI)},this);else if("undefined"!=typeof generateEUI2)RES.getResByUrl("resource/gameEui.json",function(e,r){window.JSONParseClass.setData(e),egret.callLater(function(){t.call(i,generateEUI2)},o)},this,RES.ResourceItem.TYPE_JSON);else if("undefined"!=typeof generateJSON)if(e.indexOf(".exml")>-1){var s=e.split("/");s.pop();var l=s.join("/")+"_EUI.json";generateJSON.paths[e]?egret.callLater(function(){t.call(i,generateJSON.paths[e])},this):RES.getResByUrl(l,function(r){window.JSONParseClass.setData(r),egret.callLater(function(){t.call(i,generateJSON.paths[e])},o)},this,RES.ResourceItem.TYPE_JSON)}else egret.callLater(function(){t.call(i,generateJSON)},this);else RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR,n,null),RES.getResByUrl(e,a,this,RES.ResourceItem.TYPE_TEXT)},e}();__reflect(ThemeAdapter.prototype,"ThemeAdapter",["eui.IThemeAdapter"]);