from django.urls import path
from . import views

urlpatterns = [
    path('add',views.add_post, name="add_post"),
    path('list',views.list_post, name="list_post"),
    # 127.0.0.1:8000/courselist [cite: 1656]
    path('courselist', views.courselist, name='courselist'),
    # 127.0.0.1:8000/addcourse [cite: 1658]
    path('addcourse', views.addcourse, name='addcourse'),
]