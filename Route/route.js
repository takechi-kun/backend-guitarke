const express = require('express');
const router  = express.Router();

const verifyToken = require('../Controller/SignIn/SignInController')
const SignInController = require('../Controller/SignIn/SignInController');
const SignUpController = require('../Controller/SignUp/SignUpController');
const verifyEmailToken = require("../Controller/SignUp/verifyEmailToken")
const ForgotPasswordController = require("../Controller/ForgotPassword/ForgotPasswordController")
const getSongDetail = require("../Controller/getSongDetail");
const getSearchSongs = require("../Controller/getSearchSongs");
const saveSong_Users = require("../Controller/Playlist/savedeleteThisSong_Users");
const deleteSong_Users = require("../Controller/Playlist/savedeleteThisSong_Users");
const checkExistSong_Users = require("../Controller/Playlist/savedeleteThisSong_Users");
const countPlayListSong_Users = require("../Controller/Playlist/getPlayListSong_Users")
const getAllSongPlayList_Users = require("../Controller/Playlist/getPlayListSong_Users")
const UpdatePassword = require("../Controller/UpdatePassword/UpdatePassword")
const updateYourTempo = require("../Controller/yourTempo");
const checkYourTempo = require("../Controller/yourTempo");

const getAllSong_Admin = require("../Controller/Admin/getAllSong_Admin")
const getAllUser_Admin = require("../Controller/Admin/getAllUser_Admin")
const getSong_Admin = require("../Controller/Admin/getSong_Admin");
const addSong_Admin = require("../Controller/Admin/addSong_Admin")
const updateSong_Admin = require("../Controller/Admin/updateSong_Admin");
const deleteSong_Admin = require("../Controller/Admin/deleteSong_Admin");


// Users
router.get('/verifyToken', verifyToken.verifyToken);
router.post('/signin', SignInController.SignInController);
router.post('/signup', SignUpController.SignUpController);
router.get('/verify_email/:user_id/:token', verifyEmailToken.verifyEmailToken);
router.put('/forgotpassword', ForgotPasswordController.ForgotPasswordController);
router.get('/getSongDetail/:songname/:artist', getSongDetail.getSongDetail)
router.get('/search_songs/:search', getSearchSongs.getSearchSongs)
router.post('/save/:username/:song_id',saveSong_Users.saveSong_Users);
router.delete('/delete/:username/:song_id',deleteSong_Users.deleteSong_Users);
router.get('/get/:username/:song_id', checkExistSong_Users.checkExistSong_Users);
router.get('/:username/countplaylist' , countPlayListSong_Users.countPlayListSong_Users);
router.get('/:username/getplaylist' , getAllSongPlayList_Users.getAllSongPlayList_Users);
router.put('/update_password', UpdatePassword.UpdatePassword);
router.put('/update_your_tempo/:username/:song_id', updateYourTempo.updateYourTempo);
router.get('/get_your_tempo/:username/:song_id', checkYourTempo.checkYourTempo);

// Admin
router.get('/getallsong_admin', getAllSong_Admin.getAllSong_Admin);
router.get('/getalluser_admin', getAllUser_Admin.getAllUser_Admin);
router.get('/getsong_admin/:song_id', getSong_Admin.getSong_Admin);
router.post('/addsong_admin', addSong_Admin.addSong_Admin);
router.put('/updatesong_admin/:song_id', updateSong_Admin.updateSong_Admin);
router.delete('/deleteSong_Admin/:song_id', deleteSong_Admin.deleteSong_Admin);


module.exports = router;