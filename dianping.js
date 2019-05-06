
window.onload = function () {
    var pic = document.getElementById('pic')
    var list = document.getElementById('list');
    var buttons = document.getElementById('buttons').getElementsByTagName('span');
    var prev = document.getElementById('prev');
    var next = document.getElementById('next');
    var index = 1;
    var timer = null;
    var btn = document.getElementById('btn');
    var timer = null;
    var istop = true;
    var clientheight = document.documentElement.clientHeight
    window.onscroll = function () {
        var ostop = document.documentElement.scrollTop || document.body.scrollTop;
        if (ostop >= clientheight) {
            btn.style.display = 'block';
        }
        else {
            btn.style.display = 'none';
        }
        if (!istop) {
            clearInterval(timer);
        }
        istop = false;
    }
    btn.onclick = function () {
        timer = setInterval(function () {
            var ostop = document.documentElement.scrollTop || document.body.scrollTop;

            var speed = Math.floor(-ostop / 6);
            document.documentElement.scrollTop = document.body.scrollTop = ostop + speed;
            istop = true;
            if (ostop == 0) {
                clearInterval(timer);
            }
        }, 30)
    }
    function showbutton() {
        for (var i = 0; i < buttons.length; i++) {
            if (buttons[i].className == 'on') {
                buttons[i].className = '';
                break;
            }
        }
        buttons[index - 1].className = 'on';
    }
    function animate(offset) {
        var newleft = list.offsetLeft + offset;
        list.style.left = newleft + 'px';
        if (newleft > 0) {
            list.style.left = -1600 + 'px';
        }
        if (newleft < -1600) {
            list.style.left = 0 + 'px';
        }

    }
    function play() {
        timer = setInterval(function () {
            next.onclick();
        }, 3000)
    }

    function stop() {
        clearInterval(timer);
    }
    next.onclick = function () {
        if (index == 3) {
            index = 1;
        }
        else {


            index += 1;
        }
        showbutton();
        animate(-800);
    }
    prev.onclick = function () {
        if (index == 1) {
            index = 3;
        }
        else {

            index -= 1;
        }
        showbutton();
        animate(800);
    }
    for (var i = 0; i < buttons.length; i++) {
        buttons[i].onclick = function () {
            if (this.className == 'on') {
                return;
            }
            var myindex = parseInt(this.getAttribute('index'));
            var offset = -800 * (myindex - index);
            animate(offset);
            index = myindex;
            showbutton();
        }
    }
    play();
    pic.onmouseover = stop;
    pic.onmouseout = play;
}
