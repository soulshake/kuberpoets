import logging
import time
from logging.config import dictConfig
from flask import Flask, has_request_context, request
from flask_cors import CORS
from flask.logging import default_handler


class RequestFormatter(logging.Formatter):
    def format(self, record):
        if has_request_context():
            record.url = request.url
            record.remote_addr = request.remote_addr
        else:
            record.url = None
            record.remote_addr = None

        return super().format(record)


formatter = RequestFormatter(
    "[%(asctime)s] %(remote_addr)s requested %(url)s\n"
    "%(levelname)s in %(module)s: %(message)s"
)
default_handler.setFormatter(formatter)


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
    sentiment = "empty"
    text = request.json.get("text")
    if text:
        app.logger.info(f"Analyzing: {text}")
        if len(text) % 2 == 0:
            sentiment = "sad"
        elif len(text) == 3:
            sentiment = "excited"
            errors.append({"message": "nice"})
        else:
            sentiment = "happy"
    else:
        errors.append({"message": "no text received in request json"})

    end = time.time()
    duration = round((end - start) * 1000, 4)
    ret = {"data": {"sentiment": sentiment, "duration": duration, "errors": errors}}
    app.logger.info(ret)
    return ret
