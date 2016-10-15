from django.test import TestCase
from django.core.urlresolvers import reverse
from .models import *

# Create your tests here.
class SimpleTest(TestCase):
	def setUp(self):		
		Pokemon.objects.create(name='pikachu', type='Tierra', ability='Impactrueno', weight='50', height='5', description='bonito') 				
		Pokemon.objects.create(name='caterpie', type='Tierra', ability='No tiene', weight='20', height='10', description='gusano')
	
	def test_views(self):		
		self.assertEqual(Pokemon.objects.count(),2)		

		res = self.client.get(reverse('pokemon', kwargs={'pk':1}))
		self.assertEqual(res.status_code, 200)

		res = self.client.get(reverse('pokemons'))
		self.assertEqual(res.status_code, 200)