#!/bin/sh

if ! node -v > /dev/null; then
    info 'Installing Node...';
    sudo apt-get install nodejs -y;
fi

info 'Installing the CLI...';
sudo npm install -g dropper@1.1.x
