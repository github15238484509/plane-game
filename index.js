var row = 10;
var col = 10;
var str = "";
var ul = document.getElementById('app');

var grid = new Array();
var key = true;
var count = 0;
var fen = 10;
var lang = 0;

function init() {
    for (var i = 0; i < row; i++) {
        for (var j = 0; j < col; j++) {
            str += `<li></li>`;
        }
    }
    ul.innerHTML = str;
    ul.onclick = function(e) {
        count++;
        fen -= 0.5;
        p.innerHTML = "你走了" + count + "步";

        if (e.target.classList.contains("white")) {
            e.target.classList.remove("white")
            e.target.setAttribute("class", "red")
        }
        console.log(e.target.attributes.length == 0)
        if (e.target.attributes.length == 0) {
            e.target.className = "blue"
        }
        var ai = document.querySelectorAll('.white')
        if (ai.length < 6 && key) {
            for (var ll = 0; ll < ai.length; ll++) {
                ai[ll].setAttribute("class", "white red");
            }
            setTimeout(() => {
                alert("你的分数为" + fen)
            }, 0.2);
            key = false
            ul.onclick = function() {
                alert("已经结束了，咱放弃吧");
                lang++;
                if (lang > 0) {
                    ul.onclick = function() {
                        console.log(lang)
                        alert("看到下面的重新开始，点他，咱再来一局");
                        alert("再点就要重新开始了");
                        if (lang === 1) {
                            ul.onclick = function() {
                                over();
                                setTimeout(() => {
                                    count = 0;
                                    p.innerHTML = "你走了" + count + "步";
                                    alert("重新开始了，嗷嗷嗷")
                                }, 0);

                            }
                        }
                    }
                }
            }
        }
    };
    var blocks = document.getElementsByTagName('li');

    for (let i = 0; i < blocks.length; i++) {
        // console.log(blocks.length)
        if (i % col === 0) {
            grid.push(new Array());
        }
        grid[parseInt(i / col)].push(blocks[i]);
    }
    random();

}
init()

function random() {
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

function over() {
    ul.innerHTML = "";
    str = "";
    grid = [];
    init()
    key = true;
    count = 0;
    p.innerHTML = "你走了" + count + "步";
    fen = 10;
    lang = 0;
}

var p = document.getElementsByTagName("p")[0];
var btn = document.getElementsByTagName("button")[0]
p.innerHTML = "你走了" + count + "步";
btn.onclick = function() {
    over()
}