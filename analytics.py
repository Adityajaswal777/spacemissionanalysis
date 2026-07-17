import plotly.express as px
import pandas as pd


# ==========================================
# COMMON PLOTLY THEME
# ==========================================

def apply_theme(fig, height=650):

    fig.update_layout(
        template="plotly_dark",
        paper_bgcolor="rgba(0,0,0,0)",
        plot_bgcolor="rgba(0,0,0,0)",
        title_x=0.5,
        height=height,
        margin=dict(l=20, r=20, t=60, b=20),
        font=dict(
            family="Inter",
            size=15,
            color="white"
        ),
        legend=dict(
            orientation="h",
            y=1.02,
            x=1,
            xanchor="right"
        )
    )
    return fig
# ==========================================
# CHART 1
# ==========================================

def cost_chart(df):

    agency_cost = (
        df.groupby(["Agency", "Cost"])
        .size()
        .reset_index(name="Mission Count")
    )

    fig = px.bar(
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

    return apply_theme(fig)
    
