const express = require('express') 
const app = express() ;
const expressLayouts = require('express-ejs-layouts') 
const methodOverride = require('method-override');
const session = require('express-session') ;
require('dotenv').config();

app.set('view engine','ejs')
app.set('views',__dirname + '/views')
app.set('layout','layouts/layout') ;

app.use(expressLayouts) 
app.use(express.static('public')) 

app.use(methodOverride('_method'));


app.use(express.urlencoded({ extended: true }));
// session 

app.use(session({
    secret : 'admin' ,
    resave : false ,
    saveUninitialized : true 
}))

//  db 
const mongoose = require('mongoose')

mongoose.connect(process.env.DB_URL)

const db = mongoose.connection;

// จัดการเหตุการณ์เมื่อมีการเชื่อมต่อเกิดขึ้น
db.on('error', console.error.bind(console, 'เกิดข้อผิดพลาดในการเชื่อมต่อกับ MongoDB:'));
db.once('open', () => {
  console.log('เชื่อมต่อกับ MongoDB สำเร็จ');
});

app.listen(process.env.PORT || 3000 , () => {
    console.log('Server Started')
})
//  Use Route 

const indexRoutes = require('./routes/index') ;
const adminRoutes = require('./routes/admin') ;
const userRoters = require('./routes/user'); 

app.use('/',indexRoutes)

app.use('/admin',adminRoutes)

app.use('/user',userRoters)