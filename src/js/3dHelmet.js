let helmetJson = require('../3d/scene.json')

const THREE = require('three')
const OrbitControls = require('three-orbit-controls')(THREE)

class Helmet {
  constructor() {
    this.windowWidth = 900
    this.windowHeight = 700
    this.scene = new THREE.Scene()
    this.camera = new THREE.PerspectiveCamera(75, this.windowWidth / this.windowHeight, 0.1, 1000)
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    })
    this.helmetObj = new THREE.Object3D()
    this.controls = new OrbitControls(this.camera, this.renderer.domElement)
    this.controls.minPolarAngle = 0
    this.controls.maxPolarAngle = Math.PI / 2
    this.controls.enabled = true
    this.controls.maxDistance = 30
    this.controls.minDistance = 30
    this.controls.addEventListener('change', () => {
      this.renderer.render(this.scene, this.camera)
    })
    THREE.DefaultLoadingManager.onLoad = function() {
      // console.log('Loading Complete!')
    }
  }
  init() {
    let scene = this.scene

    this.scene.rotation.y = 0
    this.scene.position.y = -10

    let camera = this.camera
    camera.position.z = 30
    camera.position.y = 0
    camera.position.x = 0

    let renderer = this.renderer
    renderer.setSize(this.windowWidth, this.windowHeight)
    renderer.shadowMap.enabled = true
    renderer.shadowMapBias = 0.0039
    renderer.shadowMapDarkness = 0.5

    let renderWebGL = document.querySelector('.render')
    renderWebGL.appendChild(renderer.domElement)

    let ambientLight = new THREE.AmbientLight(0x000000)
    let directionalLight = new THREE.DirectionalLight(0x000000, 0.7)
    directionalLight.position.set(0, 5, 0)
    this.scene.add(ambientLight)
    this.scene.add(directionalLight)
    this.load(scene, camera, renderer)
  }

  load(scene, camera, renderer) {
    let loader = new THREE.ObjectLoader()
    let that = this

    loader.load(helmetJson, function(object) {
      object.name = 'helmet'
      that.helmetObj.add(object)
      scene.add(that.helmetObj)
      that.render({
        start: true,
      })
      that.render()
    })
  }

  responsive() {
    let that = this
    window.addEventListener('resize', () => {
      that.windowWidth = this.windowWidth
      that.windowHeight = this.windowHeight
      that.camera.aspect = that.windowWidth / that.windowHeight
      that.camera.updateProjectionMatrix()
      that.renderer.setSize(that.windowWidth, that.windowHeight)
    })
  }

  render(options) {
    this.renderer.render(this.scene, this.camera)
  }
}

if (document.querySelector('.render') != null) {
  const helmet3d = new Helmet()
  helmet3d.init()
  helmet3d.render()
}
