from django.shortcuts import render

# Create your views here.
from .serializers import *
from rest_framework import viewsets
from models import *

from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.renderers import JSONRenderer
from rest_framework.parsers import JSONParser


class JSONResponse(HttpResponse):
    """
    An HttpResponse that renders its content into JSON.
    """
    def __init__(self, data, **kwargs):
        content = JSONRenderer().render(data)
        kwargs['content_type'] = 'application/json'
        super(JSONResponse, self).__init__(content, **kwargs)

class PokeViewSet(viewsets.ModelViewSet):
	queryset = Pokemon.objects.all()	
	serializer_class = PokeSerializer

@csrf_exempt
def poke_list(request):
    """
    List all code pokemon, or create a new pokemon.
    """    
    if request.method == 'GET':
        pokemon = Pokemon.objects.all()
        serializer = PokeSerializer(pokemon, many=True)
        return JSONResponse(serializer.data)

    elif request.method == 'POST':
        data = JSONParser().parse(request)             
        serializer = PokeSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JSONResponse(serializer.data, status=201)
        return JSONResponse(serializer.errors, status=400)

@csrf_exempt
def poke_detail(request, pk):
    """
    Retrieve, update or delete a code pokemon.
    """        
    try:
        pokemon = Pokemon.objects.get(pk=pk)
    except Pokemon.DoesNotExist:
        return HttpResponse(status=404)    

    if request.method == 'GET':
        serializer = PokeSerializer(pokemon)
        return JSONResponse(serializer.data)

    elif request.method == 'OPTIONS':       
        return HttpResponse(status=204)

    elif request.method == 'PUT':
        data = JSONParser().parse(request)        
        serializer = PokeSerializer(pokemon, data=data)      
        if serializer.is_valid():
            serializer.save()
            return JSONResponse(serializer.data)
        return JSONResponse(serializer.errors, status=400)    

    elif request.method == 'DELETE':        
        pokemon.delete()        
        return HttpResponse(status=204)