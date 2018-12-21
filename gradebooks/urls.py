from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('api_learner/', views.api_learner, name='api_learner')
]
