// All Schema
const registerSchema = require('../model/registerSchema');
const categorySchema = require('../model/categoryschema');
const subcategorySchema = require('../model/subcategoryschema');
const productSchema = require('../model/productSchema');
const path = require('path');
const cookieParser = require('cookie-parser');
const fs = require('fs');
const nodemailer = require('nodemailer');

const login = (req, res) => {
    if (res.locals.users) {
        return res.redirect('/dashboard');
    }
    return res.render('login');
}

const register = (req, res) => {
    return res.render('register');
}

const dashboard = (req, res) => {
    return res.render('dashboard');
}

const registerData = async (req, res) => {
    try {
        const { name, email, password, cpassword } = req.body;
        if (password == cpassword) {
            let User = await registerSchema.create({
                name: name,
                email: email,
                password: password
            })
            if (User) {
                console.log("User Registered");
                return res.redirect('/');
            }
            else {
                console.log("User not Registered");
                return res.redirect('back');
            }
        }
        else {
            console.log("Password and Confirm password are not same");
            return res.redirect('back');
        }
    }
    catch (error) {
        console.log(error);
        return false;
    }
}

const loginData = (req, res) => {
    return res.redirect('/dashboard');
}

const logout = (req, res) => {
    req.logOut((error) => {
        console.log(error);
        return false;
    })
    return res.redirect('/');
}

const profile = (req, res) => {
    return res.render('profile');
}

const updateProfile = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        console.log(name);
        console.log(email);
        let updateId = req.body.updateId;
        console.log(updateId);
        let Record = await registerSchema.findByIdAndUpdate(updateId, {
            name: name,
            email: email,
            password: password
        });
        if (Record) {
            console.log("Record Updated");
            return res.redirect('/dashboard');
        }
        else {
            console.log("Recprd Not Updated");
            return res.redirect('back');
        }
    }
    catch (error) {
        console.log(error);
        return false;
    }
}

// category data

const viewCategory = async (req, res) => {
    try {
        let viewRecord = await categorySchema.find({});
        if (viewRecord) {
            return res.render('category/viewCategory', {
                viewRecord
            });
        }
        else {
            console.log("Category Not Shown");
            return false;
        }
    }
    catch (error) {
        console.log(error);
        return false;
    }

}

const addCategory = (req, res) => {
    return res.render('category/addCategory');
}

const addcategoryData = async (req, res) => {
    try {
        let category = req.body.category;
        let Record = await categorySchema.create({
            category: category
        })
        if (Record) {
            console.log("Category Added");
            return res.redirect('back');
        }
        else {
            console.log("category not Added");
            return res.redirect('back');
        }
    }
    catch (error) {
        console.log(error);
        return false;
    }
}

const deleteData = async (req, res) => {
    try {
        let id = req.query.id;
        let DeleteData = await categorySchema.findByIdAndRemove(id)
            if (!DeleteData) {
              console.log("Category Not Found");
            } else {
              await subcategorySchema.deleteMany({categoryId : id});
              await productSchema.deleteMany({categoryId : id});
              console.log("Record Deleted");
            }
        // let record = await categorySchema.findByIdAndDelete(id);
        // if (record) {
        //     console.log("Record Deleted");
        //     return res.redirect('back');
        // }
        // else {
        //     console.log("Record not Delete");
        //     return res.redirect('back');
        // }
    }
    catch (error) {
        console.log(error);
        return false;
    }
}

const editData = async (req, res) => {
    try {
        let id = req.query.id;
        let editCategory = await categorySchema.findById(id);
        if (editCategory) {
            return res.render('category/editCategory', {
                editCategory
            })
        }
        else {
            console.log("record not Send");
            return false;
        }
    }
    catch (error) {
        console.log(error);
        return false;
    }
}

