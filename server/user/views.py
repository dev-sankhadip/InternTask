from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse, JsonResponse, HttpResponseNotAllowed, HttpResponseBadRequest, HttpResponseServerError, HttpResponseNotFound
from django.db import connection
from django.contrib.auth.hashers import make_password, check_password
import random
import jwt
import csv
import json
import string
import io


from .jwt import checkJwt
from .models import UserModel

cursor = connection.cursor()


@csrf_exempt
def login(request):
    if request.method == 'POST':
        value = json.loads(request.body.decode('utf-8'))
        user, password = value.values()
        try:
            cursor.execute(
                f"select * from user_usermodel where username = '{user}' or email='{user}'")
            isUser = cursor.fetchall()
            if len(isUser) > 0:
                if check_password(password, isUser[0][3]):
                    payload = {
                        'username': isUser[0][1]
                    }
                    token = jwt.encode(payload, 'task', algorithm='HS256',)
                    return JsonResponse({'code': '200', 'token': f'{token}', 'type': f'{isUser[0][6]}'})
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
    if request.method == 'POST':
        value = json.loads(request.body.decode('utf-8'))
        userid, username, email, password, cpassword, phone, permission = value.values()
        try:
            cursor.execute(
                f"select * from user_usermodel where username='{username}' or email='{email}'")
            isUser = cursor.fetchall()
            if len(isUser) == 0:
                cursor.execute(
                    f"insert into user_usermodel values('{userid}', '{username}', '{email}', '{make_password(password)}', '{phone}','{permission}', 'admin')")
                return JsonResponse({"code": 201})
            else:
                return HttpResponseBadRequest("User already exists")
        except Exception as e:
            print(e)
    else:
        return HttpResponseNotAllowed('Not allowed')


@csrf_exempt
def users(request):
    if request.method == 'GET':
        try:
            token = request.headers['Authorization'].split("'")
            username = checkJwt(token[1])
            cursor.execute('select * from user_usermodel')
            users = cursor.fetchall()
            return JsonResponse({'code': '200', 'users': users, 'username': username})
        except Exception as e:
            print(e)
            return HttpResponseServerError("Server error")
    else:
        return HttpResponseNotAllowed("Method not allowed")


@csrf_exempt
def user(request, username):
    if request.method == 'GET':
        try:
            cursor.execute(
                f"select * from user_usermodel where username='{username}'")
            user = cursor.fetchall()
            return JsonResponse({'code': '200', 'user': user})
        except Exception as e:
            print(e)
            return HttpResponseServerError("Server error")
    else:
        return HttpResponseNotAllowed("Method not allowed")


@csrf_exempt
def UpdateUser(request):
    if request.method == 'POST':
        value = json.loads(request.body.decode('utf-8'))
        userid, username, email, phone, permission = value['value'].values()
        updatableUser = value['username']

        token = request.headers['Authorization'].split("'")
        usernameJwt = checkJwt(token[1])

        if usernameJwt != 'error' or usernameJwt != None:
            cursor.execute(
                f"update user_usermodel set username='{username}', email='{email}', phone='{phone}', permission='{permission}' ")
            return JsonResponse({'code': '200'})
        else:
            return HttpResponseBadRequest("Unauthorised")


@csrf_exempt
def download(request):
    response = HttpResponse(content_type='text/csv')
    response['Content-Disposition'] = 'attachment; filename="file.csv"'
    writer = csv.writer(response)
    cursor.execute('select * from user_usermodel')
    users = cursor.fetchall()
    writer.writerow('userid', 'username', 'email', 'phone', 'permission', 'usertype')
    for user in users:
        writer.writerow([user[0], user[1], user[2], user[4], user[5], user[6]])
    return response


@csrf_exempt
def upload(request):
    if request.method == 'POST':
        try:
            csv_file = request.FILES['file']
            data_set = csv_file.read().decode('UTF-8')
            io_string = io.StringIO(data_set)
            next(io_string)
            for column in csv.reader(io_string,delimiter=',',quotechar='|'):
                cursor.execute(f"update user_usermodel set username='{column[1]}', email='{column[2]}', phone='{column[3]}', permission='{column[4]}', usertype='{column[5]}' where userid='{column[0]}'")
            return JsonResponse({"code": "200"})
        except Exception as e:
            print(e)
            return HttpResponseServerError("Server error")
    else:
        return HttpResponseNotAllowed("Method not allowed")