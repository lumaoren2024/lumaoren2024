#!/bin/bash
clear

node mk.js
#m每个签到脚本运行完毕以后等待3秒再次开另外一个
sleep 3s
#新的脚本
node mk01.js
