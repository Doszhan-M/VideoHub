FROM python:3.11.0


EXPOSE 8000

ENV TZ=Asia/Almaty
RUN useradd -ms /bin/bash backend

WORKDIR /backend/

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

RUN pip install --upgrade pip

COPY backend/requirements.txt ./
RUN pip install -r requirements.txt

COPY backend/ ./

RUN chown -R backend:backend ./
USER backend

ENTRYPOINT celery -A root worker -l INFO -B
