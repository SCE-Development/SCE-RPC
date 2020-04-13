FROM python:slim

WORKDIR /app

COPY requirements.txt /app

RUN pip install -r requirements.txt

COPY server/printing_3d /app

EXPOSE 50053

RUN ls /app/

CMD [ "python3", "-u", "print_3d_server.py" ]
