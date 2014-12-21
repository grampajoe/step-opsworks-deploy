# Create mock executables
create_executable() {
    local file="$BATS_TMPDIR/$1"
    echo $2 > $file
    chmod +x $file
}

export PATH="$BATS_TMPDIR:$PATH"

create_executable error 'echo "ERROR: $@"'
create_executable info 'echo "INFO: $@"'
create_executable dropper 'echo "DROPPER_ARGS: $@"'

key_to_env() {
    local var=$(echo $1 | tr '[:lower:]' '[:upper:]' | tr '-' '_')
    var="WERCKER_OPSWORKS_DEPLOY_$var"

    echo $var
}

# set_config key-name 'value'
# Assigns 'value' to $WERCKER_OPSWORKS_DEPLOY_KEY_NAME.
set_config() {
    local var=`key_to_env $1`

    export $var=$2
}

unset_config() {
    unset `key_to_env $1`
}

# Assertions

assert_error() {
    [[ "$output" =~ ERROR.*$1 ]]
}

assert_dropper_arg() {
    if [ -n "$2" -a "$1" = "not" ]
    then
        [[ ! "$output" =~ DROPPER_ARGS.*$1 ]]
    else
        [[ "$output" =~ DROPPER_ARGS.*$1 ]]
    fi
}
