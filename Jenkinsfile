pipeline {
    agent any

    environment {
        // These environment variables should be defined in Jenkins Global Settings or Job Parameters
        // EC2_IP = "your-ec2-public-ip"
        // SSH_CREDS_ID = "aws-ssh-key-credentials-id" // The ID of the SSH key stored in Jenkins
        SSH_USER = "ubuntu"
        APP_DIR = "/home/ubuntu/hotel-booking"
    }

    stages {
        stage('Checkout') {
            steps {
                echo 'Checking out source code...'
                checkout scm
            }
        }

        stage('Build Docker Images') {
            steps {
                echo 'Building Docker images...'
                // Build images locally to verify they compile successfully
                sh 'docker-compose build'
            }
        }

        stage('Deploy to AWS EC2') {
            steps {
                echo 'Deploying to AWS EC2...'
                sshagent(credentials: ["${SSH_CREDS_ID}"]) {
                    // Create application directory on EC2
                    sh "ssh -o StrictHostKeyChecking=no ${SSH_USER}@${EC2_IP} 'mkdir -p ${APP_DIR}'"
                    
                    // Copy necessary files to EC2
                    // Note: In a production scenario, you would push images to a registry (like AWS ECR)
                    // and pull them on the server, but for this setup we copy source and build on server.
                    sh "scp -o StrictHostKeyChecking=no -r ./* ${SSH_USER}@${EC2_IP}:${APP_DIR}/"
                    
                    // Run docker-compose up on the EC2 server
                    sh "ssh -o StrictHostKeyChecking=no ${SSH_USER}@${EC2_IP} 'cd ${APP_DIR} && sudo docker-compose up -d --build'"
                }
            }
        }
    }

    post {
        success {
            echo 'Deployment Successful! The application is running on AWS EC2.'
        }
        failure {
            echo 'Deployment Failed. Check the Jenkins logs.'
        }
    }
}
