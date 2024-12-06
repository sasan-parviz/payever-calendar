# Set Node
FROM node:alpine

# Set Work directory
WORKDIR /usr/src/app

# Copy files
COPY . /usr/src/app

#Install npm
RUN npm install -g @angular/cli
RUN npm install

#Expose Port
EXPOSE 4200

# run serve command
CMD ["ng", "serve"]