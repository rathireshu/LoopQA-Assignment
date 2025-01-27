const { test, expect } = require('@playwright/test');
const LoginPage = require('../pages/loginPage');  
const HomePage = require('../pages/homePage');
const jsonTestData = require('../testdata.json');

test.describe.only('verify home page', () => {
       let homePage;
       let loginPage;
      
        test.beforeEach(async ({ page }) => { 
           loginPage = new LoginPage(page);
           homePage = new HomePage(page);
           await loginPage.loginDemoApp();
           await expect(page).toHaveTitle(/React/);   
        });

        const jsonTestCases = jsonTestData.homeTestCases;    
        for (const testCase of jsonTestCases) 
          {
          test(`Test Case ${testCase.testCase}: Verify ${testCase.taskName} in ${testCase.columnName} column`, async ({ page }) => {
          
            // Navigate to the app menu
            await homePage.navigateToAppMenu(testCase.appMenu);
      
            // Verify task present in column
            const isTaskPresent = await homePage.isTaskInColumn(testCase.columnName, testCase.taskName);
            expect(isTaskPresent).toBe(true);
      
            // Verify tags present for task
            const areTagsPresent = await homePage.verifyTags(testCase.columnName, testCase.taskName, testCase.tagNames);
            expect(areTagsPresent).toBe(true);
          });
        }

        test.afterEach(async ({ page }) => {
          await page.close();
        });
        
      });
      