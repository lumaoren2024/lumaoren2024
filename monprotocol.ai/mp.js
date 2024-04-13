const puppeteer = require('puppeteer');

// npm install puppeteer

(async () => {
    // 启动 Puppeteer 并设置窗口大小
    const browser = await puppeteer.launch({
        headless: false, // headless: false 以便你可以看到浏览器做了什么
        defaultViewport: {
            width: 1024, // 宽度设置为 1024 像素
            height: 768 // 高度可以根据需要设置
        },
        args: [`--window-size=${1024},${768}`] // 启动时最大化窗口
    });

    const page = await browser.newPage();

    // 设置 Cookie
    const cookie = {
        'name': '__Secure-next-auth.session-token',
        'value': '你的cookie',
        'domain': 'app.monprotocol.ai',
        'url': 'https://app.monprotocol.ai/', // 设置 Cookie 的网址
        // 如果 Cookie 需要，还可以设置 'expires', 'httpOnly', 'secure' 等属性
    };

    await page.setCookie(cookie);

    // 导航到目标网页
    await page.goto('https://app.monprotocol.ai/', { waitUntil: 'networkidle0' }); // 等待网络空闲表示页面加载完成

    // 确定 'spin' 按钮的选择器，这里假设它是 '.spin-button'
    const spinButtonSelector = '.pointy-button'; // 你需要替换为实际的选择器
    // 等待按钮出现在页面上
    await page.waitForSelector(spinButtonSelector);
    // 点击 'spin' 按钮
    await page.click(spinButtonSelector);


    await new Promise(function (resolve) {
        setTimeout(resolve, 3000);
    });
    const spinButton= 'div.flex.flex-col.items-center.gap-y-5 > div.flex > button';
    await page.waitForSelector(spinButton);
    await page.click(spinButton)
    // await page.waitForSelector('button'); // 确保按钮已加载
    // // 找到包含特定文本的按钮
    // await page.click('button')

    // 在这里执行你需要的操作，例如检查是否登录成功

    // 当你完成操作后，关闭浏览器
    // await browser.close();
})();
