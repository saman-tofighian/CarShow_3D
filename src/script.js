// Saman Tofighian
import * as three from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { PointerLockControls } from "three/examples/jsm/controls/PointerLockControls.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
const Sc = new three.Scene();
const texture = new three.TextureLoader();
const tx = texture.load("/texture/granite_tile_diff_2k.jpg");
tx.colorSpace = three.SRGBColorSpace;
tx.magFilter = three.NearestFilter;
const draco = new DRACOLoader();
draco.setDecoderPath("/draco/");
const gltf = new GLTFLoader();
gltf.setDRACOLoader(draco);
let salon = null;
let sakoo = null;
let salon_animation = null;
gltf.load("/models/saloon/glb/Peugeot207saloon.glb", (car_salon) => {
  salon = car_salon.scene;
  Sc.add(salon);
  salon_animation = new three.AnimationMixer(salon);
  const action = salon_animation.clipAction(car_salon.animations[0]);
  action.play();
  sakoo = salon.children[11];
  salon.children[0].children[1].material.map = tx;
});
let car = null;
let car_animation = null;

gltf.load("/models/207/glb/207car.glb", (car_207) => {
  car = car_207.scene;
  Sc.add(car);
  car_animation = new three.AnimationMixer(car);
  const action1 = car_animation.clipAction(car_207.animations[0]);
  const action2 = car_animation.clipAction(car_207.animations[1]);
  const action3 = car_animation.clipAction(car_207.animations[2]);
  const action4 = car_animation.clipAction(car_207.animations[3]);
  const action5 = car_animation.clipAction(car_207.animations[4]);
  action1.play();
  action2.play();
  action3.play();
  action4.play();
  action5.play();
  window.addEventListener("keydown", (e) => {
    if (e.keyCode == 48) {
      car.children[0].material.color.set("red");
      car.children[124].material.color.set("red");
    }
    if (e.keyCode == 49) {
      car.children[0].material.color.set("green");
      car.children[124].material.color.set("green");
    }
    if (e.keyCode == 50) {
      car.children[0].material.color.set("purple");
      car.children[124].material.color.set("purple");
    }
    if (e.keyCode == 51) {
      car.children[0].material.color.set("gray");
      car.children[124].material.color.set("gray");
    }
    if (e.keyCode == 52) {
      car.children[0].material.color.set("navy");
      car.children[124].material.color.set("navy");
    }
    if (e.keyCode == 53) {
      car.children[0].material.color.set("#000");
      car.children[124].material.color.set("#000");
    }
    if (e.keyCode == 54) {
      car.children[0].material.color.set("#fff");
      car.children[124].material.color.set("#fff");
    }
    if (e.keyCode == 55) {
      car.children[0].material.color.set("pink");
      car.children[124].material.color.set("pink");
    }
    if (e.keyCode == 56) {
      car.children[0].material.color.set("yellow");
      car.children[124].material.color.set("yellow");
    }
    if (e.keyCode == 57) {
      car.children[0].material.color.set("brown");
      car.children[124].material.color.set("brown");
    }
  });
});

const size = {
  width: innerWidth,
  height: innerHeight,
};
const camera = new three.PerspectiveCamera(75, size.width / size.height);
camera.position.set(0, 1, 6);
Sc.add(camera);
const aml = new three.AmbientLight("#fff", 0.7);
const direct = new three.DirectionalLight("#fff", 0.7);
direct.position.set(2, 2, 2);
Sc.add(aml, direct);
const canvas = document.getElementById("web");
const renderer = new three.WebGLRenderer({
  canvas,
  antialias: true,
});
renderer.setSize(size.width, size.height);
renderer.toneMapping = three.ACESFilmicToneMapping;
renderer.toneMappingExposure = 2;
let time = new three.Clock();
let startTime = 0;

const pointer = new PointerLockControls(camera, canvas);
let keyboar = [];
window.addEventListener("keydown", (e) => {
  keyboar[e.key] = true;
  if (e.keyCode == 13) {
    pointer.lock();
  }
});
window.addEventListener("keyup", (e) => {
  keyboar[e.key] = false;
  if (e.keyCode == 11) {
    pointer.unlock();
  }
});
const move = () => {
  if (keyboar["w"] || keyboar["W"] || keyboar["ص"] || keyboar["ArrowUp"]) {
    pointer.moveForward(0.2);
  }
  if (keyboar["s"] || keyboar["S"] || keyboar["س"] || keyboar["ArrowDown"]) {
    pointer.moveForward(-0.2);
  }
  if (keyboar["a"] || keyboar["A"] || keyboar["ش"] || keyboar["ArrowLeft"]) {
    pointer.moveRight(-0.2);
  }
  if (keyboar["d"] || keyboar["D"] || keyboar["ی"] || keyboar["ArrowRight"]) {
    pointer.moveRight(0.2);
  }
};

const animation = () => {
  move();
  let elapsed = time.getElapsedTime();
  let delta = elapsed - startTime;
  startTime = elapsed;
  if (salon) {
    salon_animation.update(delta);
    sakoo.rotation.y = elapsed / 5;
  }
  if (car) {
    car.rotation.y = elapsed / 5;
    car_animation.update(delta);
  }
  renderer.render(Sc, camera);
  requestAnimationFrame(animation);

  let x = camera.position.x;
  let z = camera.position.z;

  if (z <= -9.2) {
    camera.position.z = -9.1;
  }

  if (x >= 13.4) {
    camera.position.x = 13.3;
  }

  if (x <= -14.17) {
    camera.position.x = -14.1;
  }

  if (z >= 6.59) {
    camera.position.z = 6.585;
  }

  if (x >= -9.02 && x <= -8.54 && z >= -9.5 && z <= -6.8) {
    camera.position.x = -8.539;
  }

  if (z <= -6.76 && x <= -8.93 && x >= -15.0) {
    camera.position.z = -6.74;
    if (x <= -12.27) {
      camera.position.x = -12.26;
    }
  }

  if (x >= -12.1 && x <= -11.7 && z > -6.92 && z < 1) {
    camera.position.x = -11.69;
  }

  if (x <= -12.2 && x >= -15.16 && z < 1.65 && z > 0.99) {
    camera.position.z = 1.66;
  }
};
animation();
// Saman Tofighian
