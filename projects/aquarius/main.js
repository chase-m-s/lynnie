import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.154/build/three.module.js';
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.154/examples/jsm/controls/OrbitControls.js';

// Scene setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Enable OrbitControls (mouse rotation)
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;  // Smooth rotation
controls.dampingFactor = 0.05;
controls.enableZoom = true;  // Allow zooming
controls.enablePan = false;  // Disable panning for a better experience

// Load high-quality star texture
const starTexture = new THREE.TextureLoader().load('https://threejs.org/examples/textures/sprites/spark1.png');
scene.background = new THREE.Color(0x000010); // Dark blue/black night sky

// Star data (RA converted to degrees: RA * 15)
const stars = [
    { ra: 22.487 * 15, dec: -0.116, magnitude: 2.9 },
    { ra: 22.675 * 15, dec: -5.166, magnitude: 3.7 },
    { ra: 23.063 * 15, dec: -9.087, magnitude: 3.8 },
    { ra: 22.835 * 15, dec: -13.593, magnitude: 4.2 },
    { ra: 22.960 * 15, dec: -17.513, magnitude: 4.5 },
    { ra: 23.110 * 15, dec: -21.575, magnitude: 4.6 }
];

// Convert celestial coordinates to 3D positions
const starPositions = [];
stars.forEach(star => {
    const phi = (90 - star.dec) * (Math.PI / 180);  // Declination to polar angle
    const theta = (star.ra) * (Math.PI / 180);  // Right Ascension to azimuthal angle

    const x = Math.sin(phi) * Math.cos(theta);
    const y = Math.cos(phi);
    const z = Math.sin(phi) * Math.sin(theta);

    starPositions.push(new THREE.Vector3(x, y, z));
});

// Create star points
const starGeometry = new THREE.BufferGeometry().setFromPoints(starPositions);
const starMaterial = new THREE.PointsMaterial({
    map: starTexture,
    size: 0.15,
    transparent: true,
    alphaTest: 0.5,
    depthWrite: false,
    blending: THREE.AdditiveBlending
});
const starsMesh = new THREE.Points(starGeometry, starMaterial);
scene.add(starsMesh);

// Constellation line connections
const lineIndices = [
    [0, 1], [1, 2], [2, 3], [3, 4], [4, 5]
];

// Create line geometry
const lineGeometry = new THREE.BufferGeometry();
const lineVertices = [];

lineIndices.forEach(([i, j]) => {
    lineVertices.push(starPositions[i].x, starPositions[i].y, starPositions[i].z);
    lineVertices.push(starPositions[j].x, starPositions[j].y, starPositions[j].z);
});

lineGeometry.setAttribute('position', new THREE.Float32BufferAttribute(lineVertices, 3));
const lineMaterial = new THREE.LineBasicMaterial({ color: 0x00aaff, linewidth: 2 });
const constellationLines = new THREE.LineSegments(lineGeometry, lineMaterial);
scene.add(constellationLines);

// 🌟 Generate Procedural Background Stars
function createBackgroundStars(count) {
    const starVertices = [];
    for (let i = 0; i < count; i++) {
        const x = (Math.random() - 0.5) * 200; // Spread out over large space
        const y = (Math.random() - 0.5) * 200;
        const z = (Math.random() - 0.5) * 200;
        starVertices.push(x, y, z);
    }

    const starGeometry = new THREE.BufferGeometry();
    starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3));

    const starMaterial = new THREE.PointsMaterial({
        color: 0xffffff,
        size: 0.2, // Background stars should be small
        transparent: true
    });

    const starField = new THREE.Points(starGeometry, starMaterial);
    scene.add(starField);
}

// Create 1500 background stars
createBackgroundStars(1500);

camera.position.z = 2;

// Animation loop
function animate() {
    requestAnimationFrame(animate);

    controls.update(); // Update controls for smooth movement

    // Twinkling effect: oscillate star sizes slightly
    const time = Date.now() * 0.0005;
    starMaterial.size = 0.15 + 0.05 * Math.sin(time * 2); 

    renderer.render(scene, camera);
}
animate();

// Handle window resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
