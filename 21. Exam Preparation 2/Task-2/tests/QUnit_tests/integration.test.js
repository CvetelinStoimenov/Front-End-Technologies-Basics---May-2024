const Url = 'http://localhost:3030/';

let user = {
    email: '',
    password: '123456'
};

let theater = {
    author: "Me",
    date: "24.06.2024",
    title: "",
    description: "",
    imageUrl: "/images/2.png"
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

        token = json['accessToken']; //get token
        userId = json['_id']; //get id
        sessionStorage.setItem('event-user', JSON.stringify(user)); //set token to session store in browser
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

        token = json['accessToken']; //get token
        userId = json['_id']; //get id
        sessionStorage.setItem('event-user', JSON.stringify(user)); //set token to session store in browser
    });
});

QUnit.module("event functionality", () =>{
    QUnit.test("get all events ", async (assert) => {
        let path = 'data/theaters';
        let queryParam = '?sortBy=_createdOn%20desc&distinct=title'; //will sort all memes in descending order - help for memes order prediction
        
        let response = await fetch(Url + path + queryParam);

        assert.ok(response.ok, "successful response");

        let json = await response.json();
        console.log(json);
        
        assert.ok(Array.isArray(json), "response is array");

        json.forEach(jsonData => {
            assert.ok(jsonData.hasOwnProperty('author'), 'Property "author" exists');
            assert.strictEqual(typeof jsonData.author, 'string', 'Property "author" is a string');

            assert.ok(jsonData.hasOwnProperty('date'), 'Property "date" exists');
            assert.strictEqual(typeof jsonData.date, 'string', 'Property "date" is a string');

            assert.ok(jsonData.hasOwnProperty('description'), 'Property "description" exists');
            assert.strictEqual(typeof jsonData.description, 'string', 'Property "description" is a string');

            assert.ok(jsonData.hasOwnProperty('imageUrl'), 'Property "imageUrl" exists');
            assert.strictEqual(typeof jsonData.imageUrl, 'string', 'Property "imageUrl" is a string');

            assert.ok(jsonData.hasOwnProperty('title'), 'Property "title" exists');
            assert.strictEqual(typeof jsonData.title, 'string', 'Property "title" is a string');

            assert.ok(jsonData.hasOwnProperty('_createdOn'), 'Property "_createdOn" exists');
            assert.strictEqual(typeof jsonData._createdOn, 'number', 'Property "_createdOn" is a number');

            assert.ok(jsonData.hasOwnProperty('_id'), 'Property "_id" exists');
            assert.strictEqual(typeof jsonData._id, 'string', 'Property "_id" is a string');

            assert.ok(jsonData.hasOwnProperty('_ownerId'), 'Property "_ownerId" exists');
            assert.strictEqual(typeof jsonData._ownerId, 'string', 'Property "_ownerId" is a string');
        });
    });

    QUnit.test("create event ", async (assert) => {
        let path = 'data/theaters';

        let random = Math.floor(Math.random() * 100000);

        theater.title = `Random meme title_${random}`;
        theater.description = `Description ${random}`;

        let response = await fetch(Url + path, {
            method : 'POST',
            headers : {
                'content-type' : 'application/json',
                'X-Authorization' : token
            },
            body : JSON.stringify(theater)
        });

        assert.ok(response.ok, "successful response");

        let json = await response.json();
        console.log(json);

        assert.ok(json.hasOwnProperty('author'), 'Property "author" exists');
        assert.strictEqual(typeof json.author, 'string', 'Property "author" is a string');
        assert.strictEqual(json.author, theater.author, 'Property "author" has the correct value');

        assert.ok(json.hasOwnProperty('date'), 'Property "date" exists');
        assert.strictEqual(typeof json.date, 'string', 'Property "date" is a string');
        assert.strictEqual(json.date, theater.date, 'Property "date" has the correct value');
        
        assert.ok(json.hasOwnProperty('description'), 'Property "description" exists');
        assert.strictEqual(typeof json.description, 'string', 'Property "description" is a string');
        assert.strictEqual(json.description, theater.description, 'Property "description" has the correct value');

        assert.ok(json.hasOwnProperty('imageUrl'), 'Property "imageUrl" exists');
        assert.strictEqual(typeof json.imageUrl, 'string', 'Property "imageUrl" is a string');
        assert.strictEqual(json.imageUrl, theater.imageUrl, 'Property "imageUrl" has the correct value');

        assert.ok(json.hasOwnProperty('title'), 'Property "title" exists');
        assert.strictEqual(typeof json.title, 'string', 'Property "title" is a string');
        assert.strictEqual(json.title, theater.title, 'Property "title" has the correct value');

        assert.ok(json.hasOwnProperty('_createdOn'), 'Property "_createdOn" exists');
        assert.strictEqual(typeof json._createdOn, 'number', 'Property "_createdOn" is a number');

        assert.ok(json.hasOwnProperty('_id'), 'Property "_id" exists');
        assert.strictEqual(typeof json._id, 'string', 'Property "_id" is a string');

        lastCreatedTheater = json._id;

        assert.ok(json.hasOwnProperty('_ownerId'), 'Property "_ownerId" exists');
        assert.strictEqual(typeof json._ownerId, 'string', 'Property "_ownerId" is a string');
        assert.strictEqual(json._ownerId, userId, 'Property "_ownerId" has the correct value');
    });

    QUnit.test("edit event ", async (assert) => {
        let path = 'data/theaters';

        let random = Math.floor(Math.random() * 100000);

        theater.title = `Edited theater title_${random}`;

        let response = await fetch(Url + path + `/${lastCreatedTheater}`, {
            method : 'PUT',
            headers : {
                'content-type' : 'application/json',
                'X-Authorization' : token
            },
            body : JSON.stringify(theater)
        });

        assert.ok(response.ok, "successful response");

        let json = await response.json();
        console.log(json);

        assert.ok(json.hasOwnProperty('author'), 'Property "author" exists');
        assert.strictEqual(typeof json.author, 'string', 'Property "author" is a string');
        assert.strictEqual(json.author, theater.author, 'Property "author" has the correct value');

        assert.ok(json.hasOwnProperty('date'), 'Property "date" exists');
        assert.strictEqual(typeof json.date, 'string', 'Property "date" is a string');
        assert.strictEqual(json.date, theater.date, 'Property "date" has the correct value');
        
        assert.ok(json.hasOwnProperty('description'), 'Property "description" exists');
        assert.strictEqual(typeof json.description, 'string', 'Property "description" is a string');
        assert.strictEqual(json.description, theater.description, 'Property "description" has the correct value');

        assert.ok(json.hasOwnProperty('imageUrl'), 'Property "imageUrl" exists');
        assert.strictEqual(typeof json.imageUrl, 'string', 'Property "imageUrl" is a string');
        assert.strictEqual(json.imageUrl, theater.imageUrl, 'Property "imageUrl" has the correct value');

        assert.ok(json.hasOwnProperty('title'), 'Property "title" exists');
        assert.strictEqual(typeof json.title, 'string', 'Property "title" is a string');
        assert.strictEqual(json.title, theater.title, 'Property "title" has the correct value');

        assert.ok(json.hasOwnProperty('_createdOn'), 'Property "_createdOn" exists');
        assert.strictEqual(typeof json._createdOn, 'number', 'Property "_createdOn" is a number');

        assert.ok(json.hasOwnProperty('_id'), 'Property "_id" exists');
        assert.strictEqual(typeof json._id, 'string', 'Property "_id" is a string');

        assert.ok(json.hasOwnProperty('_ownerId'), 'Property "_ownerId" exists');
        assert.strictEqual(typeof json._ownerId, 'string', 'Property "_ownerId" is a string');
        assert.strictEqual(json._ownerId, userId, 'Property "_ownerId" has the correct value');
    });

    QUnit.test("delete event ", async (assert) => {
        let path = 'data/theaters';


        let response = await fetch(Url + path + `/${lastCreatedTheater}`, {
            method : 'DELETE',
            headers : { 'X-Authorization' : token }
        });

        assert.ok(response.ok, "successful response");
    });
});