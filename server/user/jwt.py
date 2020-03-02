import jwt
from django.db import connection
import logging


cursor=connection.cursor()

def checkJwt(token):
    try:
        payload=jwt.decode(token,"task",algorithm='HS256')
        if payload['username']:
            return payload['username']
    except jwt.ExpiredSignatureError as e:
        logging.error(e);
        return 'error';
    except jwt.InvalidSignatureError:
        logging.error(e);
        return 'error';