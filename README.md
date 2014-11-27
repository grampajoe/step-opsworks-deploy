# opsworks-deploy

Run [OpsWorks](http://aws.amazon.com/opsworks/) deployments from
[Wercker](http://wercker.com/).

## Options

- `key-id` (required) AWS access key ID.
- `key-secret` (required) AWS secret access key.
- `stack-id` (required) OpsWorks stack ID.
- `app-id` (required) OpsWorks app ID.
- `region` (optional, default `us-east-1`) AWS region.
- `migrate` (optional, default `false`) Whether to run migrations.

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
```

## License

MIT. See [LICENSE](LICENSE).

## Changelog

### 0.0.4

- Another deploy command fix. What's testing?

### 0.0.3

- Try to fix the deploy command. Trial and error lol.

### 0.0.2

- Add the stack-id parameter.

### 0.0.1

- Initial release!
