let canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let ctx = canvas.getContext('2d');

let heading = document.getElementById('heading');
let animation;

window.addEventListener('resize', () => {
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
})

let particles = [];
let colorArray = [
    '#8675a9',
    '#c3aed6',
    '#ffc1f3',
    '#848ccf',
    '#93b5e1'
];
let circleArray = [];


class Particle{
    constructor(x,y,radius,dx,dy){
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.dx = dx;
        this.dy = dy;
        this.color = colorArray[Math.floor(Math.random()*colorArray.length)];
    }

    draw(){
        ctx.beginPath();
        ctx.arc(this.x,this.y,this.radius,0,Math.PI *2, false);
        ctx.strokeStyle = this.color;
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.stroke();
    }

    update(){
        if (this.x + this.radius > innerWidth || this.x - this.radius < 0){
            this.dx = -this.dx;
        }
    
        if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
            this.dy = -this.dy;
        }
        this.x += this.dx;
        this.y += this.dy;
        this.draw();
    }
}



let rect = [];

//ctx.arc(rect.x + (rect.width/2),rect.y + (rect.height/2),30,0,Math.PI*2,false);
function init(){
    rect = heading.getBoundingClientRect();
    ctx.clearRect(0,0,innerWidth,innerHeight);1
    circleArray = [];
    for (let i = 0; i < 200; i++) {
        let radius = Math.random() * 3 + 1;
        let x = rect.x + (rect.width/2);
        let y = rect.y + (rect.height/2);
        let dx = (Math.random() - 0.5)*10;
        let dy = (Math.random() - 0.5)*10;
        circleArray.push(new Particle(x,y,radius,dx,dy));
    }
}

init();

function animate() {
    if(animation){
        window.cancelAnimationFrame(animation)
    }
    ctx.clearRect(0,0,innerWidth,innerHeight);
    for (let i = 0; i < circleArray.length; i++) {
        circleArray[i].update();
    }
    animation = window.requestAnimationFrame(animate);
}

let svg = document.getElementById("darkMode");


svg.addEventListener('click',() => {
    init();
    animate();
})



//Themechange code
const sunPath = "M195 97.5C195 122.565 185.542 145.421 170 162.693C152.153 182.528 126.283 195 97.5 195C68.7171 195 42.8473 182.528 25 162.693C9.45809 145.421 0 122.565 0 97.5C0 43.6522 43.6522 0 97.5 0C151.348 0 195 43.6522 195 97.5Z";
const heartPath = "M97.3051 16.6949C119.565 -5.56495 155.655 -5.56496 177.915 16.6949C200.175 38.9548 200.175 75.0452 177.915 97.3051L97.3051 177.915L16.6949 97.3051C-5.56497 75.0452 -5.56497 38.9548 16.6949 16.6949C38.9548 -5.56497 75.0452 -5.56497 97.3051 16.6949Z";
const darkMode = document.querySelector("#darkMode");

let toggle = false;

darkMode.addEventListener('click', () => {
    const tl = anime.timeline({
        duration: 750,
        easing: 'easeOutQuad'
    });

    tl.add({
        targets: ".sun",
        d: [
            {
                value: toggle ? sunPath : heartPath
            }
        ],
        fill: toggle ? '#30273F' : '#D7A3F0',
        //easing: 'easeInQuad'           
    })
    .add({
        targets: "#darkMode",
        rotate: toggle ? 0 : 360,
        TranslateX: toggle ? 50 : -50
    }, '-=750')
    .add({
        targets: "canvas",
        backgroundColor: toggle ? "rgb(215, 163, 240)" : "#30273F"
    }, '-=650')
    .add({
        targets: "h1",
        color: toggle ? '#30273F' : '#D7A3F0',
        easing: "linear"
    }, "-=1050");
    
    if(!toggle){
        toggle = true;
    } else {
        toggle = false;
    }
});
