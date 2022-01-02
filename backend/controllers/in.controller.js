const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const config = require("../config/auth.config");
const db = require("../models");
const mongoose = require("mongoose");
const User = db.user;
const Post = db.post;

exports.getWriteMessage = (req, res) => {
    let mymess;
    try{
        mymess = mongoose.model("writing" + req.body.hisid + "to" + req.body.myid);
    }catch(err){
        mymess = mongoose.model(
            "writing" + req.body.hisid + "to" + req.body.myid,
            new mongoose.Schema({
                _id: mongoose.Schema.Types.ObjectId,
                content : { type: String, required: false},
            })
        );
    }
    
    mymess.find().exec((err, doc) => {
        if(err){
            res.status(500).send(err);
        }
        res.status(201).send(doc);
    })
}

exports.writeMessage = (req, res) => {
    let mymess;
    try{
        mymess = mongoose.model("writing" + req.body.myid + "to" + req.body.hisid);
    }catch(err){
        mymess = mongoose.model(
            "writing" + req.body.myid + "to" + req.body.hisid,
            new mongoose.Schema({
                _id: mongoose.Schema.Types.ObjectId,
                content : { type: String, required: false},
            })
        );
    }
    const w = new mymess({
        _id: new db.mongoose.Types.ObjectId(),
        content : req.body.content,
    });
    mymess.deleteMany().exec((err, doc) => {
        if(err){
            res.status(500).send(err);
        }
        w.save((err, doc) => {
            if(err){
                res.status(500).send(err);
            }
            res.status(201).send({message : "Sent successfully !"});
        })
    })
}

exports.getMessages = (req, res) => {

    let mylistmess;
    try{
        mylistmess = mongoose.model("messages" + req.body.myid);
    }catch(err){
        mylistmess = mongoose.model(
            "messages" + req.body.myid,
            new mongoose.Schema({
                _id: mongoose.Schema.Types.ObjectId,
                id : { type: String, required: true },
                name : { type: String, required: true},
                message : { type: String, required: false},
                seen : { type: String, required: true},
            })
        );
    }

    mylistmess.updateOne({id : req.body.hisid}, {seen : "true"}).exec((err, doc) => {
        if(err){
            res.status(500).send(err);
        }
    })

    let mymess;
    try{
        mymess = mongoose.model("messages" + req.body.myid + "_" + req.body.hisid);
    }catch(err){
        mymess = mongoose.model(
            "messages" + req.body.myid + "_" + req.body.hisid,
            new mongoose.Schema({
                _id: mongoose.Schema.Types.ObjectId,
                idsender : { type: String, required: true},
                content : { type: String, required: false},
                seen : { type: String, required: true},
            })
        );
    }

    mymess.updateMany({seen : "false"}, {seen : "true"}).exec((err, doc) => {
        if(err){
            res.status(500).send(err);
        }
    })
    mymess.find().exec((err, mess) => {
        if(err){
            res.status(500).send(err);
        }
        res.status(201).send(mess);
    })
}

exports.sendMessage = (req, res) => {
    let mymess;
    try{
        mymess = mongoose.model("messages" + req.body.myid + "_" + req.body.hisid);
    }catch(err){
        mymess = mongoose.model(
            "messages" + req.body.myid + "_" + req.body.hisid,
            new mongoose.Schema({
                _id: mongoose.Schema.Types.ObjectId,
                idsender : { type: String, required: true},
                content : { type: String, required: false},
                seen : { type: String, required: true},
            })
        );
    }

    const mymessage = new mymess({
        _id: new db.mongoose.Types.ObjectId(),
        idsender: req.body.idsender,
        content : req.body.content,
        seen : "true",
    });
    mymessage.save((err, document) => {
        if (err) {
            return res.status(500).send({ message: err });
        }
        //res.status(201).send({ message: "Message was send successfully!" });
    });

    let hismess;
    try{
        hismess = mongoose.model("messages" + req.body.hisid + "_" + req.body.myid);
    }catch(err){
        hismess = mongoose.model(
            "messages" + req.body.hisid + "_" + req.body.myid,
            new mongoose.Schema({
                _id: mongoose.Schema.Types.ObjectId,
                idsender : { type: String, required: true},
                content : { type: String, required: false},
                seen : { type: String, required: true},
            })
        );
    }

    const hismessage = new hismess({
        _id: new db.mongoose.Types.ObjectId(),
        idsender: req.body.idsender,
        content : req.body.content,
        seen : "false",
    });
    hismessage.save((err, document) => {
        if (err) {
            return res.status(500).send({ message: err });
        }
        //res.status(201).send({ message: "Message was send successfully!" });
    });

    let mylistmess;
    try{
        mylistmess = mongoose.model("messages" + req.body.myid);
    }catch(err){
        mylistmess = mongoose.model(
            "messages" + req.body.myid,
            new mongoose.Schema({
                _id: mongoose.Schema.Types.ObjectId,
                id : { type: String, required: true },
                name : { type: String, required: true},
                message : { type: String, required: false},
                seen : { type: String, required: true},
            })
        );
    }

    var name = "";
    mylistmess.findOne({id : req.body.hisid}).exec((err, doc) => {
        if(err){
            res.status(500).send(err);
        }
        name = doc.name;
        mylistmess.deleteOne({id : req.body.hisid}).exec((err, doc) => {
            if(err){
                res.status(500).send(err);
            }
        });
        const mylistmessage = new mylistmess({
            _id: new db.mongoose.Types.ObjectId(),
            id: req.body.hisid,
            name : name,
            message : req.body.content,
            seen : "true",
        });
        mylistmessage.save((err, document) => {
            if (err) {
                return res.status(500).send({ message: err });
            }
            //res.status(201).send({ message: "Message was send successfully!" });
        });
    });

    let hislistmess;
    try{
        hislistmess = mongoose.model("messages" + req.body.hisid);
    }catch(err){
        hislistmess = mongoose.model(
            "messages" + req.body.hisid,
            new mongoose.Schema({
                _id: mongoose.Schema.Types.ObjectId,
                id : { type: String, required: true },
                name : { type: String, required: true},
                message : { type: String, required: false},
                seen : { type: String, required: true},
            })
        );
    }

    var myname = "";
    hislistmess.findOne({id : req.body.myid}).exec((err, doc) => {
        if(err){
            res.status(500).send(err);
        }
        myname = doc.name;
        hislistmess.deleteOne({id : req.body.myid}).exec((err, doc) => {
            if(err){
                res.status(500).send(err);
            }
        });

        let writing;
        try{
            writing = mongoose.model("writing" + req.body.myid + "to" + req.body.hisid);
        }catch(err){
            writing = mongoose.model(
                "writing" + req.body.myid + "to" + req.body.hisid,
                new mongoose.Schema({
                    _id: mongoose.Schema.Types.ObjectId,
                    content : { type: String, required: false},
                })
            );
        }
        const w = new writing({
            _id: new db.mongoose.Types.ObjectId(),
            content : "",
        });
        writing.deleteMany().exec((err, doc) => {
            if(err){
                res.status(500).send(err);
            }
            w.save((err, doc) => {
                if(err){
                    res.status(500).send(err);
                }
                //res.status(201).send({message : "Sent successfully !"});
            })
        })

        const hislistmessage = new hislistmess({
            _id: new db.mongoose.Types.ObjectId(),
            id: req.body.myid,
            name : myname,
            message : req.body.content,
            seen : "false",
        });
        hislistmessage.save((err, document) => {
            if (err) {
                return res.status(500).send({ message: err });
            }
            res.status(201).send({ message: "Message was sent successfully!" });
        });
    });


    
}

