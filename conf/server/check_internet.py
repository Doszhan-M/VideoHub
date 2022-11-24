from os import system
from time import sleep
from urllib.error import URLError
from urllib.request import urlopen


def check_connection():
    try:
        urlopen(
            "https://www.google.com/",
            timeout=5,
        )
        return True
    except URLError:
        return False


def start():
    sleep(60 * 20)
    on_air = True
    while on_air:
        sleep(60)
        on_air = check_connection()
        if not on_air:
            sleep(10)
            on_air = check_connection()
    if not on_air:
        system("systemctl reboot -i")


if __name__ == "__main__":
    start()
