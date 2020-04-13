FROM python:slim

WORKDIR /app

COPY requirements.txt /app

RUN pip install -r requirements.txt

COPY server/led_sign /app

EXPOSE 50052

CMD [ "python3", "-u", "led_sign_server.py" ]
