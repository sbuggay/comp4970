var canvas = document.getElementById("c");
var c = canvas.getContext("2d");
var audio = document.getElementById("audio");
c.font = "24px sans-serif";



var x = 0, //current x pixel value
y = 0, //current y pixel value
tx = 0, //target x tile value
ty = 0, //target y tile value
px = 0, //previous x tile value
py = 0, //previous y tile value
moving = false,
width = 800,
height = 600,
keys = [],
p = 0;
actions = [],
running = false,
direction = 0,
lives = 3,
wrenches = 0,
state = 0;

var map = new Array(10);
for (var i = 0; i < 10; i++) {
    map[i] = new Array(10);
}



var objects = [];

var roboot_front = new Image;
roboot_front.src = "roboot_front.png";
var roboot_back = new Image;
roboot_back.src = "roboot_back.png";
var roboot_left = new Image;
roboot_left.src = "roboot_left.png";
var roboot_right = new Image;
roboot_right.src = "roboot_right.png";
var normal = new Image;
normal.src = "tile.png"
var wall = new Image;
wall.src = "wall.png";
var fall = new Image;
fall.src = "fall.png"
var exit = new Image;
exit.src = "circuit.png";
var block = new Image;
block.src = "block.png";
var wrench = new Image;
wrench.src = "wrench.png";
var battery = new Image;
battery.src = "battery.png";
var portal_closed = new Image;
portal_closed.src = "portal-closed.png";
var portal_open = new Image;
portal_open.src = "portal-open.png";
var opening = new Image;
opening.src = "screen.png";


audio.addEventListener("ended", loop, false);



function load_map(level) {
    switch (level) {
        case 0:
        map = [
        [2,2,2,2,2,2,2,2,2,2],
        [2,0,3,0,0,0,0,3,3,2],
        [2,0,3,3,1,3,3,3,3,2],
        [2,0,3,3,0,0,0,3,3,2],
        [2,0,3,0,3,0,3,3,3,2],
        [2,0,3,0,0,0,0,3,3,2],
        [2,0,3,3,3,0,0,0,3,2],
        [2,0,3,3,3,0,0,3,3,2],
        [2,0,0,0,0,0,4,3,3,2],
        [2,2,2,2,2,2,2,2,2,2]
        ];


        
        tx = 1, ty = 3;
        px = tx, py = ty;
        x = tx * 60, y = ty * 60;

        objects.push(new Object(0, 5, 5));
        objects.push(new Object(0, 5, 3));
        objects.push(new Object(0, 3, 5));
        objects.push(new Object(0, 7, 5));
        objects.push(new Object(0, 6, 6));

        objects.push(new Object(1, 4, 3));
        objects.push(new Object(1, 1, 6));
        objects.push(new Object(1, 6, 7));

        objects.push(new Object(2, 1, 1));
        break;
        case 1:
        map = [
        [2,2,2,2,2,2,2,2,2,2],
        [2,3,3,0,0,0,0,3,3,2],
        [2,3,3,0,0,0,0,3,3,2],
        [2,3,3,0,0,0,0,3,3,2],
        [2,3,3,0,0,0,0,3,3,2],
        [2,3,3,0,0,0,0,3,3,2],
        [2,3,3,0,0,0,0,0,3,2],
        [2,3,3,0,0,0,0,3,3,2],
        [2,3,3,0,0,0,0,3,3,2],
        [2,2,2,2,2,2,2,2,2,2]
        ];


        
        tx = 1, ty = 3;
        px = tx, py = ty;
        x = tx * 60, y = ty * 60;

        objects.push(new Object(0, 5, 5));
        objects.push(new Object(0, 5, 3));
        objects.push(new Object(0, 3, 5));
        objects.push(new Object(0, 7, 5));
        objects.push(new Object(0, 6, 6));

        objects.push(new Object(1, 4, 3));
        objects.push(new Object(1, 1, 6));
        objects.push(new Object(1, 6, 7));

        objects.push(new Object(2, 1, 1));
        break;
        break;
    }

}

function loop() {
    audio.play();
}

function reset() {

    x = 0; //current x pixel value
    y = 0; //current y pixel value
    tx = 0; //target x tile value
    ty = 0; //target y tile value
    px = 0; //previous x tile value
    py = 0; //previous y tile value
    moving = false;
    width = 800;
    height = 600;
    keys = [];
    p = 0;
    actions = [];
    running = false;
    wrenches = 0;

    objects.length = 0;

    
    if(audio)
        audio.play();
}


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
    //move character to target tile
    if (moving) {
        moving = false;
        if (tx * 60 > x) {
            x++;
            moving = true;
            direction = 1;
        }
        if (tx * 60 < x) {
            x--;
            moving = true;
            direction = 3;
        }
        if (ty * 60 > y) {
            y++;
            moving = true;
            direction = 0;
        }
        if (ty * 60 < y) {
            y--;
            moving = true;
            direction = 2;
        }

    }


};

