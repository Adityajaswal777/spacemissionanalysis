print("RUNNING NEW APP.PY")
from flask import Flask, request, jsonify
from flask_cors import CORS
from google import genai
from config import API_KEY

app = Flask(__name__)
CORS(app)

client = genai.Client(api_key=API_KEY)
@app.route("/ask", methods=["POST"])
def ask():

    try:

        data = request.json
        prompt = data["prompt"]

        response = client.models.generate_content(
            model="gemini-flash-latest",
            contents=prompt
        )

        return jsonify({
            "answer": response.text
        })

    except Exception as e:

        print(e)

        return jsonify({
            "answer": str(e)
        }), 500
@app.route("/models")
def models():
    return {
        "models": [
            m.name for m in client.models.list()
        ]
    }
if __name__ == "__main__":
    app.run(debug=True)