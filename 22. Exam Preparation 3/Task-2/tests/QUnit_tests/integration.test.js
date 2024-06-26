const Url = 'http://localhost:3030/';

let user = {
    email: '',
    password: '123456'
};

let book = {
    title: "",
    description: "",
    imageUrl: "/images/book3.png",
    type: "Other"
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


QUnit.module("book functionality", () =>{
    QUnit.test("get all books ", async (assert) => {
        let path = 'data/books';
        let queryParam = '?sortBy=_createdOn%20desc'; 
        
        let response = await fetch(Url + path + queryParam);

        assert.ok(response.ok, "successful response");

        let json = await response.json();
        console.log(json);
        
        assert.ok(Array.isArray(json), "response is array");

        json.forEach(jsonData => {

            assert.ok(jsonData.hasOwnProperty('description'), 'Property "description" exists');
            assert.strictEqual(typeof jsonData.description, 'string', 'Property "description" is a string');

            assert.ok(jsonData.hasOwnProperty('imageUrl'), 'Property "imageUrl" exists');
            assert.strictEqual(typeof jsonData.imageUrl, 'string', 'Property "imageUrl" is a string');

            assert.ok(jsonData.hasOwnProperty('title'), 'Property "title" exists');
            assert.strictEqual(typeof jsonData.title, 'string', 'Property "title" is a string');

            assert.ok(jsonData.hasOwnProperty('type'), 'Property "type" exists');
            assert.strictEqual(typeof jsonData.type, 'string', 'Property "type" is a string');

            assert.ok(jsonData.hasOwnProperty('_createdOn'), 'Property "_createdOn" exists');
            assert.strictEqual(typeof jsonData._createdOn, 'number', 'Property "_createdOn" is a number');

            assert.ok(jsonData.hasOwnProperty('_id'), 'Property "_id" exists');
            assert.strictEqual(typeof jsonData._id, 'string', 'Property "_id" is a string');

            assert.ok(jsonData.hasOwnProperty('_ownerId'), 'Property "_ownerId" exists');
            assert.strictEqual(typeof jsonData._ownerId, 'string', 'Property "_ownerId" is a string');
        });
    });

    QUnit.test("create book ", async (assert) => {
        let path = 'data/books';

        let random = Math.floor(Math.random() * 100000);

        book.title = `Random book title_${random}`;
        book.description = `Description ${random}`;

        let response = await fetch(Url + path, {
            method : 'POST',
            headers : {
                'content-type' : 'application/json',
                'X-Authorization' : token
            },
            body : JSON.stringify(book)
        });

        assert.ok(response.ok, "successful response");

        let json = await response.json();
        console.log(json);
        
        assert.ok(json.hasOwnProperty('description'), 'Property "description" exists');
        assert.strictEqual(typeof json.description, 'string', 'Property "description" is a string');
        assert.strictEqual(json.description, book.description, 'Property "description" has the correct value');

        assert.ok(json.hasOwnProperty('imageUrl'), 'Property "imageUrl" exists');
        assert.strictEqual(typeof json.imageUrl, 'string', 'Property "imageUrl" is a string');
        assert.strictEqual(json.imageUrl, book.imageUrl, 'Property "imageUrl" has the correct value');

        assert.ok(json.hasOwnProperty('title'), 'Property "title" exists');
        assert.strictEqual(typeof json.title, 'string', 'Property "title" is a string');
        assert.strictEqual(json.title, book.title, 'Property "title" has the correct value');

        assert.ok(json.hasOwnProperty('type'), 'Property "type" exists');
        assert.strictEqual(typeof json.type, 'string', 'Property "type" is a string');
        assert.strictEqual(json.type, book.type, 'Property "type" has the correct value');

        assert.ok(json.hasOwnProperty('_createdOn'), 'Property "_createdOn" exists');
        assert.strictEqual(typeof json._createdOn, 'number', 'Property "_createdOn" is a number');

        assert.ok(json.hasOwnProperty('_id'), 'Property "_id" exists');
        assert.strictEqual(typeof json._id, 'string', 'Property "_id" is a string');

        lastCreatedBook = json._id;

        assert.ok(json.hasOwnProperty('_ownerId'), 'Property "_ownerId" exists');
        assert.strictEqual(typeof json._ownerId, 'string', 'Property "_ownerId" is a string');
        assert.strictEqual(json._ownerId, userId, 'Property "_ownerId" has the correct value');
    });

    QUnit.test("edit book ", async (assert) => {
        let path = 'data/books';

        let random = Math.floor(Math.random() * 100000);

        book.title = `Edited book title_${random}`;

        let response = await fetch(Url + path + `/${lastCreatedBook}`, {
            method : 'PUT',
            headers : {
                'content-type' : 'application/json',
                'X-Authorization' : token
            },
            body : JSON.stringify(book)
        });

        assert.ok(response.ok, "successful response");

        let json = await response.json();
        console.log(json);
        
        assert.ok(json.hasOwnProperty('description'), 'Property "description" exists');
        assert.strictEqual(typeof json.description, 'string', 'Property "description" is a string');
        assert.strictEqual(json.description, book.description, 'Property "description" has the correct value');

        assert.ok(json.hasOwnProperty('imageUrl'), 'Property "imageUrl" exists');
        assert.strictEqual(typeof json.imageUrl, 'string', 'Property "imageUrl" is a string');
        assert.strictEqual(json.imageUrl, book.imageUrl, 'Property "imageUrl" has the correct value');

        assert.ok(json.hasOwnProperty('title'), 'Property "title" exists');
        assert.strictEqual(typeof json.title, 'string', 'Property "title" is a string');
        assert.strictEqual(json.title, book.title, 'Property "title" has the correct value');
        
        assert.ok(json.hasOwnProperty('type'), 'Property "type" exists');
        assert.strictEqual(typeof json.type, 'string', 'Property "type" is a string');
        assert.strictEqual(json.type, book.type, 'Property "type" has the correct value');

        assert.ok(json.hasOwnProperty('_createdOn'), 'Property "_createdOn" exists');
        assert.strictEqual(typeof json._createdOn, 'number', 'Property "_createdOn" is a number');

        assert.ok(json.hasOwnProperty('_id'), 'Property "_id" exists');
        assert.strictEqual(typeof json._id, 'string', 'Property "_id" is a string');

        assert.ok(json.hasOwnProperty('_ownerId'), 'Property "_ownerId" exists');
        assert.strictEqual(typeof json._ownerId, 'string', 'Property "_ownerId" is a string');
        assert.strictEqual(json._ownerId, userId, 'Property "_ownerId" has the correct value');
    });

    QUnit.test("delete book ", async (assert) => {
        let path = 'data/books';


        let response = await fetch(Url + path + `/${lastCreatedBook}`, {
            method : 'DELETE',
            headers : { 'X-Authorization' : token }
        });

        assert.ok(response.ok, "successful response");
    });
});
