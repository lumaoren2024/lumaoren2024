# 如何在mac下安装xen for solana挖矿
## 1、安装rust
在curl下安装
```bash
curl https://sh.rustup.rs -sSf | sh
```
## 2、在brew下安装
```bash
brew install rust
```
## 3、查看版本
```bash
rustc --version
```
## 4、安装solana
```bash
sh -c "$(curl -sSfL https://release.solana.com/stable/install)"

export PATH="/root/.local/share/solana/install/active_release/bin:$PATH"
```
### 4.1 查看solana版本
```bash
solana --version
```
### 4.2 创建solana钱包
```bash
solana-keygen new
```
### 4.3 领水
```bash
solana config set --url https://api.testnet.solana.com
solana airdrop 1
```
### 4.4 建立多个钱包
```bash
cp /Users/sandy/.config/solana/id.json /Users/sandy/.config/solana/id1.json
```
### 4.5 重复4.3动作，再次领水！

### 4.6 查看钱包地址和组词私钥命令
```bash
#查看钱包地址
solana-keygen pubkey /Users/sandy/.config/solana/id.json
solana-keygen pubkey /Users/sandy/.config/solana/id1.json
```
## 5、创建cargo项目
### 5.1
```bash
cargo new my_project
```
### 5.2、进入项目目录
```bash
cd my_project
```
### 5.3 编辑`Cargo.toml`文件
```bash
vim Cargo.toml
#在`[dependencies]`下加入
solana-client = "1.10"
solana-sdk = "1.10"
```
### 5.4 编辑`src/main.rs`文件
```bash
rm src/main.rs
vim src/main.rs
#拷贝https://gist.github.com/jacklevin74/b3b3709aa3e66eab8f762c0fb4de53ff里面的内容
#记得要修改文件里面的钱包路径，大概在21行。超过2个钱包，请按照配置增加
```
### 5.5 编译项目
```bash
cargo build
```
## 6、运行cargo项目
```bash
cargo run
```
## 7、创建自动脚本
创建一个循环挖矿的脚本，让他每隔10分钟找一次
```bash
vim xen.sh
#拷贝下面的内容，更换自己的路径

#!/bin/bash

xen=0
while [ "$xen" -lt 100000000 ];do
cd /Users/sandy/my_project/
cargo run
echo '等待10分钟，再次循环挖xen'
sleep 600
done

#必须包含#!/bin/bash
```
怎么看自己挖到了xen呢？
打开https://explorer.solana.com/address/7R2KMCUW1GimTEiS8tp8jJrde2N66yQiJ1MEUTbaPgfq?cluster=testnet
`7R2KMCUW1GimTEiS8tp8jJrde2N66yQiJ1MEUTbaPgfq`改成你自己的sol钱包地址
```text
> Program logged: "Initiating solXEN Miner."
> Program logged: "Current slot: 267331348"
> Program logged: "Found '420' in hash at iteration 30 hex 6842043f1cdf19be8812f7f06a48179ab8c8b228898aa69bc8997bbee681cc0c"
> Program logged: "Searching '420' in hash at iteration 71 hex 06f4964bae7853c2b2cb0e840b30a77328c6aa0151fb4592f9418b8dd4609c1f"
```
上面的代码出现`Found '420' in hash at iteration` 代表成功找到了！然后看你的sol费用也扣了gas费了！

## 8、由于一直循环，记得没有水的时候，要去领水！
