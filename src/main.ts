import * as THREE from 'three';
import { GUI } from 'dat.gui';

// Scene setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create a plane geometry for the shader
const geometry = new THREE.PlaneGeometry(2, 2);

// Shader uniforms
const uniforms = {
    u_time: { value: 0 },
    u_resolution: { value: new THREE.Vector2() },
    u_mouse: { value: new THREE.Vector2() },
    u_color1: { value: new THREE.Color(0x00ff00) },
    u_color2: { value: new THREE.Color(0x0000ff) }
};

// Vertex shader
const vertexShader = `
varying vec2 vUv;

void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
}
`;

// Fragment shader
const fragmentShader = `
uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform vec3 u_color1;
uniform vec3 u_color2;

varying vec2 vUv;

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    vec3 color = mix(u_color1, u_color2, 
        0.5 + 0.5 * sin(u_time + st.x * 10.0 + st.y * 5.0));
    
    gl_FragColor = vec4(color, 1.0);
}
`;

// Create material with shader
const material = new THREE.ShaderMaterial({
    uniforms: uniforms,
    vertexShader: vertexShader,
    fragmentShader: fragmentShader
});

// Create mesh and add to scene
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

camera.position.z = 1;

// GUI setup
const gui = new GUI();
const params = {
    color1: '#00ff00',
    color2: '#0000ff'
};

gui.addColor(params, 'color1').onChange((value) => {
    uniforms.u_color1.value.setHex(parseInt(value.replace('#', '0x')));
});
gui.addColor(params, 'color2').onChange((value) => {
    uniforms.u_color2.value.setHex(parseInt(value.replace('#', '0x')));
});

// Handle window resize
window.addEventListener('resize', onWindowResize, false);
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    uniforms.u_resolution.value.x = renderer.domElement.width;
    uniforms.u_resolution.value.y = renderer.domElement.height;
}
onWindowResize();

// Handle mouse movement
window.addEventListener('mousemove', (e) => {
    uniforms.u_mouse.value.x = e.clientX;
    uniforms.u_mouse.value.y = e.clientY;
});

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    uniforms.u_time.value = performance.now() / 1000;
    renderer.render(scene, camera);
}
animate();