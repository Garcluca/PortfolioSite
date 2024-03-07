import * as THREE from 'three'

export default class IntroSection
{
    constructor(_options)
    {
        // Options
        this.config = _options.config
        this.time = _options.time
        this.resources = _options.resources
        this.objects = _options.objects
        this.areas = _options.areas
        this.walls = _options.walls
        this.tiles = _options.tiles
        this.debug = _options.debug
        this.x = _options.x
        this.y = _options.y

        // Set up
        this.container = new THREE.Object3D()
        this.container.matrixAutoUpdate = false
        this.container.updateMatrix()

        this.setStatic()
        this.setInstructions()
        this.setOtherInstructions()
        this.setOtherOtherInstructions()
        
        this.setTitles()
        this.setTiles()
        this.setDikes()
    }

    setStatic()
    {

        this.objects.add({

            // regular value is introStaticBase
            base: this.resources.items.noneBase.scene,

            // regular value is introStaticCollision
            collision: this.resources.items.introStaticCollision.scene,
            offset: new THREE.Vector3(0, 0, 0),
            rotation: new THREE.Euler(0,0, .4),       //the collision should match with foliomodel.txs in order to allign the collision and animation
            scale: new THREE.Vector3(1 ,1, 1),
            shadow: { sizeX: 1.5, sizeY: 1.5, offsetZ: 0, alpha: 0.4 },

            added: true,
            mass: 0,

        })



        
            // change the base to either of these to introStaticRampCollision to visually debug the blender imports and collision/animation sync
            this.objects.add({
                base: this.resources.items.noneBase.scene,
                collision: this.resources.items.introStaticRampCollision.scene,
                offset: new THREE.Vector3(10, 200, 0.1),
                rotation: new THREE.Euler(0.07,0.04, .35),       
                scale: new THREE.Vector3(1 ,1, 1),
                shadow: { sizeX: 1.5, sizeY: 1.5, offsetZ: 0, alpha: 0.4 },
                offset: new THREE.Vector3(this.x - 23, this.y -28, -0.7),
                
                mass: 0,
            })

            // oh my god after like 5 hours  dfejqwodviskjvdbske
            // i had an idea that maybe the physics engine couldn't handle any ppolygon over a certian size at specific angles specifically in some aspects of its collision that inconsistantly broke down
            // literally even the simplese polygons lost their friction if any angle rotated around the x axis, but only sometimes
            // none of the doccumentation mentioned conditional breaking or gimble lock I'm using quaternions anyways 
            // this shouldn't be a problem because objects that are scaled much larger and more complicated have no issue, but FUCK ME I GUESS
            // so the actual ramp is now made up of no less than 20 little boxes strapped together painsteakingly in blender to allow the engine to handle the simple boxes in bite size pieces
            // it also has other pieces of geometry in the collision scene because it needs them for context?? idk it does not like interacting with 3d models ... except it's a 3d physics engine .... why
            // in the future if anything dosen't work just take like 2 hours in blender fixing what should just work
            // keep in mind when building a better version

            this.objects.add({
                base: this.resources.items.noneBase.scene,
                collision: this.resources.items.introStaticRampCollision2.scene,
                rotation: new THREE.Euler(0,0, .35),       
                scale: new THREE.Vector3(1 ,1, 1),
                shadow: { sizeX: 1.5, sizeY: 1.5, offsetZ: 0, alpha: 0.4 },
                offset: new THREE.Vector3(this.x - 27, this.y -16, 7.6),
                
                mass: 0,
            })
        
    }

