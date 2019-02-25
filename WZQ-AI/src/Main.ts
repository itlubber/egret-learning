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

class Main extends eui.UILayer {


    private chessBoard: egret.Shape
    private chessRect: eui.Rect
    private gapHeight: number
    private chessData: ChessData
    private aiPlayer: AIPlayer
    private ltSteps: LabelTag
    private playChesses: egret.Bitmap[] = []
    private btnBack: eui.Button

    protected createChildren(): void {
        super.createChildren();

        egret.lifecycle.addLifecycleListener((context) => {
            // custom lifecycle plugin
        })

        egret.lifecycle.onPause = () => {
            egret.ticker.pause();
        }

        egret.lifecycle.onResume = () => {
            egret.ticker.resume();
        }

        //inject the custom material parser
        //注入自定义的素材解析器
        let assetAdapter = new AssetAdapter();
        egret.registerImplementation("eui.IAssetAdapter", assetAdapter);
        egret.registerImplementation("eui.IThemeAdapter", new ThemeAdapter());


        this.runGame().catch(e => {
            console.log(e);
        })
    }

    private async runGame() {
        await this.loadResource()
        this.createGameScene();
        const result = await RES.getResAsync("description_json")

    }

    private async loadResource() {
        try {
            const loadingView = new LoadingUI();
            this.stage.addChild(loadingView);
            await RES.loadConfig("resource/default.res.json", "resource/");
            await this.loadTheme();
            await RES.loadGroup("preload", 0, loadingView);
            this.stage.removeChild(loadingView);
        }
        catch (e) {
            console.error(e);
        }
    }

    private loadTheme() {
        return new Promise((resolve, reject) => {
            // load skin theme configuration file, you can manually modify the file. And replace the default skin.
            //加载皮肤主题配置文件,可以手动修改这个文件。替换默认皮肤。
            let theme = new eui.Theme("resource/default.thm.json", this.stage);
            theme.addEventListener(eui.UIEvent.COMPLETE, () => {
                resolve();
            }, this);
        })
    }

    /**
     * 创建场景界面
     * Create scene interface
     */
    protected createGameScene(): void {
        this.chessData = new ChessData(MAX_LINES)
        this.aiPlayer = new AIPlayer(this.chessData.data)
        // 创建棋盘
        this.createChessBoard()

        this.createTopPanel()

        this.createOpButton()

    }
    /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
     */
    private createBitmapByName(name: string): egret.Bitmap {
        let result = new egret.Bitmap();
        let texture: egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }


    private createTopPanel(): void {


        this.ltSteps = new LabelTag()
        const ltSteps = this.ltSteps
        ltSteps.label_title.text = '步骤'
        ltSteps.label_value.text = '0'
        ltSteps.label_value.textColor = 0x000000
        ltSteps.x = 50
        ltSteps.y = 50
        ltSteps.width = 300
        ltSteps.height = 50
        this.addChild(ltSteps)

        let lt = new LabelTag()
        lt.label_title.text = '白方'
        lt.label_value.text = '玩家'
        lt.x = 50
        lt.y = 100
        lt.width = 300
        lt.height = 50
        this.addChild(lt)


        lt = new LabelTag()
        lt.label_title.text = '黑方'
        lt.label_value.text = 'AI'
        lt.x = 50
        lt.y = 150
        lt.width = 300
        lt.height = 50
        this.addChild(lt)
    }

    private createOpButton() {

        const group = new eui.Group()
        group.layout = new eui.HorizontalLayout()

        const btnBack = new eui.Button()
        this.btnBack = btnBack
        btnBack.label = '悔棋'
        btnBack.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onPlayBack, this)
        group.addChild(btnBack)

