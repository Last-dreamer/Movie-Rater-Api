from django.contrib.auth.models import User
from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator


class Movie(models.Model):
    title = models.CharField(max_length=32, null=True)
    description = models.TextField(max_length=360, null=True)

    def no_of_rating(self):
        rating = Rating.objects.filter(movie=self)
        return len(rating)

    def avg_rating(self):
        sum = 0
        rating = Rating.objects.filter(movie=self)
        for i in rating:
            sum += i.stars
        if len(rating) > 0:
            return sum / len(rating)
        else:
            return 0


class Rating(models.Model):
    user = models.ForeignKey(User, null=True, on_delete=models.CASCADE)
    movie = models.ForeignKey(Movie, null=True, on_delete=models.CASCADE)
    # rating will be in between 1 to 5 .......
    stars = models.IntegerField(validators=[MinValueValidator(1), MaxValueValidator(5)])
    
    # for unique user and movie 
    class Meta:
        unique_together = (('user', 'movie'),)
        index_together = (('user', 'movie'),)
