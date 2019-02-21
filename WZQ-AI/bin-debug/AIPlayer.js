var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var AIPlayer = (function () {
    function AIPlayer(data) {
        this.chessData = data;
    }
    AIPlayer.prototype.getNextPoint = function () {
        var scoreArr = [];
        for (var i = 0; i < this.chessData.length; i++) {
            for (var j = 0; j < this.chessData[i].length; j++) {
                if (this.chessData[i][j] != 0) {
                    continue;
                }
                var score = this.computerTotolScore(i, j);
                scoreArr.push({ xIndex: i, yIndex: j, score: score });
            }
        }
        scoreArr.sort(function (s1, s2) {
            return s1.score >= s2.score ? -1 : 1;
        });
        return scoreArr[0];
    };
    AIPlayer.prototype.computeScore = function (player, xIndex, yIndex) {
        var chessData = this.chessData;
        var x = xIndex;
        var y = yIndex;
        var ss1 = { live1: false, live2: false, count: 1 }, ss2 = { live1: false, live2: false, count: 1 }, ss3 = { live1: false, live2: false, count: 1 }, ss4 = { live1: false, live2: false, count: 1 };
        var retArr = [ss1, ss2, ss3, ss4];
        var minx = 0, maxx = 0, miny = 0, maxy = 0;
        minx = x - 4 >= 0 ? x - 4 : 0;
        miny = y - 4 >= 0 ? y - 4 : 0;
        maxx = x + 4 >= chessData.length - 1 ? chessData.length - 1 : x + 4;
        maxy = y + 4 >= chessData.length - 1 ? chessData.length - 1 : y + 4;
        //左右
        for (var i_1 = x; i_1 >= minx; i_1--) {
            if (i_1 == x) {
                continue;
            }
            if (chessData[i_1][y] == 0) {
                ss1.live1 = true;
                break;
            }
            if (chessData[i_1][y] != player) {
                ss1.live1 = false;
                break;
            }
            ss1.count++;
        }
        for (var i_2 = x; i_2 <= maxx; i_2++) {
            if (i_2 == x) {
                continue;
            }
            if (chessData[i_2][y] == 0) {
                ss1.live2 = true;
                break;
            }
            if (chessData[i_2][y] != player) {
                ss1.live2 = false;
                break;
            }
            ss1.count++;
        }
        //上下判断
        for (var i_3 = y; i_3 >= miny; i_3--) {
            if (i_3 == y) {
                continue;
            }
            if (chessData[x][i_3] == 0) {
                ss2.live1 = true;
                break;
            }
            if (chessData[x][i_3] != player) {
                ss2.live1 = false;
                break;
            }
            ss2.count++;
        }
        for (var i_4 = y; i_4 <= maxy; i_4++) {
            if (i_4 == y) {
                continue;
            }
            if (chessData[x][i_4] == 0) {
                ss2.live2 = true;
                break;
            }
            if (chessData[x][i_4] != player) {
                ss2.live2 = false;
                break;
            }
            ss2.count++;
        }
        //左上右下判断  
        for (var i_5 = x, j_1 = y; i_5 >= minx && j_1 >= miny; i_5--, j_1--) {
            if (i_5 == x) {
                continue;
            }
            if (chessData[i_5][j_1] == 0) {
                ss3.live1 = true;
                break;
            }
            if (chessData[i_5][j_1] != player) {
                ss3.live1 = false;
                break;
            }
            ss3.count++;
        }
        for (var i_6 = x, j_2 = y; i_6 <= maxx && j_2 <= maxy; i_6++, j_2++) {
            if (i_6 == x) {
                continue;
            }
            if (chessData[i_6][j_2] == 0) {
                ss3.live2 = true;
                break;
            }
            if (chessData[i_6][j_2] != player) {
                ss3.live2 = false;
                break;
            }
            ss3.count++;
        }
        //右上左下判断
        for (var i = x, j = y; i >= minx && j <= maxy; i--, j++) {
            if (i == x) {
                continue;
            }
            if (chessData[i][j] == 0) {
                ss4.live1 = true;
                break;
            }
            if (chessData[i][j] != player) {
                ss4.live1 = false;
                break;
            }
            ss4.count++;
        }
        for (var i = x + 1, j = y - 1; i <= maxx && j >= miny; i++, j--) {
            if (i == x) {
                continue;
            }
            if (chessData[i][j] == 0) {
                ss4.live2 = true;
                break;
            }
            if (chessData[i][j] != player) {
                ss4.live2 = false;
                break;
            }
            ss4.count++;
        }
        return retArr;
    };
    AIPlayer.prototype.getScoreLevels = function (scs) {
        var scores = { live5: 0, live4: 0, dead4: 0, live3: 0, dead3: 0, live2: 0, dead2: 0, live1: 0 };
        scs.forEach(function (value, index, arr) {
            switch (value.count) {
                case 5:
                    scores.live5 = 1;
                    break;
                case 4:
                    scores.live4 += (value.live1 && value.live2) ? 1 : 0;
                    scores.dead4 += (value.live1 && value.live2) ? 0 : 1;
                    break;
                case 3:
                    scores.live3 += (value.live1 && value.live2) ? 1 : 0;
                    scores.dead3 += (value.live1 && value.live2) ? 0 : 1;
                    break;
                case 2:
                    scores.live2 += (value.live1 && value.live2) ? 1 : 0;
                    scores.dead2 += (value.live1 && value.live2) ? 0 : 1;
                    break;
                default:
                    scores.live1 += 1;
                    break;
            }
        });
        return scores;
    };
    /**
     *  成5, 12000分
        活4、双死4、死4活3， 5500分
        双活3，2700分
        死3活3， 1300分
        活3， 630分
        双活2， 150分
        死4， 310分
        死3， 70分
        活2， 30分
        死2， 10分
        单子 0分
     */
    AIPlayer.prototype.getHighestScore = function (scoreLevels) {
        var s = 0;
        if (scoreLevels.live5 == 1) {
            s = 12000;
        }
        else if (scoreLevels.live4 == 1 || scoreLevels.dead4 == 2 || (scoreLevels.dead4 == 1 && scoreLevels.live3 == 1)) {
            s = 5500;
        }
        else if (scoreLevels.live3 == 2) {
            s = 2700;
        }
        else if (scoreLevels.dead3 == 1 && scoreLevels.live3 == 1) {
            s = 1300;
        }
        else if (scoreLevels.dead4 == 1) {
            s = 310;
        }
        else if (scoreLevels.live3 == 1) {
            s = 630;
        }
        else if (scoreLevels.live2 == 2) {
            s = 150;
        }
        else if (scoreLevels.dead3 == 1) {
            s = 70;
        }
        else if (scoreLevels.live2 == 1) {
            s = 30;
        }
        else if (scoreLevels.dead2 == 1) {
            s = 10;
        }
        else {
            s = 0;
        }
        return s;
    };
    AIPlayer.prototype.computerTotolScore = function (xIndex, yIndex) {
        var scs1 = this.computeScore(EPlayer.black, xIndex, yIndex);
        var scs2 = this.computeScore(EPlayer.white, xIndex, yIndex);
        var scoresMy = this.getScoreLevels(scs1);
        var scoresEnemy = this.getScoreLevels(scs2);
        var s1 = this.getHighestScore(scoresMy);
        var s2 = this.getHighestScore(scoresEnemy);
        return s1 + s2;
    };
    return AIPlayer;
}());
__reflect(AIPlayer.prototype, "AIPlayer");
//# sourceMappingURL=AIPlayer.js.map