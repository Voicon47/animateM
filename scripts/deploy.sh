#!/bin/bash
. /home/ubuntu/.nvm/nvm.sh
cd /home/ubuntu/animateM
git pull origin main
npm install --legacy-peer-deps
npm run build
pm2 restart animateM