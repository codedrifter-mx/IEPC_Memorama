FROM ubuntu

# Instalamos NGINX
RUN apt-get -y update && apt -y install nginx

# Copiamos index.html local a /tmp
COPY index.html /tmp/index.html
COPY default /etc/nginx/sites-available/default

# Permisos
USER root
RUN chmod 755 -R /tmp/
RUN chown -R www-data /tmp/

# Exponemos puerto 80
EXPOSE 80/tcp

CMD /usr/sbin/nginx && tail -f /dev/null