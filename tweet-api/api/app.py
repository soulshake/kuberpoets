import logging
import time
from logging.config import dictConfig
from flask import Flask, request
from flask_cors import CORS

from api import inference
from api.utils import _NumpyEncoder


dictConfig(
    {
        "version": 1,
        "formatters": {
            "default": {
                "format": "[%(asctime)s] %(levelname)s in %(module)s: %(message)s",
            }
        },
        "handlers": {
            "wsgi": {
                "class": "logging.StreamHandler",
                "stream": "ext://flask.logging.wsgi_errors_stream",
                "formatter": "default",
            }
        },
        "root": {"level": "INFO", "handlers": ["wsgi"]},
    }
)

logging.getLogger("flask_cors").level = logging.DEBUG
app = Flask(__name__)
CORS(app)

app.json_encoder = _NumpyEncoder


@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"


@app.route("/health")
def health():
    return '{"healthy": true}'


@app.route("/analyze", methods=["POST"])
def analyze():
    start = time.time()

    errors = []
    # sentiment = "empty"
    text = request.json.get("text")
    if text:
        # app.logger.info(f"Analyzing: {text}")
        # if len(text) % 2 == 0:
        #     sentiment = "sad"
        # elif len(text) == 3:
        #     sentiment = "excited"
        #     errors.append({"message": "nice"})
        # else:
        #     sentiment = "happy"
        sentiment = inference.predict(text)
    else:
        errors.append({"message": "no text received in request json"})

    time.sleep(1)
    end = time.time()
    duration = round((end - start) * 1000, 4)
    # ret = {"data": {"sentiment": sentiment, "duration": duration, "errors": errors}}
    ret = {"data": {"sentiment": sentiment, "duration": duration, "errors": errors}}
    app.logger.info(ret)
    return ret
