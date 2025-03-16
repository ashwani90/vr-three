### **🚀 Next Steps: Adding Voice Chat & AI-Driven NPCs**  
Now, we’ll add:  
1. **Voice Chat (Real-time Communication Between Players)** 🎙️  
2. **AI-Driven NPCs (NPCs That Respond to Players)** 🤖  

---

## **1️⃣ Add Voice Chat (WebRTC)**
To enable **real-time voice chat**, we’ll use **WebRTC + Socket.io**.  

---

### **📌 Set Up WebRTC Signaling in the Server**
Modify `server.js`:  
```javascript
const io = require("socket.io")(server);

io.on("connection", (socket) => {
    console.log("Player connected:", socket.id);

    socket.on("voiceOffer", (data) => {
        io.to(data.target).emit("voiceOffer", { offer: data.offer, from: socket.id });
    });

    socket.on("voiceAnswer", (data) => {
        io.to(data.target).emit("voiceAnswer", { answer: data.answer, from: socket.id });
    });

    socket.on("newIceCandidate", (data) => {
        io.to(data.target).emit("newIceCandidate", { candidate: data.candidate, from: socket.id });
    });
});
```

---

### **📌 Set Up WebRTC in the Client**
Modify `main.js`:  
```javascript
const peerConnections = {};
const localStream = await navigator.mediaDevices.getUserMedia({ audio: true });

socket.on("voiceOffer", async (data) => {
    const peer = new RTCPeerConnection();
    peerConnections[data.from] = peer;

    localStream.getTracks().forEach((track) => peer.addTrack(track, localStream));

    peer.setRemoteDescription(new RTCSessionDescription(data.offer));
    const answer = await peer.createAnswer();
    await peer.setLocalDescription(answer);

    socket.emit("voiceAnswer", { answer, target: data.from });
});

socket.on("voiceAnswer", (data) => {
    peerConnections[data.from].setRemoteDescription(new RTCSessionDescription(data.answer));
});

socket.on("newIceCandidate", (data) => {
    peerConnections[data.from].addIceCandidate(new RTCIceCandidate(data.candidate));
});

// Start voice chat when entering VR
function startVoiceChat() {
    for (let id in players) {
        if (id !== socket.id) {
            const peer = new RTCPeerConnection();
            peerConnections[id] = peer;

            localStream.getTracks().forEach((track) => peer.addTrack(track, localStream));

            peer.onicecandidate = (event) => {
                if (event.candidate) {
                    socket.emit("newIceCandidate", { candidate: event.candidate, target: id });
                }
            };

            peer.createOffer().then((offer) => {
                peer.setLocalDescription(offer);
                socket.emit("voiceOffer", { offer, target: id });
            });
        }
    }
}
```

#### **✅ How it Works**
- Players **connect via WebRTC** for **low-latency voice chat**.
- When a new player joins, they **send & receive audio streams**.
- Uses **peer-to-peer (P2P) connections** for better performance.

---

## **2️⃣ Add AI-Driven NPCs**
To create **AI-powered NPCs**, we’ll use:  
✅ **Speech recognition (NPC listens)**  
✅ **Text-to-speech (NPC talks)**  
✅ **Simple AI responses**  

---

### **📌 Add an NPC Model**
Modify `main.js`:  
```javascript
const npc = new THREE.Mesh(new THREE.BoxGeometry(0.5, 1.5, 0.5), new THREE.MeshBasicMaterial({ color: 0xff0000 }));
npc.position.set(2, 0.75, -3);
npc.name = "NPC";
scene.add(npc);
```

---

### **📌 Add Speech Recognition for NPC**
```javascript
if ("webkitSpeechRecognition" in window) {
    const recognition = new webkitSpeechRecognition();
    recognition.continuous = true;
    recognition.lang = "en-US";

    recognition.onresult = (event) => {
        const userSpeech = event.results[event.results.length - 1][0].transcript.toLowerCase();
        console.log("User said:", userSpeech);
        respondToUser(userSpeech);
    };

    recognition.start();
}
```

---

### **📌 Make NPC Talk (Text-to-Speech)**
```javascript
function npcSpeak(text) {
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.voice = synth.getVoices()[0];
    synth.speak(utterance);
}
```

---

### **📌 Add AI Logic for NPC Responses**
```javascript
function respondToUser(userSpeech) {
    let response = "I don't understand.";

    if (userSpeech.includes("hello")) {
        response = "Hello! Welcome to the VR house.";
    } else if (userSpeech.includes("who are you")) {
        response = "I am your virtual assistant!";
    }

    npcSpeak(response);
}
```

#### **✅ How it Works**
- **Player talks → NPC listens**
- **NPC processes input & generates a response**
- **NPC speaks back using text-to-speech**

---

## **🚀 Summary of Features Added**
✅ **Voice Chat** (Real-time WebRTC communication)  
✅ **AI-Driven NPCs** (NPCs listen, respond, and talk)  

Would you like to add **NPC animations or AI-driven navigation** next? 😊🚀