from __future__ import annotations
import threading
import time
import random
from datetime import datetime
from typing import Dict, List

from flask import Flask, jsonify, render_template

app = Flask(__name__, template_folder="templates", static_folder="static")

# --- Simulation State (mirrors your TS logic conceptually) ---
state_lock = threading.Lock()

state: Dict = {
    "nuclear": 1000.0,
    "hydro": 400.0,
    "fossil": 300.0,
    "demand": 1700.0,
    "co2": 1450.0,
}

history: List[Dict] = []


def clamp_num(v: float, default: float = 0.0) -> float:
    try:
        if v != v:  # NaN
            return default
        if v == float("inf") or v == float("-inf"):
            return default
        return float(v)
    except Exception:
        return default


def update_loop():
    """Background loop to update simulation values every 2 seconds."""
    global state, history
    while True:
        try:
            with state_lock:
                # Demand target around previous with small noise
                demand = clamp_num(state.get("demand", 1700.0) + random.uniform(-15, 15), 1700.0)

                # Hydro steady with slight noise
                hydro = clamp_num(state.get("hydro", 400.0) + random.uniform(-3, 3), 400.0)

                # Nuclear slowly drifts around 1000
                nuclear = clamp_num(state.get("nuclear", 1000.0) + random.uniform(-5, 5), 1000.0)
                nuclear = max(0.0, min(1200.0, nuclear))

                # Fossil fills gap
                fossil = clamp_num(demand - (nuclear + hydro), 0.0)
                if fossil < 0.0:
                    fossil = 0.0

                # CO2 avoided (arbitrary simple model)
                co2 = round(((nuclear + hydro) * 1.0) + (fossil * 0.5))

                state.update({
                    "nuclear": round(nuclear, 0),
                    "hydro": round(hydro, 0),
                    "fossil": round(fossil, 0),
                    "demand": round(demand, 0),
                    "co2": co2,
                })

                # Append history point
                ts = datetime.now().strftime("%H:%M:%S")
                history.append({
                    "name": ts,
                    "Nuclear": state["nuclear"],
                    "Fossil": state["fossil"],
                    "Hydro": state["hydro"],
                    "Demand": state["demand"],
                })
                if len(history) > 40:
                    history = history[-40:]
        except Exception:
            # Keep running even if something odd happens
            pass
        time.sleep(2)


# Pre-fill with some points so chart isn't empty on load
with state_lock:
    now = datetime.now()
    for i in range(10, 0, -1):
        ts = (now - timedelta(seconds=i*2)).strftime("%H:%M:%S") if 'timedelta' in globals() else f"T-{i}"
        history.append({
            "name": ts,
            "Nuclear": state["nuclear"],
            "Fossil": state["fossil"],
            "Hydro": state["hydro"],
            "Demand": state["demand"],
        })


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/api/state")
def api_state():
    with state_lock:
        return jsonify({
            "state": state,
            "history": history,
        })


if __name__ == "__main__":
    # Start background updater
    t = threading.Thread(target=update_loop, daemon=True)
    t.start()

    # Run Flask
    app.run(host="127.0.0.1", port=5000, debug=False)