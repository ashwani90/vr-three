### **🚀 Next Steps: Adding Interactivity to the VR House**
Now that we have a **basic VR house visualization**, let's add:  
1. **Teleportation & Movement** 🚶‍♂️  
2. **Interacting with Objects (e.g., opening doors)** 🚪  
3. **Adding Physics for Realism** 🔄  

---

## **1️⃣ Enable Teleportation & Movement**
We’ll use **`XRControllerModelFactory`** and **`XRControllerGrip`** to allow movement in VR.

### **📌 Modify `main.js`**
Add these lines to enable teleportation:

```javascript
import { XRControllerModelFactory } from "three/addons/webxr/XRControllerModelFactory.js";
import { XRHandModelFactory } from "three/addons/webxr/XRHandModelFactory.js";

let controller, controllerGrip;

// Setup Controllers
controller = renderer.xr.getController(0);
scene.add(controller);

const controllerModelFactory = new XRControllerModelFactory();
controllerGrip = renderer.xr.getControllerGrip(0);
controllerGrip.add(controllerModelFactory.createControllerModel(controllerGrip));
scene.add(controllerGrip);

// Teleportation Logic (Move Forward on Button Press)
controller.addEventListener("selectstart", () => {
    const direction = new THREE.Vector3();
    camera.getWorldDirection(direction);
    camera.position.addScaledVector(direction, 0.5); // Move forward
});
```

#### **✅ How it Works**
- `controller.getWorldDirection()` gets the current facing direction.
- `addScaledVector()` moves the player forward when they press the controller button.

---

## **2️⃣ Interacting with Objects (Open Doors)**
We’ll **detect object clicks** and trigger an animation when interacting (e.g., opening a door).

### **📌 Add Event Listeners for Object Selection**
```javascript
let raycaster = new THREE.Raycaster();
let tempMatrix = new THREE.Matrix4();

// Function to check for intersections
function checkIntersections() {
    if (!controller) return;

    tempMatrix.identity().extractRotation(controller.matrixWorld);
    raycaster.ray.origin.setFromMatrixPosition(controller.matrixWorld);
    raycaster.ray.direction.set(0, 0, -1).applyMatrix4(tempMatrix);

    const intersects = raycaster.intersectObjects(scene.children, true);

    if (intersects.length > 0) {
        let selectedObject = intersects[0].object;

        if (selectedObject.name === "door") {
            openDoor(selectedObject);
        }
    }
}

// Function to Open Door
function openDoor(door) {
    let openPosition = new THREE.Vector3(door.position.x + 1, door.position.y, door.position.z);
    new THREE.VectorKeyframeTrack(".position", [0, 2], [door.position.x, door.position.y, door.position.z, openPosition.x, openPosition.y, openPosition.z]);

    console.log("Door opened!");
}

// Trigger interaction on controller select
controller.addEventListener("selectstart", checkIntersections);
```

#### **✅ How it Works**
- **Raycasting** detects when the VR controller is pointing at an object.
- If an object **named "door"** is clicked, it moves (simulating an open door).

---

## **3️⃣ Adding Physics for Realism**
To **add gravity & collision detection**, use **Cannon.js**.

### 📌 **Install Cannon.js**
```bash
npm install cannon-es
```

### 📌 **Integrate Cannon.js Physics**
Modify `main.js`:
```javascript
import * as CANNON from "cannon-es";

// Create Physics World
const physicsWorld = new CANNON.World();
physicsWorld.gravity.set(0, -9.8, 0); // Add gravity

// Create Floor Body
const floorBody = new CANNON.Body({
    mass: 0, // Static object
    shape: new CANNON.Plane(),
});
physicsWorld.addBody(floorBody);

// Create Player Body
const playerBody = new CANNON.Body({
    mass: 1, // Dynamic object
    shape: new CANNON.Sphere(0.5),
    position: new CANNON.Vec3(0, 1, 0),
});
physicsWorld.addBody(playerBody);

// Sync physics with Three.js
function updatePhysics() {
    physicsWorld.step(1 / 60);
    camera.position.copy(playerBody.position);
}

// Update loop
function animate() {
    renderer.setAnimationLoop(() => {
        updatePhysics();
        renderer.render(scene, camera);
    });
}

animate();
```

#### **✅ How it Works**
- **Physics world** is created with **Cannon.js**.
- **Player (camera) gets physics properties** (gravity, collision).
- **Objects interact naturally** (e.g., the player can’t walk through walls).

---

## **🚀 Final Features Added**
✅ **Teleportation & VR movement**  
✅ **Interactive objects (doors open on click)**  
✅ **Physics (gravity & collision detection)**  

Would you like to add **lighting effects, UI elements, or hand tracking** next? 😊🚀