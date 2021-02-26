# Getir Backend Challenge
> API that Allows user to query records and return response based onquery parameters

### Installation 
Run the following 
```
1. $ git clone https://github.com/fisfat/getir-backend-challenge.git
2. $ cd getir-backend-challenge
3. $ yarn

```

### Running the app

- Rename `env.example` file to `.env`, fill the variables and save.
- `MONGO_URI` Takes the mongo database URI
- `PORT` Takes the port in which we want the app to run on,

#### Without Docker
Run
` $ npm run dev ` for development mode
or `$ npm start`

#### With Docker
Run the following
```
1. Build the docker image - $ docker build -t getir-backend-challenge .
2. Run the docker image - $ docker run -d -p 80:${PORT} getir-backend-challenge

```

### API Usage docs
GET /guide

### Testing
While the App is running, run
` $ npm run test`