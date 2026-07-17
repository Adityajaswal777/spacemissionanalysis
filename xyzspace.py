import streamlit as st
import streamlit.components.v1 as components
import pandas as pd
import plotly.express as px
import base64
import urllib.parse
from openai import OpenAI
import os



import streamlit as st
from openai import OpenAI

client = OpenAI(
api_key=st.secrets["OPENAI_API_KEY"]
)
def ask_space_ai(mission, question):

    response = client.responses.create(

        model="gpt-5.5",

        input=f"""
You are an expert Space Mission Assistant.

Mission:
{mission}

User Question:
{question}

Instructions:
- Answer accurately.
- Be concise (150–250 words unless more detail is requested).
- Use headings and bullet points where helpful.
- If comparing missions, compare them clearly.
"""

    )

    return response.output_text

# =====================================================
# PAGE CONFIG
# =====================================================

st.set_page_config(



    page_title="Space Mission Analytics",
    page_icon="🚀",
    layout="wide",
    initial_sidebar_state="collapsed"
)
st.markdown("""
<style>

/* Hide Streamlit header */
header[data-testid="stHeader"]{
    display:none;
}

/* Hide Deploy / toolbar */
[data-testid="stToolbar"]{
    display:none;
}

/* Hide hamburger menu */
#MainMenu{
    visibility:hidden;
}

/* Remove top padding left by header */
[data-testid="stAppViewContainer"]{
    margin-top:0;
}

.block-container{
    padding-top:0 !important;
}

</style>
""", unsafe_allow_html=True)
st.markdown("""
<style>

/* Make the app truly full width */
[data-testid="stAppViewContainer"]{
    max-width:100vw !important;
    width:100vw !important;
    padding:0 !important;
    margin:0 !important;
}

.main{
    width:100% !important;
    max-width:100% !important;
    padding:0 !important;
    margin:0 !important;
}

.block-container{
    width:100% !important;
    max-width:100% !important;
    padding:0 !important;
    margin:0 !important;
}

/* HTML components */
iframe{
    width:100% !important;
    border:none !important;
}

</style>
""", unsafe_allow_html=True)
# =====================================================
# LOAD DATA
# =====================================================

df = pd.read_excel("combined_dataxyz.xlsx")

df.columns = (
    df.columns
      .str.replace("\ufeff", "", regex=False)
      .str.strip()
)

df = df.sort_values(["Agency", "Mission"])

# =====================================================
# BUILD MISSION CARDS
# =====================================================

mission_cards = ""
df["Agency"] = (
    df["Agency"]
    .astype(str)
    .str.strip()
    .replace({
        "NASA_Missions_Dataset_1": "NASA",
        "ISRO_Landmark_Missions_Dataset": "ISRO",
        "ESA_Landmark_Missions_Dataset": "ESA",
        "JAXA_Landmark_Missions_Dataset": "JAXA",
        "CNSA_Landmark_Missions_Dataset": "CNSA",
        "SpaceX_Landmark_Missions_Styled": "SpaceX"
    })
)
mission_cards = ""

for agency, group in df.groupby("Agency"):

    mission_cards += f"""
    <details class="agency-box">
        <summary>🚀 {agency}</summary>

        <div class="mission-links">
    """

    for _, row in group.iterrows():

        mission = row["Mission"]

        mission_cards += f"""
        <div class="mission-card"
             onclick="openMissionAI('{mission}')">

            🚀 {mission}

        </div>
        """

    mission_cards += """
        </div>
    </details>
    """
# =====================================================
# LOAD IMAGES
# =====================================================

with open("spacedatalogo.jpg", "rb") as f:
    logo = base64.b64encode(
        f.read()
    ).decode()

with open("space.mp4", "rb") as f:
    video = base64.b64encode(
        f.read()
    ).decode()

with open("space2.mp4", "rb") as f:
    video2 = base64.b64encode(
        f.read()
    ).decode()
with open("space3.mp4", "rb") as f:
    video3 = base64.b64encode(
        f.read()
    ).decode()
with open("space4.mp4", "rb") as f:
    video4 = base64.b64encode(f.read()).decode()
with open("space5.mp4", "rb") as f:
    video5 = base64.b64encode(f.read()).decode()
