#!/bin/bash

if [ ! -z $1 ] && [ ! -z $2 ] 
then 
    docker run -t -d -p 8888:80 -v $(realpath $1):/usr/share/nginx/html -v $(realpath $2):/data/conf/nginx.conf:ro --name bashnginx nginx
else
    if [ ! -z $1 ]
    then 
        docker run -t -d -p 8888:80 -v $(realpath $1):/usr/share/nginx/html --name bashnginx nginx
    else
        docker run -t -d -p 8888:80 -v $(realpath $2):/data/conf/nginx.conf:ro --name bashnginx nginx
    fi
fi
