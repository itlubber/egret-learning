

class ChessData {
    public data: Array<Array<number>>
    public lastXIndex: number
    public lastYIndex: number
    public lastPlayer: EPlayer | null = null

    constructor(public max: number) {
        this.max = max
        this.initializeArray()
    }

    private initializeArray() {
        const arr = new Array(this.max)
        for (let i = 0; i < this.max; i++) {
            arr[i] = new Array(this.max)
            for (let j = 0; j < this.max; j++) {
                arr[i][j] = 0
            }
        }
        this.data = arr
    }

    /**
     * value 1 黑，2 白
     */
    public update(xIndex: number, yIndex: number, player: EPlayer) {
        if (xIndex >= 0 && xIndex < this.max && yIndex >= 0 && yIndex < this.max) {
            this.data[xIndex][yIndex] = player
            this.lastXIndex = xIndex
            this.lastYIndex = yIndex
            this.lastPlayer = player
        }
    }

    public judge(x: number, y: number, player: EPlayer) {
        const data = this.data

        let count1 = 0;
        let count2 = 0;
        let count3 = 0;
        let count4 = 0;

        //左右判断
        for (let i = x; i >= 0; i--) {
            if (data[i][y] != player) {
                break;
            }
            count1++;
        }
        for (let i = x + 1; i < 15; i++) {
            if (data[i][y] != player) {
                break;
            }
            count1++;
        }
        //上下判断
        for (let i = y; i >= 0; i--) {
            if (data[x][i] != player) {
                break;
            }
            count2++;
        }
        for (let i = y + 1; i < 15; i++) {
            if (data[x][i] != player) {
                break;
            }
            count2++;
        }
        //左上右下判断
        for (let i = x, j = y; i >= 0 && j >= 0; i-- , j--) {
            if (data[i][j] != player) {
                break;
            }
            count3++;
        }
        for (let i = x + 1, j = y + 1; i < 15 && j < 15; i++ , j++) {
            if (data[i][j] != player) {
                break;
            }
            count3++;
        }
        //右上左下判断
        for (let i = x, j = y; i >= 0 && j < 15; i-- , j++) {
            if (data[i][j] != player) {
                break;
            }
            count4++;
        }
        for (let i = x + 1, j = y - 1; i < 15 && j >= 0; i++ , j--) {
            if (data[i][j] != player) {
                break;
            }
            count4++;
        }

        if (count1 >= 5 || count2 >= 5 || count3 >= 5 || count4 >= 5) {
            return true
        }
    }

    public reset() {
        this.lastXIndex = this.lastYIndex = 0
        this.lastPlayer = null
        const arr = this.data
        for (let i = 0; i < this.max; i++) {
            arr[i] = new Array(this.max)
            for (let j = 0; j < this.max; j++) {
                arr[i][j] = 0
            }
        }
    }
}