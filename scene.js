import * as THREE from 'three';

// Create a scene
const scene = new THREE.Scene();

// Create a camera (PerspectiveCamera for 3D)
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

// Create a renderer and attach it to the document
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create a cube
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    cube.rotation.x += 0.01; // Rotate cube
    cube.rotation.y += 0.01;
    renderer.render(scene, camera);
}
animate();

import gsap from 'gsap';

// Animate the cube's position
gsap.to(cube.position, { x: 2, duration: 2, ease: "power2.inOut", yoyo: true, repeat: -1 });