        const btn = new eui.Button()
        btn.label = '重新开始'
        btn.addEventListener(egret.TouchEvent.TOUCH_TAP, function (evt: egret.TouchEvent) {
            // 重置计数
            this.ltSteps.label_value.text = '0'

            //重置数据
            this.chessData.reset()
            this.playChesses = []

            // 重新初始化棋盘
            this.chessRect.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onPlay, this)
            this.removeChild(this.chessRect)

            this.createChessBoard()
            btnBack.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onPlayBack, this)

        }, this)

        group.addChild(btn)


        group.bottom = 50
        group.left = this.stage.stageWidth / 2
        group.horizontalCenter = 0

        this.addChild(group)

    }


    /**
     * 创建棋盘
     */
    private createChessBoard(): void {

        const linesCount = MAX_LINES

        const stageWidth: number = this.stage.stageWidth;
        const chessWith = stageWidth

        const rect: eui.Rect = new eui.Rect(chessWith, chessWith)
        rect.fillColor = 0xFFFFFF
        rect.x = 0
        rect.y = 100
        rect.horizontalCenter = 0
        rect.verticalCenter = 0
        this.chessRect = rect

        this.gapHeight = (chessWith / (linesCount - 1))
        const gapHeight = this.gapHeight

        const shape: egret.Shape = new egret.Shape();
        shape.graphics.lineStyle(2, 0x000000);

        // 横线
        for (let i = 0; i < linesCount; i++) {
            shape.graphics.moveTo(0, gapHeight * i)
            shape.graphics.lineTo(chessWith, gapHeight * i)
        }
        // 竖线
        for (let i = 0; i < linesCount; i++) {
            shape.graphics.moveTo(gapHeight * i, 0)
            shape.graphics.lineTo(gapHeight * i, chessWith)
        }

        this.chessBoard = shape

        rect.addChild(this.chessBoard)

        this.addChild(this.chessRect)

        this.chessRect.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onPlay, this)
    }

    private onPlay(evt: egret.TouchEvent) {

        const linesCount = MAX_LINES
        const gapHeight = this.gapHeight

        const x = evt.localX;
        const y = evt.localY
        const posIndexes = this.getPosIndexes(x, y, gapHeight)

        // 边界
        if (posIndexes.xIndex === 0 || posIndexes.xIndex === linesCount - 1 || posIndexes.yIndex === 0 || posIndexes.yIndex === linesCount - 1) {
            return;
        }

        //已经有子
        if (this.chessData.data[posIndexes.xIndex][posIndexes.yIndex] !== 0) {
            return;
        }

        // 上一步不是黑子或者不是null
        const steps = this.chessData.steps
        if (steps.length > 0 && steps[steps.length - 1].player !== EPlayer.black) {
            return;
        }

        //下棋
        this.play(EPlayer.white, posIndexes.xIndex, posIndexes.yIndex)
        this.ltSteps.label_value.text = (+this.ltSteps.label_value.text + 1) + ''

        // AI下棋
        const pos = this.aiPlayer.getNextPoint()
        this.play(EPlayer.black, pos.xIndex, pos.yIndex)

    }

    private onPlayBack(evt: egret.TouchEvent) {
        if (this.chessData.steps.length > 0 && this.playChesses.length > 0) {
            const blackChess = this.playChesses.pop()
            this.chessRect.removeChild(blackChess)
            this.chessData.back()

            const whiteChess = this.playChesses.pop()
            this.chessRect.removeChild(whiteChess)
            this.chessData.back()
        }
    }

    private play(player: EPlayer, xIndex: number, yIndex: number) {

        //更新数据
        this.chessData.update(xIndex, yIndex, player)
        //绘制棋子
        const gapHeight = this.gapHeight
        const chess = this.createBitmapByName(player === EPlayer.white ? 'white_png' : 'black_png')
        chess.x = xIndex * gapHeight
        chess.y = yIndex * gapHeight
        chess.width = chess.height = gapHeight * 0.66
        chess.anchorOffsetX = chess.width / 2
        chess.anchorOffsetY = chess.height / 2
        this.chessRect.addChild(chess)

        this.playChesses.push(chess)

        //检查结果
        const success = this.chessData.judge(xIndex, yIndex, player)
        if (success) {
            alert(`You ${player === 2 ? 'Win' : 'Lose'} ！！！`)
            this.chessRect.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onPlay, this)
            this.btnBack.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onPlayBack, this)
        }
    }

    private getPosIndexes(x: number, y: number, gapHeight: number): { xIndex: number, yIndex: number } {
        const xIndex = Math.round(x / gapHeight)
        const yIndex = Math.round(y / gapHeight)
        return {
            xIndex,
            yIndex
        }
    }
}


const MAX_LINES = 15