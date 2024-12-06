# Set Node
FROM node:18-alpine AS build

# Set Work directory
WORKDIR /app

# Copy files
COPY . ./

#Install npm
RUN npm install -g @angular/cli
RUN npm install

# Build
RUN ng build

EXPOSE 4200

CMD ["ng serve"]
