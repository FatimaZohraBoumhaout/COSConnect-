import requests
import json
import base64

class Configs:
    def __init__(self):
        self.CONSUMER_KEY = "o8eO5mCZnLfJBaF7U3Twx4mfWY0a"
        self.CONSUMER_SECRET = "QboMuCM2Dm8B5RVl5eMVmOyTLuoa"
        self.BASE_URL="https://api.princeton.edu:443/student-app/1.0.2"
        self.COURSE_COURSES="/courses/courses"
        self.REFRESH_TOKEN_URL="https://api.princeton.edu:443/token"
        self._refreshToken(grant_type="client_credentials")

    def _refreshToken(self, **kwargs):
        req = requests.post(
            self.REFRESH_TOKEN_URL, 
            data=kwargs, 
            headers={
                "Authorization": "Basic " + base64.b64encode(bytes(self.CONSUMER_KEY + ":" + self.CONSUMER_SECRET, "utf-8")).decode("utf-8")
            },
        )
        text = req.text
        response = json.loads(text)
        self.ACCESS_TOKEN = response["access_token"]