exports.getListMessages = (req, res) => {
    let mymess;
    try{
        mymess = mongoose.model("messages" + req.params.id);
    }catch(err){
        mymess = mongoose.model(
            "messages" + req.params.id,
            new mongoose.Schema({
                _id: mongoose.Schema.Types.ObjectId,
                id : { type: String, required: true },
                name : { type: String, required: true},
                message : { type: String, required: false},
                seen : { type: String, required: true},
            })
        );
    }

    mymess.find().exec((err, mess) => {
        if(err){
            res.status(500).send(err);
        }
        var response = [];
        mess.forEach(m => {
            let data = {
                path: m.id,
                message: m.message,
                title: m.name,
                icon: 'users_circle-08',
                class: '',
                seen : m.seen
              };
              response.push(data);
        })
        res.status(201).send(response.reverse());
    })
}

exports.getAllPosts = (req, res) => {
     //######################################################################################
    // get my friends ...
    let friends = [];
    let amis;
    try{
        amis = mongoose.model("friends" + req.params.id);
    }catch(err){
        amis = mongoose.model(
            "friends" + req.params.id,
            new mongoose.Schema({
                _id: mongoose.Schema.Types.ObjectId,
                id : { type: String, required: true },
                name : { type: String, required: true},
            })
        );
    }
    
    amis.find().exec().then(users => {
        users.forEach((user) => {
            friends.push(user.id);
        });
    }).catch(err => {
        friends = [];
    });

    var response = [];
    Post.find().exec((err, posts) => {
        if(err){
            res.status(500).send(err);
        }
        posts.forEach((post) => {
            if(friends.indexOf(post.idposter) != -1 || post.idposter == req.params.id){
                response.push(post);
            }
        });
        res.status(201).send(response.reverse());
    });
}

exports.commentPost = (req, res) => {
    let posts;
        try{
            posts = mongoose.model("posts" + req.body.idposter);
        }catch(err){
            posts = mongoose.model(
                "posts" + req.body.idposter,
                new mongoose.Schema({
                    _id: mongoose.Schema.Types.ObjectId,
                    content : { type: String, required: true },
                    date : { type: String, required: true },
                    comments : { type: [], required: false },
                    likes : { type: [], required: false },
                    loves : { type: [], required: false },
                })
            );
        }
        let notif;
        try{
            notif = mongoose.model("notifications" + req.body.idposter);
        }catch(err){
            notif = mongoose.model(
                "notifications" + req.body.idposter,
                new mongoose.Schema({
                    _id: mongoose.Schema.Types.ObjectId,
                    id : { type: String, required: true },
                    name :  { type: String, required: false },
                    type : { type: String, required: true },
                    seen : { type: String, required: true },
                    date : { type: String, required: true },
                    secondid : { type: String, required: false },
                    thirdid : { type: String, required: false },
                })
            );
            
        }
    
    var newcomments = [];
    Post.findOne({
        idposter : req.body.idposter,
        idpost : req.body.idpost,
    }).exec((err, post) => {
        if(err){
            res.status(500).send(err);
        }
        let date1 = new Date();
        
        let dateLocale = date1.toLocaleString('en-US',{
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric'
        });
        newcomments = post.comments;
        var c = {
            idcommenter : req.body.idcommenter,
            comment : req.body.comment,
            namecommenter : req.body.myname,
            date : dateLocale
        }
        newcomments.push(c);
        Post.updateMany({idpost : req.body.idpost,},{ comments: newcomments }).exec((err, doc) => {
            if(err){
                res.status(500).send(err);
            }
            
            //return res.status(200).send({ message: "Offer updated" });
        }); 

        posts.updateMany({ _id : req.body.idpost },{ comments: newcomments }).exec((err, doc) => {
            if(err){
                res.status(500).send(err);
            }
            //return res.status(200).send({ message: "Offer updated" });
            if(req.body.idposter != req.body.idcommenter){
                let date1 = new Date();
        
                let dateLocale = date1.toLocaleString('en-US',{
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric'
                });
                const n = new notif({
                    _id: new db.mongoose.Types.ObjectId(),
                    id: req.body.idcommenter,
                    name : req.body.myname,
                    type : "comment",
                    seen : "false",
                    date: dateLocale
                });
                n.save((err, document) => {
                    if (err) {
                        return res.status(500).send({ message: err });
                    }
                    res.status(201).send({ message: "Comment was saved successfully!" });
                });
            }else{
                res.status(201).send({ message: "Comment was saved successfully!" });

            }
            
        });
    })        
}


