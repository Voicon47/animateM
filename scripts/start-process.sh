#!/bin/bash
aws ecr get-login-password --region ap-southeast-1 | docker login --username AWS --password-stdin 324037310518.dkr.ecr.ap-southeast-1.amazonaws.com
docker pull 324037310518.dkr.ecr.ap-southeast-1.amazonaws.com/animatem:latest
docker stop animatem-container || true
docker rm animatem-container || true
docker run -d --name animatem-container -p 3000:3000 <account-id>.dkr.ecr.<region>.amazonaws.com/animatem:latest