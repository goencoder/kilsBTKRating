FROM nginx:1-alpine-slim

# Install dependencies
RUN apk add --no-cache \
    git \
    && rm -rf /var/cache/apk/*

# Copy the HTML and JS files into the container
COPY index.html /usr/share/nginx/html/
COPY styles.css /usr/share/nginx/html/
COPY elorating.js /usr/share/nginx/html/
COPY script.js /usr/share/nginx/html/


# Download and install Leaflet and Bootstrap
#RUN git clone https://github.com/Leaflet/Leaflet.git /usr/share/nginx/html/leaflet \
#    && git clone https://github.com/twbs/bootstrap.git /usr/share/nginx/html/bootstrap
#export port 80
EXPOSE 80

# Set the default command to start the nginx server
CMD ["nginx", "-g", "daemon off;"]
