const app = new PIXI.Application();
await app.init({ width: 640, height: 360 })
document.body.appendChild(app.canvas);

await PIXI.Assets.load('player.png');
let player = PIXI.Sprite.from('player.png');
player.x = 100;
player.y = 100;
app.stage.addChild(player);

let elapsed = 0.0;
let FPS = 60;
let tickTime = 1 / FPS * 1000;
let playerSpeed = 3;

window.addEventListener("keydown", keyDown);
window.addEventListener("keyup", keyUp);

let inputs = { up: false, down: false, left: false, right: false };

function keyDown(e) {
    switch (e.code) {
        case "KeyW":
            inputs.up = true;
            break;
        case "KeyS":
            inputs.down = true;
            break;
        case "KeyA":
            inputs.left = true;
            break;
        case "KeyD":
            inputs.right = true;
            break;
    }
}

function keyUp(e) {
    switch (e.code) {
        case "KeyW":
            inputs.up = false;
            break;
        case "KeyS":
            inputs.down = false;
            break;
        case "KeyA":
            inputs.left = false;
            break;
        case "KeyD":
            inputs.right = false;
            break;
    }
}

app.ticker.add((ticker) => {
    elapsed += ticker.elapsedMS;
    while(elapsed > tickTime) {
        physicsTick();
        elapsed -= tickTime;
    }
});

function physicsTick() {
    if(inputs.up) {
        player.y -= playerSpeed;
    }
    else if(inputs.down) {
        player.y += playerSpeed;
    }
    if(inputs.left) {
        player.x -= playerSpeed;
    }
    else if(inputs.right) {
        player.x += playerSpeed;
    }
}
