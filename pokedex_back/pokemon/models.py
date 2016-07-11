from django.db import models

class Pokemon(models.Model):
	name        = models.CharField(max_length=300)
	type        = models.CharField(max_length=100)
	hability    = models.CharField(max_length=200)
	weight      = models.FloatField()
	height      = models.FloatField()
	description = models.CharField(max_length=300)