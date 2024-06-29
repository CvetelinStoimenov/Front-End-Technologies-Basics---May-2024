const Url = 'http://localhost:3030/';

let user = {
    email: '',
    password: '123456'
};

let album = {
    name: "",
    artist: "Unknown",
    description: "",
    genre: "Random genre",
    imgUrl: "/images/pinkFloyd.jpg",
    price: "15.25",
    releaseDate: "29 June 2024"
};

let token = "";
let userId = "";

QUnit.config.reorder = false;

QUnit.module("user functionality", () =>{
    QUnit.test("registration", async (assert) => {
        let path = 'users/register';

        let random = Math.floor(Math.random() * 10000);
        let email = `abv${random}@abv.bg`;
        user.email = email;

        let response = await fetch(Url + path, {
            method: 'POST',
            headers:{
                'content-type' : 'application/json'
            },  
            body: JSON.stringify(user)
        });

        assert.ok(response.ok, "successful response");

        let json = await response.json();
        console.log(json);

        assert.ok(json.hasOwnProperty('email'), "email exist");
        assert.equal(json['email'], user.email, "expected mail");
        assert.strictEqual(typeof json.email, 'string', 'Property "email" is a string');

        assert.ok(json.hasOwnProperty('password'), "password exist");
        assert.equal(json['password'], user.password, "expected password");
        assert.strictEqual(typeof json.password, 'string', 'Property "password" is a string');

        assert.ok(json.hasOwnProperty('accessToken'), "accessToken exist");
        assert.strictEqual(typeof json.accessToken, 'string', 'Property "accessToken" is a string');

        assert.ok(json.hasOwnProperty('_id'), "id exist");
        assert.strictEqual(typeof json._id, 'string', 'Property "_id" is a string');

        assert.ok(json.hasOwnProperty('_createdOn'), "_createdOn exist");
        assert.strictEqual(typeof json._createdOn, 'number', 'Property "_createdOn" is a number');

        token = json['accessToken'];
        userId = json['_id'];
        sessionStorage.setItem('event-user', JSON.stringify(user));
    });

    QUnit.test("login", async (assert) => {
        let path = 'users/login';

        let response = await fetch(Url + path, {
            method: 'POST',
            headers: {
                'content-type' : 'application/json'
            },
            body: JSON.stringify(user)
        });

        assert.ok(response.ok, 'successful response');

        let json = await response.json();
        console.log(json);

        assert.ok(json.hasOwnProperty('email'), "email exist");
        assert.equal(json['email'], user.email, "expected mail");
        assert.strictEqual(typeof json.email, 'string', 'Property "email" is a string');

        assert.ok(json.hasOwnProperty('password'), "password exist");
        assert.equal(json['password'], user.password, "expected password");
        assert.strictEqual(typeof json.password, 'string', 'Property "password" is a string');

        assert.ok(json.hasOwnProperty('accessToken'), "accessToken exist");
        assert.strictEqual(typeof json.accessToken, 'string', 'Property "accessToken" is a string');

        assert.ok(json.hasOwnProperty('_id'), "id exist");
        assert.strictEqual(typeof json._id, 'string', 'Property "_id" is a string');

        assert.ok(json.hasOwnProperty('_createdOn'), "_createdOn exist");
        assert.strictEqual(typeof json._createdOn, 'number', 'Property "_createdOn" is a number');

        token = json['accessToken'];
        userId = json['_id'];
        sessionStorage.setItem('event-user', JSON.stringify(user));
    });
});