    setInstructions()
    {
        this.instructions = {}

        /**
         * Arrows
         */
        this.instructions.arrows = {}

        // Label
        this.instructions.arrows.label = {}

        this.instructions.arrows.label.texture = this.config.touch ? this.resources.items.introInstructionsControlsTexture : this.resources.items.introInstructionsArrowsTexture
        this.instructions.arrows.label.texture.magFilter = THREE.NearestFilter
        this.instructions.arrows.label.texture.minFilter = THREE.LinearFilter

        this.instructions.arrows.label.material = new THREE.MeshBasicMaterial({ transparent: true, alphaMap: this.instructions.arrows.label.texture, color: 0xffffff, depthWrite: false, opacity: 0 })


        this.instructions.arrows.label.geometry = this.resources.items.introInstructionsLabels.scene.children.find((_mesh) => _mesh.name === 'arrows').geometry

        this.instructions.arrows.label.mesh = new THREE.Mesh(this.instructions.arrows.label.geometry, this.instructions.arrows.label.material)
        this.instructions.arrows.label.mesh.position.set(2.3,7.8 ,12.001)
        this.instructions.arrows.label.mesh.rotation.set(0,0,0.4)
        this.container.add(this.instructions.arrows.label.mesh)

        if(!this.config.touch)
        {
            //Keys

            //offset correctly is scaled for the upperkey, and (+/- .08, 0, 0) ffor the side keys
            this.instructions.arrows.up = this.objects.add({
                base: this.resources.items.introArrowKeyBase.scene,
                collision: this.resources.items.introArrowKeyCollision.scene,
                offset: new THREE.Vector3(2.5, 9.9, 12.1),
                rotation: new THREE.Euler(0, 0, 0 + .4),
                duplicated: true,
                // scale: new THREE.Vector3(7, 7, 7),
                //shadow: { sizeX: 1, sizeY: 1, offsetZ: - 0, alpha: 0.5 },
                wireframe: true,
                mass: 1.500,
                soundName: 'brick'
            })
            this.instructions.arrows.down = this.objects.add({
                base: this.resources.items.introArrowKeyBase.scene,
                collision: this.resources.items.introArrowKeyCollision.scene,
                offset: new THREE.Vector3(2.8, 8.7, 12.1),
                rotation: new THREE.Euler(0, 0, Math.PI + .4),
                duplicated: true,
                shadow: { sizeX: 1, sizeY: 1, offsetZ: - 0.2, alpha: 0.5 },
                mass: 1.5,
                soundName: 'brick'
            })
            this.instructions.arrows.left = this.objects.add({
                base: this.resources.items.introArrowKeyBase.scene,
                collision: this.resources.items.introArrowKeyCollision.scene,
                offset: new THREE.Vector3(2, 8.4, 12.1),
                rotation: new THREE.Euler(0, 0, Math.PI * 0.5  + .4),
                duplicated: true,
                shadow: { sizeX: 1, sizeY: 1, offsetZ: - 0.2, alpha: 0.5 },
                mass: 1.5,
                soundName: 'brick'
            })
            this.instructions.arrows.right = this.objects.add({
                base: this.resources.items.introArrowKeyBase.scene,
                collision: this.resources.items.introArrowKeyCollision.scene,
                offset: new THREE.Vector3(3.6, 9, 12.1),
                rotation: new THREE.Euler(0, 0, - Math.PI * 0.5  + .4),
                duplicated: true,
                shadow: { sizeX: 1, sizeY: 1, offsetZ: - 0.2, alpha: 0.5 },
                mass: 1.5,
                soundName: 'brick'
            })
        }
    }

