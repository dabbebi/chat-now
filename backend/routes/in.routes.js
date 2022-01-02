const express = require("express");
const router = express.Router();

const { authJwt } = require("../middlewares");
const controller = require("../controllers/in.controller");


//Search for users
router.post("/search", authJwt.verifyToken, controller.searchUser);
//Add friend
router.post("/sendinvitation", authJwt.verifyToken, controller.sendInvitation);
//Cancel invitation
router.post("/cancelinvitation", authJwt.verifyToken, controller.cancelInvitation);
//Delete invitation
router.post("/deleteinvitation", authJwt.verifyToken, controller.deleteInvitation);
//Accept invitation
router.post("/acceptinvitation", authJwt.verifyToken, controller.acceptInvitation);
//Get nbre
router.get("/getnb/:id", authJwt.verifyToken, controller.getNb);
//Get nbre home
router.get("/getnbhome/:id", authJwt.verifyToken, controller.getNbHome);
//Get invitations
router.get("/getinvitations/:id", authJwt.verifyToken, controller.getInvitations);
//Get notifications
router.get("/getnotifications/:id", authJwt.verifyToken, controller.getNotifications);
//Get friends
router.get("/getmyfriends/:id", authJwt.verifyToken, controller.getMyFriends);
//Change password
router.post("/changepassword", authJwt.verifyToken, controller.changePassword);
//Create post
router.post("/createpost", authJwt.verifyToken, controller.createPost);
//Get my posts
router.get("/getmyposts/:id", authJwt.verifyToken, controller.getMyPosts);
//Get friends
router.post("/getfriends", authJwt.verifyToken, controller.getFriends);
//Get name
router.get("/getname/:id", authJwt.verifyToken, controller.getName);
//Get status
router.post("/getstatus", authJwt.verifyToken, controller.getStatus);
//Like a post
router.post("/likepost", authJwt.verifyToken, controller.likePost);
//Love a post
router.post("/lovepost", authJwt.verifyToken, controller.lovePost);
//unLike a post
router.post("/unlikepost", authJwt.verifyToken, controller.unLikePost);
//unLove a post
router.post("/unlovepost", authJwt.verifyToken, controller.unLovePost);
//Comment a post
router.post("/commentpost", authJwt.verifyToken, controller.commentPost);
//Get all posts
router.get("/getallposts/:id", authJwt.verifyToken, controller.getAllPosts);
//Get list messages
router.get("/getlistmessages/:id", authJwt.verifyToken, controller.getListMessages);
//Get messages
router.post("/getmessages", authJwt.verifyToken, controller.getMessages);
//Send message
router.post("/sendmessage", authJwt.verifyToken, controller.sendMessage);
//Write message
router.post("/writemessage", authJwt.verifyToken, controller.writeMessage);
//Get Write message
router.post("/getwritemessage", authJwt.verifyToken, controller.getWriteMessage);

module.exports = router;



