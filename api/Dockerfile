# syntax=docker/dockerfile:1

ARG FLASK_DEBUG=0

FROM python:3.9-slim-buster as development
ENV FLASK_APP=api/app.py
ENV FLASK_DEBUG=${FLASK_DEBUG}

WORKDIR /app

COPY requirements.txt requirements.txt
RUN pip3 install -r requirements.txt

COPY . .

CMD [ "flask", "run", "--host=0.0.0.0"]
