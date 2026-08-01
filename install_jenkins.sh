#!/bin/bash

# Exit on any error
set -e

echo "Cleaning up any broken Jenkins sources..."
sudo rm -f /etc/apt/sources.list.d/jenkins*.list

echo "Updating package list..."
sudo apt-get update -y || true

echo "Installing OpenJDK 17..."
sudo apt-get install -y openjdk-17-jdk

echo "Adding Jenkins key and repository..."
sudo rm -f /etc/apt/sources.list.d/jenkins*.list
sudo wget -O /usr/share/keyrings/jenkins-keyring.asc https://pkg.jenkins.io/debian-stable/jenkins.io-2026.key
echo "deb [signed-by=/usr/share/keyrings/jenkins-keyring.asc] https://pkg.jenkins.io/debian-stable binary/" | sudo tee /etc/apt/sources.list.d/jenkins.list > /dev/null

echo "Updating package list again..."
sudo apt-get update -y

echo "Installing Jenkins..."
sudo apt-get install -y jenkins

echo "Starting Jenkins..."
sudo service jenkins start

echo "Waiting for Jenkins to generate the initial admin password..."
sleep 5

echo "Jenkins Initial Admin Password:"
sudo cat /var/lib/jenkins/secrets/initialAdminPassword || echo "Password not found yet. Please check /var/lib/jenkins/secrets/initialAdminPassword later."

echo "Jenkins installation and startup complete! You can access it at http://localhost:8080"