QUnit.module("album functionality", () =>{
    QUnit.test("get all albums ", async (assert) => {
        let path = 'data/albums';
        let queryParam = '?sortBy=_createdOn%20desc&distinct=name'; 
        
        let response = await fetch(Url + path + queryParam);

        assert.ok(response.ok, "successful response");

        let json = await response.json();
        console.log(json);
        
        assert.ok(Array.isArray(json), "response is array");

        json.forEach(jsonData => {
            
            assert.ok(jsonData.hasOwnProperty('artist'), 'Property "artist" exists');
            assert.strictEqual(typeof jsonData.artist, 'string', 'Property "artist" is a string');

            assert.ok(jsonData.hasOwnProperty('description'), 'Property "description" exists');
            assert.strictEqual(typeof jsonData.description, 'string', 'Property "description" is a string');

            assert.ok(jsonData.hasOwnProperty('genre'), 'Property "genre" exists');
            assert.strictEqual(typeof jsonData.genre, 'string', 'Property "genre" is a string');

            assert.ok(jsonData.hasOwnProperty('imgUrl'), 'Property "imgUrl" exists');
            assert.strictEqual(typeof jsonData.imgUrl, 'string', 'Property "imgUrl" is a string');

            assert.ok(jsonData.hasOwnProperty('name'), 'Property "name" exists');
            assert.strictEqual(typeof jsonData.name, 'string', 'Property "name" is a string');

            assert.ok(jsonData.hasOwnProperty('price'), 'Property "price" exists');
            assert.strictEqual(typeof jsonData.price, 'string', 'Property "price" is a string');

            assert.ok(jsonData.hasOwnProperty('releaseDate'), 'Property "releaseDate" exists');
            assert.strictEqual(typeof jsonData.releaseDate, 'string', 'Property "releaseDate" is a string');

            assert.ok(jsonData.hasOwnProperty('_createdOn'), 'Property "_createdOn" exists');
            assert.strictEqual(typeof jsonData._createdOn, 'number', 'Property "_createdOn" is a number');

            assert.ok(jsonData.hasOwnProperty('_id'), 'Property "_id" exists');
            assert.strictEqual(typeof jsonData._id, 'string', 'Property "_id" is a string');

            assert.ok(jsonData.hasOwnProperty('_ownerId'), 'Property "_ownerId" exists');
            assert.strictEqual(typeof jsonData._ownerId, 'string', 'Property "_ownerId" is a string');
        });
    });

    QUnit.test("create album ", async (assert) => {
        let path = 'data/albums';

        let random = Math.floor(Math.random() * 100000);

        album.name = `Random album name_${random}`;
        album.description = `Description ${random}`;

        let response = await fetch(Url + path, {
            method : 'POST',
            headers : {
                'content-type' : 'application/json',
                'X-Authorization' : token
            },
            body : JSON.stringify(album)
        });

        assert.ok(response.ok, "successful response");

        let json = await response.json();
        console.log(json);

        assert.ok(json.hasOwnProperty('artist'), 'Property "artist" exists');
        assert.strictEqual(typeof json.artist, 'string', 'Property "artist" is a string');
        assert.strictEqual(json.artist, album.artist, 'Property "artist" has the correct value');

        assert.ok(json.hasOwnProperty('description'), 'Property "description" exists');
        assert.strictEqual(typeof json.description, 'string', 'Property "description" is a string');
        assert.strictEqual(json.description, album.description, 'Property "description" has the correct value');
        
        assert.ok(json.hasOwnProperty('genre'), 'Property "genre" exists');
        assert.strictEqual(typeof json.genre, 'string', 'Property "genre" is a string');
        assert.strictEqual(json.genre, album.genre, 'Property "genre" has the correct value');

        assert.ok(json.hasOwnProperty('imgUrl'), 'Property "imgUrl" exists');
        assert.strictEqual(typeof json.imgUrl, 'string', 'Property "imgUrl" is a string');
        assert.strictEqual(json.imgUrl, album.imgUrl, 'Property "imgUrl" has the correct value');

        assert.ok(json.hasOwnProperty('name'), 'Property "name" exists');
        assert.strictEqual(typeof json.name, 'string', 'Property "name" is a string');
        assert.strictEqual(json.name, album.name, 'Property "name" has the correct value');

        assert.ok(json.hasOwnProperty('price'), 'Property "price" exists');
        assert.strictEqual(typeof json.price, 'string', 'Property "price" is a string');
        assert.strictEqual(json.price, album.price, 'Property "price" has the correct value');

        assert.ok(json.hasOwnProperty('releaseDate'), 'Property "releaseDate" exists');
        assert.strictEqual(typeof json.releaseDate, 'string', 'Property "releaseDate" is a string');
        assert.strictEqual(json.releaseDate, album.releaseDate, 'Property "releaseDate" has the correct value');

        assert.ok(json.hasOwnProperty('_createdOn'), 'Property "_createdOn" exists');
        assert.strictEqual(typeof json._createdOn, 'number', 'Property "_createdOn" is a number');

        assert.ok(json.hasOwnProperty('_id'), 'Property "_id" exists');
        assert.strictEqual(typeof json._id, 'string', 'Property "_id" is a string');

        lastCreatedAlbum = json._id;

        assert.ok(json.hasOwnProperty('_ownerId'), 'Property "_ownerId" exists');
        assert.strictEqual(typeof json._ownerId, 'string', 'Property "_ownerId" is a string');
        assert.strictEqual(json._ownerId, userId, 'Property "_ownerId" has the correct value');
    });

    QUnit.test("edit album ", async (assert) => {
        let path = 'data/albums';

        let random = Math.floor(Math.random() * 100000);

        album.name = `Edited album name_${random}`;

        let response = await fetch(Url + path + `/${lastCreatedAlbum}`, {
            method : 'PUT',
            headers : {
                'content-type' : 'application/json',
                'X-Authorization' : token
            },
            body : JSON.stringify(album)
        });

        assert.ok(response.ok, "successful response");

        let json = await response.json();
        console.log(json);
        
        assert.ok(json.hasOwnProperty('artist'), 'Property "artist" exists');
        assert.strictEqual(typeof json.artist, 'string', 'Property "artist" is a string');
        assert.strictEqual(json.artist, album.artist, 'Property "artist" has the correct value');

        assert.ok(json.hasOwnProperty('description'), 'Property "description" exists');
        assert.strictEqual(typeof json.description, 'string', 'Property "description" is a string');
        assert.strictEqual(json.description, album.description, 'Property "description" has the correct value');
        
        assert.ok(json.hasOwnProperty('genre'), 'Property "genre" exists');
        assert.strictEqual(typeof json.genre, 'string', 'Property "genre" is a string');
        assert.strictEqual(json.genre, album.genre, 'Property "genre" has the correct value');

        assert.ok(json.hasOwnProperty('imgUrl'), 'Property "imgUrl" exists');
        assert.strictEqual(typeof json.imgUrl, 'string', 'Property "imgUrl" is a string');
        assert.strictEqual(json.imgUrl, album.imgUrl, 'Property "imgUrl" has the correct value');

        assert.ok(json.hasOwnProperty('name'), 'Property "name" exists');
        assert.strictEqual(typeof json.name, 'string', 'Property "name" is a string');
        assert.strictEqual(json.name, album.name, 'Property "name" has the correct value');

        assert.ok(json.hasOwnProperty('price'), 'Property "price" exists');
        assert.strictEqual(typeof json.price, 'string', 'Property "price" is a string');
        assert.strictEqual(json.price, album.price, 'Property "price" has the correct value');

        assert.ok(json.hasOwnProperty('releaseDate'), 'Property "releaseDate" exists');
        assert.strictEqual(typeof json.releaseDate, 'string', 'Property "releaseDate" is a string');
        assert.strictEqual(json.releaseDate, album.releaseDate, 'Property "releaseDate" has the correct value');

        assert.ok(json.hasOwnProperty('_createdOn'), 'Property "_createdOn" exists');
        assert.strictEqual(typeof json._createdOn, 'number', 'Property "_createdOn" is a number');

        assert.ok(json.hasOwnProperty('_id'), 'Property "_id" exists');
        assert.strictEqual(typeof json._id, 'string', 'Property "_id" is a string');

        assert.ok(json.hasOwnProperty('_ownerId'), 'Property "_ownerId" exists');
        assert.strictEqual(typeof json._ownerId, 'string', 'Property "_ownerId" is a string');
        assert.strictEqual(json._ownerId, userId, 'Property "_ownerId" has the correct value');
    });

    QUnit.test("delete album ", async (assert) => {
        let path = 'data/albums';


        let response = await fetch(Url + path + `/${lastCreatedAlbum}`, {
            method : 'DELETE',
            headers : { 'X-Authorization' : token }
        });

        assert.ok(response.ok, "successful response");
    });
});
