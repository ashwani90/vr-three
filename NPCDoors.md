### **🚀 Next Steps: Adding NPC Interaction with Objects**  
Now, we’ll make NPCs interact with objects like:  
✅ **Opening doors when near** 🚪  
✅ **Sitting on chairs when idle** 🪑  
✅ **Turning on/off lights when instructed** 💡  

---

## **1️⃣ NPC Opens Doors When Near**
We’ll check if an NPC **approaches a door**, then trigger an animation to open it.

---

### **📌 Detect NPC Near a Door**  
Modify `main.js`:  
```javascript
const door = scene.getObjectByName("Door"); // Ensure your door has this name
const doorOpenRotation = Math.PI / 2; // 90 degrees open
let doorIsOpen = false;

function checkDoorProximity() {
    if (!npcModel || !door) return;

    const distance = npcModel.position.distanceTo(door.position);
    if (distance < 1.5 && !doorIsOpen) {
        openDoor();
    }
}

function openDoor() {
    gsap.to(door.rotation, { y: doorOpenRotation, duration: 1 });
    doorIsOpen = true;
}

// Call this inside your update loop
function update() {
    checkDoorProximity();
}
```

---

## **2️⃣ NPC Sits on a Chair When Idle**  
We’ll check if the NPC is **idle for too long**, then make them sit.

---

### **📌 Make NPC Sit After Inactivity**
```javascript
const chair = scene.getObjectByName("Chair"); // Ensure your chair has this name
let npcIdleTime = 0;

function checkIdleState(deltaTime) {
    if (currentAction === "idle") {
        npcIdleTime += deltaTime;
        if (npcIdleTime > 5) { // 5 seconds of inactivity
            sitOnChair();
        }
    } else {
        npcIdleTime = 0;
    }
}

function sitOnChair() {
    npcModel.position.copy(chair.position);
    npcModel.rotation.y = chair.rotation.y;
    setNPCAnimation("sitting");
}

// Call inside update loop
function update(deltaTime) {
    checkIdleState(deltaTime);
}
```

---

## **3️⃣ NPC Turns On/Off Lights When Instructed**  
We’ll allow **voice commands** like _"Turn on the lights!"_.

---

### **📌 Modify Speech Recognition to Trigger Lights**
```javascript
function respondToUser(userSpeech) {
    let response = "I don't understand.";

    if (userSpeech.includes("turn on the light")) {
        toggleLights(true);
        response = "Lights turned on.";
    } else if (userSpeech.includes("turn off the light")) {
        toggleLights(false);
        response = "Lights turned off.";
    }

    npcSpeak(response);
}

function toggleLights(state) {
    scene.traverse((object) => {
        if (object.isLight) {
            object.intensity = state ? 1 : 0;
        }
    });
}
```

---

## **🚀 Summary of Features Added**
✅ **NPC opens doors when near**  
✅ **NPC sits when idle for too long**  
✅ **NPC responds to voice commands for lights**  

Would you like to add **NPC interaction with players (e.g., following player, responding to gestures)** next? 😊🚀