    setOtherInstructions()
    {
        if(this.config.touch)
        {
            return
        }

        this.otherInstructions = {}
        this.otherInstructions.x = -15
        this.otherInstructions.y = -2
        this.otherInstructions.z = 12.1


        // Container
        this.otherInstructions.container = new THREE.Object3D()
        this.otherInstructions.container.position.x = this.otherInstructions.x 
        this.otherInstructions.container.position.y = this.otherInstructions.y
        this.otherInstructions.container.position.z = this.otherInstructions.z
        this.otherInstructions.container.rotation.z = 0.38
        this.otherInstructions.container.matrixAutoUpdate = false
        this.otherInstructions.container.updateMatrix()
        this.container.add(this.otherInstructions.container)

        // Label
        this.otherInstructions.label = {}

        this.otherInstructions.label.geometry = new THREE.PlaneBufferGeometry(15, 15, 1, 1)

        this.otherInstructions.label.texture = this.resources.items.introIntroductionTexture
        this.instructions.arrows.label.texture.magFilter = THREE.NearestFilter
        this.otherInstructions.label.texture.magFilter = THREE.NearestFilter
        this.otherInstructions.label.texture.minFilter = THREE.LinearFilter

        this.otherInstructions.label.material = new THREE.MeshBasicMaterial({ transparent: true, alphaMap: this.otherInstructions.label.texture, color: 0xffffff, depthWrite: false, opacity: 0 })

        this.otherInstructions.label.mesh = new THREE.Mesh(this.otherInstructions.label.geometry, this.otherInstructions.label.material)
        this.otherInstructions.label.mesh.matrixAutoUpdate = false
        this.otherInstructions.container.add(this.otherInstructions.label.mesh)

        // Horn

    }


    setOtherOtherInstructions()
    {
        if(this.config.touch)
        {
            return
        }

        this.otherotherInstructions = {}
        this.otherotherInstructions.x = -15
        this.otherotherInstructions.y = 2
        this.otherotherInstructions.z = 12.1


        // Container
        this.otherotherInstructions.container = new THREE.Object3D()
        this.otherotherInstructions.container.position.x = this.otherotherInstructions.x
        this.otherotherInstructions.container.position.y = this.otherotherInstructions.y
        this.otherotherInstructions.container.position.z = this.otherotherInstructions.z
        this.otherotherInstructions.container.rotation.z = 0.38
        this.otherotherInstructions.container.matrixAutoUpdate = false
        this.otherotherInstructions.container.updateMatrix()
        this.container.add(this.otherotherInstructions.container)

        // Label
        this.otherotherInstructions.label = {}

        this.otherotherInstructions.label.geometry = new THREE.PlaneBufferGeometry(6, 6, 1, 1)

        this.otherotherInstructions.label.texture = this.resources.items.introIntroductionTexture
        this.instructions.arrows.label.texture.magFilter = THREE.NearestFilter
        this.otherotherInstructions.label.texture.magFilter = THREE.NearestFilter
        this.otherotherInstructions.label.texture.minFilter = THREE.LinearFilter

        this.otherotherInstructions.label.material = new THREE.MeshBasicMaterial({ transparent: true, alphaMap: this.otherotherInstructions.label.texture, color: 0xffffff, depthWrite: false, opacity: 0 })

        this.otherotherInstructions.label.mesh = new THREE.Mesh(this.otherotherInstructions.label.geometry, this.otherotherInstructions.label.material)
        this.otherotherInstructions.label.mesh.matrixAutoUpdate = false
        this.otherotherInstructions.container.add(this.otherotherInstructions.label.mesh)

        // Horn

    }

    

