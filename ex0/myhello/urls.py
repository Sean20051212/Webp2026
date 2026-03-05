from django.urls import path
from . import views

urlpatterns = [
    # 這裡對應到 http://127.0.0.1:8000/myhello/
    path('', views.hello_view, name='hello_view'),
]