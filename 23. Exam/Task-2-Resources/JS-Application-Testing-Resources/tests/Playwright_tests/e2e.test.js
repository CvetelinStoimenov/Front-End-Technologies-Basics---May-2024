const { test, describe, beforeEach, afterEach, beforeAll, afterAll, expect } = require('@playwright/test');
const { chromium } = require('playwright');

const host = 'http://localhost:3000'; // Application host (NOT service host - that can be anything)

let browser;
let context;
let page;

let user = {
    email : "",
    password : "123456",
    confirmPass : "123456",
};

let albumName = "";

describe("e2e tests", () => {
    beforeAll(async () => {
        browser = await chromium.launch();
    });

    afterAll(async () => {
        await browser.close();
    });

    beforeEach(async () => {
        context = await browser.newContext();
        page = await context.newPage();
    });

    afterEach(async () => {
        await page.close();
        await context.close();
    });

    
    describe("authentication", () => {
        test("register makes correct API call", async () => {
            await page.goto(host);
            await page.click('text=Register');

            await page.waitForSelector('form');

            let random = Math.floor(Math.random() * 1000);

            user.email = `abv_${random}@abv.bg`;

            await page.locator("#email").fill(user.email);
            await page.locator("#password").fill(user.password);
            await page.locator("#conf-pass").fill(user.confirmPass);
            let [response] = await Promise.all([
                page.waitForResponse(response => response.url().includes('/users/register') && response.status() === 200),
                page.click('[type="submit"]')
            ]);

            expect(response.ok()).toBeTruthy();
            let userData = await response.json();

            expect(userData.email).toBe(user.email);
            expect(userData.password).toEqual(user.password);
        });

        test("login makes correct API call", async () => {
            await page.goto(host);
            await page.click('text=Login');

            await page.waitForSelector('form');
            
            
            await page.locator("#email").fill(user.email);
            await page.locator("#password").fill(user.password);
            let [response] = await Promise.all([
                page.waitForResponse(response => response.url().includes("/users/login") && response.status() === 200),
                page.click('[type="submit"]')
            ]);
            
            expect(response.ok()).toBeTruthy();
            let userData = await response.json();
            //console.log(userData);
            expect(userData.email).toBe(user.email);
            expect(userData.password).toEqual(user.password);
        });

        test('logout makes correct API call', async () => {
            await page.goto(host);
            await page.click('text=Login');

            await page.waitForSelector('form');
            
            await page.locator("#email").fill(user.email);
            await page.locator("#password").fill(user.password);
            await page.click('[type="submit"]');

            let [response] = await Promise.all([
                page.waitForResponse(response => response.url().includes("/users/logout") && response.status() === 204),
                page.locator('nav >> text=Logout').click()
            ]);

            expect(response.ok).toBeTruthy();
            await page.waitForSelector('nav >> text=Login');

            expect(page.url()).toBe(host + "/");
        });
    });

    describe("navbar", () => {
        test('logged user should see correct navigation', async () => {
            await page.goto(host);

            await page.click('text=Login');
            await page.waitForSelector('form');
            await page.locator("#email").fill(user.email);
            await page.locator("#password").fill(user.password);
            await page.click('[type="submit"]')

            await expect(page.locator('nav >> text=Home')).toBeVisible();
            await expect(page.locator('nav >> text=Catalog')).toBeVisible();
            await expect(page.locator('nav >> text=Search')).toBeVisible();
            await expect(page.locator('nav >> text=Create Album')).toBeVisible();
            await expect(page.locator('nav >> text=Logout')).toBeVisible();
            await expect(page.locator('nav >> text=Login')).toBeHidden();
            await expect(page.locator('nav >> text=Register')).toBeHidden();
        });

        test('guest user should see correct navigation', async () => {
            await page.goto(host);

            await expect(page.locator('nav >> text=Home')).toBeVisible();
            await expect(page.locator('nav >> text=Catalog')).toBeVisible();
            await expect(page.locator('nav >> text=Search')).toBeVisible();
            await expect(page.locator('nav >> text=Create Album')).toBeHidden();
            await expect(page.locator('nav >> text=Logout')).toBeHidden();
            await expect(page.locator('nav >> text=Login')).toBeVisible();
            await expect(page.locator('nav >> text=Register')).toBeVisible();
        });
    });

    describe("CRUD", () => {
        beforeEach(async () => {
            await page.goto(host);

            await page.click('text=Login');
            await page.waitForSelector('form');
            await page.locator("#email").fill(user.email);
            await page.locator("#password").fill(user.password);
            await page.click('[type="submit"]')
        });

        test('create makes correct API call for logged in user', async () => {
            await page.click('text=Create Album');
            await page.waitForSelector('form');

            await page.fill('[name="name"]', "Random album name");
            await page.fill('[name="imgUrl"]', "/images/BrandiCarlile.jpg");
            await page.fill('[name="price"]', "22.50");
            await page.fill('[name="releaseDate"]', "29.06.2024");
            await page.fill('[name="artist"]', "2 Pac");
            await page.fill('[name="genre"]', "Rap");
            await page.fill('[name="description"]', "Random description");

            let [response] = await Promise.all([
                page.waitForResponse(response => response.url().includes("/data/albums") && response.status() === 200),
                page.click('[type="submit"]')
            ]);

            expect(response.ok()).toBeTruthy();
            let Data = await response.json();
            
            expect(Data.name).toEqual('Random album name');
            expect(Data.imgUrl).toEqual('/images/BrandiCarlile.jpg');
            expect(Data.price).toEqual('22.50');
            expect(Data.releaseDate).toEqual('29.06.2024');
            expect(Data.artist).toEqual('2 Pac');
            expect(Data.genre).toEqual('Rap');
            expect(Data.description).toEqual('Random description');
        });

        test('edit by Catalog button makes correct API call', async () => {
            await page.click('text=Catalog');

            await page.locator(`text=details`).first().click();
            await page.click('text=edit');

            await page.waitForSelector('form');

            await page.locator('[name="name"]').fill( 'Random name_edit');

            let [response] = await Promise.all([
                page.waitForResponse(response => response.url().includes("/data/albums") && response.status() === 200),
                page.click('[type="submit"]')
            ]);

            expect(response.ok).toBeTruthy();
            let Data = await response.json()
            
            expect(Data.name).toEqual('Random name_edit');
            expect(Data.imgUrl).toEqual('/images/BrandiCarlile.jpg');
            expect(Data.price).toEqual('22.50');
            expect(Data.releaseDate).toEqual('29.06.2024');
            expect(Data.artist).toEqual('2 Pac');
            expect(Data.genre).toEqual('Rap');
            expect(Data.description).toEqual('Random description');
        });

        // test('edit by search button makes correct API call', async () => {
        //     await page.click('text=Catalog');

        //     await page.click('text=Search');
        //     await page.fill('input[name="search"]', 'Random name_edit');
        //     await page.click('.button-list');
        //     await page.click('text=Details >> nth=0');
        //     await page.click('text=edit');
        //     await page.waitForSelector('form#edit-album');

        //     await page.locator('[name="name"]').fill( 'Random name_edit by search');

        //     let [response] = await Promise.all([
        //         page.waitForResponse(response => response.url().includes("/data/albums") && response.status() === 200),
        //         page.click('[type="submit"]')
        //     ]);

        //     expect(response.ok).toBeTruthy();
        //     let Data = await response.json()
            
        //     expect(Data.name).toEqual('Random name_edit');
        //     expect(Data.imgUrl).toEqual('/images/BrandiCarlile.jpg');
        //     expect(Data.price).toEqual('22.50');
        //     expect(Data.releaseDate).toEqual('29.06.2024');
        //     expect(Data.artist).toEqual('2 Pac');
        //     expect(Data.genre).toEqual('Rap');
        //     expect(Data.description).toEqual('Random description');
        // });


        test('delete by Catalog button makes correct API call for owner', async () => {
            await page.click('nav >> text=Catalog');

            await page.locator(`text=details`).first().click();

            let [response] = await Promise.all([
                page.waitForResponse(response => response.url().includes("/data/albums") && response.status() == 200),
                page.on('dialog', dialog => dialog.accept()),
                page.click('text=delete')
            ]);

            expect(response.ok()).toBeTruthy();
        });
    });
});