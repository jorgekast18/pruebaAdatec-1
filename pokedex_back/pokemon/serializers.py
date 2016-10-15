from rest_framework import serializers
from .models import *

class PokeSerializer(serializers.ModelSerializer):
	class Meta:
		model = Pokemon
		fields = ('pk','name','type','ability','weight','height','description')		
