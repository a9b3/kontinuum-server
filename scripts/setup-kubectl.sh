#!/bin/bash
kubectl config set-cluster default-cluster \
  --server=$MASTER_IP:8080 \
  --certificate-authority=/opt/certs/ca.pem \
  --client-key=/opt/certs/admin.key \
  --client-certificate=/opt/certs/admin.crt

kubectl config set-credentials default-admin \
  --certificate-authority=/opt/certs/ca.pem \
  --client-key=/opt/certs/admin.key \
  --client-certificate=/opt/certs/admin.crt

kubectl config set-context default-system \
  --cluster=default-cluster \
  --user=default-admin

kubectl config use-context default-system