const updateCategory = async (req, res) => {
    try {
        const { category } = req.body;
        const categoryUpdateId = req.body.categoryUpdateId;
        let updateCategory = await categorySchema.findByIdAndUpdate(categoryUpdateId, {
            category: category
        });
        if (updateCategory) {
            console.log("record Upadted");
            return res.redirect('/viewCategory');
        }
        else {
            console.log("record not Upadted");
            return res.redirect('back');
        }
    }
    catch (error) {
        console.log(error);
        return false;
    }
}

// Sub category data

const addsubCategory = async (req, res) => {
    try {
        let Record = await categorySchema.find({});
        if (Record) {
            return res.render('subcategory/addsubCategory', {
                Record
            });
        }
        else {
            console.log("Sub category not shown");
        }
    }
    catch (error) {
        console.log(error);
        return false;
    }
}

const viewsubCategory = async (req, res) => {
    try {
        let viewCategory = await subcategorySchema.find({}).populate('categoryId');
        console.log(viewCategory);
        if (viewCategory) {
            return res.render('subcategory/viewsubCategory', {
                viewCategory
            });
        }
    }
    catch (error) {
        console.log(error);
        return false;
    }

}

const addPostsubcategory = async (req, res) => {
    try {
        const { subcategory, category } = req.body;
        let addsubcategory = await subcategorySchema.create({
            categoryId: category,
            subcategory: subcategory
        })
        if (addsubcategory) {
            console.log("Sub Category Inserted");
            return res.redirect('back');
        }
        else {
            console.log("Sub Category not Inserted");
            return res.redirect('back');
        }
    }
    catch (error) {
        console.log(error);
        return false;
    }
}

const deleteSubcategory = async (req, res) => {
    try{
        let id = req.query.id;
        let DeleteRecord = await subcategorySchema.findByIdAndDelete(id);
        if (DeleteRecord) {
            console.log("Record Deleted");
            return res.redirect('back');
        }
        else {
            console.log("Record not Delete");
            return res.redirect('back');
        }
    }
    catch(error){
        console.log(error);
        return false;
    }
}

const EDITSubcategory = async (req,res) => {
    try{
        let id = req.query.id;
        let editCategoryData = await subcategorySchema.findById(id);
        if(editCategoryData){
            return res.render('subcategory/editsubcategory',{
                editCategoryData
            });
        }
        else{
            console.log("record not Send");
            return false;   
        }
    }
    catch(error){
        console.log(error);
        return false;
    }
}

const subcategoryUpdate = async (req,res) => { 
    try{
        const {subcategory} = req.body;
        let updateId = req.body.updateId;
        let updateSubCategory = await subcategorySchema.findByIdAndUpdate(updateId,{
            subcategory : subcategory
        })
        if(updateCategory){
            console.log("SubCategory Updated");
            return res.redirect('/viewsubCategory');
        }
        else{
            console.log("SubCategory Not Updated");
            return res.redirect('back');
        }
    }
    catch(error){
        console.log(error);
        return false;
    }
}

// product data

const addproduct = async (req,res) => {
    try{
        let Category = await categorySchema.find({});
        let Subcategory = await subcategorySchema.find({});
        return res.render('product/addproduct',{
            Category,
            Subcategory
        });
    }
    catch(error){
        console.log(error); 
        return false;
    }
    
}

const viewproduct = async (req,res) => {
    try{
        let ViewData = await productSchema.find({}).populate('categoryId').populate('subcategoryId');
        if(ViewData){
            return res.render('product/viewproduct',{
                ViewData
            });
        }
        else {
            console.log("Record not Fetch");
            return res.redirect('back');
        }
    }
    catch(error){
        console.log(error);
        return false;
    }
}

const productInsertData = async (req,res) => {
    try{
        const{category,subcategory,name,price,qty,description} = req.body;
        let image = '';
        if (req.file) {
            image = req.file.path;
        }
        let Productdata = await productSchema.create({
            categoryId : category,
            subcategoryId : subcategory,
            name : name,
            price : price,
            qty : qty,
            description : description,
            image : image
        })
        if (Productdata) {
            console.log("Product Added");
            return res.redirect('back');
        }
        else {
            console.log("Product not Added");
            return res.redirect('back');
        }
    }
    catch(error){
        console.log(error);
        return false;
    }
}

