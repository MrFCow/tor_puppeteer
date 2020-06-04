require("dotenv").config();
const puppeteer = require('puppeteer');
const useProxy = require('puppeteer-page-proxy');

let browser;
let page;

async function setup(){
	//const args = ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu' ];
	const args = []
	const proxy = 'socks5://localhost:9050';

	browser = await puppeteer.launch({
		args, 
		//headless:false,
		ignoreHTTPSErrors:true,
		//executablePath : '/usr/bin/chromium-browser', // WSL only
	});
	// browser = await puppeteer.launch();
	console.log("browser object ready");
	
	page = await browser.newPage();
	await useProxy(page, proxy);
	//page.on('error', (error) => console.error(error));
	console.log("page object ready");

	console.log("setup completed");
}

async function checkUsingTor(){
	// await page.goto('http://google.com');
	// console.log('google HTTP')
	//await page.goto('https://google.com');console.log('google HTTPS')
	await page.goto('https://check.torproject.org/');
	console.log("check Tor page accessed");
	const isUsingTor = await page.$eval('body', el =>
		el.innerHTML.includes('Congratulations. This browser is configured to use Tor')
	);
	if (!isUsingTor) {
		console.log('Not using Tor. Closing...');
		await browser.close();
		return false;
	}
	console.log('Congratulations. This browser is configured to use Tor');
	return true;
}

async function accessPage(url){
	const isUsingTor = await checkUsingTor();
	if (!isUsingTor){
		return;
	}

	await page.goto(url);
	await page.screenshot({path: `${url}.png`})

	await browser.close();
}

(async () => {
	await setup();
	await accessPage('https://www.google.com');
})();
