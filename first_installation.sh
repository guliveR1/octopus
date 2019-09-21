#!/bin/bash

echo ""
echo ""
echo "Installing Salt Master:"
echo "-----------------------------------"
echo ""
echo ""
wget -O - https://repo.saltstack.com/apt/ubuntu/18.04/amd64/latest/SALTSTACK-GPG-KEY.pub | sudo apt-key add -
echo "deb http://repo.saltstack.com/apt/ubuntu/18.04/amd64/latest bionic main" | sudo tee /etc/apt/sources.list.d/saltstack.list
sudo apt -y install salt-api salt-cloud salt-master salt-minion salt-ssh salt-syndic
