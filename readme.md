# kontinuum

Express server that handles deployment to a kubernetes cluster. Run this on a node that has kubectl cli already configured.

## Run

Make sure the system this is running on has the kubectl command setup with the cluster you want to work with.

```sh
## needs redis running on regular port
docker run --name redis -d -p 6379:6379 redis

## SUPER_INSECURE_KEY will be your password lol
docker run -e "SUPER_INSECURE_KEY=<blah>" -d -p 8080:80 --name kontinuum esayemm/kontinuum
```

## API

#### POST `/deploy`
require multipart/form-data

- -F data=@kubernetes yaml file
- -H token=[token]

#### POST `/get_token`

- -H password=[password]