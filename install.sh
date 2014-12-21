#!/bin/sh

info 'Installing Node...';
sudo apt-get update -y;
sudo apt-get install nodejs -y;

info 'Installing the CLI...';
sudo npm install -g dropper@1.0.x
