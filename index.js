const puppeteer = require('puppeteer');

async function get(url){
    const browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage();
    for (let i = 0; i < url.length; i++) {
        await page.goto(url[i]);
        await page.waitForSelector('h2');
        await page.waitForSelector('header img');
        const profileImageURL = await page.$eval('header img', img => img.src);
        const username = await page.$eval('h2', el => el.innerText);
        let sexo;
        if(username == "Esta conta é privada") {
          sexo = await page.$eval('h1', el => el.innerText);
        } else {
          sexo = username
        }
        const json = {avatar: profileImageURL, username: sexo }

        console.log(json)
    }

    await browser.close();
}

const urls = ['https://www.instagram.com/virginia', 'https://www.instagram.com/blackpink/', 'https://www.instagram.com/twice/'];
get(urls);
