#!/bin/bash
set -e

echo "Updating packages..."
apt-get update -y

echo "Installing curl and unzip..."
apt-get install -y curl unzip

echo "Installing AWS CLI v2..."
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
unzip -q awscliv2.zip
./aws/install --update
rm -rf aws awscliv2.zip

echo "AWS CLI installed successfully."

echo "Installing HashiCorp Terraform..."
apt-get install -y gnupg software-properties-common
wget -O- https://apt.releases.hashicorp.com/gpg | \
gpg --dearmor | \
tee /usr/share/keyrings/hashicorp-archive-keyring.gpg > /dev/null
echo "deb [signed-by=/usr/share/keyrings/hashicorp-archive-keyring.gpg] \
https://apt.releases.hashicorp.com $(lsb_release -cs) main" | \
tee /etc/apt/sources.list.d/hashicorp.list
apt-get update -y
apt-get install terraform -y

echo "Terraform installed successfully."
