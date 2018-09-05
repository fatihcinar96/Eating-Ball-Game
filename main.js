
var para = document.querySelector('p');
var count = 0;
var time = document.querySelector('h2');
var sec = 0;
var playerName = prompt('Please enter your username');
var gameEnd = document.querySelector('h3');


setInterval(timer,1000);
function timer(){
    sec++;
    time.textContent = sec;
}


var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');

var width = canvas.width = window.innerWidth;
var height = canvas.height = window.innerHeight;

// function to generate random number

function random(min,max) {
  var num = Math.floor(Math.random()*(max-min)) + min;
  return num;
}

// define Shape constructor

function Shape(x, y, velX, velY, exists) {
  this.x = x;
  this.y = y;
  this.velX = velX;
  this.velY = velY;
  this.exists = exists;
}
 // define the ball constructor
function Ball(x,y,velX,velY,exists,color,size){
    Shape.call(this,x,y,velX,velY,exists);
    this.color = color;
    this.size = size;
}
// define ball draw method
// Ball.prototype = Object.create(Shape.prototype);
// Ball.prototype.constructor = Ball;



Ball.prototype.draw = function() {
  ctx.beginPath();
  ctx.fillStyle = this.color;
  ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
  ctx.fill();
};

// define ball update method

Ball.prototype.update = function() {
  if((this.x + this.size) >= width) {
    this.velX = -(this.velX);
  }

  if((this.x - this.size) <= 0) {
    this.velX = -(this.velX);
  }

  if((this.y + this.size) >= height) {
    this.velY = -(this.velY);
  }

  if((this.y - this.size) <= 0) {
    this.velY = -(this.velY);
  }

  this.x += this.velX;
  this.y += this.velY;
};

// define ball collision detection

Ball.prototype.collisionDetect = function() {
  for(var j = 0; j < balls.length; j++) {
    if((this !== balls[j])) {
      var dx = this.x - balls[j].x;
      var dy = this.y - balls[j].y;
      var distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < this.size + balls[j].size) {
        balls[j].color = this.color = 'rgb(' + random(0,255) + ',' + random(0,255) + ',' + random(0,255) +')';
      }
    }
  }
};

// define array to store balls



// define loop that keeps drawing the scene constantly

function evilCircle(x,y,velX,velY,exists){
    Shape.call(this,x,y,20,20,exists);
    this.color = 'white';
    this.size = 10;

}

evilCircle.prototype = Object.create(Shape.prototype);
evilCircle.prototype.constructor = evilCircle;

evilCircle.prototype.draw = function() {
    ctx.beginPath();
    ctx.lineWidth = 3;
    ctx.strokeStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.stroke();
  };
  
  evilCircle.prototype.checkBounds = function() {
    if((this.x + this.size) >= width) {
      this.x -=this.size;
    }
  
    if((this.x - this.size) <= 0) {
      this.x += this.size;
    }
  
    if((this.y + this.size) >= height) {
      this.y -= this.size;
    }
  
    if((this.y - this.size) <= 0) {
      this.y +=this.size;
    }
  
   
  };

  evilCircle.prototype.setControls = function(){
      var _this = this;
      window.onkeydown = function(e){
          if(e.keyCode === 65){
              _this.x -= _this.velX;
          }else if(e.keyCode === 68){
            _this.x += _this.velX;
          }else if(e.keyCode === 87){
              _this.y -= _this.velY; 
          }else if(e.keyCode === 83){
              _this.y += _this.velY;
          }
      };
  };

  evilCircle.prototype.collisionDetect = function() {
    for(var j = 0; j < balls.length; j++) {
      if( balls[j].exists ) {
        var dx = this.x - balls[j].x;
        var dy = this.y - balls[j].y;
        var distance = Math.sqrt(dx * dx + dy * dy);
  
        if (distance < this.size + balls[j].size) {
          balls[j].exists = false;
          count--;
          para.textContent = 'Ball count: ' + count;
          evil.size += balls[j].size/5;
        }
      }
    }
  };
  var balls = [];

  var evil = new evilCircle(
      random(0,width),
      random(0,height)
    );

    
  evil.setControls();

  function boxes(){
    if(count === 0 ){
      alert(`Game is end.\nName : ${playerName}\nTime : ${sec}\nFor one more game,click the OK button!`);
      window.location.reload();
  
         
      }
  
    }

function loop() {
  ctx.fillStyle = 'rgba(0,0,0,0.25)';
  ctx.fillRect(0,0,width,height);
  
  while(balls.length < 5) {
    var size = random(10,20);
    var ball = new Ball(
      // ball position always drawn at least one ball width
      // away from the adge of the canvas, to avoid drawing errors
      random(0 + size,width - size),
      random(0 + size,height - size),
      random(-7,7),
      random(-7 ,7),
      exists = true,
      'rgb(' + random(0,255) + ',' + random(0,255) + ',' + random(0,255) +')',
      size
    );
   
    balls.push(ball);
    
    count++;
    para.textContent = 'Ball count: ' + count;
  }
  for(var i = 0; i < balls.length; i++) {
    if(balls[i].exists){
        balls[i].draw();
        balls[i].update();
        balls[i].collisionDetect();
        
    }
    evil.draw();
  evil.checkBounds();
  evil.collisionDetect();
  
  
  }


    
  boxes();
  requestAnimationFrame(loop);
  
}


loop();


