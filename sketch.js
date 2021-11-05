const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const MouseConstraint = Matter.MouseConstraint;
const Mouse = Matter.Mouse;

var engine;
var ground;
var boxes=[];
var ramp;
var ball;
var mouseConstraint;
var blocksWidth = 10;
var blocksHeight = 80;
var blocksSpacing = 80;


function incWidth() {
  blocksWidth += 10
  document.getElementById("lblWidth").innerHTML = "Width: " + blocksWidth;
  boxes = [];
  setup();
}

function decWidth() {
  blocksWidth -= 10
  document.getElementById("lblWidth").innerHTML = "Width: " + blocksWidth;
  boxes = [];
  setup();
}

function incHeight() {
  blocksHeight += 10
  document.getElementById("lblHeight").innerHTML = "Height: " + blocksHeight;
  boxes = [];
  setup();
}

function decHeight() {
  blocksHeight -= 10
  document.getElementById("lblHeight").innerHTML = "Height: " + blocksHeight;
  boxes = [];
  setup();
}

function incSpacing() {
  blocksSpacing += 10
  document.getElementById("lblSpacing").innerHTML = "Spacing: " + blocksSpacing;
  boxes = [];
  setup();
}

function decSpacing() {
  blocksSpacing -= 10
  document.getElementById("lblSpacing").innerHTML = "Spacing: " + blocksSpacing;
  boxes = [];
  setup();
}


function setup() {
  //this is where you create canvas
  canvas = createCanvas(1400, 800);
  var canvasMouse = Mouse.create(canvas.elt);
  var options = {
    mouse:canvasMouse
  }

  // create an engine
  engine = Engine.create();

  var mouse = Mouse.create(canvas.elt);
  var mouseParams = {
    mouse : mouse,
    constraint: {
      stiffness: 0.1,
    }
  }

  mouseConstraint = MouseConstraint.create(engine, mouseParams);
  mouseConstraint.mouse.pixelRatio = pixelDensity();
  World.add(engine.world, mouseConstraint);

  // create two boxes and a ground

  for (let i = 0; i < 10; i++) {
    boxes.push(Bodies.rectangle(400 + (i * blocksSpacing), 200, blocksWidth, blocksHeight));
    World.add(engine.world, boxes[i]);
  }



  ramp = Bodies.rectangle(150, 300, 500, 30, {
    isStatic: true,
    angle: Math.PI * 0.25
  })

  ball = Bodies.circle(50, 20, 90);
  World.add(engine.world, ball);

  ground = Bodies.rectangle(800, 410, 1400, 30, {
    isStatic: true
  });
  //Matter.Body.rotate(ground,0.22);
  // add all of the bodies to the world
  World.add(engine.world, [ground]);
  World.add(engine.world, ramp);

  // run the engine
  Engine.run(engine);
}

function draw() {
  background(51);

  // Basic demo
  // Getting vertices of each object
  for (let j = 0; j < boxes.length; j++) {
    let currentbox = boxes[j];
    var vertices = currentbox.vertices;
    fill(255);
    beginShape();
    for (var i = 0; i < vertices.length; i++) {
      vertex(vertices[i].x, vertices[i].y);
    }
    endShape();
  }

  // Ground vertices
  var vertices = ground.vertices;
  beginShape();
  fill(127);
  for (var i = 0; i < vertices.length; i++) {
    vertex(vertices[i].x, vertices[i].y);
  }
  endShape();

  var verts = ramp.vertices;
  beginShape();
  fill(127);
  for (var i = 0; i < verts.length; i++) {
    vertex(verts[i].x, verts[i].y);
  }
  endShape();

  var verts = ball.vertices;
  beginShape();
  fill(127);
  for (var i = 0; i < verts.length; i++) {
    vertex(verts[i].x, verts[i].y);
  }
  endShape();
}
