FROM python:3.10.2


EXPOSE 8000

ENV TZ=Asia/Almaty
RUN useradd -ms /bin/bash appuser

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

RUN pip install --upgrade pip

WORKDIR /websocket_app/

COPY ./websocket_app/requirements.txt ./
RUN pip install -r requirements.txt

COPY websocket_app/ ./

RUN chown -R appuser:appuser ./
USER appuser

ENTRYPOINT [ "./run_app.sh" ]
