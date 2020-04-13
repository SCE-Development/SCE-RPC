FROM python:slim

WORKDIR /app

COPY requirements.txt /app

RUN pip install -r requirements.txt

COPY server/printing /app

EXPOSE 50051

CMD [ "python3", "-u", "printing_server.py" ]
