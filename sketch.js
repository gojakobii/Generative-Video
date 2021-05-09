let theShader;
let shaderTexture;
let cam;
let noiseScale = 0.05;

function preload() {
  theShader = loadShader('assets/effect.vert', 'assets/effect.frag');
}

function setup() {
  createCanvas(720, 720, WEBGL);
  background('black');
  noStroke();

  shaderTexture = createGraphics(width, height, WEBGL);
  shaderTexture.noStroke();

  cam = createCapture(VIDEO);
  cam.size(720, 720);
  cam.hide();
}

function draw() {
  orbitControl(); //if you'd like camera control
  
  shaderTexture.shader(theShader);
  theShader.setUniform('tex0', cam);
  theShader.setUniform('time', frameCount * 0.015);

  shaderTexture.rect(0, 0, width, height);

  texture(shaderTexture);

  push();
  rotateX(frameCount * 0.005);
  rotateY(frameCount * 0.005);
  rotateZ(frameCount * 0.005);
  box(250);
  pop();
}