exports.unLikePost = (req, res) => {
    let posts;
        try{
            posts = mongoose.model("posts" + req.body.idposter);
        }catch(err){
            posts = mongoose.model(
                "posts" + req.body.idposter,
                new mongoose.Schema({
                    _id: mongoose.Schema.Types.ObjectId,
                    content : { type: String, required: true },
                    date : { type: String, required: true },
                    comments : { type: [], required: false },
                    likes : { type: [], required: false },
                    loves : { type: [], required: false },
                })
            );
        }
        
    
    var newlikes = [];
    Post.findOne({
        idposter : req.body.idposter,
        idpost : req.body.idpost,
    }).exec((err, post) => {
        if(err){
            res.status(500).send(err);
        }
        newlikes = post.likes;
        newlikes.splice(newlikes.indexOf(req.body.idliker),1);
        Post.updateMany({idpost : req.body.idpost,},{ likes: newlikes }).exec((err, doc) => {
            if(err){
                res.status(500).send(err);
            }
            
            //return res.status(200).send({ message: "Offer updated" });
        }); 

        posts.updateMany({ _id : req.body.idpost },{ likes: newlikes }).exec((err, doc) => {
            if(err){
                res.status(500).send(err);
            }
            
            res.status(201).send({ message: "Like was canceled successfully!" });

        });
    })        
}

exports.unLovePost = (req, res) => {
    let posts;
        try{
            posts = mongoose.model("posts" + req.body.idposter);
        }catch(err){
            posts = mongoose.model(
                "posts" + req.body.idposter,
                new mongoose.Schema({
                    _id: mongoose.Schema.Types.ObjectId,
                    content : { type: String, required: true },
                    date : { type: String, required: true },
                    comments : { type: [], required: false },
                    likes : { type: [], required: false },
                    loves : { type: [], required: false },
                })
            );
        }
        
    
    var newloves = [];
    Post.findOne({
        idposter : req.body.idposter,
        idpost : req.body.idpost,
    }).exec((err, post) => {
        if(err){
            res.status(500).send(err);
        }
        newloves = post.loves;
        newloves.splice(newloves.indexOf(req.body.idlover),1);
        Post.updateMany({idpost : req.body.idpost,},{ loves: newloves }).exec((err, doc) => {
            if(err){
                res.status(500).send(err);
            }
            
            //return res.status(200).send({ message: "Offer updated" });
        }); 

        posts.updateMany({ _id : req.body.idpost },{ loves: newloves }).exec((err, doc) => {
            if(err){
                res.status(500).send(err);
            }
            
            res.status(201).send({ message: "Love was canceled successfully!" });

        });
    })        
}


exports.lovePost = (req, res) => {
    let posts;
        try{
            posts = mongoose.model("posts" + req.body.idposter);
        }catch(err){
            posts = mongoose.model(
                "posts" + req.body.idposter,
                new mongoose.Schema({
                    _id: mongoose.Schema.Types.ObjectId,
                    content : { type: String, required: true },
                    date : { type: String, required: true },
                    comments : { type: [], required: false },
                    likes : { type: [], required: false },
                    loves : { type: [], required: false },
                })
            );
        }
        let notif;
        try{
            notif = mongoose.model("notifications" + req.body.idposter);
        }catch(err){
            notif = mongoose.model(
                "notifications" + req.body.idposter,
                new mongoose.Schema({
                    _id: mongoose.Schema.Types.ObjectId,
                    id : { type: String, required: true },
                    name :  { type: String, required: false },
                    type : { type: String, required: true },
                    seen : { type: String, required: true },
                    date : { type: String, required: true },
                    secondid : { type: String, required: false },
                    thirdid : { type: String, required: false },
                })
            );
            
        }
    
    var newloves = [];
    Post.findOne({
        idposter : req.body.idposter,
        idpost : req.body.idpost,
    }).exec((err, post) => {
        if(err){
            res.status(500).send(err);
        }
        newloves = post.loves;
        newloves.push(req.body.idlover);
        Post.updateMany({idpost : req.body.idpost,},{ loves: newloves }).exec((err, doc) => {
            if(err){
                res.status(500).send(err);
            }
            
            //return res.status(200).send({ message: "Offer updated" });
        }); 

        posts.updateMany({ _id : req.body.idpost },{ loves: newloves }).exec((err, doc) => {
            if(err){
                res.status(500).send(err);
            }
            //return res.status(200).send({ message: "Offer updated" });
            if(req.body.idposter != req.body.idlover){
                let date1 = new Date();
        
                let dateLocale = date1.toLocaleString('en-US',{
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric'
                });
                const n = new notif({
                    _id: new db.mongoose.Types.ObjectId(),
                    id: req.body.idlover,
                    name : req.body.myname,
                    type : "love",
                    seen : "false",
                    date: dateLocale
                });
                n.save((err, document) => {
                    if (err) {
                        return res.status(500).send({ message: err });
                    }
                    res.status(201).send({ message: "Love was saved successfully!" });
                });
            }else{
                res.status(201).send({ message: "Love was saved successfully!" });
            }
            

        });
    })        
}