const DeleteProduct = async (req,res) => {
    try{
        let OldRecord = await productSchema.findById(req.query.id);
        if(OldRecord){
            fs.unlinkSync(OldRecord.image)
            let DeleteProduct = await productSchema.findByIdAndDelete(req.query.id);
            if (DeleteProduct) {    
                console.log("Record Deleted");
                return res.redirect('back');
            }
            else {
                console.log("Record not Delete");
                return res.redirect('back');
            }
        }
        else{
            console.log("file not Delete");
            return false;
        }
    }
    catch(error){
        console.log(error);
        return false;
    }
}

const editProduct = async (req,res) => {
    try{
        let id = req.query.id;
        let Editproduct = await productSchema.findById(id);
        if(Editproduct){
            return res.render('product/editproduct',{
                Editproduct
            });
        } 
        else{
            console.log("record not Send");
            return false;
        }
    } 
    catch(error){
        console.log(error);
        return false;
    }
}

const productUpdate = async (req,res) => {
    try{
        const {name,price,qty} = req.body;
        console.log(qty);
        let productId = req.body.productId;
        let UpdateProduct = await productSchema.findByIdAndUpdate(productId,{
            name : name,
            price : price,
            qty : qty
        });
        if(UpdateProduct){
            console.log("Product Updated");
            return res.redirect('/viewproduct');
        }
        else{
            console.log("Product Not Updated");
            return res.redirect('back');
        }
    }
    catch(error){
        console.log(error);
        return false;
    }
}

const buyProduct = async (req,res) => {
    try{
        let id = req.query.id;
        let buyProduct = await productSchema.findById(id);
        if(buyProduct){
            return res.render('product/buyproduct',{
                buyProduct
            });
        }
        else {
            console.log("Record not Fetch");
            return false;
        }
    }
    catch(error){  
        console.log(error);
        return false;
    }
}

const confirmOrder = (req,res) => {
    return res.render('product/confirmOrder');
}

const forgotpassword = (req,res) => {
        return res.render('forgotmail');
}
const postforgotmail = async(req,res) => {
    try{
        let checkEmail = await registerSchema.findOne({email : req.body.email});
        if(checkEmail){
            var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                  user: 'hemanshibokha@gmail.com',
                  pass: 'urso ztoh kilg mrfr'
                }
              });
              let otp = Math.floor(Math.random() * 10000);
              var mailOptions = {
                from: 'hemanshibokha@gmail.com',
                to: req.body.email,
                subject: `Forgotpassword`,
                text: `Otp =  ${otp}`
              };
              
              transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                  console.log(error);
                } else {
                  console.log('Email sent: ' + info.response);
                  res.cookie('userOtp',{
                        email : req.body.email,
                        otp : otp
                  })
                    return res.redirect('otp');
                }
              });
        }else{
            console.log("Email not found");    
            return false;
        }
    }catch(err){
        console.log(err);
        return false;
    }
}
const otp = (req,res) => {
    return res.render('otp');
}
module.exports = {
    forgotpassword,
    login,
    register,
    dashboard,
    registerData,
    loginData,
    logout,
    profile,
    updateProfile,
    viewCategory,
    addCategory,
    addcategoryData,
    deleteData,
    editData,
    addsubCategory,
    viewsubCategory,
    addPostsubcategory,
    updateCategory,
    deleteSubcategory,
    EDITSubcategory,
    subcategoryUpdate,
    addproduct,
    viewproduct,
    productInsertData,
    DeleteProduct,
    editProduct,
    productUpdate,
    buyProduct,
    confirmOrder,
    postforgotmail,
    otp
}