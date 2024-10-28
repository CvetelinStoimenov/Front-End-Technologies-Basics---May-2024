
# Project: Playwright & QUnit Testing Suite

This repository contains two core projects for comprehensive software testing:
- **QUnit API Testing** - Validates backend API functionalities.
- **Playwright UI Testing** - Automates front-end interactions and verifies user workflows.

## Table of Contents
- [Project Overview](#project-overview)
- [Technologies Used](#technologies-used)
- [Testing Code](#testing-code)
- [Setup Instructions](#setup-instructions)

---

## Project Overview

This project focuses on testing essential API endpoints and automating front-end interactions, validating data integrity, and ensuring user functionalities using QUnit and Playwright.

---

## Technologies Used

- **Programming Language**: JavaScript
- **Testing Frameworks**: QUnit (API Testing), Playwright (UI Testing)
- **Tools**: Postman, Docker (for containerized environments)
- **Continuous Integration (CI)**: GitHub Actions

---

## Testing Code

### QUnit API Testing

QUnit tests focus on backend API functionality, covering operations like user registration, login, and CRUD actions on albums.

```javascript
const Url = 'http://localhost:3030/';
let user = { email: '', password: '123456' };
let token = "";
let userId = "";

// User Functionality Tests
QUnit.module("User Functionality", () => {
    QUnit.test("Registration", async (assert) => {
        let path = 'users/register';
        user.email = `user_${Math.floor(Math.random() * 10000)}@test.com`;
        
        let response = await fetch(Url + path, {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(user)
        });
        
        assert.ok(response.ok, "User registration successful");
        let json = await response.json();
        token = json['accessToken'];
        userId = json['_id'];
    });

    QUnit.test("Login", async (assert) => {
        let path = 'users/login';
        
        let response = await fetch(Url + path, {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(user)
        });
        
        assert.ok(response.ok, "User login successful");
        let json = await response.json();
        assert.equal(json['email'], user.email, "Email matches registered user");
    });
});

let album = {
    name: "New Album",
    artist: "Unknown Artist",
    genre: "Rock",
    imgUrl: "/images/sample.jpg",
    price: "9.99",
    releaseDate: "01 Jan 2024"
};

QUnit.module("Album Functionality", () => {
    QUnit.test("Create Album", async (assert) => {
        let response = await fetch(Url + 'data/albums', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'X-Authorization': token
            },
            body: JSON.stringify(album)
        });
        
        assert.ok(response.ok, "Album creation successful");
        let json = await response.json();
        assert.equal(json['name'], album.name, "Album name is correct");
    });
});
```

### Playwright UI Testing

Playwright is used for automating UI testing, focusing on navigating the UI, submitting forms, and validating DOM elements.


```javascript

const { test, expect } = require('@playwright/test');

test('Add New Album', async ({ page }) => {
    await page.goto('http://localhost:3000/');
    await page.click('#addAlbumButton');
    
    await page.fill('#name', 'New Album');
    await page.fill('#artist', 'Artist Name');
    await page.fill('#price', '9.99');
    await page.click('#submitButton');

    const albumName = await page.textContent('.album-name');
    expect(albumName).toBe('New Album');
});

test('User Login', async ({ page }) => {
    await page.goto('http://localhost:3000/login');
    
    await page.fill('#email', 'testuser@example.com');
    await page.fill('#password', '123456');
    await page.click('#loginButton');

    const loggedInUser = await page.textContent('#userEmail');
    expect(loggedInUser).toBe('testuser@example.com');
});
```
----------

## Setup Instructions

1.  **Clone the Repository**
    
    ```bash
    git clone https://github.com/username/repository.git
    ``` 
    
2.  **Install Dependencies**
    
    ```bash
    npm install
    ``` 
    
3.  **Run QUnit API Tests**
    
    -   Ensure your server is running:
    
```bash
  npm run test-api
```    
4.  **Run Playwright UI Tests**
    
    -   Install required browsers:
    
    bash
npx playwright install` 
    
    -   Execute tests:
    
   ```bash
npx playwright test
```
    

----------

This README provides comprehensive setup, testing instructions, and example test code for both **Playwright** and **QUnit** projects. Happy testing!
