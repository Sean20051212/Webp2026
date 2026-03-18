from django.contrib import admin
from django.urls import path, include  # 確保有 import include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('myhello/', include('myhello.urls')), # 將 myhello 的路由交給 App 處理
]