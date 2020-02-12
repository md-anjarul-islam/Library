const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const userRouter = require('./routes/user');
const adminRouter = require('./routes/admin');
const indexRouter = require('./routes/index');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

app.set('views', path.join(__dirname , '/views')); // set express to look in this folder to render our view
app.set('view engine', 'ejs'); // configure template engine
app.use(express.static(path.join(__dirname, 'public'))); // configure express to use public folder

app.use('/user', userRouter);
app.use('/admin', adminRouter);
app.use('/', indexRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log('The Server is running...'));
