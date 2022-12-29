# Node Authenticator
Authentication system using JWT.

### What is this project about?

This project is a login system build with Node.js, EJS and JavaScript Web Token (JWT).

### Preview

![preview](./preview.JPG)

### How can I download this project?

1. Clone the project running __git clone https://github.com/andersonrbernal/node-auth.git__ on your terminal

2. You will have to have mongoDB installed on your computer. If you don't want to install it, you can use [MongoDB Atlas](https://www.mongodb.com/cloud) instead
    - If you are using MongoDB Atlas. Create a new cluster and add a new collection to this cluster. 

    - If you are using MongoDB Compass. Create a new connection. After that, create a new database and add a collection to it. 

    - **Don't forget to add the name of the collection at the end of the connection string.**

    - Copy and paste the connection string to the dbURI variable in app.js in this repository.

3. MongoDB uses JSON files to store data. You can import the data using the file __users.json__ in this repository if you wish. 

4. Run __npm install nodemon__ and __npm nodemon app.js__ on your terminal, this dependency will create a local server on your machine.

5. Open [localhost](http:\\localhost:80) on your browser, and done.

### Contact

- Email: andersonbernal2017@gmail.com
- Linkedin: https://www.linkedin.com/in/anderson-bernal/
- Github: https://github.com/andersonrbernal