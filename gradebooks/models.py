from django.db import models


# Create your models here.
class Learner(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    grade = models.FloatField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        """A string representation of the model."""
        return self.name
