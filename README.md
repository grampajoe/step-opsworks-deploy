# opsworks-deploy

Run [OpsWorks](http://aws.amazon.com/opsworks/) deployments from
[Wercker](http://wercker.com/) using
[dropper](https://www.npmjs.com/package/dropper).

[![wercker status](https://app.wercker.com/status/be44f2d6fed2b831a4e260b61611191a/s/master "wercker status")](https://app.wercker.com/project/bykey/be44f2d6fed2b831a4e260b61611191a)

## Options

- `key-id` (required) AWS access key ID.
- `key-secret` (required) AWS secret access key.
- `stack-id` (required) OpsWorks stack ID.
- `app-id` (required) OpsWorks app ID.
- `region` (optional, default `us-east-1`) AWS region.
- `migrate` (optional, default `false`) Whether to run migrations.
- `comment` (optional, default `Wercker deploy by $WERCKER_STARTED_BY.`)
  Comment for the deployment.
- `wait-for-deploy` (optional, default `false`) Whether to wait for the deploy
  to complete.

## Example

```yaml
deploy:
  steps:
    - grampajoe/opsworks-deploy:
        key-id: $AWS_ACCESS_KEY_ID
        key-secret: $AWS_SECRET_ACCESS_KEY
        stack-id: $AWS_OPSWORKS_STACK_ID
        app-id: $AWS_OPSWORKS_APP_ID
        migrate: false
        comment: "This is $WERCKER_STARTED_BY's fault."
        wait-for-deploy: true
```

## Permissions

It's recommended to create an [IAM](http://aws.amazon.com/iam/) user with
just enough permissions to perform the actions required by this step. The
following permissions should be enough:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "opsworks:CreateDeployment"
        "opsworks:DescribeApps",
        "opsworks:DescribeDeployments"
      ],
      "Resource": [
        "arn:aws:opsworks:*:*:stack/your-opsworks-stack-id-here/"
      ]
    }
  ]
}
```

## Contributing

1. Fork the [GitHub repo](https://github.com/grampajoe/step-opsworks-deploy).
2. Create a feature branch, e.g. `fun-new-thing`.
3. Make some changes. Include tests if you can!
4. Open a pull request.

## Running Tests

The tests for this step require [Bats](https://github.com/sstephenson/bats).
Install it, then run the tests with:

```bash
$ bats test
```

## License

MIT. See [LICENSE](LICENSE).

## Changelog

### 1.0.2

- Bugfix: `info` and `error` are not defined.
- Check for Node before installing it.

### 1.0.1

- Fix paths to the install and deploy scripts.

### 1.0.0

- Add the wait-for-deploy option.
- Deploy the current commit.

### 0.3.1

- Bugfix: Use sudo to install dropper.

### 0.3.0

- Use the dropper node package.

### 0.2.2

- Bugfix: The `migrate` option wasn't passed to OpsWorks correctly.

### 0.2.1

- Bugfix: The deploy command wasn't found.
- Bugfix: The `migrate` option wasn't passed to OpsWorks.

### 0.2.0

- Refactor deploy command to allow more flexibility later on.

### 0.1.2

- Fix an issue with the default comment.

### 0.1.1

- Don't pretend to explicitly deploy commits.

### 0.1.0

- Explicitly deploy the current commit.
- Add the `comment` option.

### 0.0.5

- First confirmed working release!

### 0.0.4

- Another deploy command fix. What's testing?

### 0.0.3

- Try to fix the deploy command. Trial and error lol.

### 0.0.2

- Add the stack-id parameter.

### 0.0.1

- Initial release!
