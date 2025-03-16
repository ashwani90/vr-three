### **🚀 Next Steps: Adding Multiplayer & Interactive UI Panels**  
Now, we’ll add:  
1. **Multiplayer Support (Sync Player Movement & Actions)** 🌍  
2. **Interactive UI Panels (Floating Menus & Buttons in VR)** 🎛️  

---

## **1️⃣ Add Multiplayer Support (Sync Players in VR)**  
For multiplayer, we’ll use **Socket.io** (WebSockets) to sync:  
✅ Player positions  
✅ Actions (e.g., opening doors)  
✅ Object interactions  

---

### **📌 Set Up a Node.js WebSocket Server**
First, install **Socket.io**:  
```bash
npm install express socket.io
```

Create `server.js` (WebSocket server):  
```javascript
const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

let players = {}; // Store player data

io.on("connection", (socket) => {
    console.log("Player connected:", socket.id);
    
    // When a new player joins
    socket.on("join", (playerData) => {
        players[socket.id] = playerData;
        io.emit("updatePlayers", players);
    });

    // When a player moves
    socket.on("move", (playerData) => {
        players[socket.id] = playerData;
        io.emit("updatePlayers", players);
    });

    // When a player disconnects
    socket.on("disconnect", () => {
        delete players[socket.id];
        io.emit("updatePlayers", players);
    });
});

server.listen(3000, () => console.log("Server running on port 3000"));
```

---

### **📌 Connect Three.js to Multiplayer Server**
Modify `main.js`:  
```javascript
import io from "socket.io-client";

// Connect to the server
const socket = io("http://localhost:3000");

// Send player join event
socket.emit("join", { position: camera.position });

// Send player movement updates
function sendMovement() {
    socket.emit("move", { position: camera.position });
}

// Receive updates & render other players
socket.on("updatePlayers", (players) => {
    for (let id in players) {
        if (id !== socket.id) {
            let player = scene.getObjectByName(id);
            if (!player) {
                let newPlayer = new THREE.Mesh(new THREE.SphereGeometry(0.3), new THREE.MeshBasicMaterial({ color: 0x0000ff }));
                newPlayer.name = id;
                scene.add(newPlayer);
            }
            scene.getObjectByName(id).position.copy(players[id].position);
        }
    }
});

// Send movement updates every frame
function animate() {
    sendMovement();
    renderer.setAnimationLoop(() => {
        renderer.render(scene, camera);
    });
}
```

#### **✅ How it Works**
- **Players join & move** → Data sent to the server  
- **Server updates all players** → Sends back player positions  
- **Three.js renders all players** as floating spheres  

---

## **2️⃣ Add Interactive UI Panels**
A VR **floating UI menu** lets players interact with the scene.  

---

### **📌 Create a Floating UI Panel**
```javascript
import { CSS3DRenderer, CSS3DObject } from "three/examples/jsm/renderers/CSS3DRenderer.js";

// Create UI Container
const uiDiv = document.createElement("div");
uiDiv.innerHTML = `<button id="toggleLights">Toggle Lights</button>`;
uiDiv.style.position = "absolute";
uiDiv.style.width = "200px";
uiDiv.style.height = "100px";
uiDiv.style.background = "rgba(0,0,0,0.5)";
uiDiv.style.color = "white";
document.body.appendChild(uiDiv);

// Create Three.js Object
const uiObject = new CSS3DObject(uiDiv);
uiObject.position.set(0, 1.5, -1);
scene.add(uiObject);

// Button Click Action
document.getElementById("toggleLights").addEventListener("click", () => {
    toggleLights();
});
```

#### **✅ How it Works**
- A **floating panel** appears in VR  
- Clicking **"Toggle Lights"** affects the scene  

---

## **🚀 Summary of Features Added**
✅ **Multiplayer support (sync movement & actions)**  
✅ **Interactive UI panels (floating menu & buttons)**  

Would you like to add **voice chat or AI-driven NPCs** next? 😊🚀