FROM nginx:latest
COPY conf.d/ /etc/nginx/conf.d/
COPY release/ /usr/share/nginx/html/