# API EL RECETARIO
## CREATE USER
#### REQUEST

|              |                                               |
|--------------|-----------------------------------------------|
| endpoint     | https://api-el-recetario.vercel.app/api/users |
| http request | POST                                      |
| body(json)   
```json
{
	"name": "Nestor Chambi Chinche",
	"email": "nestor@gmail.com",
	"password": "123456"
}
``` 

#### RESPONSE
```json
{
	"message": "Usuario añadido correctamente",
	"body": {
		"name": "Nestor Chambi Chinche",
		"rol": "user",
		"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI2NDkwODkzMDEyODhhOTBhNDc2NWVlYTYiLCJpYXQiOjE2ODcxOTM5MDQsImV4cCI6MTY4NzIwODMwNH0.Lko61rdMJ4qX0cZCHRlPMhe8otBusA-dT97YZeAB8dY"
	}
}
```

## LOGIN
#### REQUEST

|              |                                               |
|--------------|-----------------------------------------------|
| endpoint     | https://api-el-recetario.vercel.app/api/auth |
| http request | POST                                      |
| body(json)    
```json
{
	"email": "nestor@gmail.com",
	"password": "123456"
}
```
#### RESPONSE
```json
{
	"message": "Loggeado correctamente",
	"body": {
		"name": "Nestor Chambi Chinche",
		"rol": "user",
		"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI2NDkwODkzMDEyODhhOTBhNDc2NWVlYTYiLCJpYXQiOjE2ODcyMDMxNTUsImV4cCI6MTY4NzIxNzU1NX0.T3J4pUzfXnN3Wv-L00SuixZM3EZ6NA4f6IWvr_M4ryA"
	}
}
```

## CREATE RECIPE
#### REQUEST

|              |                                               |
|--------------|-----------------------------------------------|
| endpoint     | https://api-el-recetario.vercel.app/api/recipes |
| http request | POST                                      |
| header       | xtoken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI2NDkwODkzMDEyODhhOTBhNDc2NWVlYTYiLCJpYXQiOjE2ODcyMDMxNTUsImV4cCI6MTY4NzIxNzU1NX0.T3J4pUzfXnN3Wv-L00SuixZM3EZ6NA4f6IWvr_M4ryA'
| body(json)    
```json
{
	"name": "Sajta",
	"image": "/img/carousel/platillos.jpg",
	"punctuation": 6,
	"favorite": false,
	"time": 3,
	"difficulty": 10,
	"recommended": false,
	"category": [
		"tipico","principales"
	],
	"ingredients": [
		"pollo","papas","cebolla","tomate"
	],
	"process": [
		"Hervir el arroz",
		"Freir carne y huevo",
		"Servir"
	]
}
```
#### RESPONSE
```json
{
	"message": "Receta añadida correctamente",
	"body": {
		"autor": "Nestor Chambi Chinche",
		"_id": "64935d7ba4f3108f1d88d18d"
	}
}
```
## GET SPECIFIC RECIPES
#### REQUEST
|              |                                               |
|--------------|-----------------------------------------------|
| endpoint     | https://api-el-recetario.vercel.app/api/recipes |
| http request | GET                                      |
| queries      | Could it be one or both: type, comida      |
| example      | https://api-el-recetario.vercel.app/api/recipes?comida=popular&&type=bebidas |

#### RESPONSE
```json
{
	"message": 1,
	"body": [
		{
			"_id": "649353fc2342b7d4a32f9b39",
			"name": "Mocochinchi",
			"image": "/img/carousel/platillos.jpg",
			"punctuation": 6,
			"favorite": false,
			"time": 3,
			"difficulty": 10,
			"recommended": false,
			"category": [
				"popular",
				"bebidas"
			],
			"ingredients": [
				"durazno",
				"azucar",
				"agua",
				"canela"
			],
			"process": [
				"Hervir el arroz",
				"Freir carne y huevo",
				"Servir"
			],
			"autor": "Nestor Chambi Chinche",
			"__v": 0
		}
	]
}
```


## GET ALL RECIPES
#### REQUEST

|              |                                               |
|--------------|-----------------------------------------------|
| endpoint     | https://api-el-recetario.vercel.app/api/recipes |
| http request | GET                                      |

