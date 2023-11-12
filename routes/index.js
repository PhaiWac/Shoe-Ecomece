const express = require('express'); 
const { default: mongoose } = require('mongoose');
const router = express.Router() ;

const Users = require('../models/users');
const session = require('express-session');

// session check 
router.get('/',(req,res,next) => {
    if (!req.session.logged) {
        res.render('login' , {session : req.session})
    }
})

router.get('/home',(req,res,next) => {
    if (!req.session.logged) {
        return res.redirect('/login')
    }
    res.render('home',{session : req.session})
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

//  Post 

router.post('/login',async (req, res ,next) => {
    try {
        const users = await Users.findOne({
            'info.email' : req.body.email ,
            'info.password' : req.body.password
        })
       
        // console.log(users)
        if (users) {
            req.session.logged = true ;
            if (users.info.admin) {
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
            password : password
        }
    })

    newUser.info.admin = ( email === "admin@gmail.com" );

    newUser.save()
      .then(() => res.redirect('/login') )
      .catch(err => console.error('เกิดข้อผิดพลาด: ', err));
    
})


module.exports = router 