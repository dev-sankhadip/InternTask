from django.urls import path
from . import views



urlpatterns=[
    path('login', views.login),
    path('signup', views.signup),
    path('users', views.users),
    path('',views.users),
    path('edit', views.UpdateUser),
    path('download', views.download),
    path('upload', views.upload),
    path('<str:username>', views.user),
]