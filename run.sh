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

if [ ! -n "$WERCKER_OPSWORKS_DEPLOY_STACK_ID" ]; then
    error 'Please specify a stack-id.';
    exit 1;
else
    export AWS_OPSWORKS_STACK_ID="$WERCKER_OPSWORKS_DEPLOY_STACK_ID";
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

if [ "$WERCKER_OPSWORKS_DEPLOY_MIGRATE" = "true" ]; then
    export AWS_OPSWORKS_MIGRATE="--migrate";
else
    export AWS_OPSWORKS_MIGRATE="";
fi

if [ ! -n "$WERCKER_OPSWORKS_DEPLOY_COMMENT" ]; then
    export DEPLOY_COMMENT="Wercker deploy by $WERCKER_STARTED_BY.";
else
    export DEPLOY_COMMENT="$WERCKER_OPSWORKS_DEPLOY_COMMENT";
fi

info 'Installing Node...';
sudo apt-get update -y;
sudo apt-get install nodejs -y;

info 'Installing the CLI...';
npm install $WERCKER_STEP_ROOT

info 'Deploying...';
node $WERCKER_STEP_ROOT/bin/deploy.js opsworks \
    --stack-id $AWS_OPSWORKS_STACK_ID \
    --app-id $AWS_OPSWORKS_APP_ID \
    $AWS_OPSWORKS_MIGRATE \
    --comment "$DEPLOY_COMMENT";
