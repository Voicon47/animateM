#!/bin/bash
cd /home/ubuntu/animateM
git pull origin main
npm install --force
npm run build
pm2 restart animateM