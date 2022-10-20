import aiohttp
from os import getenv


async def user_id_by_email(email):
    url = f'{getenv("BACKEND_HOST")}/api/web/accounts/user_id_by_email?email={email}'
    async with aiohttp.ClientSession()   as session:
        async with session.get(url) as response:
            result = await response.json()
            return result