//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Main.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        egret.lifecycle.addLifecycleListener(function (context) {
            // custom lifecycle plugin
        });
        egret.lifecycle.onPause = function () {
            egret.ticker.pause();
        };
        egret.lifecycle.onResume = function () {
            egret.ticker.resume();
        };
        //inject the custom material parser
        //注入自定义的素材解析器
        var assetAdapter = new AssetAdapter();
        egret.registerImplementation("eui.IAssetAdapter", assetAdapter);
        egret.registerImplementation("eui.IThemeAdapter", new ThemeAdapter());
        this.runGame().catch(function (e) {
            console.log(e);
        });
    };
    Main.prototype.runGame = function () {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.loadResource()];
                    case 1:
                        _a.sent();
                        this.createGameScene();
                        return [4 /*yield*/, RES.getResAsync("description_json")];
                    case 2:
                        result = _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Main.prototype.loadResource = function () {
        return __awaiter(this, void 0, void 0, function () {
            var loadingView, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        loadingView = new LoadingUI();
                        this.stage.addChild(loadingView);
                        return [4 /*yield*/, RES.loadConfig("resource/default.res.json", "resource/")];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.loadTheme()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, RES.loadGroup("preload", 0, loadingView)];
                    case 3:
                        _a.sent();
                        this.stage.removeChild(loadingView);
                        return [3 /*break*/, 5];
                    case 4:
                        e_1 = _a.sent();
                        console.error(e_1);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    Main.prototype.loadTheme = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            // load skin theme configuration file, you can manually modify the file. And replace the default skin.
            //加载皮肤主题配置文件,可以手动修改这个文件。替换默认皮肤。
            var theme = new eui.Theme("resource/default.thm.json", _this.stage);
            theme.addEventListener(eui.UIEvent.COMPLETE, function () {
                resolve();
            }, _this);
        });
    };
    /**
     * 创建场景界面
     * Create scene interface
     */
    Main.prototype.createGameScene = function () {
        this.chessData = new ChessData(MAX_LINES);
        this.aiPlayer = new AIPlayer(this.chessData.data);
        // 创建棋盘
        this.createChessBoard();
    };
    /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
     */
    Main.prototype.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    };
    Main.prototype.createTopPanel = function () {
    };
    /**
     * 创建棋盘
     */
    Main.prototype.createChessBoard = function () {
        var linesCount = MAX_LINES;
        var stageWidth = this.stage.stageWidth;
        var chessWith = stageWidth * .9;
        var rect = new eui.Rect(chessWith, chessWith);
        rect.fillColor = 0xFFFFFF;
        rect.x = 0;
        rect.y = 100;
        rect.horizontalCenter = 0;
        rect.verticalCenter = 0;
        this.chessRect = rect;
        this.gapHeight = ~~(chessWith / (linesCount - 1));
        var gapHeight = this.gapHeight;
        var shape = new egret.Shape();
        shape.graphics.lineStyle(2, 0x000000);
        // 横线
        for (var i = 0; i < linesCount; i++) {
            shape.graphics.moveTo(0, gapHeight * i);
            shape.graphics.lineTo(chessWith, gapHeight * i);
        }
        // 竖线
        for (var i = 0; i < linesCount; i++) {
            shape.graphics.moveTo(gapHeight * i, 0);
            shape.graphics.lineTo(gapHeight * i, chessWith);
        }
        this.chessBoard = shape;
        rect.addChild(this.chessBoard);
        this.addChild(this.chessRect);
        this.chessRect.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onPlay, this);
    };
    Main.prototype.onPlay = function (evt) {
        var linesCount = MAX_LINES;
        var gapHeight = this.gapHeight;
        var x = evt.localX;
        var y = evt.localY;
        var posIndexes = this.getPosIndexes(x, y, gapHeight);
        // 边界
        if (posIndexes.xIndex === 0 || posIndexes.xIndex === linesCount - 1 || posIndexes.yIndex === 0 || posIndexes.yIndex === linesCount - 1) {
            return;
        }
        //已经有子
        if (this.chessData.data[posIndexes.xIndex][posIndexes.yIndex] !== 0) {
            return;
        }
        // 上一步不是黑子或者不是null
        if (this.chessData.lastPlayer !== EPlayer.black && this.chessData.lastPlayer != null) {
            return;
        }
        //下棋
        this.play(EPlayer.white, posIndexes.xIndex, posIndexes.yIndex);
        var pos = this.aiPlayer.getNextPoint();
        this.play(EPlayer.black, pos.xIndex, pos.yIndex);
    };
    Main.prototype.play = function (player, xIndex, yIndex) {
        //更新数据
        this.chessData.update(xIndex, yIndex, player);
        //绘制棋子
        var gapHeight = this.gapHeight;
        var chess = this.createBitmapByName(player === EPlayer.white ? 'white_png' : 'black_png');
        chess.x = xIndex * gapHeight;
        chess.y = yIndex * gapHeight;
        chess.width = chess.height = gapHeight * 0.66;
        chess.anchorOffsetX = chess.width / 2;
        chess.anchorOffsetY = chess.height / 2;
        this.chessRect.addChild(chess);
        //检查结果
        var success = this.chessData.judge(xIndex, yIndex, player);
        if (success) {
            console.log(player + " \u80DC\u5229");
            this.chessRect.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onPlay, this);
        }
    };
    Main.prototype.getPosIndexes = function (x, y, gapHeight) {
        var xIndex = Math.round(x / gapHeight);
        var yIndex = Math.round(y / gapHeight);
        return {
            xIndex: xIndex,
            yIndex: yIndex
        };
    };
    return Main;
}(eui.UILayer));
__reflect(Main.prototype, "Main");
var MAX_LINES = 15;
//# sourceMappingURL=Main.js.map