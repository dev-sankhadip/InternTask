from django.shortcuts import render
from .models import TaskModel
from django.views.decorators.csrf import csrf_exempt


# Create your views here.


@csrf_exempt
def create(request):
    pass