    setTitles()
    {
        // Title
        this.objects.add({
            base: this.resources.items.introRBase.scene,
            collision: this.resources.items.introRCollision.scene,
            offset: new THREE.Vector3(0, 0, 1),
            rotation: new THREE.Euler(0, 0, 0),
            scale: new THREE.Vector3(2, 2, 2),
            shadow: { sizeX: 1.5, sizeY: 1.5, offsetZ: - 0.6, alpha: 0.4 },
            mass: 1.5,
            soundName: 'brick'
        })
        // this.objects.add({
        //     base: this.resources.items.introRBase.scene,
        //     collision: this.resources.items.introRCollision.scene,
        //     offset: new THREE.Vector3(0, 0, 0),
        //     rotation: new THREE.Euler(0, 0, 0),
        //     shadow: { sizeX: 1.5, sizeY: 1.5, offsetZ: - 0.6, alpha: 0.4 },
        //     mass: 1.5,
        //     soundName: 'brick'
        // })
        // this.objects.add({
        //     base: this.resources.items.introUBase.scene,
        //     collision: this.resources.items.introUCollision.scene,
        //     offset: new THREE.Vector3(0, 0, 0),
        //     rotation: new THREE.Euler(0, 0, 0),
        //     shadow: { sizeX: 1.5, sizeY: 1.5, offsetZ: - 0.6, alpha: 0.4 },
        //     mass: 1.5,
        //     soundName: 'brick'
        // })
        // this.objects.add({
        //     base: this.resources.items.introNBase.scene,
        //     collision: this.resources.items.introNCollision.scene,
        //     offset: new THREE.Vector3(0, 0, 0),
        //     rotation: new THREE.Euler(0, 0, 0),
        //     duplicated: true,
        //     shadow: { sizeX: 1.5, sizeY: 1.5, offsetZ: - 0.6, alpha: 0.4 },
        //     mass: 1.5,
        //     soundName: 'brick'
        // })
        // this.objects.add({
        //     base: this.resources.items.introOBase.scene,
        //     collision: this.resources.items.introOCollision.scene,
        //     offset: new THREE.Vector3(0, 0, 0),
        //     rotation: new THREE.Euler(0, 0, 0),
        //     duplicated: true,
        //     shadow: { sizeX: 1.5, sizeY: 1.5, offsetZ: - 0.6, alpha: 0.4 },
        //     mass: 1.5,
        //     soundName: 'brick'
        // })
        // this.objects.add({
        //     base: this.resources.items.introSBase.scene,
        //     collision: this.resources.items.introSCollision.scene,
        //     offset: new THREE.Vector3(0, 0, 0),
        //     rotation: new THREE.Euler(0, 0, 0),
        //     shadow: { sizeX: 1.5, sizeY: 1.5, offsetZ: - 0.6, alpha: 0.4 },
        //     mass: 1.5,
        //     soundName: 'brick'
        // })
        // this.objects.add({
        //     base: this.resources.items.introIBase.scene,
        //     collision: this.resources.items.introICollision.scene,
        //     offset: new THREE.Vector3(0, 0, 0),
        //     rotation: new THREE.Euler(0, 0, 0),
        //     shadow: { sizeX: 1.5, sizeY: 1.5, offsetZ: - 0.6, alpha: 0.4 },
        //     mass: 1.5,
        //     soundName: 'brick'
        // })
        // this.objects.add({
        //     base: this.resources.items.introMBase.scene,
        //     collision: this.resources.items.introMCollision.scene,
        //     offset: new THREE.Vector3(0, 0, 0),
        //     rotation: new THREE.Euler(0, 0, 0),
        //     shadow: { sizeX: 1.5, sizeY: 1.5, offsetZ: - 0.6, alpha: 0.4 },
        //     mass: 1.5,
        //     soundName: 'brick'
        // })
        // this.objects.add({
        //     base: this.resources.items.introOBase.scene,
        //     collision: this.resources.items.introOCollision.scene,
        //     offset: new THREE.Vector3(3.95, 0, 0),
        //     rotation: new THREE.Euler(0, 0, 0),
        //     duplicated: true,
        //     shadow: { sizeX: 1.5, sizeY: 1.5, offsetZ: - 0.6, alpha: 0.4 },
        //     mass: 1.5,
        //     soundName: 'brick'
        // })
        // this.objects.add({
        //     base: this.resources.items.introNBase.scene,
        //     collision: this.resources.items.introNCollision.scene,
        //     offset: new THREE.Vector3(5.85, 0, 0),
        //     rotation: new THREE.Euler(0, 0, 0),
        //     duplicated: true,
        //     shadow: { sizeX: 1.5, sizeY: 1.5, offsetZ: - 0.6, alpha: 0.4 },
        //     mass: 1.5,
        //     soundName: 'brick'
        // })
        // this.objects.add({
        //     base: this.resources.items.introCreativeBase.scene,
        //     collision: this.resources.items.introCreativeCollision.scene,
        //     offset: new THREE.Vector3(0, 0, 0),
        //     rotation: new THREE.Euler(0, 0, 0.25),
        //     shadow: { sizeX: 5, sizeY: 1.5, offsetZ: - 0.6, alpha: 0.3 },
        //     mass: 1.5,
        //     sleep: false,
        //     soundName: 'brick'
        // })
        // this.objects.add({
        //     base: this.resources.items.introDevBase.scene,
        //     collision: this.resources.items.introDevCollision.scene,
        //     offset: new THREE.Vector3(0, 0, 0),
        //     rotation: new THREE.Euler(0, 0, 0),
        //     shadow: { sizeX: 2.5, sizeY: 1.5, offsetZ: - 0.6, alpha: 0.3 },
        //     mass: 1.5,
        //     soundName: 'brick'
        // })
    }

