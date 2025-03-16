### **🚀 Next Steps: NPC Interaction with Objects**  
Now, we’ll make NPCs:  
✅ **Pick up and carry objects** 📦  
✅ **Perform actions like cooking or cleaning** 🍳🧹  

---

## **1️⃣ NPC Picks Up and Carries Objects**
NPCs will recognize **nearby objects**, grab them, and move while holding them.

---

### **📌 Detect Nearby Objects**
Modify `main.js`:  
```javascript
const interactableObjects = scene.children.filter(obj => obj.userData.pickable);

function findClosestObject() {
    let closest = null;
    let minDistance = 1.5; // Interaction range

    interactableObjects.forEach(obj => {
        let distance = npcModel.position.distanceTo(obj.position);
        if (distance < minDistance) {
            closest = obj;
            minDistance = distance;
        }
    });

    return closest;
}
```

---

### **📌 NPC Picks Up the Object**
```javascript
function npcPickUp() {
    const item = findClosestObject();
    if (item) {
        item.parent = npcModel; // Attach to NPC
        item.position.set(0, 1, 0.5); // Adjust holding position
        setNPCAnimation("picking_up");
        setTimeout(() => setNPCAnimation("idle"), 1000);
    }
}
```

#### **✅ How it Works**
- NPC **searches for nearby objects**.  
- If **within range**, NPC **grabs and holds** the object.  

---

## **2️⃣ NPC Performs Actions (Cooking, Cleaning, etc.)**
NPCs will interact with objects like **stoves and tables** to perform actions.

---

### **📌 NPC Recognizes Action Areas**
```javascript
const actionPoints = [
    { name: "stove", position: new THREE.Vector3(2, 0, -2), action: "cooking" },
    { name: "table", position: new THREE.Vector3(-1, 0, 1), action: "cleaning" }
];

function findActionArea() {
    return actionPoints.find(point => npcModel.position.distanceTo(point.position) < 1);
}
```

---

### **📌 NPC Starts Action (Cooking or Cleaning)**
```javascript
function npcPerformAction() {
    const area = findActionArea();
    if (area) {
        setNPCAnimation(area.action);
        npcSpeak(`I am ${area.action} now.`);
        setTimeout(() => setNPCAnimation("idle"), 5000);
    }
}
```

#### **✅ How it Works**
- If NPC is **near a stove**, they **cook**.  
- If NPC is **near a table**, they **clean**.  
- **Animation plays** for 5 seconds, then resets to idle.  

---

## **🚀 Summary of Features Added**
✅ **NPC picks up and carries objects**  
✅ **NPC interacts with objects (cooking, cleaning, etc.)**  

Would you like to add **NPCs learning tasks over time (AI-driven skill improvement)?** 🚀