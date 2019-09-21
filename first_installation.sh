#!/bin/bash

sudo su
sudo apt -y update
wget -O - https://repo.saltstack.com/apt/ubuntu/18.04/amd64/latest/SALTSTACK-GPG-KEY.pub | sudo apt-key add -
echo "deb http://repo.saltstack.com/apt/ubuntu/18.04/amd64/latest bionic main" | sudo tee /etc/apt/sources.list.d/saltstack.list
sudo apt -y install salt-api salt-cloud salt-master salt-minion salt-ssh salt-syndic
sudo apt -y install nodejs
sudo apt -y install npm
sudo npm i -g yarn
sudo mkdir octopus
sudo git clone git@github.com:guliveR1/octopus.git ./octopus
cd ./octopus/server && sudo npm install
cd ../client && sudo npm install && sudo npm run-script build
while getopts h:u:p: option
do
case "${option}"
in
h) MASTER_HOST=${OPTARG};;
u) MASTER_USERNAME=${OPTARG};;
p) MASTER_PASSWORD=${OPTARG};;
esac
done
currDir=$(pwd)
echo "[Unit]
Description=Octopus server

[Service]
ExecStart=/usr/bin/node $currDir/octopus/server/server.js --masterHost $MASTER_HOST --masterUsername $MASTER_USERNAME --masterPassword $MASTER_PASSWORD
Restart=always
RestartSec=10
StandardOutput=syslog
StandardError=syslog
SyslogIdentifier=octopus-server

[Install]
WantedBy=multi-user.target" > /etc/systemd/system/octopus-server.service


