const express = require('express');
const Routes = express.Router();
console.log("Routes connected");
const multer = require('multer');
const file = multer.diskStorage({
    destination: (req, res, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }  
})
const imageuploads = multer({ storage: file }).single('image');
const adminController = require('../controller/admincontroller');
const passport = require('passport');
Routes.get('/',adminController.login);
Routes.get('/register',adminController.register);
Routes.get('/dashboard',passport.checkAuthentication,adminController.dashboard);
Routes.post('/registerData',adminController.registerData);
Routes.post('/loginData',passport.authenticate('local',{failureRedirect : '/'}),adminController.loginData);
Routes.get('/logout',adminController.logout);
Routes.get('/profile',adminController.profile);
Routes.post('/updateProfile',adminController.updateProfile);
Routes.get('/viewCategory',adminController.viewCategory);
Routes.get('/addCategory',adminController.addCategory);
Routes.post('/addcategoryData',adminController.addcategoryData);
Routes.get('/deleteData',adminController.deleteData);
Routes.get('/editData',adminController.editData);
Routes.get('/addsubCategory',adminController.addsubCategory);
Routes.get('/viewsubCategory',adminController.viewsubCategory);
Routes.post('/addPostsubcategory',adminController.addPostsubcategory);
Routes.post('/updateCategory',adminController.updateCategory);
Routes.get('/deleteSubcategory',adminController.deleteSubcategory);
Routes.get('/addproduct',adminController.addproduct);
Routes.get('/viewproduct',adminController.viewproduct);
Routes.post('/productInsertData',imageuploads,adminController.productInsertData);
Routes.get('/DeleteProduct',adminController.DeleteProduct);
Routes.get('/buyProduct',adminController.buyProduct);
Routes.get('/confirmOrder',adminController.confirmOrder);
module.exports = Routes;  