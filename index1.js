// 0找到需要数据
var row = 10;
var col = 10;
var str = "";
var ul = document.getElementById('app');
var p = document.getElementsByTagName("p")[0];
var btn = document.getElementsByTagName("button")[0]
var grid = new Array();
var key = true;
var count = 0;
var fen = 10;
//游戏初始化
function init() {
    p.innerHTML = "你走了" + count + "步";
    createli();
    createfei();
    dianji();
}
init()

// 1生成表格 并插入
function createli() {
    // 1 
    for (var i = 0; i < row; i++) {
        for (var j = 0; j < col; j++) {
            str += `<li></li>`;
        }
    }
    ul.innerHTML = str;
}

//z在表格中生成飞机
function createfei() {
    //给li绑定数组
    var blocks = document.getElementsByTagName('li');
    for (let i = 0; i < blocks.length; i++) {
        // console.log(blocks.length)
        if (i % col === 0) {
            grid.push(new Array());
        }
        grid[parseInt(i / col)].push(blocks[i]);
    }
    // 生成飞机
    var num1 = Math.floor(Math.random() * 7 + 1)
    var num2 = Math.floor(Math.random() * 6 + 2)
    grid[num1 - 1][num2].className = "white"
    grid[num1][num2 - 1].className = "white"
    grid[num1][num2 - 2].className = "white"
    grid[num1][num2 + 1].className = "white"
    grid[num1][num2 + 2].className = "white"
    grid[num1 + 1][num2].className = "white"
    grid[num1 + 2][num2].className = "white"
    grid[num1 + 2][num2 - 1].className = "white"
    grid[num1 + 2][num2 + 1].className = "white"
    grid[num1][num2].className = "white"

}


//给表格添加事件
function dianji() {
    ul.onclick = function(e) {
        if (key) {
            count++;
            fen -= 0.5;
            p.innerHTML = "你走了" + count + "步";
            if (e.target.classList.contains("white")) {
                e.target.classList.remove("white")
                e.target.setAttribute("class", "red")
            }
            //点击不到红色的变蓝
            if (e.target.attributes.length == 0 & key) {
                e.target.className = "blue"
            }
            //获取剩下的还有几个红色的没有点
            var ai = document.querySelectorAll('.white')
                //如果可以判断了就直接赢，并给出分数
            if (ai.length < 6 && key) {
                for (var ll = 0; ll < ai.length; ll++) {
                    ai[ll].setAttribute("class", "white red");
                }
                //给出分数
                setTimeout(() => {
                    alert("你的分数为" + fen);
                    p.innerHTML = "你走了" + count + "步";
                    key = false;
                    alert("点击下面的按钮重新开始");
                    //重新添加事件，把上一个事件覆盖掉

                    ul.onclick = overgo;
                }, 0.2);

            }
        }
    };
}
// 游戏结束还要死活不听 还要点 就执行他
function overgo() {
    alert("疼，别点了")
    ul.onclick = function() {
        alert("再点游戏重新开始了，嗷嗷嗷");
        ul.onclick = function() {
            alert("我不骗你，嘻嘻 ,不信你点确定试一试");
            over()
        }
    };
}

// 重新游戏开始执行的
function over() {
    str = "";
    count = 0;
    grid = []
    key = true;
    fen = 10;
    ul.innerHTML = "";
    p.innerHTML = "你走了" + count + "步";
    init()
}
//游戏重新开始
btn.onclick = over;