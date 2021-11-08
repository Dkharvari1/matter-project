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
var ball2;
var mouseConstraint;
var blocksWidth = 10;
var blocksHeight = 80;
var blocksSpacing = 50;
//delete this message later



function setup() {
  //this is where you create canvas
  canvas = createCanvas(1600, 800);
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
    boxes.push(Bodies.rectangle(400 + (i * blocksSpacing), 200, blocksWidth, blocksHeight, {density: 0.05}));
    World.add(engine.world, boxes[i]);
  }





  ramp = Bodies.rectangle(150, 300, 500, 30, {
    isStatic: true,
    angle: Math.PI * 0.25
  })
  


  ball = Bodies.circle(50, 20, 90, {mass: 100});
  
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
    fill(127);
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






// // Matter.js - http://brm.io/matter-js/

// var Example = Example || {};

// Example.slingshot = function() {
//     var Engine = Matter.Engine,
//         Render = Matter.Render,
//         Runner = Matter.Runner,
//         Composites = Matter.Composites,
//         Events = Matter.Events,
//         Constraint = Matter.Constraint,
//         MouseConstraint = Matter.MouseConstraint,
//         Mouse = Matter.Mouse,
//         World = Matter.World,
//         Bodies = Matter.Bodies;

//     // create engine
//     var engine = Engine.create(),
//         world = engine.world;

//     // create renderer
//     var render = Render.create({
//         element: document.body,
//         engine: engine,
//         options: {
//             width: 800,
//             height: 600,
//             wireframes: false
//         }
//     });

//     Render.run(render);

//     // create runner
//     var runner = Runner.create();
//     Runner.run(runner, engine);

//     // add bodies
//     var ground = Bodies.rectangle(395, 600, 815, 50, { isStatic: true }),
//         rockOptions = { density: 0.004 },
//         rock = Bodies.polygon(170, 450, 8, 20, rockOptions),
//         anchor = { x: 170, y: 450 },
//         elastic = Constraint.create({ 
//             pointA: anchor, 
//             bodyB: rock, 
//             stiffness: 0.05
//         });

//     var pyramid = Composites.pyramid(500, 300, 9, 10, 0, 0, function(x, y) {
//         return Bodies.rectangle(x, y, 25, 40);
//     });

//     var ground2 = Bodies.rectangle(610, 250, 200, 20, { isStatic: true });

//     var pyramid2 = Composites.pyramid(550, 0, 5, 10, 0, 0, function(x, y) {
//         return Bodies.rectangle(x, y, 25, 40);
//     });

//     World.add(engine.world, [ground, pyramid, ground2, pyramid2, rock, elastic]);

//     Events.on(engine, 'afterUpdate', function() {
//         if (mouseConstraint.mouse.button === -1 && (rock.position.x > 190 || rock.position.y < 430)) {
//             rock = Bodies.polygon(170, 450, 7, 20, rockOptions);
//             World.add(engine.world, rock);
//             elastic.bodyB = rock;
//         }
//     });

//     // add mouse control
//     var mouse = Mouse.create(render.canvas),
//         mouseConstraint = MouseConstraint.create(engine, {
//             mouse: mouse,
//             constraint: {
//                 stiffness: 0.2,
//                 render: {
//                     visible: false
//                 }
//             }
//         });

//     World.add(world, mouseConstraint);

//     // keep the mouse in sync with rendering
//     render.mouse = mouse;

//     // fit the render viewport to the scene
//     Render.lookAt(render, {
//         min: { x: 0, y: 0 },
//         max: { x: 800, y: 600 }
//     });

//     // context for MatterTools.Demo
//     return {
//         engine: engine,
//         runner: runner,
//         render: render,
//         canvas: render.canvas,
//         stop: function() {
//             Matter.Render.stop(render);
//             Matter.Runner.stop(runner);
//         }
//     };
// };

// // create demo interface
// // not required to use Matter.js

// MatterTools.Demo.create({
//   toolbar: {
//     title: 'matter-js',
//     url: 'https://github.com/liabru/matter-js',
//     reset: true,
//     source: true,
//     fullscreen: true,
//     exampleSelect: true
//   },
//   preventZoom: true,
//   resetOnOrientation: true,
//   examples: [
//     {
//       name: 'Slingshot',
//       id: 'slingshot',
//       init: Example.slingshot,
//       sourceLink: 'https://github.com/liabru/matter-js/blob/master/examples/slingshot.js'
//     }
//   ]
// });
