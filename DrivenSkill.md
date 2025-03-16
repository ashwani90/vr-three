### **🚀 Next Steps: AI-Driven Skill Improvement for NPCs**  
Now, we’ll make NPCs:  
✅ **Gain experience by performing tasks** 📈  
✅ **Improve efficiency over time** ⏳  

---

## **1️⃣ NPC Gains Experience from Tasks**  
Each NPC will have a **skill level** that increases as they perform tasks.

---

### **📌 Define NPC Skills**  
Modify `main.js`:  
```javascript
const npcSkills = {
    cooking: 0,   // Starts at level 0
    cleaning: 0
};

function increaseSkill(skill) {
    if (npcSkills[skill] !== undefined) {
        npcSkills[skill] += 1;
        npcSpeak(`I am getting better at ${skill}. Level: ${npcSkills[skill]}`);
    }
}
```

---

### **📌 Improve NPC Performance Over Time**  
```javascript
function npcPerformAction() {
    const area = findActionArea();
    if (area) {
        let actionTime = 5 - Math.min(npcSkills[area.action] * 0.5, 3); // Faster with skill
        setNPCAnimation(area.action);
        npcSpeak(`I am ${area.action} now. My skill level: ${npcSkills[area.action]}`);

        setTimeout(() => {
            increaseSkill(area.action);
            setNPCAnimation("idle");
        }, actionTime * 1000);
    }
}
```

#### **✅ How it Works**
- **Every time an NPC performs a task, they gain skill.**  
- **Higher skill = Faster task completion.**  

---

## **2️⃣ NPC Learns New Tasks from the Player**
Players can **teach NPCs new actions** by demonstrating.

---

### **📌 Detect Player Demonstration**
```javascript
let learningMode = false;

function startLearningMode(action) {
    learningMode = action;
    npcSpeak(`I am learning how to ${action}. Please demonstrate.`);
}

function finishLearning() {
    if (learningMode) {
        npcSkills[learningMode] = 1; // NPC learns at Level 1
        npcSpeak(`I have learned ${learningMode}!`);
        learningMode = false;
    }
}
```

---

### **📌 Teach NPCs with Voice Commands**
```javascript
function respondToUser(userSpeech) {
    if (userSpeech.includes("learn to cook")) {
        startLearningMode("cooking");
    } else if (userSpeech.includes("learn to clean")) {
        startLearningMode("cleaning");
    } else if (userSpeech.includes("good job")) {
        finishLearning();
    }
}
```

#### **✅ How it Works**
- Player says **"Learn to cook"**, NPC enters **learning mode**.  
- Player performs action → NPC **learns and remembers**.  

---

## **🚀 Summary of Features Added**
✅ **NPC gains experience by performing tasks**  
✅ **Tasks become faster as NPC improves**  
✅ **NPCs can learn new skills from players**  

Would you like to add **NPC memory (e.g., remembering past interactions and preferences)?** 🚀