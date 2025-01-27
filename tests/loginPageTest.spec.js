const { test, expect } = require('@playwright/test');
const LoginPage = require('../pages/loginPage');  
const HomePage = require('../pages/homePage');

test('Successfully login with valid credentials', async ({ page }) => {

    const loginPage = new LoginPage(page);
    await loginPage.loginDemoApp();
    await expect(page).toHaveTitle(/React/);    

});


