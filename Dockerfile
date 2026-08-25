# Use nginx to serve static files
FROM nginx:alpine

# Copy the generated portfolio to the nginx html directory
# We rename it to index.html so it serves as the root
COPY my-portfolio.html /usr/share/nginx/html/index.html

# Copy any other static assets if they exist (gifs, etc.)
COPY . /usr/share/nginx/html/

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
