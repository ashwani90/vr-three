### **🚀 Next Steps: Adding NPC Animations & AI Navigation**  
Now, we’ll add:  
1. **NPC Animations (Walking, Talking, Gestures)** 🎭  
2. **AI-Driven Navigation (NPC Walks Around the House)** 🚶‍♂️  

---

## **1️⃣ Add NPC Animations (GLTF + Animation Mixer)**  
We’ll use **GLTF models with animations** to make NPCs **walk, idle, and gesture**.  

---

### **📌 Load an Animated NPC Model**
Modify `main.js`:  
```javascript
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

const loader = new GLTFLoader();
let npcModel, npcMixer;

loader.load("models/npc.glb", (gltf) => {
    npcModel = gltf.scene;
    npcModel.position.set(2, 0, -3);
    scene.add(npcModel);

    // Initialize Animation Mixer
    npcMixer = new THREE.AnimationMixer(npcModel);
    gltf.animations.forEach((clip) => {
        npcMixer.clipAction(clip).play();
    });
});
```

---

### **📌 Change NPC Animations Based on State**
```javascript
let currentAction = "idle";

function setNPCAnimation(action) {
    if (npcMixer) {
        npcMixer.stopAllAction();
        let clip = npcModel.animations.find((anim) => anim.name === action);
        if (clip) {
            npcMixer.clipAction(clip).play();
            currentAction = action;
        }
    }
}

// Call when NPC starts walking
setNPCAnimation("walking");
```

#### **✅ How it Works**
- NPC **loads from a GLTF file** with built-in animations.  
- Uses **Animation Mixer** to play **"Idle", "Walking", and "Talking"** animations.  

---

## **2️⃣ Add AI-Driven Navigation (Pathfinding)**  
To make NPCs **walk automatically**, we’ll use **Pathfinding (Yuka.js)**.

---

### **📌 Install Yuka.js for AI Pathfinding**
```bash
npm install yuka
```

---

### **📌 Create a Navigation Path**
Modify `main.js`:  
```javascript
import * as YUKA from "yuka";

const entityManager = new YUKA.EntityManager();
const npcAI = new YUKA.Vehicle();

npcAI.position.set(2, 0, -3);
npcAI.maxSpeed = 1;

entityManager.add(npcAI);

// Define Path for NPC
const path = new YUKA.Path();
path.add(new YUKA.Vector3(2, 0, -3));
path.add(new YUKA.Vector3(-2, 0, -3));
path.add(new YUKA.Vector3(-2, 0, 2));
path.add(new YUKA.Vector3(2, 0, 2));

npcAI.followPath(path);
```

---

### **📌 Move NPC Along the Path**
```javascript
function updateNPC(deltaTime) {
    entityManager.update(deltaTime);

    if (npcModel) {
        npcModel.position.copy(npcAI.position);
        npcModel.lookAt(npcAI.target);
    }
}
```

---

### **📌 Animate NPC Based on Movement**
```javascript
function update() {
    let speed = npcAI.velocity.length();
    if (speed > 0.1) {
        setNPCAnimation("walking");
    } else {
        setNPCAnimation("idle");
    }
}
```

#### **✅ How it Works**
- NPC follows a **predefined path** using **AI navigation**.  
- NPC **switches animations** dynamically while moving.  

---

## **🚀 Summary of Features Added**
✅ **NPC Animations (Idle, Walking, Talking)**  
✅ **AI-Driven Navigation (Pathfinding with Yuka.js)**  

Would you like to add **NPC interaction with objects (e.g., opening doors, sitting)** next? 😊🚀