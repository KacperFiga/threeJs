import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from "dat.gui";

// loading

const textureLoader = new THREE.TextureLoader();

const normalTexture = textureLoader.load("/textures/NormalMap.png");

// Debug
const gui = new dat.GUI();

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

// Objects
const geometry = new THREE.SphereBufferGeometry(0.5, 64, 64);
// Materials

const material = new THREE.MeshStandardMaterial();
material.metalness = 0.7;
material.roughness = 0.2;
material.color = new THREE.Color(0xff0000);
material.normalMap = normalTexture;

// Mesh
const sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);

// Lights

const pointLightOne = new THREE.PointLight(0xff0000, 2);

pointLightOne.position.set(-1.8, 1.07, -1.65);
pointLightOne.intensity = 10;

const pointLightOneFolder = gui.addFolder("light one");
pointLightOneFolder.add(pointLightOne.position, "x").min(-3).max(3).step(0.01);
pointLightOneFolder.add(pointLightOne.position, "y").min(-6).max(6).step(0.01);
pointLightOneFolder.add(pointLightOne.position, "z").min(0).max(6).step(0.01);
pointLightOneFolder.add(pointLightOne, "intensity").min(0).max(10).step(0.01);
scene.add(pointLightOne);

const pointLightOneHelper = new THREE.PointLightHelper(pointLightOne, 1);

const pointLightOneColor = {
  color: 0xff0000,
};

pointLightOneFolder.addColor(pointLightOneColor, "color").onChange(() => {
  pointLightOne.color.set(pointLightOneColor.color);
});

scene.add(pointLightOneHelper);

const pointLightTwo = new THREE.PointLight(0xff0000);
pointLightTwo.position.set(1, 1, 1);
const pointLightTwoHepler = new THREE.PointLightHelper(pointLightTwo, 1);

const pointLightTwoFolder = gui.addFolder("light two");
pointLightTwoFolder.add(pointLightTwo.position, "x").min(-5).max(5).step(0.01);
pointLightTwoFolder.add(pointLightTwo.position, "y").min(-5).max(5).step(0.01);
pointLightTwoFolder.add(pointLightTwo.position, "z").min(-5).max(5).step(0.01);
pointLightTwoFolder.add(pointLightTwo, "intensity").min(0).max(10).step(0.01);
scene.add(pointLightTwoHepler);

const pointLightTwoColor = {
  color: 0xff0000,
};

pointLightTwoFolder.addColor(pointLightTwoColor, "color").onChange(() => {
  pointLightTwo.color.set(pointLightTwoColor.color);
});

scene.add(pointLightTwo);

// const pointLightThree = new THREE.PointLight(0x000000);
// pointLightThree.position.set(1, 2, 1);
// pointLightThree.intensity = 1;
// scene.add(pointLightThree);

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.x = 0;
camera.position.y = 0;
camera.position.z = 2;
scene.add(camera);

// Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  alpha: true,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */

const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update objects
  sphere.rotation.y = 0.5 * elapsedTime;

  // Update Orbital Controls
  // controls.update()

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
