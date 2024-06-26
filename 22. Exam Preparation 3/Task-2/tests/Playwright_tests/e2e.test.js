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
            await page.locator("#repeat-pass").fill(user.confirmPass);
            let [response] = await Promise.all([
                page.waitForResponse(response => response.url().includes('/users/register') && response.status() === 200),
                page.click('[type="submit"]')
            ]);

            await expect(response.ok()).toBeTruthy();
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
    })

    describe("navbar", () => {
        test('logged user should see correct navigation', async () => {
            await page.goto(host);

            await page.click('text=Login');
            await page.waitForSelector('form');
            await page.locator("#email").fill(user.email);
            await page.locator("#password").fill(user.password);
            await page.click('[type="submit"]')

            await expect(page.locator('nav >> text=Dashboard')).toBeVisible();
            await expect(page.locator('nav >> text=My Books')).toBeVisible();
            await expect(page.locator('nav >> text=Add Book')).toBeVisible();
            await expect(page.locator('nav >> text=Logout')).toBeVisible();
            await expect(page.locator('nav >> text=Login')).toBeHidden();
            await expect(page.locator('nav >> text=Register')).toBeHidden();
        });

        test('guest user should see correct navigation', async () => {
            await page.goto(host);

            await expect(page.locator('nav >> text=My Books')).toBeHidden();
            await expect(page.locator('nav >> text=Add Book')).toBeHidden();
            await expect(page.locator('nav >> text=Logout')).toBeHidden();
            await expect(page.locator('nav >> text=Dashboard')).toBeVisible();
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
            await page.click('text=Add Book');
            await page.waitForSelector('form');

            await page.fill('[name="title"]', "Random title");
            await page.fill('[name="description"]', "Random description");
            await page.fill('[name="imageUrl"]', "/images/book3.jpg");
            await page.selectOption('#type', 'Fiction');

            let [response] = await Promise.all([
                page.waitForResponse(response => response.url().includes("/data/books") && response.status() === 200),
                page.click('[type="submit"]')
            ]);

            await expect(response.ok()).toBeTruthy();
            let Data = await response.json();
            
            expect(Data.title).toEqual('Random title');
            expect(Data.description).toEqual('Random description');
            expect(Data.imageUrl).toEqual('/images/book3.jpg');
            expect(Data.type).toEqual('Fiction');
        });

        test('edit makes correct API call', async () => {
            await page.click('text=My Books');

            await page.locator(`text=Details`).first().click();
            await page.click('text=Edit');

            await page.waitForSelector('form');

            await page.locator('[name="title"]').fill( 'Random title_edit');

            let [response] = await Promise.all([
                page.waitForResponse(response => response.url().includes("/data/books") && response.status() === 200),
                page.click('[type="submit"]')
            ]);

            expect(response.ok).toBeTruthy();
            let Data = await response.json()
            
            expect(Data.title).toEqual('Random title_edit');
            expect(Data.description).toEqual('Random description');
            expect(Data.imageUrl).toEqual('/images/book3.jpg');
            expect(Data.type).toEqual('Fiction');
        });

        test('delete makes correct API call for owner', async () => {
            await page.click('nav >> text=My Books');

            await page.locator(`text=Details`).first().click();

            let [response] = await Promise.all([
                page.waitForResponse(response => response.url().includes("/data/books") && response.status() == 200),
                page.on('dialog', dialog => dialog.accept()),
                page.click('text=delete')
            ]);

            expect(response.ok()).toBeTruthy();
        });
    })
})