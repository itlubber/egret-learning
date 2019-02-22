interface ScoreElement {
    live1: boolean;
    live2: boolean;
    count: number
}

interface ScoreLevel {
    live5: number;
    live4: number;
    dead4: number;
    live3: number;
    dead3: number,
    live2: number;
    dead2: number;
    live1: number
}


class AIPlayer {

    private chessData: number[][]

    constructor(data: number[][]) {
        this.chessData = data
    }

    public getNextPoint() {
        const scoreArr = [];
        for (let i = 1; i < this.chessData.length - 1; i++) {
            for (let j = 1; j < this.chessData[i].length - 1; j++) {
                if (this.chessData[i][j] != 0) {
                    continue;
                }
                const score = this.computerTotolScore(i, j);
                scoreArr.push({ xIndex: i, yIndex: j, score: score });
            }
        }

        scoreArr.sort(function (s1, s2) {
            return s1.score >= s2.score ? -1 : 1;
        });
        return scoreArr[0]
    }

    private computeScore(player: EPlayer, xIndex: number, yIndex: number): ScoreElement[] {
        const chessData = this.chessData
        const x = xIndex
        const y = yIndex
        const ss1 = { live1: false, live2: false, count: 1 },
            ss2 = { live1: false, live2: false, count: 1 },
            ss3 = { live1: false, live2: false, count: 1 },
            ss4 = { live1: false, live2: false, count: 1 };
        const retArr = [ss1, ss2, ss3, ss4];

        let minx = 0, maxx = 0, miny = 0, maxy = 0;
        minx = x - 4 >= 0 ? x - 4 : 0;
        miny = y - 4 >= 0 ? y - 4 : 0;
        maxx = x + 4 >= chessData.length - 1 ? chessData.length - 1 : x + 4;
        maxy = y + 4 >= chessData.length - 1 ? chessData.length - 1 : y + 4;

        //左右
        for (let i = x; i >= minx; i--) {
            if (i == x) {
                continue;
            }
            if (chessData[i][y] == 0) {
                ss1.live1 = true;
                break;
            }
            if (chessData[i][y] != player) {
                ss1.live1 = false;
                break;
            }
            ss1.count++;
        }

        for (let i = x; i <= maxx; i++) {
            if (i == x) {
                continue;
            }
            if (chessData[i][y] == 0) {
                ss1.live2 = true;
                break;
            }
            if (chessData[i][y] != player) {
                ss1.live2 = false;
                break;
            }
            ss1.count++;
        }

        //上下判断
        for (let i = y; i >= miny; i--) {
            if (i == y) {
                continue;
            }
            if (chessData[x][i] == 0) {
                ss2.live1 = true;
                break;
            }
            if (chessData[x][i] != player) {
                ss2.live1 = false;
                break;
            }
            ss2.count++;
        }

        for (let i = y; i <= maxy; i++) {
            if (i == y) {
                continue;
            }
            if (chessData[x][i] == 0) {
                ss2.live2 = true;
                break;
            }
            if (chessData[x][i] != player) {
                ss2.live2 = false;
                break;
            }
            ss2.count++;
        }
        //左上右下判断  
        for (let i = x, j = y; i >= minx && j >= miny; i-- , j--) {
            if (i == x) {
                continue;
            }
            if (chessData[i][j] == 0) {
                ss3.live1 = true;
                break;
            }
            if (chessData[i][j] != player) {
                ss3.live1 = false;
                break;
            }
            ss3.count++;
        }
        for (let i = x, j = y; i <= maxx && j <= maxy; i++ , j++) {
            if (i == x) {
                continue;
            }
            if (chessData[i][j] == 0) {
                ss3.live2 = true;
                break;
            }
            if (chessData[i][j] != player) {
                ss3.live2 = false;
                break;
            }
            ss3.count++;
        }

        //右上左下判断
        for (var i = x, j = y; i >= minx && j <= maxy; i-- , j++) {
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
        for (var i = x + 1, j = y - 1; i <= maxx && j >= miny; i++ , j--) {
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
    }

    private getScoreLevels(scs: ScoreElement[]) {
        const scores = { live5: 0, live4: 0, dead4: 0, live3: 0, dead3: 0, live2: 0, dead2: 0, live1: 0 };
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
                    scores.live1 += 1
                    break;
            }
        });
        return scores;
    }

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
    private getHighestScore(scoreLevels: ScoreLevel) {
        var s = 0;
        if (scoreLevels.live5 == 1) {
            s = 12000;
        } else if (scoreLevels.live4 == 1 || scoreLevels.dead4 == 2 || (scoreLevels.dead4 == 1 && scoreLevels.live3 == 1)) {
            s = 5500;
        } else if (scoreLevels.live3 == 2) {
            s = 2700;
        } else if (scoreLevels.dead3 == 1 && scoreLevels.live3 == 1) {
            s = 1300;
        } else if (scoreLevels.dead4 == 1) {
            s = 310;
        } else if (scoreLevels.live3 == 1) {
            s = 630;
        } else if (scoreLevels.live2 == 2) {
            s = 150;
        } else if (scoreLevels.dead3 == 1) {
            s = 70;
        } else if (scoreLevels.live2 == 1) {
            s = 30;
        } else if (scoreLevels.dead2 == 1) {
            s = 10;
        } else {
            s = 0;
        }
        return s;

    }

    private computerTotolScore(xIndex, yIndex) {
        const scs1: ScoreElement[] = this.computeScore(EPlayer.black, xIndex, yIndex);
        const scs2: ScoreElement[] = this.computeScore(EPlayer.white, xIndex, yIndex);
        const scoresMy: ScoreLevel = this.getScoreLevels(scs1);
        const scoresEnemy: ScoreLevel = this.getScoreLevels(scs2);
        const s1 = this.getHighestScore(scoresMy);
        const s2 = this.getHighestScore(scoresEnemy);
        return s1 + s2;
    }
}
