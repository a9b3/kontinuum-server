# kontinuum

Express server that handles deployment to a kubernetes cluster. Run this on a node that has kubectl cli already configured. This is pretty hacky, be warned before using for anything serious haha.

## Setup

1. Set up a node droplet in digital ocean.
2. Provision the droplet, by manually moving certs into droplet, and downloading kubectl.

```sh
# from your local machine with the certs
scp -r <location of certs> root@<ip>:~/certs
```

```sh
# inside remote droplet
# ${k8s_version} should be the same version used by your kubernetes cluster. eg. 'v1.3.0'
curl -L -o ./kubectl -z ./kubectl https://storage.googleapis.com/kubernetes-release/release/${k8s_version}/bin/linux/amd64/kubectl
chmod -R +x ./kubectl

./kubectl config set-cluster default-cluster \
  --server=<master_ip>:8080 \
  --certificate-authority=./certs/ca.pem \
  --client-key=./certs/admin-key.pem \
  --client-certificate=./certs/admin.pem
./kubectl config set-credentials default-admin \
  --certificate-authority=./certs/ca.pem \
  --client-key=./certs/admin-key.pem \
  --client-certificate=./certs/admin.pem
./kubectl config set-context default-system \
  --cluster=default-cluster \
  --user=default-admin
./kubectl config use-context default-system

sudo apt-get update

curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -
sudo apt-get install -y nodejs
sudo apt-get install -y redis-server
sudo apt-get install -y git

sudo swapon -s
sudo fallocate -l 4G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile

npm i -g forever
git clone https://github.com/esayemm/kontinuum
cd kontinuum
npm i
cd ..
NODE_ENV=prod KUBE_BINARY=./kubectl forever start kontinuum/index.js
```

## API

#### POST `/deploy`
require multipart/form-data

- -F data=@kubernetes yaml file
- -H token=[token]

#### POST `/get_token`

- -H password=[password]