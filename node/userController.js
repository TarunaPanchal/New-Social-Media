
var bodyParser = require('body-parser');
var session = require('express-session')
var app = require('express')();
var _ = require('lodash');
var jwt = require('jsonwebtoken');
var nodemailer = require("nodemailer");
var mongoose = require('mongoose');
var userschema = require('./Schema/userSchema');

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
    
  }))

var smtpTransport = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        //  user: "krishna.soni@codezeros.com",
        // pass: "KrishnAnkit1315Oct."
        user : "taruna.panchal@codezeros.com",
        pass: "T@runa1612"
    }
});

var token,mailOptions, host, link;

//Send Email for verification 
app.post('/register', (req, res) => {

     token = jwt.sign({}, "secretkey", { expiresIn: '24h' });
    console.log(token);

    host = req.get('host');
    link = "http://" + req.get('host') + "/user/verify?id=" + token;
    mailOptions = {
        to: req.body.email,
        subject: req.body.firstname + " " + req.body.lastname,
        password: req.body.password,
        html: "<br> Please Click on the link to verify your email.<br><a href=" + link + ">Click here to verify</a>"
    }
    console.log(mailOptions);
    smtpTransport.sendMail(mailOptions, function (error, response) {
        if (error) {
            console.log(error);
            res.end("error");
        } else {
            res.send(response);
        }
    });
})

//verify email and store in database
app.get('/verify', function (req, res) {
    console.log(req.protocol + ":/" + req.get('host'));
    if ((req.protocol + "://" + req.get('host')) == ("http://" + host)) {
        console.log("Domain is matched. Information is from Authentic email");
        if (req.query.id == token) {
            console.log("email is verified");
            userschema.create({
                name: mailOptions.subject,
                email: mailOptions.to,
                password: mailOptions.password
            }, (err, data) => {
                if (err)
                    return res.send(err)
                return res.redirect('http://localhost:4200/login');
            });
        }
        else {
            console.log("email is not verified");
            res.end("<h1>Bad Request</h1>");
        }
    }
    else {
        res.end("<h1>Request is from unknown source");
    }
});

//login with email and password
app.post('/login', (req, res) => {
    const { email ,password } = req.body
    console.log(email,password)
    userschema.findOne({
        email,
        password
    }, (err, user) => {
        if (err)
            return res.send(err)
        if (!user)
            return res.send("Invalid Credentials");

        
        console.log("Login Successfully");
        req.session.user = email
        req.session.save()
        const token = jwt.sign({ _id: user._id }, "secretkey", { expiresIn: '24h' });
        let response = _.pick(user, ['_id', 'name', 'email']);
        response['Auth_token'] = token;
        return res.header('Auth_token', token).send(response);
    });
});


//add post in array
app.put('/uploadPost', (req, res) => {
    const token = req.header('Auth_token');
    const decoded = jwt.verify(token, "secretkey", { expiresIn: '24h' });
    // console.log(mongoose.Types.ObjectId(decoded.name));
    userschema.findByIdAndUpdate(
        { _id: mongoose.Types.ObjectId(decoded._id) },
        {
            $push: { "posts": { "post": req.body.post } }
        },
        { safe: true, upsert: true },
        (err, data) => {
            if (err)
                return res.send(err);
            return res.send(data);
        });
});

//get all registered user
app.get('/allUser', (req, res) => {
    userschema.find({}, (err, user) => {
        if (err)
            return res.send(err)
        return res.send(user);
    });
});

//show login user details
app.get('/showUserDetail', (req, res) => {
    const token = req.header('Auth_token');
    const decoded = jwt.verify(token, "secretkey", { expiresIn: '24h' });
    userschema.find(
        {
            _id:
            {
                $in: [mongoose.Types.ObjectId(decoded._id)]
            }
        },
        (err, data) => {
            if (err)
                return res.send(err);
            return res.send(data);
        })
})

//display only login user's posts list
app.get('/userPost', (req, res) => {
    const token = req.header('Auth_token');
    const decoded = jwt.verify(token, "secretkey", { expiresIn: '24h' });

    userschema.find(
        { _id: mongoose.Types.ObjectId(decoded._id) },
        { posts: 1 },
        (err, data) => {
            if (err)
                return res.send(err);
            return res.send(data);
        })
})

//Send Notification for connect
app.post('/connect', async (req, res) => {
    const token = req.header('Auth_token');
    const decoded = jwt.verify(token, "secretkey", { expiresIn: '24h' });
    let friendsInfo = await userschema.findById(mongoose.Types.ObjectId(decoded._id)).exec();
    userschema.findByIdAndUpdate(
        { _id: req.body._id },
        {
            $push: {
                "notification": {
                    "_id": mongoose.Types.ObjectId(decoded._id),
                    "name": friendsInfo.name
                }
            }
        },
        { safe: true, upsert: true },
        (err, data) => {
            if (err) {
                console.log(err);
                return res.send(err);
            } else {
                console.log('notification Sent');
                return res.send(data);
            }
        });
});

