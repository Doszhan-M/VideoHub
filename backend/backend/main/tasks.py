from os import getenv
from json import dumps
from base64 import b64decode
from requests import request

from root.celery import app


@app.task
def send_web_push(_token, video_id, title, description):
    url = "https://fcm.googleapis.com/fcm/send"
    payload = dumps(
        {
            "notification": {
                "title": title,
                "body": description,
                "icon": "https://doszhan.online/images/icons/android-icon-192x192.png",
                "click_action": f"https://doszhan.online/video/{video_id}",
            },
            "to": _token,
        }
    )
    key = b64decode(getenv("WEBPUSH")).decode('utf-8')
    headers = {
        "Authorization": f'key={key}',
        "Content-Type": "application/json",
    }
    res = request("POST", url, headers=headers, data=payload)
    print(res.text)