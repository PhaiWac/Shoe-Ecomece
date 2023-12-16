const express = require('express'); 
const { default: mongoose } = require('mongoose');
const router = express.Router() ;

const Users = require('../models/users');
const Items = require('../models/items')
const History = require('../models/history')

const session = require('express-session');

// session check 
router.get('/history' ,async (req , res  , next ) => {
    
    const result = await History.find({email : req.session.email  })

    res.render('history',{session : req.session , data : result})
})

router.get('/',(req,res,next) => {
    if (!req.session.logged) {
        res.render('login' , {session : req.session})
    }
})

router.get('/sneakers' ,async (req,res,next ) => {

    const result = await Items.find({}) ;

    res.render("sneakers",{session : req.session , data : result}) ;
})

router.get('/home',async (req,res,next) => {
    if (!req.session.logged) {
        return res.redirect('/login')
    }
    const result = await Items.find({}) ;
    res.render('home',{session : req.session , data : result})
})

router.get('/login',(req,res,next) => {
    if (req.session.logged) {
        res.render('home',{session : req.session})
    } ;
    res.render('login', { session : req.session})
})

router.get('/register',(req,res,next) => {
    res.render('register', { session : req.session})
})

router.get('/payment', (req , res ,next) => {
    res.render('payment' , {session : req.session })
})

//  Post 

router.get('/logout/:id',(req , res, next) => {
    req.session.logged = false  ;
    res.redirect('/login') ;
})

router.post('/login',async (req, res ,next) => {
    try {
        const users = await Users.find({
            'info.email' : req.body.email ,
            'info.password' : req.body.password
        })

        if (users) {
            req.session.logged = true ;
            req.session.email = users[0].info.email 
            req.session.cost = users[0].info.cost ??  0 ;
            req.session._id = users[0]._id ;  
            req.session.history = users[0].history ;          

            if (users[0].info.admin) {
                req.session.admin = true ;
            }
            // res.redirect('/home')
            res.redirect('/home') ;
        }else {
            res.redirect('/')
        }
      } catch (err) {
        console.error(err);
      }
})

router.post('/register',(req, res ,next) => {

    var email = req.body.email ;
    var password = req.body.password ;
    var con_pass = req.body.confirm ;

    if (password != con_pass) return res.redirect('/register') ;
    
    const newUser = new Users({
        info : {
            email: email,
            password : password,
            cost : 0
        },
        shop : [] ,
        history : {}
    })

    newUser.info.admin = ( email === "admin@gmail.com" );

    newUser.save()
      .then(() => res.redirect('/login') )
      .catch(err => console.error('เกิดข้อผิดพลาด: ', err));
    
})


module.exports = router 