function process(var1) {
    px = tx;
    py = ty;
    switch(var1) {
        case 0:
        if(map[tx + 1][ty] != 2) {
            tx += 1;
            moving = true;
        }
        break;
        case 1:
        if(map[tx - 1][ty] != 2) {
            tx -= 1;
            moving = true;
        }
        break;
        case 2:
        if(map[tx][ty + 1] != 2) {
            ty += 1;
            moving = true;
        }
        break;
        case 3:
        if(map[tx][ty - 1] != 2) {
            ty -= 1;
            moving = true;
        }
        break;
    }


    //switches for collision

    if (map[tx][ty] == 3) {
        live--;
        reset();
    }
    if (map[tx][ty] == 4) {
        state = 2;
    }
    if (map[px][py] == 1)
        map[px][py] = 3;


    //box logic
    for(var i = 0; i < objects.length; i++) {

        switch (objects[i].type) {
            case 0:
            if(objects[i].type == 0) {

                if(map[objects[i].x][objects[i].y] == 3) {
                    objects.splice(i, 1);
                }

                var okay = true;

                if(tx == objects[i].x && ty == objects[i].y) {
                    if(map[objects[i].x + tx - px][objects[i].y + ty - py] == 2) {
                        okay = false;
                        tx = px;
                        ty = py;
                    }
                }

                for(var j = 0; j < objects.length; j++) {

                    if(i != j){
                        if(tx == objects[i].x && ty == objects[i].y) {
                            if((objects[j].x == objects[i].x + tx - px) && (objects[j].y == objects[i].y + ty - py)) {
                                okay = false;
                                tx = px;
                                ty = py;
                            }
                        }
                    }
                }


                if(tx == objects[i].x && ty == objects[i].y && okay) {
                    objects[i].x = objects[i].x + tx - px;
                    objects[i].y = objects[i].y + ty - py;
                }
            }

            break;

            case 1:
            if(tx == objects[i].x && ty == objects[i].y) {
                objects.splice(i, 1);
                wrenches++;
            }
            break;


            case 2:
            if(tx == objects[i].x && ty == objects[i].y) {
                objects.splice(i, 1);
            }
            break;
        }
        
    }
}


reset();
load_map(0);



var loop = setInterval(function() {


    switch (state) {

        case 0:
        c.drawImage(opening, 0, 0);

            c.fillStyle = "white";

    c.fillText("press space to continue", 0, 550);

        break;
        case 1:
        update();
        if (!moving && running) {
            process(actions[p]);
            p++;
            if(p >= actions.length) {
                running = false;
            }
        }


        c.fillStyle = "black";
        c.fillRect(0, 0, 600, 600);
        c.fillStyle = "gray";
        c.fillRect(600, 0, 800, 600);


    //draw switch for tiles
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
                c.drawImage(wall, i * 60, j * 60);
                break;

                case 4:
                if(wrenches >= 3) {
                    c.drawImage(portal_open, i * 60, j * 60);
                }
                else {
                    c.drawImage(portal_closed, i * 60, j * 60);
                }
                
                break;
            }
            
        }
    }

    for(var i = 0; i < objects.length; i++) {
        switch (objects[i].type) {
            case 0:
            c.drawImage(block, objects[i].x * 60, objects[i].y * 60);
            break;

            case 1:
            c.drawImage(wrench, objects[i].x * 60, objects[i].y * 60);
            break;

            case 2:
            c.drawImage(battery, objects[i].x * 60, objects[i].y * 60);
            break;
        }
        
    }

    switch(direction) {
        case 0:
        c.drawImage(roboot_front, x, y);
        break;
        case 1:
        c.drawImage(roboot_right, x, y);
        break;
        case 2:
        c.drawImage(roboot_back, x, y);
        break;
        case 3:
        c.drawImage(roboot_left, x, y);
        break;
    }

    print_actions();

    c.fillStyle = "black";

    c.fillText("lives: " + lives, 600, 550);

    break;
    case 2:
    c.fillStyle = "black";
    c.fillRect(0, 0, 800, 600);
    c.fillStyle = "white";
    c.fillText("you win", 30, 30);
    break;
}



}, 1);

function Object(type_in, x_in, y_in) {
    var that = this;
    this.x = x_in;
    this.y = y_in;
    this.type = type_in;
}


document.body.addEventListener("keydown", function (e) {
    keys[e.keyCode] = true;
});
document.body.addEventListener("keyup", function (e) {
    keys[e.keyCode] = false;

    var temp = e.keyCode;
    console.log(temp);
    if (moving == false) {
        if(temp == 37) {
            actions.push(1);
        }

        if(temp == 39) {
            actions.push(0);
        }

        if(temp == 38) {  
            actions.push(3);
        }

        if(temp == 40) {
            actions.push(2);
        }

        if(temp == 32) {
             if (state == 1)
                running = true;
            if (state == 0) 
                state = 1;
           
        }
    }
});

