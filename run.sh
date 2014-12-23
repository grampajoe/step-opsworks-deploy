#!/bin/sh

set -e

$WERCKER_STEP_ROOT/install.sh
$WERCKER_STEP_ROOT/deploy.sh
