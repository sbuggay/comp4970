var canvas = document.getElementById("c");
var c = canvas.getContext("2d");
c.font = "24px sans-serif";



var x = 0,
y = 0,
tx = 0,
ty = 0;
moving = false,
width = 800,
height = 600,
keys = [],
p = 0;
actions = [];

var map = new Array(10);
  for (var i = 0; i < 10; i++) {
    map[i] = new Array(10);
  }

for(var i = 0; i < 10; i++) {
    for(var j = 0; j < 10; j++) {
        map[i][j] = Math.floor((Math.random() * 3));
    }
}

var robot = new Image;
robot.src = "robot.png";
var normal = new Image;
normal.src = "tile.png"
var fall = new Image;
fall.src = "fall.png"



function print_actions() {
    
    for(var i = 0; i < actions.length; i++) {
        c.fillStyle = "black";
        if(p - 1 == i) {
            c.fillStyle = "red";
        }
        switch(actions[i]) {

            case 0:
                c.fillText("move right", 600, i * 24 + 24);
            break;
            case 1:
                c.fillText("move left", 600, i * 24 + 24);
            break;
            case 2:
                c.fillText("move down", 600, i * 24 + 24);
            break;
            case 3:
                c.fillText("move up", 600, i * 24 + 24);
            break;
            
        }
    }
}

function update() {
    if (moving == false) {
        if(keys[37]) {
            tx -= 1;
            moving = true;
        }

        if(keys[39]) {
            tx += 1;
            moving = true;
        }

        if(keys[38]) {  
            ty -= 1;
            moving = true;
        }

        if(keys[40]) {
            ty += 1;
            moving = true;
        }
    }

    if (moving) {
        moving = false;
        if (tx * 60 > x) {
            x++;
            moving = true;
        }
        if (tx * 60 < x) {
            x--;
            moving = true;
        }
        if (ty * 60 > y) {
            y++;
            moving = true;
        }
        if (ty * 60 < y) {
            y--;
            moving = true;
        }

    }


};

function process(var1) {
    switch(var1) {
        case 0:
            tx += 1;
            moving = true;
        break;
        case 1:
            tx -= 1;
            moving = true;
        break;
        case 2:
            ty += 1;
            moving = true;
        break;
        case 3:
            ty -= 1;
            moving = true;
        break;
    }
    
}




var loop = setInterval(function() {
    update();
    if (!moving) {
        process(actions[p]);
        p++;
    }


    c.fillStyle = "black";
    c.fillRect(0, 0, 600, 600);
    c.fillStyle = "gray";
    c.fillRect(600, 0, 800, 600);

    for(var i = 0; i < 10; i++) {
        for(var j = 0; j < 10; j++) {
            switch(map[i][j]) {
                case 0:
                c.drawImage(normal, i * 60, j * 60);
                break;

                case 1:
                c.drawImage(fall, i * 60, j * 60);
                break;

                case 2:

                break;
            }
            
        }
    }


    c.drawImage(robot, x, y);

    print_actions();
    
}, 1);


document.body.addEventListener("keydown", function (e) {
    keys[e.keyCode] = true;
});
document.body.addEventListener("keyup", function (e) {
    keys[e.keyCode] = false;
});