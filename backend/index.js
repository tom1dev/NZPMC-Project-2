const express = require('express');
const dbConnect = require('./config/mongoDB');
const cors = require('cors')



const userRouter = require('./routers/userRouter');
const eventRouter = require('./routers/eventRouter');
const signInRouter = require('./routers/signInRouter');

const app = express();

app.use(express.json());
app.use(cors());
//connect to database
dbConnect();

app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
})

//Routes
app.use('/api/user', userRouter);
app.use('/api/event', eventRouter);
app.use('/api/signin', signInRouter);

//specifies the port the app is going to run on
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});