with open("music.mp3", "rb") as f:
    music = base64.b64encode(f.read()).decode()
with open("mission.mp4", "rb") as f:
    mission_video = base64.b64encode(f.read()).decode()
# =====================================================
# PAGE ROUTER
# =====================================================

website_page = ""
html_file = None

if "page" not in st.query_params:
    st.query_params["page"] = "home"

current_page = st.query_params["page"]

# ==========================
# HOME
# ==========================

if current_page == "home":

    html_file = "index.html"


# ==========================
# MISSIONS
# ==========================

elif current_page == "missions":

    with open("missions.html", "r", encoding="utf-8") as f:
        html = f.read()

    with open("style.css", "r", encoding="utf-8") as f:
        css = f.read()

    with open("script.js", "r", encoding="utf-8") as f:
     js = f.read()

    with open("missions.js", "r", encoding="utf-8") as f:
     mission_js = f.read()

    html = html.replace("MISSION_DATA", mission_cards)
    html = html.replace("LOGO_DATA", logo)
    html = html.replace("MISSION_VIDEO_DATA", mission_video)
    html = html.replace("MUSIC_DATA", music)

    website_page = f"""
<style>
{css}
</style>

{html}

<script>
{js}
</script>

<script>
{mission_js}
</script>
"""

    components.html(
        website_page,
        height=1080,
        scrolling=True
    )


# ==========================
# PLANETS
# ==========================

elif current_page == "planets":

    components.iframe(
        "https://adityajaswal777.github.io/spacemissionanalysis/planets.html",
        height=1080,
        scrolling=True
    )
# ==========================
# ABOUT
# ==========================

elif current_page == "about":

    with open("about.html", "r", encoding="utf-8") as f:
        about_html = f.read()

    about_html = about_html.replace(
        "space3.mp4?v=2",
        f"data:video/mp4;base64,{video3}"
    )

    components.html(
        about_html,
        height=1080,
        scrolling=True
    )
if html_file:

    with open(html_file, "r", encoding="utf-8") as f:
        html = f.read()

    with open("style.css", "r", encoding="utf-8") as f:
        css = f.read()

    with open("script.js", "r", encoding="utf-8") as f:
        js = f.read()

    html = html.replace("VIDEO_DATA", video)
    html = html.replace("VIDEO2_DATA", video2)
    html = html.replace("VIDEO4_DATA", video4)
    html = html.replace("VIDEO5_DATA", video5)
    html = html.replace("LOGO_DATA", logo)
    html = html.replace("MUSIC_DATA", music)

    website_page = f"""
<style>
{css}
</style>

{html}

<script>
{js}
</script>
"""

    components.html(
        website_page,
        height=1080,
        scrolling=True
    )
# ==========================
# ANALYTICS
# ==========================

if current_page == "analytics":

    
    # ==============================
    # Load Analytics CSS
    # ==============================

    with open("analytics.css", "r", encoding="utf-8") as f:
        analytics_css = f.read()

    # ==============================
    # Load Analytics Video
    # ==============================

    #with open("analytics.mp4", "rb") as f:
        #analytics_video = base64.b64encode(f.read()).decode()

    # ==============================
    # Inject CSS
    # ==============================

    st.markdown(
        f"<style>{analytics_css}</style>",
        unsafe_allow_html=True
    )
    import base64

    with open("analytics.mp4", "rb") as f:
       analytics_video = base64.b64encode(f.read()).decode()

    st.markdown(f"""
<style>

video#bg-video {{
    position: fixed;
    inset: 0;
    width: 100vw;
    height: 100vh;
    object-fit: cover;
    z-index: -1;
    opacity: .45;
    pointer-events: none;
}}

[data-testid="stAppViewContainer"] {{
    background: transparent !important;
}}

[data-testid="stMain"] {{
    background: transparent !important;
}}

.block-container {{
    background: transparent !important;
}}

</style>

<video id="bg-video" autoplay muted loop playsinline>
    <source src="data:video/mp4;base64,{analytics_video}" type="video/mp4">
</video>
<audio id="bg-music" autoplay loop>
    <source src="data:audio/mp3;base64,{music}" type="audio/mpeg">
</audio>
<button id="music-btn">🔊 Music ON/OFF</button>

""", unsafe_allow_html=True)
    components.html(f"""
<script>
const video = document.createElement("video");

video.autoplay = true;
video.loop = true;
video.muted = true;
video.playsInline = true;

video.style.position = "fixed";
video.style.inset = "0";
video.style.width = "100vw";
video.style.height = "100vh";
video.style.objectFit = "cover";
video.style.zIndex = "-1";
video.style.opacity = "0.45";

const source = document.createElement("source");
source.src = "data:video/mp4;base64,{analytics_video}";
source.type = "video/mp4";

video.appendChild(source);
window.parent.document.body.appendChild(video);
</script>
""", height=0)
    components.html("""
<script>

const audio = window.parent.document.getElementById("bg-music");
const btn = window.parent.document.getElementById("music-btn");

if(audio && btn){

    btn.addEventListener("click", function(){

        if(audio.paused){

            audio.play();
            btn.innerHTML = "🔊 Music ON";

        }else{

            audio.pause();
            btn.innerHTML = "🔇 Music OFF";

        }

    });

}

</script>
""", height=0)   

    # ==============================
    # Background Video
    # ==============================

    #st.markdown(f"""
