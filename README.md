﻿# IEPC_Memorama

This is a Web Game using Vanilla javascript, the objetive is to share to young people and learn their Mexian Electoral rights

Try it now: https://www.iepcdurango.mx/IEPC_DURANGO/documentos/2022/juegos/IEPC_Memorama

## Technologies

* HTML
* SCSS
* Vanilla Javascript
* Boostrap 5
* Axios
* Python
* Flask
* Sqlite3

## NGINX
Set this on a NGINX web server

'''
server {
        listen 80 default_server;
        listen [::]:80 default_server;

        root /var/www/html/iepc;

        index index.html index.htm index.nginx-debian.html;

        server_name _;

        location / {
                try_files $uri $uri/ =404;
                autoindex on;
        }
}
'''

## BackEnd Server

On your Linux Server:

            cronrab -e

Then:

            @reboot sudo python3 /var/www/html/iepc/server.py
