const { test, expect } = require('@playwright/test');
const jsonTestData = require('../testdata.json'); 

class LoginPage
{
     constructor (page){
        this.page=page
        this.username="#username";       
        this.password="//input[@type='password']";
        this.signInBtn="//button[text()='Sign in']"

 }

     async loginDemoApp(){
       const loginTestData = jsonTestData.loginTestData[0];  
       await this.page.goto(loginTestData.AppURL);
       await this.page.fill(this.username,loginTestData.Email)
       await this.page.fill(this.password,loginTestData.Password)
       await this.page.click(this.signInBtn); 

     }
}

module.exports = LoginPage;