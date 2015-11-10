#!/bin/bash
export DEBIAN_FRONTEND=noninteractive
rm -rf /vagrant
mkdir -p /srv/shared/.tmp

echo "+ configure profile"
echo "CURRENT_IP=\$(ifconfig eth1 | grep 'inet addr' | awk '{print \$2}')" > /home/vagrant/.bash_profile
echo 'echo -e "\nCurrent IP ${CURRENT_IP}\n"' >> /home/vagrant/.bash_profile
echo "cd /srv/shared" >> /home/vagrant/.bash_profile

echo "+ update apt repository"
apt-get -q -y update 1>/dev/null 2>&1

echo "+ install htop"
apt-get -q -y install htop 1>/dev/null 2>&1

echo "+ install httpd"
apt-get -y install nginx 1>/dev/null 2>&1

echo "+ configure vhost"
rm -f /etc/nginx/sites-enabled/*
ln -sf /srv/shared/provision/httpd/default /etc/nginx/sites-enabled/shared
service nginx restart 1>/dev/null 2>&1

echo "+ install git, make, curl, imagemagick"
apt-get -q -y install git make curl imagemagick 1>/dev/null 2>&1

echo "+ install node.js and npm"
git clone https://github.com/visionmedia/n.git /opt/n  1>/dev/null 2>&1
cd /opt/n
make install  1>/dev/null 2>&1
n stable  1>/dev/null 2>&1

echo "+ install g++"
apt-get -q -y install g++ 1>/dev/null 2>&1

echo "+ install required global NPM packages"
npm install -g supervisor 1>/dev/null 2>&1

exit 0