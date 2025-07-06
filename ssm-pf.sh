#! /usr/bin/env bash

set -e

INSTANCE_ID=$(aws ec2 describe-instances \
  --filters "Name=tag:Name,Values=bastion" \
  --query "Reservations[*].Instances[*].InstanceId" \
  --output text)

HOST=

aws ssm start-session \
  --target $INSTANCE_ID \
  --document-name AWS-StartPortForwardingSessionToRemoteHost \
  --parameters "host=todos-postgres-rds.c5q8mim8gaoe.eu-west-1.rds.amazonaws.com,portNumber=5432,localPortNumber=5432"
