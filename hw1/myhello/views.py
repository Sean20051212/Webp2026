from rest_framework import status
from rest_framework.response import Response
from django.http import JsonResponse
from rest_framework.decorators import api_view
from django.core.serializers.json import DjangoJSONEncoder
import json
import logging

from .models import Post

logger = logging.getLogger('django')

@api_view(['GET'])
def add_post(request):
    title = request.GET.get('title', '')
    content = request.GET.get('content', '')
    photo = request.GET.get('photo', '')
    location = request.GET.get('location', '')

    new_post = Post()
    new_post.title = title
    new_post.content = content
    new_post.photo = photo
    new_post.location = location
    new_post.save()
    
    logger.debug(" **************** myhello_api: " + title)
    
    if title:
        return Response({"data": title + " insert!"}, status=status.HTTP_200_OK)
    else:
        return Response(
            {"res": "parameter: name is None"},
            status=status.HTTP_400_BAD_REQUEST
        )

@api_view(['GET'])
def list_post(request):
    posts = Post.objects.all().values()
    # return JsonResponse(list(posts), safe=False)
    return Response({"data": 
                    json.dumps(
                        list(posts), 
                        sort_keys = True, 
                        indent = 1, 
                        cls = DjangoJSONEncoder)},
                    status=status.HTTP_200_OK)
    
from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Course_table

# 查詢課程列表 API [cite: 1655, 1657]
@api_view(['GET'])
def courselist(request):
    courses = Course_table.objects.all().values()
    return JsonResponse(list(courses), safe=False)

# 新增課程 API [cite: 1655, 1659]
@api_view(['GET'])
def addcourse(request):
    dept = request.GET.get('Department')
    title = request.GET.get('CourseTitle')
    teacher = request.GET.get('Instructor')
    
    if dept and title and teacher:
        new_course = Course_table(
            Department=dept,
            CourseTitle=title,
            Instructor=teacher
        )
        new_course.save()
        return Response({"data": f"課程 {title} 已成功加入！"}, status=status.HTTP_200_OK)
    else:
        return Response({"res": "參數缺失"}, status=status.HTTP_400_BAD_REQUEST)