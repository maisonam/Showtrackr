#!/bin/bash
set -e

if [[ $# -eq 0 ]] ; then echo 'An version arg is required.' ; exit 0 ; fi

VERSION=$1

docker build -t docker.ingeus.aws/ingeus/qzd-web:$VERSION .
docker push docker.ingeus.aws/ingeus/qzd-web:$VERSION
