from django.urls import path, include
from rest_framework import routers
from .views import MovieViewSet, RatingViewSet, UserViewSet

routers = routers.DefaultRouter()
routers.register('movies', MovieViewSet)
routers.register('ratings', RatingViewSet)
routers.register('users', UserViewSet)

urlpatterns = [
    path('', include(routers.urls)),
]
