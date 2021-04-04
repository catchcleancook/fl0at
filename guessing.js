const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let particleArray = [];
let adjustX = 15;
let adjustY = 0;


//mouse mouuuveeee
const mouse = {
    x: null,
    y: null,
    radius: 130 //mouse reach
}

window.addEventListener('mousemove', function(event){
    mouse.x = event.x;
    mouse.y = event.y;
    
    //console.log(mouse.x, mouse.y);
});


//Text to be distorted size and weight
ctx.fillStyle = 'white';
ctx.font = '20px Verdana';
ctx.fillText('BRENNER', 0, 40);
const textCoordinates = ctx.getImageData(0,0,100,900);

//particle size and mass
class Particle {
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.size = 1.5;
        this.baseX = this.x;
        this.baseY = this.y;
        this.density = (Math.random() *30) + 1;

    }
    draw(){
        ctx.fillStyle = 'gray'; //text color
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
    }
    // mouse cursor distance from particle by hypotenuse 
    update(){
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        let forceDirectionX = dx / distance;
        let forceDirectionY = dy / distance;
        let maxDistance = mouse.radius;
        let force = (maxDistance - distance) / maxDistance;
        let directionX = forceDirectionX * force * this.density;
        let directionY = forceDirectionY * force * this.density;

        if (distance < mouse.radius ){
            this.x -= directionX;
            this.y -= directionY;
        } else {
            if (this.x !== this.baseX){
                let dx = this.x - this.baseX;
                this.x -= dx/50; //return speed x axis
            }
            if (this.y !== this.baseY){
                let dy = this.y - this.baseY;
                this.y -= dy/20; // return speed y axis
            }
        }
    }
}
// number of particles and canvas size
function init() {
    particleArray = [];
    for (let y = 0, y2 = textCoordinates.height; y < y2; y++){
        for (let x = 0, x2 = textCoordinates.width; x < x2; x++){
            if(textCoordinates.data[( y * 4 * textCoordinates.width) + (x * 4) + 3] > 128){
                let positionX = x + adjustX;
                let positionY = y + adjustY;
                particleArray.push(new Particle(positionX * 10, positionY * 10));

            }
        }
    }
    
}
    //particleArray.push(new Particle(50, 50));
    //particleArray.push(new Particle(80, 50));



init();
console.log(particleArray);

function animate(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particleArray.length; i++){
        particleArray[i].draw();
        particleArray[i].update();
    }
    requestAnimationFrame(animate);
}
animate();
