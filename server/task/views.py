from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponseBadRequest, JsonResponse, HttpResponseNotAllowed, HttpResponseServerError
from django.db import connection
import json

from .models import TaskModel
from user.jwt import checkJwt


cursor = connection.cursor()


@csrf_exempt
def create(request):
    if request.method == "POST":
        token = request.headers['Authorization'].split("'")
        username = checkJwt(token[1])
        try:
            cursor.execute(
                f"select * from user_usermodel where username='{username}' and usertype='admin'")
            isAdmin = cursor.fetchall()
            if len(isAdmin) > 0:
                value = json.loads(request.body.decode('utf-8'))
                des = value['value']['des']
                tasktype = value['value']['type']
                appid = value['value']['appid']
                taskid = value['value']['taskid']
                cursor.execute(
                    f"insert into task_taskmodel values('{appid}','{taskid}','{des}','{tasktype}','Un-assigned','Open')")
                return JsonResponse({ "code":"200" })
            else:
                return HttpResponseNotAllowed("Unauthorised")
        except Exception as e:
            print(e)
            return HttpResponseServerError("Server error")
    else:
        return HttpResponseBadRequest("Method not allowed")


@csrf_exempt
def list(request):
    pass