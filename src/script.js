import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'

// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene();

// Textures
const sprite = new THREE.TextureLoader().load( './circle.png')

// Objects
const geometry = new THREE.TorusGeometry( .7, .2, 16, 100 );

const particleGeom = new THREE.BufferGeometry();
const particleCount = 10000;
const particlePos = new Float32Array(particleCount * 3);

for (let i = 0; i < particleCount*3; i++) {
    particlePos[i] = (Math.random() - 0.5) * 3;
}

particleGeom.setAttribute('position', new THREE.BufferAttribute(particlePos, 3))


// Materials

const material = new THREE.PointsMaterial({
    size:0.005,
    color: 0xffffff,
    map: sprite,
    transparent: true,
    color: 'cyan',
    })


// Mesh
const sphere = new THREE.Points(geometry,material)

const particleMesh = new THREE.Points(particleGeom, material)

// Scene
scene.add(particleMesh)

// Lights

const pointLight = new THREE.PointLight(0xffffff, 0.5)
pointLight.position.x = 2
pointLight.position.y = 3
pointLight.position.z = 4
scene.add(pointLight)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 0
camera.position.y = 0
camera.position.z = 2
scene.add(camera)

// Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

// Mouse
document.body.addEventListener('pointermove', onPointerMove)
let mouseX = 0, mouseY = 0;
function onPointerMove(event){
    //if (event.isPrimary === false) return;

    mouseX = event.clientX;
    mouseY = event.clientY;
}

/**
 * Animate
 */

const clock = new THREE.Clock()

const tick = () =>
{

    const elapsedTime = clock.getElapsedTime()

    // Update objects
    sphere.rotation.y = .5 * elapsedTime;

    particleMesh.rotation.y = mouseY * elapsedTime * 0.00007;
    particleMesh.rotation.x = mouseX * elapsedTime * 0.00007;

    // Update Orbital Controls
    // controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()