#<div id="video-container">

   # <video autoplay muted loop playsinline id="analytics-video">
       # <source src="data:video/mp4;base64,{analytics_video}" type="video/mp4">
    #</video>

    #<div id="video-overlay"></div>

#</div>
#""", unsafe_allow_html=True)
    st.markdown("""
<style>

/* =========================
   APPLE GLASS NAVBAR
========================= */

div[data-testid="stHorizontalBlock"]{

background:rgba(15,20,35,.35);

backdrop-filter:blur(28px) saturate(180%);
-webkit-backdrop-filter:blur(28px) saturate(180%);

border:1px solid rgba(255,255,255,.10);

border-radius:24px;

padding:14px;

margin-bottom:35px;

box-shadow:
0 10px 40px rgba(0,0,0,.35),
inset 0 1px rgba(255,255,255,.08);

}

/* BUTTONS */

div.stButton > button{

width:100%;
height:55px;

border-radius:18px;

background:transparent;

border:none;

color:white;

font-size:16px;

font-weight:700;

transition:.35s;

}

/* HOVER */

div.stButton > button:hover{

background:rgba(255,255,255,.08);

transform:translateY(-2px);

box-shadow:
0 0 20px rgba(100,200,255,.25);

}

/* ACTIVE */

div.stButton > button:disabled{

background:linear-gradient(
135deg,
rgba(90,170,255,.35),
rgba(90,220,255,.25)
);

border:1px solid rgba(255,255,255,.12);

color:white;

opacity:1;

}

</style>
""", unsafe_allow_html=True)
    
    nav = st.columns(5)

    with nav[0]:
        if st.button("🏠 Home", use_container_width=True):
            st.query_params["page"] = "home"
            st.rerun()

    with nav[1]:
        if st.button("🚀 Missions", use_container_width=True):
            st.query_params["page"] = "missions"
            st.rerun()

    with nav[2]:
        st.button(
            "📊 Analytics",
            disabled=True,
            use_container_width=True
        )

    with nav[3]:
        if st.button("🪐 Planets", use_container_width=True):
            st.query_params["page"] = "planets"
            st.rerun()

    with nav[4]:
        if st.button("ℹ️ About", use_container_width=True):
            st.query_params["page"] = "about"
            st.rerun()

    st.markdown("<br>", unsafe_allow_html=True)
    
    # ---------------- KPI DATA ----------------

    total_missions = len(df)

    total_agencies = df["Agency"].nunique()

    success_percentage = round(
        (df["Status"] == "Success").mean() * 100,
        1
    )

    total_crew = int(
        pd.to_numeric(
            df["Crew"],
            errors="coerce"
        ).fillna(0).sum()
    )
    # ---------------- TITLE ----------------

    st.markdown(f"""
<div class="analytics-hero">

<div class="analytics-title">

🚀 Space Mission Analytics

</div>

<div class="analytics-subtitle">

Interactive Dashboard for Historical Space Missions

</div>

<div class="analytics-badges">

<div class="analytics-badge">
🚀 {total_missions} Missions
</div>

<div class="analytics-badge">
🌍 {total_agencies} Agencies
</div>

<div class="analytics-badge">
✅ {success_percentage}% Success
</div>

<div class="analytics-badge">
👨‍🚀 {total_crew} Crew
</div>

</div>

</div>
""", unsafe_allow_html=True)
    # ---------------- KPI CARDS ----------------

    
    c1, c2, c3, c4 = st.columns(4)

    with c1:
        st.metric("🚀 Missions", total_missions)

    with c2:
        st.metric("🌍 Agencies", total_agencies)

    with c3:
        st.metric("✅ Success", f"{success_percentage}%")

    with c4:
        st.metric("👨‍🚀 Crew", total_crew)

    st.divider()
    top_agency = df["Agency"].value_counts().idxmax()

    top_vehicle = df["Launch Vehicle"].value_counts().idxmax()

    top_site = df["Launch Site"].value_counts().idxmax()

    year_min = int(df["Year"].min())

    year_max = int(df["Year"].max())
    
    
    st.markdown(f"""
<div class="glass-card ai-summary">

<h2 style="
margin-top:0;
margin-bottom:18px;
color:#64c7ff;
font-size:34px;
">

🧠 AI Dashboard Summary

</h2>

<div style="
display:grid;
grid-template-columns:repeat(2,1fr);
gap:18px;
font-size:18px;
color:white;
">

<div>🚀 <b>Total Missions</b><br>{total_missions}</div>

<div>🌍 <b>Top Agency</b><br>{top_agency}</div>

<div>✅ <b>Success Rate</b><br>{success_percentage}%</div>

<div>👨‍🚀 <b>Total Crew</b><br>{total_crew}</div>

<div>🚀 <b>Top Vehicle</b><br>{top_vehicle}</div>

<div>📍 <b>Top Launch Site</b><br>{top_site}</div>

<div>📅 <b>Mission Timeline</b><br>{year_min} → {year_max}</div>

<div>🏢 <b>Agencies</b><br>{total_agencies}</div>

</div>

<hr style="
margin:25px 0;
border:.5px solid rgba(255,255,255,.15);
">

<p style="
font-size:17px;
line-height:1.7;
color:#d8e6ff;
margin:0;
">

💡 <b>AI Observation</b><br><br>

This dashboard contains <b>{total_missions}</b> missions from
<b>{total_agencies}</b> major space agencies.

<b>{top_agency}</b> contributes the largest share of missions in this dataset,
while the overall recorded success rate is
<b>{success_percentage}%</b>.

Use the tabs below to explore mission costs, timelines, launch vehicles,
launch sites, mission types, and agency performance.

</p>

</div>
""", unsafe_allow_html=True)
    
    st.markdown("""
    <h3 style="
        text-align:center;
        color:white;">
        📊 Analytics Dashboard
    </h3>

    <p style="
        text-align:center;
        color:#bbbbbb;">
        Select a chart below
    </p>
    """, unsafe_allow_html=True)

    
    st.markdown(
    '<div class="glass-card" style="padding:28px;margin-top:25px;">',
    unsafe_allow_html=True
)
    st.markdown("</div>", unsafe_allow_html=True)
    tabs = st.tabs([
        "💰 Cost",
        "📊 Status",
        "📅 Timeline",
        "🚀 Vehicles",
        "📍 Sites",
        "🌳 Treemap",
        "☀️ Sunburst",
        "🥧 Types",
        "🌌 3D",
        "✅ Success"
    ])

    # Keep your existing dataframe cleanup

    df["Agency"] = df["Agency"].replace({
        "NASA_Missions_Dataset_1":"NASA",
        "ISRO_Landmark_Missions_Dataset":"ISRO",
        "ESA_Landmark_Missions_Dataset":"ESA",
        "JAXA_Landmark_Missions_Dataset":"JAXA",
        "CNSA_Landmark_Missions_Dataset":"CNSA",
        "SpaceX_Landmark_Missions_Styled":"SpaceX"
    })

    df["Cost"] = (
        df["Cost"]
        .astype(str)
        .str.strip()
        .str.title()
    )    

            # =====================================================
    # CHART 1 - Mission Cost by Agency
    # =====================================================
    agency_cost = (
    df.groupby(["Agency", "Cost"])
      .size()
      .reset_index(name="Mission Count")
)
    fig1 = px.bar(
    agency_cost,
    x="Agency",
    y="Mission Count",
    color="Cost",
    barmode="stack",
    color_discrete_map={
        "Low": "#00E676",
        "Medium": "#FFD600",
        "High": "#FF1744"
    },
    title="Mission Cost Category Distribution Across Space Agencies"
    )    

    fig1.update_layout(
    template="plotly_dark",
    paper_bgcolor="rgba(0,0,0,0)",
    plot_bgcolor="rgba(0,0,0,0)",
    title_x=0.5,
title_font=dict(
    size=28,
    color="white",
    family="Segoe UI"
),
font=dict(
    color="#EAF2FF",
    family="Segoe UI"
),
margin=dict(
    l=30,
    r=30,
    t=80,
    b=30
),
height=720
    )
    with tabs[0]:
        st.subheader("💰 Mission Cost Analysis")
        st.plotly_chart(fig1, use_container_width=True)
        
    # =====================================================
    # CHART 2 - Mission Status
    # =====================================================

    status_count = (
        df.groupby("Status")
          .size()
          .reset_index(name="Mission Count")
    )

    fig2 = px.pie(
        status_count,
        names="Status",
        values="Mission Count",
        hole=0.45,
        color="Status",
        color_discrete_map={
            "Success": "#00E676",
            "Failure": "#FF1744",
            "Partial Failure": "#FFD600",
            "Ongoing": "#03A9F4",
            "Planned": "#9C27B0"
        }
    )

    fig2.update_layout(
    template="plotly_dark",
    paper_bgcolor="rgba(0,0,0,0)",
    plot_bgcolor="rgba(0,0,0,0)",
        title="Mission Status Distribution",
        title_x=0.5,
        height=600
    )

    with tabs[1]:
        st.plotly_chart(fig2, use_container_width=True)
    # =====================================================
    # CHART 3 - Missions by Year
    # =====================================================

    year_count = (
        df.groupby("Year")
          .size()
          .reset_index(name="Mission Count")
          .sort_values("Year")
    )

    fig3 = px.line(
        year_count,
        x="Year",
        y="Mission Count",
        markers=True,
        title="Space Missions by Year"
    )

    fig3.update_layout(
    template="plotly_dark",
    paper_bgcolor="rgba(0,0,0,0)",
    plot_bgcolor="rgba(0,0,0,0)",
        title_x=0.5,
        height=650
    )

    with tabs[2]:
        st.plotly_chart(fig3, use_container_width=True)

    # =====================================================
    # CHART 4 - Launch Vehicles
    # =====================================================

    vehicle_count = (
        df.groupby("Launch Vehicle")
          .size()
          .reset_index(name="Mission Count")
          .sort_values("Mission Count", ascending=False)
    )

    fig4 = px.bar(
        vehicle_count,
        x="Mission Count",
        y="Launch Vehicle",
        orientation="h",
        color="Mission Count",
        title="Top Launch Vehicles"
    )

    fig4.update_layout(
    template="plotly_dark",
    paper_bgcolor="rgba(0,0,0,0)",
    plot_bgcolor="rgba(0,0,0,0)",
        title_x=0.5,
        height=700
    )

    with tabs[3]:
        st.plotly_chart(fig4, use_container_width=True)

    # =====================================================
    # CHART 5 - Launch Sites
    # =====================================================

    site_count = (
        df.groupby("Launch Site")
          .size()
          .reset_index(name="Mission Count")
          .sort_values("Mission Count", ascending=False)
    )

    fig5 = px.bar(
        site_count,
        x="Mission Count",
        y="Launch Site",
        orientation="h",
        color="Mission Count",
        color_continuous_scale="Blues",
        title="Top Launch Sites"
    )

    fig5.update_layout(
    template="plotly_dark",
    paper_bgcolor="rgba(0,0,0,0)",
    plot_bgcolor="rgba(0,0,0,0)",
        title_x=0.5,
        height=700
    )

    with tabs[4]:
        st.plotly_chart(fig5, use_container_width=True)

             # =====================================================
    # CHART 6 - Agency Mission Type (Treemap)
    # =====================================================

    treemap_data = (
        df.groupby(["Agency", "Type"])
          .size()
          .reset_index(name="Mission Count")
    )

    fig6 = px.treemap(
        treemap_data,
        path=["Agency", "Type"],
        values="Mission Count",
        color="Mission Count",
        color_continuous_scale="Viridis",
        title="Mission Distribution by Agency and Mission Type"
    )

    fig6.update_layout(
    template="plotly_dark",
    paper_bgcolor="rgba(0,0,0,0)",
    plot_bgcolor="rgba(0,0,0,0)",
        title_x=0.5,
        height=700
    )

    with tabs[5]:
        st.plotly_chart(fig6, use_container_width=True)

    # =====================================================
    # CHART 7 - Agency Status (Sunburst)
    # =====================================================

    sunburst_data = (
        df.groupby(["Agency", "Status"])
          .size()
          .reset_index(name="Mission Count")
    )

    fig7 = px.sunburst(
        sunburst_data,
        path=["Agency", "Status"],
        values="Mission Count",
        color="Mission Count",
        color_continuous_scale="Turbo",
        title="Mission Status Distribution by Agency"
    )

    fig7.update_layout(
    template="plotly_dark",
    paper_bgcolor="rgba(0,0,0,0)",
    plot_bgcolor="rgba(0,0,0,0)",
        title_x=0.5,
        height=700
    )

    with tabs[6]:
        st.plotly_chart(fig7, use_container_width=True)

    # =====================================================
    # CHART 8 - Mission Type Distribution
    # =====================================================

    type_count = (
        df.groupby("Type")
          .size()
          .reset_index(name="Mission Count")
    )

    fig8 = px.pie(
        type_count,
        names="Type",
        values="Mission Count",
        hole=0.45,
        title="Mission Type Distribution"
    )

    fig8.update_layout(
    template="plotly_dark",
    paper_bgcolor="rgba(0,0,0,0)",
    plot_bgcolor="rgba(0,0,0,0)",
        title_x=0.5,
        height=650
    )

    with tabs[7]:
        st.plotly_chart(fig8, use_container_width=True)

    # =====================================================
    # CHART 9 - 3D Mission Comparison
    # =====================================================

    cost_map = {
        "Low": 150,
        "Medium": 600,
        "High": 1500
    }

    df["Cost Value"] = df["Cost"].map(cost_map)

    fig9 = px.scatter_3d(
        df,
        x="Year",
        y="Cost Value",
        z="Crew",
        color="Agency",
        hover_name="Mission",
        title="3D Space Mission Comparison"
    )

    fig9.update_layout(
    template="plotly_dark",
    paper_bgcolor="rgba(0,0,0,0)",
    plot_bgcolor="rgba(0,0,0,0)",
        title_x=0.5,
        height=750,
        scene=dict(
            xaxis_title="Year",
            yaxis_title="Cost (Million $)",
            zaxis_title="Crew"
        )
    )

    with tabs[8]:
        st.plotly_chart(fig9, use_container_width=True)

    # =====================================================
    # CHART 10 - Success Rate by Agency
    # =====================================================

    success_rate = (
        df[df["Status"] == "Success"]
          .groupby("Agency")
          .size()
          .reset_index(name="Successful Missions")
    )

    fig10 = px.bar(
        success_rate,
        x="Agency",
        y="Successful Missions",
        color="Agency",
        title="Successful Missions by Agency"
    )
    fig10.update_layout(
    template="plotly_dark",
    paper_bgcolor="rgba(0,0,0,0)",
    plot_bgcolor="rgba(0,0,0,0)",
        title_x=0.5,
        height=650,
        showlegend=False
    )

    with tabs[9]:
        st.plotly_chart(fig10, use_container_width=True)
        st.markdown("""
<br><br>

<hr style="border:1px solid rgba(255,255,255,.15);">

<div style="
text-align:center;
padding:20px;
color:#9fb3d9;
">

<h3 style="color:white;">
🚀 Space Mission Analytics
</h3>

Developed by <b>Aditya Jaswal</b><br>

DAV Institute of Engineering & Technology<br><br>

Python • Streamlit • Plotly • OpenAI

</div>
""", unsafe_allow_html=True)


