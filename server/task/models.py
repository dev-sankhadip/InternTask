from django.db import models

# Create your models here.


class TaskModel(models.Model):
    taskid = models.TextField(max_length=5)
    taskdes = models.TextField(max_length=100)
    tasktype = models.TextField(max_length=10)
    owner = models.TextField(max_length=15)
    status = models.TextField(max_length=6)