exports.likePost = (req, res) => {
    let posts;
        try{
            posts = mongoose.model("posts" + req.body.idposter);
        }catch(err){
            posts = mongoose.model(
                "posts" + req.body.idposter,
                new mongoose.Schema({
                    _id: mongoose.Schema.Types.ObjectId,
                    content : { type: String, required: true },
                    date : { type: String, required: true },
                    comments : { type: [], required: false },
                    likes : { type: [], required: false },
                    loves : { type: [], required: false },
                })
            );
        }
        let notif;
        try{
            notif = mongoose.model("notifications" + req.body.idposter);
        }catch(err){
            notif = mongoose.model(
                "notifications" + req.body.idposter,
                new mongoose.Schema({
                    _id: mongoose.Schema.Types.ObjectId,
                    id : { type: String, required: true },
                    name :  { type: String, required: false },
                    type : { type: String, required: true },
                    seen : { type: String, required: true },
                    date : { type: String, required: true },
                    secondid : { type: String, required: false },
                    thirdid : { type: String, required: false },
                })
            );
            
        }
    
    var newlikes = [];
    console.log(req.body);
    Post.findOne({
        idposter : req.body.idposter,
        idpost : req.body.idpost,
    }).exec((err, post) => {
        if(err){
            res.status(500).send(err);
        }
        newlikes = post.likes;
        newlikes.push(req.body.idliker);
        Post.updateMany({idpost : req.body.idpost,},{ likes: newlikes }).exec((err, doc) => {
            if(err){
                res.status(500).send(err);
            }
            
            //return res.status(200).send({ message: "Offer updated" });
        }); 

        posts.updateMany({ _id : req.body.idpost },{ likes: newlikes }).exec((err, doc) => {
            if(err){
                res.status(500).send(err);
            }
            //return res.status(200).send({ message: "Offer updated" });
            if(req.body.idposter != req.body.idliker){
                let date1 = new Date();
        
                let dateLocale = date1.toLocaleString('en-US',{
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric'
                });
                const n = new notif({
                    _id: new db.mongoose.Types.ObjectId(),
                    id: req.body.idliker,
                    name : req.body.myname,
                    type : "like",
                    seen : "false",
                    date: dateLocale
                });
                n.save((err, document) => {
                    if (err) {
                        return res.status(500).send({ message: err });
                    }
                    res.status(201).send({ message: "Like was saved successfully!" });
                });
            }else{
                res.status(201).send({ message: "Like was saved successfully!" });
            }
            

        });
    })        
}

exports.getName = (req, res) => {
    User.findOne({_id : req.params.id}).exec((err, user) => {
        if(err){
            res.status(500).send(err);
        }
        res.status(201).send({name : user.name});
    })
}

exports.getStatus = async (req, res) => {
    const friends = [];
    const sentinv = [];
    const invi = [];
    //######################################################################################
    // get my friends ...
    let amis;
    try{
        amis = mongoose.model("friends" + req.body.myid);
    }catch(err){
        amis = mongoose.model(
            "friends" + req.body.myid,
            new mongoose.Schema({
                _id: mongoose.Schema.Types.ObjectId,
                id : { type: String, required: true },
                name : { type: String, required: true},
            })
        );
    }
    
    await amis.find().exec().then(users => {
        users.forEach((user) => {
            friends.push(user.id);
        });
    }).catch(err => {
        friends = [];
    });
    //console.log(friends);
    //######################################################################################
    //get person that I sent invitation...
    let sent;
    try{
        sent = mongoose.model("sentinvitations" + req.body.myid);
    }catch(err){
        sent = mongoose.model(
            "sentinvitations" + req.body.myid,
            new mongoose.Schema({
                _id: mongoose.Schema.Types.ObjectId,
                id : { type: String, required: true },
                name : { type: String, required: true},
                date : { type: String, required: true}
            })
        );
    }
    await sent.find().exec().then(users => {
        users.forEach((user) => {
            sentinv.push(user.id);
        });
    }).catch(err => {
        sentinv = [];
    });
    //console.log(sentinv);
    //######################################################################################
    //get persons who sent me an invitation...
    let inv;
    try{
        inv = mongoose.model("invitations" + req.body.myid);
    }catch(err){
        inv = mongoose.model(
            "invitations" + req.body.myid,
            new mongoose.Schema({
                _id: mongoose.Schema.Types.ObjectId,
                id : { type: String, required: true },
                name : { type: String, required: true},
                date : { type: String, required: true}
            })
        );
    }
    inv.find().exec().then(users => {
        users.forEach((user) => {
            invi.push(user.id);
        });
        let hisid = req.body.hisid;
        if(friends.indexOf(hisid) != -1){
            res.status(201).send({status : "friend"});
        }else if(sentinv.indexOf(hisid) != -1){
            res.status(201).send({status : "pending"});
        }else if(invi.indexOf(hisid) != -1){
            res.status(201).send({status : "invi"});
        }else{
            res.status(201).send({status : "user"});
        }
    }).catch(err => {
        invi = [];
    });
}

