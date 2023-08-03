const mongoose = require('mongoose');

const userCredential = mongoose.Schema({
    name: String,
    email: String,
    password: String,

})
const productData = mongoose.Schema({
    productName: String,
    price: Number,
    discription: String,
    image: String,

})


const UserData = mongoose.model('users', userCredential);
const ProductData = mongoose.model('product', productData);

module.exports = {
    UserData,
    ProductData,
}
