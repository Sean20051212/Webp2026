from django.http import HttpResponse

# Create your views here.
def hello_view(request):
    my_name = request.POST.get('name', 'CGU')
    return HttpResponse('Hello ' + my_name)