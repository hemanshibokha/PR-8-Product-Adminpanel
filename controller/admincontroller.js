// All Schema
const registerSchema = require('../model/registerSchema');
const categorySchema = require('../model/categoryschema');
const subcategorySchema = require('../model/subcategoryschema');
const productSchema = require('../model/productSchema');

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
        let record = await categorySchema.findByIdAndDelete(id);
        if (record) {
            console.log("Record Deleted");
            return res.redirect('back');
        }
        else {
            console.log("Record not Delete");
            return res.redirect('back');
        }
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

// product data

const addproduct = (req,res) => {
    return res.render('product/addproduct');
}

const viewproduct = async (req,res) => {
    try{
        let ViewData = await productSchema.find({});
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
        const{name,price,qty,description} = req.body;
        let Productdata = await productSchema.create({
            name : name,
            price : price,
            qty : qty,
            description : description
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
    catch(error){
        console.log(error);
        return false;
    }
}

const buyProduct = async (req,res) => {
    try{
        let id = req.query.id;
        console.log(id);
        let buyProduct = await productSchema.findById(id);
        console.log(buyProduct); 
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

module.exports = {
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
    addproduct,
    viewproduct,
    productInsertData,
    DeleteProduct,
    buyProduct,
    confirmOrder
}