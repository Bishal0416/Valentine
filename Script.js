function getDeviceType() {
  const userAgent = navigator.userAgent;

  if (/Windows/i.test(userAgent)) {
      return "Windows";
  // } else if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent)) {
  //     return "Mobile";
  } else {
      return "Mobile";
  }
}

const device = getDeviceType();

function playSound (){
  // let myAudio = document.querySelector('#audio')
  let audio = new Audio('https://www.fesliyanstudios.com/play-mp3/6968');
  audio.play();
}

// playSound()

const canvas = document.getElementById("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var ctx = canvas.getContext("2d");
function Firework(x,y,height,yVol,R,G,B){
  this.boom = false;
  this.x = x;
  this.y = y;
  this.yVol = yVol;
  this.height = height;
  this.R = R;
  this.G = G;
  this.B = B;
  this.radius = 2;
  var boomHeight = Math.floor(Math.random() * 200) + 50;
  this.draw = function(){
   
   ctx.fillStyle = "rgba(" + R + "," + G + "," + B + ")";
    ctx.strokeStyle = "rgba(" + R + "," + G + "," + B + ")";
    ctx.beginPath();
 //   ctx.arc(this.x,boomHeight,this.radius,Math.PI * 2,0,false);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(this.x,this.y,3,Math.PI * 2,0,false);
    ctx.fill();
  }
  this.update = function(){
    this.y -= this.yVol;
    if(this.radius < 20){
      this.radius += 0.35;
    }
    if(this.y < boomHeight){
      this.boom = true;

      if(this.boom = true){
        playSound()
      }
      
      for(var i = 0; i < 120; i++){
        particleArray.push(new Particle(
          this.x,
          this.y,
          // (Math.random() * 2) + 0.5//
          (Math.random() * 2) + 1,
          this.R,
          this.G,
          this.B,
          1,
        ))
      }
    }
    this.draw();
  }
  this.update()
}



window.addEventListener("click", (e)=>{
  var x = e.clientX;
  var y = canvas.height;
  var R = Math.floor(Math.random() * 255)
  var G = Math.floor(Math.random() * 255)
  var B = Math.floor(Math.random() * 255)
  var height = (Math.floor(Math.random() * 20)) + 10;
  fireworkArray.push(new Firework(x,y,height,5,R,G,B))
})

function Particle(x,y,radius,R,G,B,A){
  this.x = x;
  this.y = y;
  this.radius = radius;
  this.R = R;
  this.G = G;
  this.B = B;
  this.A = A;
  this.timer = 0;
  this.fade = false;
 
  // Change random spread
  this.xVol = (Math.random() * 10) - 4
  this.yVol = (Math.random() * 10) - 4
  
  // playSound()

  console.log(this.xVol,this.yVol)
  this.draw = function(){
 //   ctx.globalCompositeOperation = "lighter"
    ctx.fillStyle = "rgba(" + R + "," + G + "," + B + "," + this.A + ")";
    ctx.save();
    ctx.beginPath(); 
   // ctx.fillStyle = "white"
    ctx.globalCompositeOperation = "screen"
    ctx.arc(this.x,this.y,this.radius,Math.PI * 2,0,false);
    ctx.fill();
   
    ctx.restore();
  }
  this.update = function(){
    this.x += this.xVol;
    this.y += this.yVol;
    
    // Comment out to stop gravity. 
    if(this.timer < 200){
        this.yVol += 0.12;
    }
    this.A -= 0.02;
    if(this.A < 0){
      this.fade = true;
    }
    this.draw();
  }
  this.update();
}

var fireworkArray = [];
var particleArray = [];
for(var i = 0; i < 6; i++){
  var x = Math.random() * canvas.width;
  var y = canvas.height;
  var R = Math.floor(Math.random() * 255)
  var G = Math.floor(Math.random() * 255)
  var B = Math.floor(Math.random() * 255)
  var height = (Math.floor(Math.random() * 20)) + 10;
  fireworkArray.push(new Firework(x,y,height,5,R,G,B))
}


function animate(){
  requestAnimationFrame(animate);
 // ctx.clearRect(0,0,canvas.width,canvas.height)
  ctx.fillStyle = "rgba(0,0,0,0.1)"
  ctx.fillRect(0,0,canvas.width,canvas.height);
  for(var i = 0; i < fireworkArray.length; i++){
    fireworkArray[i].update();
  }
  for(var j = 0; j < particleArray.length; j++){
    particleArray[j].update();
  }
  if(fireworkArray.length < 4){
      var x = Math.random() * canvas.width;
      var y = canvas.height;
      var height = Math.floor(Math.random() * 20);
      var yVol = 5;
      var R = Math.floor(Math.random() * 255);
      var G = Math.floor(Math.random() * 255);          
      var B = Math.floor(Math.random() * 255);
      fireworkArray.push(new Firework(x,y,height,yVol,R,G,B));
  }
 
  
  fireworkArray = fireworkArray.filter(obj => !obj.boom);
  // myAudio.play();
  particleArray = particleArray.filter(obj => !obj.fade);
}
animate();

window.addEventListener("resize", (e) => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
})

