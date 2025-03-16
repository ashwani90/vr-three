### **🚀 Next Steps: Adding Voice Commands & Physics-Based Object Grabbing**  
Now, we’ll add:  
1. **Voice Commands for Interaction** 🎤  
2. **Physics-Based Object Grabbing (Pick up & move objects)** ✋  
3. **Throwing Objects (Realistic Physics)** 🏀  

---

## **1️⃣ Add Voice Commands for VR Interaction**  
We’ll use the **Web Speech API** to listen for voice commands in VR.

### **📌 Enable Speech Recognition**
Modify `main.js`:
```javascript
// Check if browser supports Speech API
if ("webkitSpeechRecognition" in window) {
    const recognition = new webkitSpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = false;
    recognition.lang = "en-US";

    recognition.onresult = (event) => {
        const speech = event.results[event.results.length - 1][0].transcript.toLowerCase();
        console.log("Voice Command: ", speech);

        if (speech.includes("open door")) {
            openNearestDoor();
        } else if (speech.includes("turn on light")) {
            toggleLights(true);
        } else if (speech.includes("turn off light")) {
            toggleLights(false);
        }
    };

    recognition.start();
} else {
    console.warn("Web Speech API not supported in this browser.");
}
```

### **📌 Add Helper Functions**
```javascript
// Function to Open the Nearest Door
function openNearestDoor() {
    let doors = scene.children.filter((obj) => obj.name.includes("door"));
    if (doors.length > 0) {
        openDoor(doors[0]);
        console.log("Opened Door!");
    }
}

// Toggle Lights
function toggleLights(state) {
    scene.traverse((obj) => {
        if (obj.isLight) {
            obj.visible = state;
        }
    });
    console.log(state ? "Lights On!" : "Lights Off!");
}
```

#### **✅ How it Works**
- The **Web Speech API** listens for voice commands.
- If the user says **"Open door"**, it triggers the `openDoor()` function.
- If the user says **"Turn on light"**, it enables lights in the scene.

---

## **2️⃣ Add Physics-Based Object Grabbing**
We’ll allow users to **grab and move objects using VR controllers or hand tracking**.

### **📌 Detect Object Selection**
Modify `main.js`:
```javascript
let grabbedObject = null;

// Function to Pick Up an Object
function grabObject() {
    raycaster.setFromCamera({ x: 0, y: 0 }, camera);
    const intersects = raycaster.intersectObjects(scene.children, true);

    if (intersects.length > 0) {
        grabbedObject = intersects[0].object;
        console.log("Object grabbed:", grabbedObject.name);
    }
}

// Function to Release Object
function releaseObject() {
    if (grabbedObject) {
        grabbedObject = null;
        console.log("Object released!");
    }
}

// Attach grab/release to VR controller
controller.addEventListener("selectstart", grabObject);
controller.addEventListener("selectend", releaseObject);
```

#### **✅ How it Works**
- **Raycasting detects objects** when selecting with the VR controller.
- If an object is selected, it becomes **grabbedObject**.
- On **release**, the object is dropped.

---

## **3️⃣ Allow Throwing Objects with Physics**  
Now, we’ll use **Cannon.js** to simulate throwing an object.

### **📌 Apply Force When Releasing**
Modify `releaseObject()`:
```javascript
function releaseObject() {
    if (grabbedObject) {
        let force = new CANNON.Vec3(0, 0, -5); // Apply forward force
        let body = grabbedObject.userData.physicsBody;
        
        if (body) {
            body.applyImpulse(force, body.position);
        }
        
        grabbedObject = null;
        console.log("Object thrown!");
    }
}
```

### **📌 Assign Physics to Grabbable Objects**
When loading objects, give them a **physics body**:
```javascript
scene.traverse((obj) => {
    if (obj.name.includes("box")) {
        let shape = new CANNON.Box(new CANNON.Vec3(0.5, 0.5, 0.5));
        let body = new CANNON.Body({ mass: 1, shape: shape });
        body.position.copy(obj.position);
        physicsWorld.addBody(body);
        obj.userData.physicsBody = body; // Link Three.js object to physics
    }
});
```

#### **✅ How it Works**
- When an object is **released**, we apply an **impulse force** to simulate throwing.
- Objects get **physics bodies** so they behave **realistically**.

---

## **🚀 Final Features Added**
✅ **Voice Commands** (Open doors, turn lights on/off)  
✅ **Physics-Based Object Grabbing** (Pick up objects in VR)  
✅ **Throwing Objects with Physics** (Realistic movement)  

Would you like to add **multiplayer support or interactive UI panels** next? 😊🚀