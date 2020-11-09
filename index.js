const puppeteer = require('puppeteer');
const open = require('open');
const notifier = require('node-notifier');

const productPage = 'https://www.coolblue.be/nl/product/867421/xbox-series-x.html';
let canOrder = false;

(async () => {
    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(productPage);
        console.log('Product Page Loaded...')
        await page.click('button[name=accept_cookie]');
        console.log('Cookies Accepted...');
        await page.screenshot({path: 'screenshots/cookies-accepted.png'});
        while(!canOrder) {
            await sleep(3000);
            let addToCartButton = await page.$('.js-add-to-cart-button');
            if(addToCartButton){
                notifier.notify('test');
                console.log('[' + new Date().toUTCString() + '] ' + 'Order B*tch!');
                canOrder = true;
                await page.screenshot({path: 'screenshots/product-available.png'});
                open(productPage);
            } else {
                console.log('[' + new Date().toUTCString() + '] ' + 'No Luck Yet');
            }
        }
        await browser.close();
    } catch (error) {
        console.log(error);
    }
})();

function sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }  