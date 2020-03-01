from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse, HttpResponseNotAllowed, HttpResponseBadRequest, HttpResponseServerError, HttpResponseNotFound
from django.db import connection
from django.contrib.auth.hashers import make_password, check_password
import json
import string
import random


cursor=connection.cursor()


@csrf_exempt
def login(request):
    if request.method=='POST':
        value=json.loads(request.body.decode('utf-8'))
        user,pssword=value.values()
        try:
            cursor.execute(f"select * from user_usermodel where username = '{user}' or email='{user}'")
            isUser=cursor.fetchall()
            if len(isUser)>0:
                print(isUser)
            else:
                return HttpResponseNotFound("User not found");
        except Exception as e:
            print(e)

        return JsonResponse({ 'code':200 })
    else:
        return HttpResponseNotAllowed('Not allowed')




@csrf_exempt
def signup(request):
    if request.method=='POST':
        value=json.loads(request.body.decode('utf-8'))
        userid, username, email, password, cpassword, phone, permission=value.values()
        try:
            cursor.execute(f"select * from user_usermodel where username='{username}' or email='{email}'")
            isUser=cursor.fetchall()
            if len(isUser)==0:
                cursor.execute(f"insert into user_usermodel values('{userid}', '{username}', '{email}', '{make_password(password)}', '{phone}','{permission}', 'user')")
                return JsonResponse({ "code":201 })
            else:
                return HttpResponseBadRequest("User already exists")
        except Exception as e:
            print(e)
    else:
        return HttpResponseNotAllowed('Not allowed')