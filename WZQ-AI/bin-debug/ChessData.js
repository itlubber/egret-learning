var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ChessData = (function () {
    function ChessData(max) {
        this.max = max;
        this.lastPlayer = null;
        this.max = max;
        this.initializeArray();
    }
    ChessData.prototype.initializeArray = function () {
        var arr = new Array(this.max);
        for (var i = 0; i < this.max; i++) {
            arr[i] = new Array(this.max);
            for (var j = 0; j < this.max; j++) {
                arr[i][j] = 0;
            }
        }
        this.data = arr;
    };
    /**
     * value 1 黑，2 白
     */
    ChessData.prototype.update = function (xIndex, yIndex, player) {
        if (xIndex >= 0 && xIndex < this.max && yIndex >= 0 && yIndex < this.max) {
            this.data[xIndex][yIndex] = player;
            this.lastXIndex = xIndex;
            this.lastYIndex = yIndex;
            this.lastPlayer = player;
        }
    };
    ChessData.prototype.judge = function (x, y, player) {
        var data = this.data;
        var count1 = 0;
        var count2 = 0;
        var count3 = 0;
        var count4 = 0;
        //左右判断
        for (var i = x; i >= 0; i--) {
            if (data[i][y] != player) {
                break;
            }
            count1++;
        }
        for (var i = x + 1; i < 15; i++) {
            if (data[i][y] != player) {
                break;
            }
            count1++;
        }
        //上下判断
        for (var i = y; i >= 0; i--) {
            if (data[x][i] != player) {
                break;
            }
            count2++;
        }
        for (var i = y + 1; i < 15; i++) {
            if (data[x][i] != player) {
                break;
            }
            count2++;
        }
        //左上右下判断
        for (var i = x, j = y; i >= 0 && j >= 0; i--, j--) {
            if (data[i][j] != player) {
                break;
            }
            count3++;
        }
        for (var i = x + 1, j = y + 1; i < 15 && j < 15; i++, j++) {
            if (data[i][j] != player) {
                break;
            }
            count3++;
        }
        //右上左下判断
        for (var i = x, j = y; i >= 0 && j < 15; i--, j++) {
            if (data[i][j] != player) {
                break;
            }
            count4++;
        }
        for (var i = x + 1, j = y - 1; i < 15 && j >= 0; i++, j--) {
            if (data[i][j] != player) {
                break;
            }
            count4++;
        }
        if (count1 >= 5 || count2 >= 5 || count3 >= 5 || count4 >= 5) {
            return true;
        }
    };
    return ChessData;
}());
__reflect(ChessData.prototype, "ChessData");
//# sourceMappingURL=ChessData.js.map