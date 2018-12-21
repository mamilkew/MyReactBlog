from django.test import TestCase

# Create your tests here.
from .models import Learner


class LearnerModelTest(TestCase):

    @classmethod
    def setUpTestData(cls):
        Learner.objects.create(name='minimooc1', email='minimooc1@minimooc.poc', grade=1.0)

    def test_name_content(self):
        learner = Learner.objects.get(id=1)
        expected_object_name = f'{learner.name}'
        self.assertEquals(expected_object_name, 'minimooc1')

    def test_email_content(self):
        learner = Learner.objects.get(id=1)
        expected_object_name = f'{learner.email}'
        self.assertEquals(expected_object_name, 'minimooc1@minimooc.poc')

    def test_grade_content(self):
        learner = Learner.objects.get(id=1)
        expected_object_name = f'{learner.grade}'
        self.assertEquals(expected_object_name, '1.0')
