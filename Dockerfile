FROM nginx:alpine

MAINTAINER Nikita Chebykin "nikita@chebyk.in"

RUN rm -rf /etc/nginx/conf.d

COPY nginx/nginx.conf /etc/nginx/nginx.conf
COPY nginx/web.conf /etc/nginx/sites-enabled/web.conf
COPY build /var/www/html/
