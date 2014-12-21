#!/usr/bin/env bats

load helper

setup() {
    # Required config
    set_config key-id 'config-key-id'
    set_config key-secret 'config-key-secret'
    set_config stack-id 'config-stack-id'
    set_config app-id 'config-app-id'
}

teardown() {
    unset_config key-id
    unset_config key-secret
    unset_config stack-id
    unset_config app-id
}

@test 'the opsworks deployer is used' {
    run ./deploy.sh

    assert_dropper_arg 'opsworks'
}

@test 'key-id is required' {
    unset_config key-id

    run ./deploy.sh

    assert_error key-id
    [ "$status" -eq 1 ]
}

@test 'key-id is passed to dropper' {
    set_config key-id 'test-key-id'

    run ./deploy.sh

    assert_dropper_arg '--access-key-id test-key-id'
}

@test 'key-secret is required' {
    unset_config key-secret

    run ./deploy.sh

    assert_error key-secret
    [ "$status" -eq 1 ]
}

@test 'key-secret is passed to dropper' {
    set_config key-secret 'test-key-secret'

    run ./deploy.sh

    assert_dropper_arg '--secret-access-key test-key-secret'
}

@test 'stack-id is required' {
    unset_config stack-id

    run ./deploy.sh

    assert_error stack-id
    [ "$status" -eq 1 ]
}

@test 'stack-id is passed to dropper' {
    set_config stack-id 'test-stack-id'

    run ./deploy.sh

    assert_dropper_arg '--stack-id test-stack-id'
}

@test 'app-id is required' {
    unset_config app-id

    run ./deploy.sh

    assert_error app-id
    [ "$status" -eq 1 ]
}

@test 'app-id is passed to dropper' {
    set_config app-id 'test-app-id'

    run ./deploy.sh

    assert_dropper_arg '--app-id test-app-id'
}

@test 'region defaults to us-east-1' {
    run ./deploy.sh

    assert_dropper_arg '--region us-east-1'
}

@test 'region is passed to dropper' {
    set_config region 'us-west-1'

    run ./deploy.sh

    assert_dropper_arg '--region us-west-1'
}

@test 'migrate defaults to false' {
    run ./deploy.sh

    assert_dropper_arg not '--migrate'
}

@test 'migrate is passed to dropper' {
    set_config migrate 'true'

    run ./deploy.sh

    assert_dropper_arg '--migrate'
}

@test 'setting migrate to false removes the argument' {
    set_config migrate 'false'

    run ./deploy.sh

    assert_dropper_arg not '--migrate'
}

@test 'comment has a default' {
    WERCKER_STARTED_BY='a friend' run ./deploy.sh

    assert_dropper_arg '--comment Wercker deploy by a friend.'
}

@test 'comment is passed to dropper' {
    set_config comment 'test-comment'

    run ./deploy.sh

    assert_dropper_arg '--comment test-comment'
}
