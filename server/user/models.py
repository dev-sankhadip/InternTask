from django.db import models


class UserModel(models.Model):
    userid = models.TextField(max_length = 20)
    username = models.TextField(max_length = 20)
    email = models.TextField(max_length = 20)
    password = models.TextField(max_length = 100)
    phone = models.TextField(max_length = 12)
    permission = models.TextField(max_length = 10)
    usertype = models.TextField(max_length=10)