if(device == 'Mobile') {
  let highestZ = 1;

  class Paper {
    holdingPaper = false;
    touchStartX = 0;
    touchStartY = 0;
    touchMoveX = 0;
    touchMoveY = 0;
    touchEndX = 0;
    touchEndY = 0;
    prevTouchX = 0;
    prevTouchY = 0;
    velX = 0;
    velY = 0;
    rotation = Math.random() * 30 - 15;
    currentPaperX = 0;
    currentPaperY = 0;
    rotating = false;

    init(paper) {
      paper.addEventListener('touchmove', (e) => {
        e.preventDefault();
        if (!this.rotating) {
          this.touchMoveX = e.touches[0].clientX;
          this.touchMoveY = e.touches[0].clientY;

          this.velX = this.touchMoveX - this.prevTouchX;
          this.velY = this.touchMoveY - this.prevTouchY;
        }

        const dirX = e.touches[0].clientX - this.touchStartX;
        const dirY = e.touches[0].clientY - this.touchStartY;
        const dirLength = Math.sqrt(dirX * dirX + dirY * dirY);
        const dirNormalizedX = dirX / dirLength;
        const dirNormalizedY = dirY / dirLength;

        const angle = Math.atan2(dirNormalizedY, dirNormalizedX);
        let degrees = 180 * angle / Math.PI;
        degrees = (360 + Math.round(degrees)) % 360;
        if (this.rotating) {
          this.rotation = degrees;
        }

        if (this.holdingPaper) {
          if (!this.rotating) {
            this.currentPaperX += this.velX;
            this.currentPaperY += this.velY;
          }
          this.prevTouchX = this.touchMoveX;
          this.prevTouchY = this.touchMoveY;

          paper.style.transform = `translateX(${this.currentPaperX}px) translateY(${this.currentPaperY}px) rotateZ(${this.rotation}deg)`;
        }
      })

      paper.addEventListener('touchstart', (e) => {
        if (this.holdingPaper) return;
        this.holdingPaper = true;

        paper.style.zIndex = highestZ;
        highestZ += 1;

        this.touchStartX = e.touches[0].clientX;
        this.touchStartY = e.touches[0].clientY;
        this.prevTouchX = this.touchStartX;
        this.prevTouchY = this.touchStartY;
      });
      paper.addEventListener('touchend', () => {
        this.holdingPaper = false;
        this.rotating = false;
      });

      // For two-finger rotation on touch screens
      paper.addEventListener('gesturestart', (e) => {
        e.preventDefault();
        this.rotating = true;
      });
      paper.addEventListener('gestureend', () => {
        this.rotating = false;
      });
    }
  }

  const papers = Array.from(document.querySelectorAll('.paper'));

  papers.forEach(paper => {
    const p = new Paper();
    p.init(paper);
  });
}


else {
  let highestZ = 1;

  class Paper {
    holdingPaper = false;
    mouseTouchX = 0;
    mouseTouchY = 0;
    mouseX = 0;
    mouseY = 0;
    prevMouseX = 0;
    prevMouseY = 0;
    velX = 0;
    velY = 0;
    rotation = Math.random() * 30 - 15;
    currentPaperX = 0;
    currentPaperY = 0;
    rotating = false;

    init(paper) {
      document.addEventListener('mousemove', (e) => {
        if (!this.rotating) {
          this.mouseX = e.clientX;
          this.mouseY = e.clientY;

          this.velX = this.mouseX - this.prevMouseX;
          this.velY = this.mouseY - this.prevMouseY;
        }

        const dirX = e.clientX - this.mouseTouchX;
        const dirY = e.clientY - this.mouseTouchY;
        const dirLength = Math.sqrt(dirX * dirX + dirY * dirY);
        const dirNormalizedX = dirX / dirLength;
        const dirNormalizedY = dirY / dirLength;

        const angle = Math.atan2(dirNormalizedY, dirNormalizedX);
        let degrees = 180 * angle / Math.PI;
        degrees = (360 + Math.round(degrees)) % 360;
        if (this.rotating) {
          this.rotation = degrees;
        }

        if (this.holdingPaper) {
          if (!this.rotating) {
            this.currentPaperX += this.velX;
            this.currentPaperY += this.velY;
          }
          this.prevMouseX = this.mouseX;
          this.prevMouseY = this.mouseY;

          paper.style.transform = `translateX(${this.currentPaperX}px) translateY(${this.currentPaperY}px) rotateZ(${this.rotation}deg)`;
        }
      })

      paper.addEventListener('mousedown', (e) => {
        if (this.holdingPaper) return;
        this.holdingPaper = true;

        paper.style.zIndex = highestZ;
        highestZ += 1;

        if (e.button === 0) {
          this.mouseTouchX = this.mouseX;
          this.mouseTouchY = this.mouseY;
          this.prevMouseX = this.mouseX;
          this.prevMouseY = this.mouseY;
        }
        if (e.button === 2) {
          this.rotating = true;
        }
      });
      window.addEventListener('mouseup', () => {
        this.holdingPaper = false;
        this.rotating = false;
      });
    }
  }

  const allPapers = Array.from(document.querySelectorAll('.paper'));

  allPapers.forEach(paper => {
    const p = new Paper();
    p.init(paper);
  });
}
