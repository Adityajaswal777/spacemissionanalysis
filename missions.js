/* =====================================================
   AI PANEL
===================================================== */

const aiPanel = document.getElementById("aiPanel");
const closeAI = document.getElementById("closeAI");
const missionName = document.getElementById("missionName");
const aiResponse = document.getElementById("aiResponse");

// Open AI Panel
window.openMissionAI = function (name) {

    missionName.innerHTML = "🚀 " + name;
    aiResponse.innerHTML = `

<div class="thinking">

<div class="dot"></div>

<div class="dot"></div>

<div class="dot"></div>

</div>

<p style="margin-top:25px">

Analyzing mission...

</p>

`;

    gsap.to("#aiPanel", {

        right: 0,

        duration: .55,

        ease: "power3.out"

    });

    setTimeout(() => {

        const text = `

🚀 ${name}

Mission information will appear here.

Tomorrow this panel will use AI to generate answers.

`;

        typeWriter(text);

    }, 1200);

}

// Close Panel
closeAI.onclick = () => {

    gsap.to("#aiPanel", {

        right: -480,

        duration: .45,

        ease: "power3.inOut"

    });

}
function typeWriter(text) {

    aiResponse.innerHTML = `

<div class="mode-selector">

<button class="mode-btn ai-mode"
onclick="showAIMode()">

🤖
<span>Ask Space AI</span>

</button>

<button class="mode-btn web-mode"
onclick="showWebMode()">

🌐
<span>Research Online</span>

</button>

<button class="mode-btn facts-mode"
onclick="quickAsk('Mission Facts')">

📊
<span>Mission Facts</span>

</button>

</div>

<div class="ai-message">

<span id="typingText"></span>

</div>

`;

    const target = document.getElementById("typingText");

    let i = 0;

    const speed = 18;

    function type() {

        if (i < text.length) {

            target.innerHTML += text.charAt(i);

            i++;

            setTimeout(type, speed);

        }

    }

    type();
    aiResponse.scrollTop = aiResponse.scrollHeight;

}
function quickAsk(topic) {

    const mission = missionName.innerText.replace("🚀 ", "");

    typeWriter(

        `${topic} for ${mission}

This will become an AI-generated response after we connect the API.`

    );

}
/* =====================================
   SEND MESSAGE
===================================== */

const askButton = document.getElementById("askAI");
const aiInput = document.getElementById("aiInput");

askButton.onclick = async () => {

    const question = aiInput.value.trim();

    if (question === "") return;

    const mission = missionName.innerText.replace("🚀 ", "");

    aiResponse.innerHTML += `
        <div class="user-message">
            ${question}
        </div>
    `;

    aiInput.value = "";

    aiResponse.innerHTML += `
        <div class="ai-message" id="loadingMessage">
            <div class="thinking">
                <div class="dot"></div>
                <div class="dot"></div>
                <div class="dot"></div>
            </div>
        </div>
    `;

    aiResponse.scrollTop = aiResponse.scrollHeight;

    try {

        console.log("Sending request...");

        const response = await fetch("http://127.0.0.1:8000/ask", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({

                mission: mission,

                question: question

            })

        });

        const data = await response.json();
        console.log(data);

        document.getElementById("loadingMessage").innerHTML =
            data.answer.replace(/\n/g, "<br>");

    }
    catch (err) {

        document.getElementById("loadingMessage").innerHTML =
            "❌ Could not connect to Space AI.";

        console.error(err);

    }

    aiResponse.scrollTop = aiResponse.scrollHeight;

};
/* =====================================
   RESEARCH ONLINE
===================================== */
function getAgencySearch(mission){

    const m = mission.toLowerCase();

    if(
        m.includes("apollo") ||
        m.includes("artemis") ||
        m.includes("voyager") ||
        m.includes("mercury") ||
        m.includes("gemini") ||
        m.includes("mars") ||
        m.includes("perseverance") ||
        m.includes("curiosity")
    ){
        return `https://www.nasa.gov/search/?q=${encodeURIComponent(mission)}`;
    }

    if(
        m.includes("chandrayaan") ||
        m.includes("mangalyaan") ||
        m.includes("aditya") ||
        m.includes("gaganyaan")
    ){
        return `https://www.isro.gov.in/search/node/${encodeURIComponent(mission)}`;
    }

    if(
        m.includes("rosetta") ||
        m.includes("juice") ||
        m.includes("gaia")
    ){
        return `https://www.esa.int/Search?SearchText=${encodeURIComponent(mission)}`;
    }

    if(
        m.includes("hayabusa") ||
        m.includes("slim")
    ){
        return `https://global.jaxa.jp/search/?q=${encodeURIComponent(mission)}`;
    }

    if(
        m.includes("tianwen") ||
        m.includes("chang'e")
    ){
        return `https://www.google.com/search?q=${encodeURIComponent(mission)}+CNSA`;
    }

    if(
        m.includes("falcon") ||
        m.includes("starship") ||
        m.includes("crew dragon")
    ){
        return `https://www.spacex.com/`;
    }

    return `https://www.google.com/search?q=${encodeURIComponent(mission)}+space+mission`;
}

function showWebMode(){

    const mission = missionName.innerText.replace("🚀 ","");

    aiResponse.innerHTML = `

    <div class="mode-selector">

        <a class="mode-btn"
        href="https://en.wikipedia.org/wiki/${encodeURIComponent(mission)}"
        target="_blank">

            🌍
            <span>Wikipedia</span>

        </a>

        <a class="mode-btn"
        href="https://www.youtube.com/results?search_query=${encodeURIComponent(mission)}+documentary"
        target="_blank">

            🎥
            <span>YouTube Documentary</span>

        </a>

        <a class="mode-btn"
       href="${getAgencySearch(mission)}"
        target="_blank">

            🚀
            <span>Official NASA / Agency Search</span>

        </a>

        <a class="mode-btn"
        href="https://www.google.com/search?q=${encodeURIComponent(mission)}+latest+news"
        target="_blank">

            📰
            <span>Latest News</span>

        </a>

    </div>

    `;

}