//display only login user's notification list
app.get('/notificationList', (req, res) => {
    const token = req.header('Auth_token');
    const decoded = jwt.verify(token, "secretkey", { expiresIn: '24h' });

    userschema.find(
        { _id: mongoose.Types.ObjectId(decoded._id) },
        { notification: 1 },
        (err, data) => {
            if (err)
                return res.send(err);
            return res.send(data);
        });
});

//add friends Details in array
app.put('/accept', async (req, res) => {
    const token = req.header('Auth_token');
    const decoded = jwt.verify(token, "secretkey", { expiresIn: '24h' });
    let friendsInfo = await userschema.findById(req.body._id).exec();
    userschema.findByIdAndUpdate(
        { _id: mongoose.Types.ObjectId(decoded._id) },
        {
            $push: {
                "friends": {
                    "_id": friendsInfo._id,
                    "name": friendsInfo.name
                }
            }
        },
        { safe: true, upsert: true },
        (err, data) => {
            if (err) {
                console.log(err);
                return res.send(err);
            }
            console.log('Friends Added');

            userschema.findByIdAndUpdate(
                { _id: mongoose.Types.ObjectId(decoded._id) },
                {
                    $pull: {
                        "notification": {
                            "_id": friendsInfo._id,
                            "name": friendsInfo.name
                        }
                    }
                },
                { safe: true, upsert: true },
                (err, data) => {
                    if (err) {
                        console.log(err);
                        return res.send(err);
                    }
                    console.log('Notification Removed');
                    return res.send(data);
                });
        });
});

app.post('/ignore',(req,res)=>{
    const token = req.header('Auth_token');
    const decoded = jwt.verify(token, "secretkey", { expiresIn: '24h' });
    
    userschema.findByIdAndUpdate(
        { _id: mongoose.Types.ObjectId(decoded._id) },
        {
            $pull: {
                "notification": {
                    "_id": friendsInfo._id,
                    "name": friendsInfo.name
                }
            }
        },
        { safe: true, upsert: true },
        (err, data) => {
            if (err) {
                console.log(err);
                return res.send(err);
            }
            console.log('Notification Removed');
            return res.send(data);
        });
})
//display friends list 
app.get('/friendsList', (req, res) => {
    const token = req.header('Auth_token');
    const decoded = jwt.verify(token, "secretkey", { expiresIn: '24h' });

    userschema.find(
        { _id: mongoose.Types.ObjectId(decoded._id) },
        { friends: 1 },
        (err, data) => {
            if (err)
                return res.send(err);
            return res.send(data);
        });
});

app.get('/showUserDetail', (req, res) => {
    const token = req.header('Auth_token');
    const decoded = jwt.verify(token, "secretkey", { expiresIn: '24h' });
    userschema.find(
        {
            _id:
            {
                $in: [mongoose.Types.ObjectId(decoded._id)]
            }
        },
        (err, data) => {
            if (err)
                return res.send(err);
            return res.send(data);
        })
})

app.get('/data', async (req, res) => {
    console.log(req.session)    
  user =  await userschema.findOne({email: req.session.user})
    if(!user){
        res.json({
            status: false,
            message: "User was deleted"
        })
        return
    }
   res.json({
       status:true,
       email: req.session.user,
       address: user.address,
       bio: user.bio,
       name: user.name,       
       nickname: user.nickname ,
       id : user._id
   });
//    console.log(user.name)
});

 app.get('/delete/:id', (req, res ) =>{
    userschema.findByIdAndRemove({_id: req.params.id}, function(err, adUnit){
        if(err) res.json(err);
        else { res.json('Successfully removed');
            console.log("Delete Sucessfully")
    }
    });
});

app.post('/update/:id', (req,res) => {
    userschema.findById(req.params.id, function(err, user) {
        if (!user)
          return next(new Error('Could not load Document'));
        else {
            user.name = req.body.name;
            user.bio = req.body.bio;
            user.nickname = req.body.nickname;
            user.address = req.body.address;

            user.save().then(userschema => {
              res.json('Update complete');
              console.log("Update complete");
          })
          .catch(err => {
                res.status(400).send("unable to update the database");
          });
        }
      });
})

app.get('/edit/:id',  (req, res)=>  {
    let id = req.params.id;
    userschema.findById(id, function (err, adUnit){
        res.json(adUnit);
    });
  });


module.exports = app;