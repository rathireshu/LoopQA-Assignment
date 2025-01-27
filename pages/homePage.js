class HomePage{

constructor(page){
    this.page=page;     
    // Generic column locator by heading 
    this.columnLocator = (columnName) => 
    this.page.locator(`xpath=//h2[text()='${columnName}']`);
    // Generic tag locator 
    this.tagLocator = (tagName) => this.page.getByText(`${tagName}`); 
}

async navigateToAppMenu(menu) {
  await this.page.click(`text=${menu}`);
}

async isTaskInColumn(columnName, taskName) {    
    const column = this.page.locator(`xpath=//h2[text()='${columnName}']`);
    const task = column.locator(`xpath=.//following-sibling::div//h3[text()='${taskName}']`);    
    return task.isVisible();
  }

async verifyTags(columnName,taskName,tagNames){    
    const column = this.columnLocator(columnName);
    const task = column.locator(`xpath=.//following-sibling::div//h3[text()='${taskName}']`);
    const tagsArray = Array.isArray(tagNames) ? tagNames : [tagNames];
    for(const tagName of tagsArray){
        const tag = task.locator(`xpath=..//span[text()='${tagName}']`);
        console.log(`Tag name '${tagName}' is present `);
        const isTagVisible = await tag.isVisible();
        if (!isTagVisible) {
            console.log(`Tag '${tagName}' is not visible.`);
            return false; 
        }
    }
    return true;
  }
}
module.exports = HomePage;