exports.getFriends = async (req, res) => {
    
    const friends = [];
    const sentinv = [];
    const invi = [];
    //##############################################################################
    // get my friends ...
    let amis;
    try{
        amis = mongoose.model("friends" + req.body.myid);
    }catch(err){
        amis = mongoose.model(
            "friends" + req.body.myid,
            new mongoose.Schema({
                _id: mongoose.Schema.Types.ObjectId,
                id : { type: String, required: true },
                name : { type: String, required: true},
            })
        );
    }
    
    await amis.find().exec().then(users => {
        users.forEach((user) => {
            friends.push(user.id);
        });
    }).catch(err => {
        friends = [];
    });
    //console.log(friends);
    //######################################################################################
    //get person that I sent invitation...
    let sent;
    try{
        sent = mongoose.model("sentinvitations" + req.body.myid);
    }catch(err){
        sent = mongoose.model(
            "sentinvitations" + req.body.myid,
            new mongoose.Schema({
                _id: mongoose.Schema.Types.ObjectId,
                id : { type: String, required: true },
                name : { type: String, required: true},
                date : { type: String, required: true}
            })
        );
    }
    await sent.find().exec().then(users => {
        users.forEach((user) => {
            sentinv.push(user.id);
        });
    }).catch(err => {
        sentinv = [];
    });
    //console.log(sentinv);
    //######################################################################################
    //get persons who sent me an invitation...
    let inv;
    try{
        inv = mongoose.model("invitations" + req.body.myid);
    }catch(err){
        inv = mongoose.model(
            "invitations" + req.body.myid,
            new mongoose.Schema({
                _id: mongoose.Schema.Types.ObjectId,
                id : { type: String, required: true },
                name : { type: String, required: true},
                date : { type: String, required: true}
            })
        );
    }
    await inv.find().exec().then(users => {
        users.forEach((user) => {
            invi.push(user.id);
        });
    }).catch(err => {
        invi = [];
    });
    //############################################################################################
    //get his friends
    let hisfr;
    try{
        hisfr = mongoose.model("friends" + req.body.hisid);
    }catch(err){
        hisfr = mongoose.model(
            "friends" + req.body.hisid,
            new mongoose.Schema({
                _id: mongoose.Schema.Types.ObjectId,
                id : { type: String, required: true },
                name : { type: String, required: true}
            })
        );
    }

    hisfr.find().exec((err, users) => {
        if(err){
            res.status(500).send(err);
        }
        const response = [];
        
        //traitement
        users.forEach((user) => {
            if(user.id != req.body.myid){
                if(friends.indexOf(user.id) != -1){
                    response.push({
                        id : user.id,
                        name : user.name,
                        status : "friend"
                    });
                }else if(sentinv.indexOf(user.id) != -1){
                    response.push({
                        id : user.id,
                        name : user.name,
                        status : "pending"
                    });
                }else if(invi.indexOf(user.id) != -1){
                    response.push({
                        id : user.id,
                        name : user.name,
                        status : "invi"
                    });
                }else{
                    response.push({
                        id : user.id,
                        name : user.name,
                        status : "user"
                    });
                }
            }else{
                response.push({
                    id : user.id,
                    name : user.name,
                    status : "me"
                });
            }
        });
        res.status(200).send(response);
    });
    
}

exports.getMyPosts = (req, res) => {
    let myposts;
    try{
        myposts = mongoose.model("posts" + req.params.id);
    }catch(err){
        myposts = mongoose.model(
            "posts" + req.params.id,
            new mongoose.Schema({
                _id: mongoose.Schema.Types.ObjectId,
                content : { type: String, required: true },
                date : { type: String, required: true },
                comments : { type: [], required: false },
                likes : { type: [], required: false },
                loves : { type: [], required: false },
            })
        );
    }

    myposts.find().exec((err, doc) => {
        if(err){
            res.status(500).send(err);
        }
        res.status(201).send(doc.reverse());
    })
}

exports.createPost = (req, res) => {
    let date1 = new Date();

    let dateLocale = date1.toLocaleString('en-US',{
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric'
        });
    

    let myposts;
    try{
        myposts = mongoose.model("posts" + req.body.idposter);
    }catch(err){
        myposts = mongoose.model(
            "posts" + req.body.idposter,
            new mongoose.Schema({
                _id: mongoose.Schema.Types.ObjectId,
                content : { type: String, required: true },
                date : { type: String, required: true },
                comments : { type: [], required: false },
                likes : { type: [], required: false },
                loves : { type: [], required: false },
            })
        );
    }

    const p = new myposts({
        _id : new db.mongoose.Types.ObjectId(),
        date : dateLocale,
        content : req.body.content,
        comments : [],
        likes : [],
        loves : []
    });

    p.save((err, doc) => {
        if(err){
            res.status(500).send(err);
        }
        var post = new Post({
            _id : new db.mongoose.Types.ObjectId(),
            nameposter : req.body.nameposter,
            idposter : req.body.idposter,
            idpost : doc._id,
            date : dateLocale,
            content : req.body.content,
            comments : [],
            likes : [],
            loves : []
        });
    
        post.save((err, doc) => {
            if(err){
                res.status(500).send(err);
            }
            res.status(201).send(doc);
        });
    });


}

exports.changePassword = (req, res) => {
    User.findOne({_id : req.body.id}).exec((err, user) => {
        if(err){
            res.status(500).send(err);
        }
        var passwordIsValid = bcrypt.compareSync(req.body.oldpass, user.password);

        if (!passwordIsValid) {
            return res.status(401).send({
                message: "Invalid Password !"
            });
        }else{
            bcrypt.hash(req.body.newpass, 10, (err, hash) => {
                if (err) {
                    return res.status(500).json({
                        message: err
                    });
                } else {
                    User.updateOne({_id : req.body.id}, {password : hash}).exec((err, doc) => {
                        if(err){
                            res.status(500).send(err);
                        }
                        res.status(201).send({message : "Password changed !"});
                    });
                }
            
            });
        }
    });
}

