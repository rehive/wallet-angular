FROM nginx:latest
COPY etc/nginx/conf.d/ /etc/nginx/conf.d/
COPY release/ /usr/share/nginx/html/
