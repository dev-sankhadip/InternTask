from django.urls import path
from . import views



urlpatterns=[
    path('login', views.login),
    path('signup', views.signup),
    path('users', views.users),
    path('',views.users),
    path('edit', views.UpdateUser),
    path('<str:username>', views.user),
]