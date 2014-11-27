#!/bin/sh

set -e

if [ ! -n "$WERCKER_OPSWORKS_DEPLOY_KEY_ID" ]; then
    error 'Please specify a key-id.';
    exit 1;
else
    export AWS_ACCESS_KEY_ID="$WERCKER_OPSWORKS_DEPLOY_KEY_ID";
fi

if [ ! -n "$WERCKER_OPSWORKS_DEPLOY_KEY_SECRET" ]; then
    error 'Please specify a key-secret.';
    exit 1;
else
    export AWS_SECRET_ACCESS_KEY="$WERCKER_OPSWORKS_DEPLOY_KEY_SECRET";
fi

if [ ! -n "$WERCKER_OPSWORKS_DEPLOY_APP_ID" ]; then
    error 'Please specify an app-id.';
    exit 1;
else
    export AWS_OPSWORKS_APP_ID="$WERCKER_OPSWORKS_DEPLOY_APP_ID";
fi

if [ ! -n "$WERCKER_OPSWORKS_DEPLOY_REGION" ]; then
    export AWS_DEFAULT_REGION="us-east-1";
else
    export AWS_DEFAULT_REGION="$WERCKER_OPSWORKS_DEPLOY_REGION";
fi

if [ ! -n "$WERCKER_OPSWORKS_DEPLOY_MIGRATE" ]; then
    export AWS_OPSWORKS_MIGRATE="false";
else
    export AWS_OPSWORKS_MIGRATE="$WERCKER_OPSWORKS_DEPLOY_MIGRATE";
fi

if [ ! -n "$WERCKER_OPSWORKS_DEPLOY_WAIT_UNTIL_DEPLOYED" ]; then
    export AWS_OPSWORKS_WAIT="false";
else
    export AWS_OPSWORKS_WAIT="$WERCKER_OPSWORKS_DEPLOY_WAIT_UNTIL_DEPLOYED";
fi

info 'Installing Python...';
sudo apt-get update -y;
sudo apt-get install python -y;

info 'Installing the AWS CLI...';
sudo pip install awscli;

info 'Deploying...';
aws opsworks --region us-east-1 create-deployment
    --app-id=$AWS_OPSWORKS_APP_ID \
    --command="{
      \"Name\": \"deploy\",
      \"Args\": {
        \"migrate\": [\"$AWS_OPSWORKS_MIGRATE\"]
      }
    }"
