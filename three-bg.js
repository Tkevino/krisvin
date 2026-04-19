const canvas = document.querySelector('#webgl-bg');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// Criação da Galáxia
const particlesGeometry = new THREE.BufferGeometry();
const particlesCount = 5000; // Quantidade massiva para preencher a tela
const posArray = new Float32Array(particlesCount * 3);
const colorsArray = new Float32Array(particlesCount * 3);

for(let i = 0; i < particlesCount * 3; i+=3) {
    // Espalhamento em uma área vasta (40 unidades)
    posArray[i] = (Math.random() - 0.5) * 40;
    posArray[i+1] = (Math.random() - 0.5) * 40;
    posArray[i+2] = (Math.random() - 0.5) * 40;

    // Mistura de cores Neon (Roxo e Rosa)
    const isPink = Math.random() > 0.5;
    colorsArray[i] = isPink ? 1.0 : 0.66;
    colorsArray[i+1] = isPink ? 0.3 : 0.5;
    colorsArray[i+2] = isPink ? 0.9 : 1.0;
}

particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colorsArray, 3));

const particlesMaterial = new THREE.PointsMaterial({
    size: 0.03,
    vertexColors: true,
    transparent: true,
    opacity: 0.8,
    blending: THREE.AdditiveBlending // Faz as cores brilharem quando se sobrepõem
});

const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(particlesMesh);
camera.position.z = 5;

// Interatividade
let mouseX = 0;
let mouseY = 0;
let targetX = 0;
let targetY = 0;
const windowHalfX = window.innerWidth / 2;
const windowHalfY = window.innerHeight / 2;

document.addEventListener('mousemove', (event) => {
    mouseX = (event.clientX - windowHalfX);
    mouseY = (event.clientY - windowHalfY);
});

document.addEventListener('touchmove', (event) => {
    if (event.touches.length > 0) {
        mouseX = (event.touches[0].clientX - windowHalfX);
        mouseY = (event.touches[0].clientY - windowHalfY);
    }
}, {passive: true});

const clock = new THREE.Clock();

const tick = () => {
    const elapsedTime = clock.getElapsedTime();
    
    // Rotação contínua da galáxia
    particlesMesh.rotation.y = elapsedTime * 0.02;
    particlesMesh.rotation.x = elapsedTime * 0.01;

    // Parallax (Movimento reativo ao mouse)
    targetX = mouseX * 0.002;
    targetY = mouseY * 0.002;
    particlesMesh.rotation.y += 0.05 * (targetX - particlesMesh.rotation.y);
    particlesMesh.rotation.x += 0.05 * (targetY - particlesMesh.rotation.x);

    // Efeito de respiração (pulsação de brilho)
    particlesMesh.material.opacity = 0.5 + Math.sin(elapsedTime * 1.5) * 0.3;

    renderer.render(scene, camera);
    window.requestAnimationFrame(tick);
};

tick();

// Responsividade
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});