exports.getMyFriends = (req, res) => {
    let myfr;
    try{
        myfr = mongoose.model("friends" + req.params.id);
    }catch(err){
        myfr = mongoose.model(
            "friends" + req.params.id,
            new mongoose.Schema({
                _id: mongoose.Schema.Types.ObjectId,
                id : { type: String, required: true },
                name : { type: String, required: true}
            })
        );
    }

    myfr.find().exec((err, doc) => {
        if(err){
            res.status(500).send(err);
        }
        res.status(201).send(doc.reverse());
    })
}

exports.getNotifications = (req, res) => {
    let notif;
    try{
        notif = mongoose.model("notifications" + req.params.id);
    }catch(err){
        notif = mongoose.model(
            "notifications" + req.params.id,
            new mongoose.Schema({
                _id: mongoose.Schema.Types.ObjectId,
                id : { type: String, required: true },
                name :  { type: String, required: false },
                type : { type: String, required: true },
                seen : { type: String, required: true },
                date : { type: String, required: true },
                secondid : { type: String, required: false },
                thirdid : { type: String, required: false },
            })
        );
        
    }

    
    notif.find().exec((err, doc) => {
        if(err){
            res.status(500).send(err);
        }
        notif.updateMany({seen : 'false'}, {seen : 'true'}).exec((err, doc) => {
            if(err){
                res.status(500).send(err);
            }
        });
        res.status(200).send(doc.reverse());
    });
}

exports.cancelInvitation = (req, res) => {
    let sent;
    try{
        sent = mongoose.model("sentinvitations" + req.body.id);
    }catch(err){
        sent = mongoose.model(
            "sentinvitations" + req.body.id,
            new mongoose.Schema({
                _id: mongoose.Schema.Types.ObjectId,
                id : { type: String, required: true },
                name : { type: String, required: true},
                date : { type: String, required: true}
            })
        );
    }
    sent.deleteMany({id: req.body.friendid}).exec()
    .then(() => {
        
    }).catch(err => {
        res.status(500).send({ message: err });
    });

    let inv;
    try{
        inv = mongoose.model("invitations" + req.body.friendid);
    }catch(err){
        inv = mongoose.model(
            "invitations" + req.body.friendid,
            new mongoose.Schema({
                _id: mongoose.Schema.Types.ObjectId,
                id : { type: String, required: true },
                name : { type: String, required: true},
                date : { type: String, required: true}
            })
        );
    }
    inv.deleteMany({id: req.body.id}).exec()
    .then(() => {
        res.status(201).send({ message: "Invitation was canceled successfully!" });
    }).catch(err => {
        res.status(500).send({ message: err });
    });
    

}

exports.deleteInvitation = (req, res) => {
    let sent;
    try{
        sent = mongoose.model("sentinvitations" + req.body.friendid);
    }catch(err){
        sent = mongoose.model(
            "sentinvitations" + req.body.friendid,
            new mongoose.Schema({
                _id: mongoose.Schema.Types.ObjectId,
                id : { type: String, required: true },
                name : { type: String, required: true},
                date : { type: String, required: true}
            })
        );
    }
    sent.deleteMany({id: req.body.id}).exec()
    .then(() => {
        
    }).catch(err => {
        res.status(500).send({ message: err });
    });
    
    let inv;
    try{
        inv = mongoose.model("invitations" + req.body.id);
    }catch(err){
        inv = mongoose.model(
            "invitations" + req.body.id,
            new mongoose.Schema({
                _id: mongoose.Schema.Types.ObjectId,
                id : { type: String, required: true },
                name : { type: String, required: true},
                date : { type: String, required: true}
            })
        );
    }
    inv.deleteMany({id: req.body.friendid}).exec()
    .then(() => {
        res.status(201).send({ message: "Invitation was deleted successfully!" });
    }).catch(err => {
        res.status(500).send({ message: err });
    });
    

}

