#!/bin/bash
cd /home/ubuntu/animateM
git pull origin main
npm install
npm run build
pm2 restart nextjs-app