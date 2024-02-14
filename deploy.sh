#!/bin/sh
version="2.3.7"
service="ui"
repository="muhohoweb"

docker-compose build ${service} &&

docker push muhohoweb/ui-service:${version} &&

kubectl apply -f kubernetes/${service}.yml