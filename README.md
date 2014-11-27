# opsworks-deploy

Run [OpsWorks](http://aws.amazon.com/opsworks/) deployments from
[Wercker](http://wercker.com/).

## Options

- `key-id` (required) AWS access key ID.
- `key-secret` (required) AWS secret access key.
- `app-id` (required) OpsWorks app ID.
- `region` (optional, default `us-east-1`) AWS region.
- `migrate` (optional, default `false`) Whether to run migrations.
- `wait-until-deployed` (optional, default `false`) Whether to wait for
  deploys to finish before continuing.

## Example

```yaml
deploy:
  steps:
    - grampajoe/opsworks-deploy:
        key-id: $AWS_ACCESS_KEY_ID
        key-secret: $AWS_SECRET_ACCESS_KEY
        app-id: $AWS_OPSWORKS_APP_ID
        migrate: false
        wait-until-deployed: true
```

## License

MIT. See [LICENSE](LICENSE).

## Changelog

### 0.0.1

- Initial release!