exports.acceptInvitation = (req, res) => {
    
    let sent;
    try{
        sent = mongoose.model("sentinvitations" + req.body.friendid);
    }catch(err){
        sent = mongoose.model(
            "sentinvitations" + req.body.friendid,
            new mongoose.Schema({
                _id: mongoose.Schema.Types.ObjectId,
                id : { type: String, required: true },
                name : { type: String, required: true},
                date : { type: String, required: true}
            })
        );
    }
    sent.deleteMany({id: req.body.id}).exec()
    .then(() => {
        
    }).catch(err => {
        res.status(500).send({ message: err });
    });
    
    let inv;
    try{
        inv = mongoose.model("invitations" + req.body.id);
    }catch(err){
        inv = mongoose.model(
            "invitations" + req.body.id,
            new mongoose.Schema({
                _id: mongoose.Schema.Types.ObjectId,
                id : { type: String, required: true },
                name : { type: String, required: true},
                date : { type: String, required: true}
            })
        );
    }
    inv.deleteMany({id: req.body.friendid}).exec()
    .then(() => {

    }).catch(err => {
        res.status(500).send({ message: err });
    });
    
    let myfr;
    try{
        myfr = mongoose.model("friends" + req.body.id);
    }catch(err){
        myfr = mongoose.model(
            "friends" + req.body.id,
            new mongoose.Schema({
                _id: mongoose.Schema.Types.ObjectId,
                id : { type: String, required: true },
                name : { type: String, required: true}
            })
        );
    }

    
    const friend = new myfr({
        _id: new db.mongoose.Types.ObjectId(),
        id: req.body.friendid,
        name : req.body.hisname
    });
    friend.save((err, document) => {
        if (err) {
            return res.status(500).send({ message: err });
        }
        
    });

    let fr;
    try{
        fr = mongoose.model("friends" + req.body.friendid);
    }catch(err){
        fr = mongoose.model(
            "friends" + req.body.friendid,
            new mongoose.Schema({
                _id: mongoose.Schema.Types.ObjectId,
                id : { type: String, required: true },
                name : { type: String, required: true}
            })
        );
    }

    const moi = new fr({
        _id: new db.mongoose.Types.ObjectId(),
        id: req.body.id,
        name : req.body.myname
    });
    moi.save((err, document) => {
        if (err) {
            return res.status(500).send({ message: err });
        }
        
    });

    let mymess;
    try{
        mymess = mongoose.model("messages" + req.body.id);
    }catch(err){
        mymess = mongoose.model(
            "messages" + req.body.id,
            new mongoose.Schema({
                _id: mongoose.Schema.Types.ObjectId,
                id : { type: String, required: true },
                name : { type: String, required: true},
                message : { type: String, required: false},
                seen : { type: String, required: true},
            })
        );
    }

    
    const mymessages = new mymess({
        _id: new db.mongoose.Types.ObjectId(),
        id: req.body.friendid,
        name : req.body.hisname,
        message : "",
        seen : "true"
    });
    

    let hismess;
    try{
        hismess = mongoose.model("messages" + req.body.friendid);
    }catch(err){
        hismess = mongoose.model(
            "messages" + req.body.friendid,
            new mongoose.Schema({
                _id: mongoose.Schema.Types.ObjectId,
                id : { type: String, required: true },
                name : { type: String, required: true},
                message : { type: String, required: false},
                seen : { type: String, required: true},
            })
        );
    }

    
    const hismessages = new hismess({
        _id: new db.mongoose.Types.ObjectId(),
        id: req.body.id,
        name : req.body.myname,
        message : "",
        seen : "true"
    });
    
    

    let notif;
    try{
        notif = mongoose.model("notifications" + req.body.friendid);
    }catch(err){
        notif = mongoose.model(
            "notifications" + req.body.friendid,
            new mongoose.Schema({
                _id: mongoose.Schema.Types.ObjectId,
                id : { type: String, required: true },
                name :  { type: String, required: false },
                type : { type: String, required: true },
                seen : { type: String, required: true },
                date : { type: String, required: true },
                secondid : { type: String, required: false },
                thirdid : { type: String, required: false },
            })
        );
        
    }

    let date1 = new Date();

    let dateLocale = date1.toLocaleString('en-US',{
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric'
        });
        const n = new notif({
            _id: new db.mongoose.Types.ObjectId(),
            id: req.body.id,
            name : req.body.myname,
            type : "accept",
            seen : "false",
            date: dateLocale
        });
        mymessages.save((err, document) => {
            if (err) {
                return res.status(500).send({ message: err });
            }
            hismessages.save((err, document) => {
                if (err) {
                    return res.status(500).send({ message: err });
                }
                n.save((err, document) => {
                    if (err) {
                        return res.status(500).send({ message: err });
                    }
                    res.status(201).send({ message: "Invitation was accepted successfully!" });
                });
            });
        });
        
}

exports.getInvitations = async (req, res) => {
    let inv;
    try{
        inv = mongoose.model("invitations" + req.params.id);
    }catch(err){
        inv = mongoose.model(
            "invitations" + req.params.id,
            new mongoose.Schema({
                _id: mongoose.Schema.Types.ObjectId,
                id : { type: String, required: true },
                name : { type: String, required: true},
                date : { type: String, required: true}
            })
        );
    }
    
    inv.find().exec((err, doc) => {
        if(err){
            res.status(500).send(err);
        }
        res.status(201).send(doc);
    });
    
}

exports.getNbHome =  async (req, res) => {
    
    
    var result = {
        invi : 0,
        notif : 0,
        messages : 0
    }
    let inv;
    try{
        inv = mongoose.model("invitations" + req.params.id);
    }catch(err){
        inv = mongoose.model(
            "invitations" + req.params.id,
            new mongoose.Schema({
                _id: mongoose.Schema.Types.ObjectId,
                id : { type: String, required: true },
                name : { type: String, required: true},
                date : { type: String, required: true}
            })
        );
    }
    let notif;
    try{
        notif = mongoose.model("notifications" + req.params.id);
    }catch(err){
        notif = mongoose.model(
            "notifications" + req.params.id,
            new mongoose.Schema({
                _id: mongoose.Schema.Types.ObjectId,
                id : { type: String, required: true },
                name :  { type: String, required: false },
                type : { type: String, required: true },
                seen : { type: String, required: true },
                date : { type: String, required: true },
                secondid : { type: String, required: false },
                thirdid : { type: String, required: false },
            })
        );
        
    }
    let mylistmess;
    try{
        mylistmess = mongoose.model("messages" + req.params.id);
    }catch(err){
        mylistmess = mongoose.model(
            "messages" + req.params.id,
            new mongoose.Schema({
                _id: mongoose.Schema.Types.ObjectId,
                id : { type: String, required: true },
                name : { type: String, required: true},
                message : { type: String, required: false},
                seen : { type: String, required: true},
            })
        );
    }
    const count = await inv.countDocuments({});
    result.invi = count;
    const count2 = await notif.countDocuments({seen : 'false'});
    result.notif = count2;
    const count3 = await mylistmess.countDocuments({seen : 'false'});
    result.messages = count3;
    res.status(201).send(result);
    
    
}