    setTiles()
    {
        this.tiles.add({
            start: new THREE.Vector2(0, - 4.5),
            delta: new THREE.Vector2(0, - 4.5)
        })
    }

    setDikes()
    {
        this.dikes = {}
        this.dikes.brickOptions = {
            base: this.resources.items.brickBase.scene,
            collision: this.resources.items.brickCollision.scene,
            offset: new THREE.Vector3(0, 0, 12),
            rotation: new THREE.Euler(0, 0, 0),
            duplicated: true,
            shadow: { sizeX: 1.2, sizeY: 1.8, offsetZ: - 0.15, alpha: 0.35 },
            mass: 0.5,
            soundName: 'brick'
        }

        // this.walls.add({
        //     object:
        //     {
        //         ...this.dikes.brickOptions,
        //         rotation: new THREE.Euler(0, 0, Math.PI * 0.5)
        //     },
        //     shape:
        //     {
        //         type: 'brick',
        //         equilibrateLastLine: true,
        //         widthCount: 3,
        //         heightCount: 2,
        //         position: new THREE.Vector3(this.x + 0, this.y - 4, 0),
        //         offsetWidth: new THREE.Vector3(1.05, 0, 0),
        //         offsetHeight: new THREE.Vector3(0, 0, 0.45),
        //         randomOffset: new THREE.Vector3(0, 0, 0),
        //         randomRotation: new THREE.Vector3(0, 0, 0.2)
        //     }
        // })

        //guides to the ramp
        this.walls.add({
            object: this.dikes.brickOptions,
            shape:
            {
                type: 'brick',
                equilibrateLastLine: true,
                widthCount: 5,
                heightCount: 3,
                position: new THREE.Vector3(this.x - 24, this.y - 16, 0),
                offsetWidth: new THREE.Vector3(0, 1.05, 0),
                offsetHeight: new THREE.Vector3(0, 0, 0.45),
                randomOffset: new THREE.Vector3(0, 0, 0),
                randomRotation: new THREE.Vector3(0, 0, 0.2)
            }
        })


        this.walls.add({
            object: this.dikes.brickOptions,
            shape:
            {
                type: 'brick',
                equilibrateLastLine: true,
                widthCount: 5,
                heightCount: 3,
                position: new THREE.Vector3(this.x - 17.4, this.y - 13.65, 0),
                offsetWidth: new THREE.Vector3(0, 1.05, 0),
                offsetHeight: new THREE.Vector3(0, 0, 0.45),
                randomOffset: new THREE.Vector3(0, 0, 0),
                randomRotation: new THREE.Vector3(0, 0, 0.2)
            }
        })


        

        // this.walls.add({
        //     object:
        //     {
        //         ...this.dikes.brickOptions,
        //         rotation: new THREE.Euler(0, 0, Math.PI * 0.5)
        //     },
        //     shape:
        //     {
        //         type: 'brick',
        //         equilibrateLastLine: true,
        //         widthCount: 3,
        //         heightCount: 2,
        //         position: new THREE.Vector3(this.x + 8, this.y + 6, 0),
        //         offsetWidth: new THREE.Vector3(1.05, 0, 0),
        //         offsetHeight: new THREE.Vector3(0, 0, 0.45),
        //         randomOffset: new THREE.Vector3(0, 0, 0),
        //         randomRotation: new THREE.Vector3(0, 0, 0.2)
        //     }
        // })

        // this.walls.add({
        //     object: this.dikes.brickOptions,
        //     shape:
        //     {
        //         type: 'brick',
        //         equilibrateLastLine: false,
        //         widthCount: 3,
        //         heightCount: 2,
        //         position: new THREE.Vector3(this.x + 9.9, this.y + 4.7, 0),
        //         offsetWidth: new THREE.Vector3(0, - 1.05, 0),
        //         offsetHeight: new THREE.Vector3(0, 0, 0.45),
        //         randomOffset: new THREE.Vector3(0, 0, 0),
        //         randomRotation: new THREE.Vector3(0, 0, 0.2)
        //     }
        // })


        //adds the corner space
        this.walls.add({
            object:
            {
                ...this.dikes.brickOptions,
                rotation: new THREE.Euler(0, 0, Math.PI * 0.5)
            },
            shape:
            {
                type: 'brick',
                equilibrateLastLine: true,
                widthCount: 3,
                heightCount: 2,
                position: new THREE.Vector3(this.x - 31, this.y + 5, 0),
                offsetWidth: new THREE.Vector3(1.05, 0, 0),
                offsetHeight: new THREE.Vector3(0, 0, 0.45),
                randomOffset: new THREE.Vector3(0, 0, 0),
                randomRotation: new THREE.Vector3(0, 0, 0.2)
            }
        })

        this.walls.add({
            object: this.dikes.brickOptions,
            shape:
            {
                type: 'brick',
                equilibrateLastLine: false,
                widthCount: 3,
                heightCount: 2,
                position: new THREE.Vector3(this.x - 31.8, this.y + 3.7, 0),
                offsetWidth: new THREE.Vector3(0, - 1.05, 0),
                offsetHeight: new THREE.Vector3(0, 0, 0.45),
                randomOffset: new THREE.Vector3(0, 0, 0),
                randomRotation: new THREE.Vector3(0, 0, 0.2)
            }
        })

        this.walls.add({
            object: this.dikes.brickOptions,
            shape:
            {
                type: 'brick',
                equilibrateLastLine: true,
                widthCount: 3,
                heightCount: 2,
                position: new THREE.Vector3(this.x - 14.8, this.y - 3.5, 0),
                offsetWidth: new THREE.Vector3(0, - 1.05, 0),
                offsetHeight: new THREE.Vector3(0, 0, 0.45),
                randomOffset: new THREE.Vector3(0, 0, 0),
                randomRotation: new THREE.Vector3(0, 0, 0.2)
            }
        })

        if(!this.config.touch)
        {
            this.walls.add({
                object:
                {
                    ...this.dikes.brickOptions,
                    rotation: new THREE.Euler(0, 0, Math.PI * 0.5)
                },
                shape:
                {
                    type: 'brick',
                    equilibrateLastLine: true,
                    widthCount: 2,
                    heightCount: 2,
                    position: new THREE.Vector3(this.x + 18.5, this.y + 3, 0),
                    offsetWidth: new THREE.Vector3(1.05, 0, 0),
                    offsetHeight: new THREE.Vector3(0, 0, 0.45),
                    randomOffset: new THREE.Vector3(0, 0, 0),
                    randomRotation: new THREE.Vector3(0, 0, 0.2)
                }
            })

            this.walls.add({
                object: this.dikes.brickOptions,
                shape:
                {
                    type: 'brick',
                    equilibrateLastLine: false,
                    widthCount: 2,
                    heightCount: 2,
                    position: new THREE.Vector3(this.x + 19.9, this.y + 2.2, 0),
                    offsetWidth: new THREE.Vector3(0, - 1.05, 0),
                    offsetHeight: new THREE.Vector3(0, 0, 0.45),
                    randomOffset: new THREE.Vector3(0, 0, 0),
                    randomRotation: new THREE.Vector3(0, 0, 0.2)
                }
            })
        }
    }
}
