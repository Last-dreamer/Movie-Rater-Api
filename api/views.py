from django.shortcuts import render
from rest_framework import viewsets, status
from rest_framework.decorators import action
from django.contrib.auth.models import User
from .models import Movie, Rating
from rest_framework.response import Response
from rest_framework.authentication import TokenAuthentication
from .serializers import MovieSerializer, RatingSerializer, UserSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer


# class base views....
class MovieViewSet(viewsets.ModelViewSet):
    queryset = Movie.objects.all()
    serializer_class = MovieSerializer
    # for tokenization
    authentication_classes = (TokenAuthentication,)
    permission_classes = (AllowAny,)

    # custom method
    @action(detail=True, methods=['POST'])
    def rate_movie(self, request, pk=None):
        if 'stars' in request.data:
            # specific Movie ......
            movie = Movie.objects.get(id=pk)
            # current stars
            stars = request.data['stars']
            # user at id 1
            user = request.user
            print(user)
            # user = User.objects.get(id=1)
            try:
                # updating the current stars
                rating = Rating.objects.get(user=user, movie=movie)
                rating.stars = stars
                rating.save()
                serializing_data = RatingSerializer(rating, many=False)
                response = {'message': 'updating the stars',
                            'result': serializing_data.data}
                return Response(response, status=status.HTTP_200_OK)
            except:
                # creating or giving new stars
                rating = Rating.objects.create(user=user, movie=movie, stars=stars)
                serializing_data = RatingSerializer(rating, many=False)
                response = {'message ': 'new stars .... created..',
                            'restut': serializing_data.data}
                return Response(response, status=status.HTTP_200_OK)

        else:
            response = {'message', 'you need to provide stars ...'}
            return Response(response, status=status.HTTP_400_BAD_REQUEST)


class RatingViewSet(viewsets.ModelViewSet):
    queryset = Rating.objects.all()
    serializer_class = RatingSerializer
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)

    # overriding the methods
    def update(self, request, *args, **kwargs):
        response = {'message': 'you cant update this in here'}
        return Response(response, status=status.HTTP_400_BAD_REQUEST)

    def create(self, request, *args, **kwargs):
        response = {'message': 'you cant create this in here'}
        return Response(response, status=status.HTTP_400_BAD_REQUEST)