exports.getNb =  async (req, res) => {
    
    
    var result = {
        invi : 0,
        notif : 0,
        messages : 0
    }
    let inv;
    try{
        inv = mongoose.model("invitations" + req.params.id);
    }catch(err){
        inv = mongoose.model(
            "invitations" + req.params.id,
            new mongoose.Schema({
                _id: mongoose.Schema.Types.ObjectId,
                id : { type: String, required: true },
                name : { type: String, required: true},
                date : { type: String, required: true}
            })
        );
    }
    let notif;
    try{
        notif = mongoose.model("notifications" + req.params.id);
    }catch(err){
        notif = mongoose.model(
            "notifications" + req.params.id,
            new mongoose.Schema({
                _id: mongoose.Schema.Types.ObjectId,
                id : { type: String, required: true },
                name :  { type: String, required: false },
                type : { type: String, required: true },
                seen : { type: String, required: true },
                date : { type: String, required: true },
                secondid : { type: String, required: false },
                thirdid : { type: String, required: false },
            })
        );
        
    }
    
    const count = await inv.countDocuments({});
    result.invi = count;
    const count2 = await notif.countDocuments({seen : 'false'});
    result.notif = count2;
    res.status(201).send(result);
    
    
}
exports.sendInvitation = (req, res) => {
    let sent;
    try{
        sent = mongoose.model("sentinvitations" + req.body.id);
    }catch(err){
        sent = mongoose.model(
            "sentinvitations" + req.body.id,
            new mongoose.Schema({
                _id: mongoose.Schema.Types.ObjectId,
                id : { type: String, required: true },
                name : { type: String, required: true},
                date : { type: String, required: true}
            })
        );
    }
    sent.deleteMany({id: req.body.friendid}).exec()
    .then(() => {
        
    }).catch(err => {
        res.status(500).send({ message: err });
    });
    let date1 = new Date();

    let dateLocale = date1.toLocaleString('en-US',{
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric'
        });
    const invitation = new sent({
        _id: new db.mongoose.Types.ObjectId(),
        id: req.body.friendid,
        name : req.body.hisname,
        date : dateLocale
    });
    invitation.save((err, document) => {
        if (err) {
            return res.status(500).send({ message: err });
        }
    });

    let inv;
    try{
        inv = mongoose.model("invitations" + req.body.friendid);
    }catch(err){
        inv = mongoose.model(
            "invitations" + req.body.friendid,
            new mongoose.Schema({
                _id: mongoose.Schema.Types.ObjectId,
                id : { type: String, required: true },
                name : { type: String, required: true},
                date : { type: String, required: true}
            })
        );
    }
    inv.deleteMany({id: req.body.id}).exec()
    .then(() => {
        
    }).catch(err => {
        res.status(500).send({ message: err });
    });
    const invita = new inv({
        _id: new db.mongoose.Types.ObjectId(),
        id: req.body.id,
        name : req.body.myname,
        date : dateLocale
    });
    invita.save((err, document) => {
        if (err) {
            return res.status(500).send({ message: err });
        }
        res.status(201).send({ message: "Friend was added successfully!" });
    });
}

exports.searchUser = (req, res) => {
    const friends = [];
    const sentinv = [];
    const invi = [];
    //######################################################################################
    // get my friends ...
    let amis;
    try{
        amis = mongoose.model("friends" + req.body.id);
    }catch(err){
        amis = mongoose.model(
            "friends" + req.body.id,
            new mongoose.Schema({
                _id: mongoose.Schema.Types.ObjectId,
                id : { type: String, required: true },
                name : { type: String, required: true},
            })
        );
    }
    
    amis.find().exec().then(users => {
        users.forEach((user) => {
            friends.push(user.id);
        });
    }).catch(err => {
        friends = [];
    });
    //console.log(friends);
    //######################################################################################
    //get person that I sent invitation...
    let sent;
    try{
        sent = mongoose.model("sentinvitations" + req.body.id);
    }catch(err){
        sent = mongoose.model(
            "sentinvitations" + req.body.id,
            new mongoose.Schema({
                _id: mongoose.Schema.Types.ObjectId,
                id : { type: String, required: true },
                name : { type: String, required: true},
                date : { type: String, required: true}
            })
        );
    }
    sent.find().exec().then(users => {
        users.forEach((user) => {
            sentinv.push(user.id);
        });
    }).catch(err => {
        sentinv = [];
    });
    //console.log(sentinv);
    //######################################################################################
    //get persons who sent me an invitation...
    let inv;
    try{
        inv = mongoose.model("invitations" + req.body.id);
    }catch(err){
        inv = mongoose.model(
            "invitations" + req.body.id,
            new mongoose.Schema({
                _id: mongoose.Schema.Types.ObjectId,
                id : { type: String, required: true },
                name : { type: String, required: true},
                date : { type: String, required: true}
            })
        );
    }
    inv.find().exec().then(users => {
        users.forEach((user) => {
            invi.push(user.id);
        });
    }).catch(err => {
        invi = [];
    });
    //console.log(sentinv);
    //######################################################################################
    User.find({ ["name"]: { $regex: new RegExp(req.body.info , "i") }}).exec()
        .then(users => {
            const response = [];
            
            //Traitement des résultats
            users.forEach((user) => {
                if(user._id != req.body.id){
                    if(friends.indexOf(user.id) != -1){
                        response.push({
                            id : user._id,
                            name : user.name,
                            status : "friend"
                        });
                    }else if(sentinv.indexOf(user.id) != -1){
                        response.push({
                            id : user._id,
                            name : user.name,
                            status : "pending"
                        });
                    }else if(invi.indexOf(user.id) != -1){
                        response.push({
                            id : user._id,
                            name : user.name,
                            status : "invi"
                        });
                    }else{
                        response.push({
                            id : user._id,
                            name : user.name,
                            status : "user"
                        });
                    }
                }else{
                    response.push({
                        id : user._id,
                        name : user.name,
                        status : "me"
                    });
                }
            });
            res.status(200).send(response);
        }).catch(err => {
            res.status(500).send({ message: err });
        });
}

