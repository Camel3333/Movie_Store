# Movie Store

# Ogólny zarys

## BAZA
MongoDB z wykorzystaniem mappera Djongo.

## Frontend:
Angular

## Backend:
Django z wykorzystaniem Django REST Framework.

## Uruchomienie:
W folderze server:
```
    pip install -r requirements.txt
```
```
    python manage.py runserver
```
Serwer lokalny zostaje uruchomiony pod adresem: http://localhost:8000

## Model danych

<pre>
Movie: {
    _id: ObjectID,
    title: string,
    mainActors: [ObjectID], // referencje do Aktorow
    photos: [string], // url
    productionDate: Date,
    director: {
        firstName: string,
        lastName: string,
    },
    unitsAvailable: int,
    price: float,
    description: string,
    userRatingsCount: int,
    totalRates: float,
    length: int // dlugosc filmu w sekundach
}
</pre>

<pre>
Actor: {
    _id: ObjectID,
    firstName: string,
    lastName: string,
    photo: string, //albo zmiana na przechowywanie binarnych
    birthDate: Date 
}
</pre>


<pre>
User: {
    _id: ObjectID,
    email: string,
    username: string,
    password: string, //hashowane
    roles: {
        admin: boolean,
        employee: boolean
    },
    createdAt: Date,
    updatedAt: Date,
    cart: [{
        movie_id: ObjectID,
        amount: int
    }]
}
</pre>

<pre>
History: {
    _id: ObjectID,
    orderDate: Date,
    userId: ObjectID,
    details: [{
        unitsOrdered: int,
        price: float,
        title: string,
        movieId: ObjectID
    }]
}
</pre>

<pre>
Category {
    _id: ObjectID,
    name: string
}
</pre>

<pre>
News {
    _id: ObjectID,
    title: string,
    message: string,
    timestamp: DateTime
}
</pre>


## Endpointy

Wszystkie relatywnie do adresu /api.
<pre>
<strong>POST auth/register</strong> - rejestruje nowych użytkownika
<strong>POST auth/login</strong> - loguje użytkownika 


<strong>GET movies</strong> - zwraca listę dostępnych filmów wykorzystuje query parametry:
    - offset - od którego filmu w posortowanej kolekcji zwracać wyniki
    - amount - ile filmów zwrócić
    - price_from - cena minimalna
    - price_to - cena maksymalna
    - category - kategoria filmu


<strong>GET movies/{movie_id}</strong> - zwraca szczegóły danego filmu


<strong>POST manage/movies</strong> - endpoint dostępny dla pracownika/admina POST dodaje nowy film
<strong>PUT manage/movies/{movie_id}</strong> -dostępne dla pracownika/admina modyfikuje dane filmu 
<strong>DELETE manage/movies/{movie_id}</strong> -dostępne dla pracownika/admina usuwa film


<strong>GET cart</strong>  - zwraca koszyk aktualnie zalogowanego użytkownika
<strong>POST cart</strong>  - dokonuje zakupu całej zawartości koszyka użytkownika
<strong>POST cart/{movie_id}</strong> - dodaje nowy produkt do koszyka, lub zwiększa liczbę jego sztuk w koszyku


<strong>GET history</strong> - zwraca całą historię zakupów zalogowanego użytkownika


<strong>GET news</strong> - zwraca listę wiadomości o filmach


<strong>GET categories</strong> - zwraca listę wszystkich dostępnych kategorii filmów
<strong>POST manage/categories</strong> - dodaje nową kategorię
<strong>DELETE manage/categories?name={category_name}</strong> - usuwa kategorię


<strong>GET actors/{actor_id}</strong> - zwraca dane aktora
</pre>

## Dokumentacja
https://github.com/Fl0k3n/bazy2021/blob/master/dokumentacja.pdf
