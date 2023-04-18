import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'lil-gui'

/**
 * Base
 */
// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Lights
 */
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
scene.add(ambientLight)

const pointLight = new THREE.PointLight(0xffffff, 0.5)
pointLight.position.x = 2
pointLight.position.y = 3
pointLight.position.z = 4
scene.add(pointLight)

/**
 * Objects
 */
// Material\

//map
const mapFile = 'map.txt';

fetch(mapFile)
  .then(response => response.text())
  .then(text => {
    // Parse the text file into a 2D array of numbers
    const map = text.trim().split('\n').map(row => row.trim().split('').map(Number));

    // Loop through the map and create cubes for each position
    const cubeSize = 1;
    const goldMaterial = new THREE.MeshStandardMaterial({ color: 'gold', metalness: 0.8 });
    const blueMaterial = new THREE.MeshStandardMaterial({ color: 'blue', metalness: 0.2 });
    const group = new THREE.Group();

    for (let i = 0; i < map.length; i++) {
      for (let j = 0; j < map[i].length; j++) {
        if (map[i][j] === 1) {
          const cube = new THREE.Mesh(new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize), goldMaterial);
          cube.position.set(j * (cubeSize + 1), 0, i * (cubeSize +1));
          group.add(cube);
        } else {
          const cube = new THREE.Mesh(new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize), blueMaterial);
          cube.position.set(j * (cubeSize + 1), 0, i * (cubeSize +1));
          group.add(cube);
        }
      }
    }

    // Add the group to the scene
    scene.add(group);
  });

//color
const silverColor = new THREE.Color("rgb(120,120,1)");
const goldColor = new THREE.Color("rgb(212, 175, 55)");


// Object
const Wall = new THREE.MeshStandardMaterial({color: goldColor});
Wall.roughness = 0.4 
Wall.metalness = 0

const terrain = new THREE.MeshStandardMaterial({color: silverColor});

//Mesh

const geometry = new THREE.BoxGeometry(1,1,1)

// Objects
// var cubex = [];
// var x = 0;
// for (let i = 0; i < 6; i++)
// {
//     for (let y = 0; y < 6;y++)
//     {
//         if ((i == 0 || i == 3) && (y == 0 || y == 3))
//         cubex[x] = new THREE.Mesh(
//             geometry,
//             Wall
//         )
//         else
//          cubex[x] = new THREE.Mesh(
//             geometry,
//             terrain
//          )
//         cubex[x].position.x = i * 2
//         cubex[x].position.y = y * 2
//         scene.add(cubex[x])
//         x = x + 1
//     }
// }

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
camera.position.x = 8
camera.position.y = 8
camera.position.z = -10
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update objects
    // cubex.forEach(cube => 
    //     {
    //         cube.rotation.x = -0.1 * elapsedTime
    //         cube.rotation.y = -0.1 * elapsedTime
    //     })
    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()