#### RESPONSE
```json
{
	"message": 7,
	"body": [
		{
			"_id": "649093cdf89386aa5785d7b0",
			"name": "Piquemacho",
			"image": "/img/carousel/platillos-principales.jpg",
			"punctuation": 7,
			"favorite": false,
			"time": 2,
			"difficulty": 10,
			"recommended": true,
			"category": [
				"popular",
				"principales"
			],
			"ingredients": [
				"cebolla",
				"carne",
				"salchicha",
				"papas"
			],
			"process": [
				"Cortar todos los ingredientes",
				"Freir los ingredientes",
				"Servir"
			],
			"__v": 0
		},
		{
			"_id": "6490a74204d21d893f3a7f71",
			"name": "Silpancho",
			"image": "/img/carousel/platillos.jpg",
			"punctuation": 6,
			"favorite": false,
			"time": 3,
			"difficulty": 10,
			"recommended": false,
			"category": [
				"tipica",
				"principales"
			],
			"ingredients": [
				"carne",
				"huevo",
				"papa",
				"arroz"
			],
			"process": [
				"Hervir el arroz",
				"Freir carne y huevo",
				"Servir"
			],
			"autor": "Nestor Chambi Chinche",
			"__v": 0
		},
		{
			"_id": "649353fc2342b7d4a32f9b39",
			"name": "Mocochinchi",
			"image": "/img/carousel/platillos.jpg",
			"punctuation": 6,
			"favorite": false,
			"time": 3,
			"difficulty": 10,
			"recommended": false,
			"category": [
				"popular",
				"bebidas"
			],
			"ingredients": [
				"durazno",
				"azucar",
				"agua",
				"canela"
			],
			"process": [
				"Hervir el arroz",
				"Freir carne y huevo",
				"Servir"
			],
			"autor": "Nestor Chambi Chinche",
			"__v": 0
		},
		{
			"_id": "649354dd2342b7d4a32f9b3c",
			"name": "Api",
			"image": "/img/carousel/platillos.jpg",
			"punctuation": 6,
			"favorite": false,
			"time": 3,
			"difficulty": 10,
			"recommended": false,
			"category": [
				"tipica",
				"bebidas"
			],
			"ingredients": [
				"durazno",
				"azucar",
				"agua",
				"canela"
			],
			"process": [
				"Hervir el arroz",
				"Freir carne y huevo",
				"Servir"
			],
			"autor": "Nestor Chambi Chinche",
			"__v": 0
		},
		{
			"_id": "649355332342b7d4a32f9b3f",
			"name": "Ensalada de frutas",
			"image": "/img/carousel/platillos.jpg",
			"punctuation": 6,
			"favorite": false,
			"time": 3,
			"difficulty": 10,
			"recommended": false,
			"category": [
				"popular",
				"postre"
			],
			"ingredients": [
				"durazno",
				"azucar",
				"agua",
				"canela"
			],
			"process": [
				"Hervir el arroz",
				"Freir carne y huevo",
				"Servir"
			],
			"autor": "Nestor Chambi Chinche",
			"__v": 0
		},
		{
			"_id": "6493554e2342b7d4a32f9b42",
			"name": "Arroz con leche",
			"image": "/img/carousel/platillos.jpg",
			"punctuation": 6,
			"favorite": false,
			"time": 3,
			"difficulty": 10,
			"recommended": false,
			"category": [
				"tipica",
				"postre"
			],
			"ingredients": [
				"durazno",
				"azucar",
				"agua",
				"canela"
			],
			"process": [
				"Hervir el arroz",
				"Freir carne y huevo",
				"Servir"
			],
			"autor": "Nestor Chambi Chinche",
			"__v": 0
		},
		{
			"_id": "64935d7ba4f3108f1d88d18d",
			"name": "Sajta",
			"image": "/img/carousel/platillos.jpg",
			"punctuation": 6,
			"favorite": false,
			"time": 3,
			"difficulty": 10,
			"recommended": false,
			"category": [
				"tipico",
				"principales"
			],
			"ingredients": [
				"pollo",
				"papas",
				"cebolla",
				"tomate"
			],
			"process": [
				"Hervir el arroz",
				"Freir carne y huevo",
				"Servir"
			],
			"autor": "Nestor Chambi Chinche",
			"__v": 0
		}
	]
}
```