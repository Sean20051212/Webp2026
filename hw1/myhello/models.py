from django.db import models

# Create your models here.
class Post(models.Model):
    title = models.CharField(max_length=100)
    content = models.TextField(blank= True)
    photo = models.FileField(blank= True)
    location = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)
    
from django.db import models

class Course_table(models.Model):
    # 開課單位 [cite: 1654]
    Department = models.CharField(max_length=100)
    # 課程名稱 [cite: 1654]
    CourseTitle = models.CharField(max_length=100)
    # 授課教師 [cite: 1654]
    Instructor = models.CharField(max_length=100)

    def __str__(self):
        return self.CourseTitle