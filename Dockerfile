FROM nginx:alpine
RUN sed -i "s/listen[[:space:]][[:space:]]*80/listen 8888/" /etc/nginx/conf.d/default.conf
COPY . /usr/share/nginx/html
EXPOSE 8888
