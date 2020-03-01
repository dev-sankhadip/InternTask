from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse, HttpResponseNotAllowed, HttpResponseBadRequest, HttpResponseServerError, HttpResponseNotFound
from django.db import connection
from django.contrib.auth.hashers import make_password, check_password
import json
import string
import random,jwt


cursor=connection.cursor()


@csrf_exempt
def login(request):
    if request.method=='POST':
        value=json.loads(request.body.decode('utf-8'))
        user,password=value.values()
        try:
            cursor.execute(f"select * from user_usermodel where username = '{user}' or email='{user}'")
            isUser=cursor.fetchall()
            if len(isUser)>0:
                if check_password(password, isUser[0][3]):
                    payload={
                        'username':isUser[0][1]
                    }
                    token=jwt.encode(payload,'task',algorithm='HS256',)
                    return JsonResponse({ 'code':'200','token':f'{token}' })
                else:
                    return HttpResponseBadRequest("Password didn't match")
            else:
                return HttpResponseNotFound("User not found")
        except Exception as e:
            print(e)
            return HttpResponseServerError("Server error")
    else:
        return HttpResponseNotAllowed('Method Not allowed')




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