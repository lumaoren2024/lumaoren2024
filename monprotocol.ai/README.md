## 1、利用chrome f12大法，找到你的cookie然后把mk.js里面的替换成你自己的
```javascript
'value': '',
```

## 2、需要无窗口运行修改下面参数
```javascript
headless: false, //false修改true
```

## 3、安装`puppeteer`组建
```bash
npm install puppeteer
```

## 4、运行程序
```bash
node mk.js
```
