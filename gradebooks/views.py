from django.shortcuts import render
from .models import Learner
from django.http import JsonResponse

# Create your views here.
# from django.http import HttpResponse


def index(request):
    # return render(request, 'index.html', learner)
    return render(request, 'index.html')
    # return HttpResponse("Hello, world. You're at the polls index.")


def api_learner(request):
    if request.method == 'GET':
        print(request.GET)
        learner = Learner.objects.filter(pk=request.GET.get('number')).values()
        print(learner)

    return JsonResponse({'results': list(learner)})
