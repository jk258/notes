# 起步
## 开始
1. 创建场景
```javascript
const scene = new THREE.Scene()
```
2. 创建相机
```javascript
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
camera.position.set(0, 0, 10)//设置相机位置
```
3. 添加物体
```javascript
// 创建集合体
const cubeGeometry = new THREE.BoxGeometry(1, 1, 1)
const cubeMaterial = new THREE.MeshBasicMaterial({ color: 0xfff000 })

// 根据集合体和材质创建物体
const cube = new THREE.Mesh(cubeGeometry, cubeMaterial)
// 将几何体添加到场景中
scene.add(cube)
```
4. 初始化渲染器并添加到页面
```javascript
const renderer = new THREE.WebGL1Renderer()
renderer.setSize(window.innerWidth, window.innerHeight)//设置大小
document.body.appendChild(renderer.domElement)
```
::: tip
使用渲染器，通过相机把场景渲染进来
```javascript
const controls = new OrbitControls(camera, renderer.domElement)
```
:::

## BufferGeometry设置顶点创建矩形
```javascript
const geometry = new THREE.BufferGeometry()
const vertices = new Float32Array([
  -1.0, -1.0, 1.0,
  1.0, -1.0, 1.0,
  1.0, 1.0, 1.0,
  1.0, 1.0, 1.0,
  -1.0, 1.0, 1.0,
  -1.0, -1.0, 1.0,
])
geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3))
const material = new THREE.MeshBasicMaterial({ color: 0xfff000 })
const mesh = new THREE.Mesh(geometry, material)
mesh.material.wireframe=true//线型方块
scene.add(mesh)
```
