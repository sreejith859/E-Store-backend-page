const express = require('express');
const router = express.Router();
const { UserData, ProductData } = require('../model/userCredentialModel')


const jwt = require('jsonwebtoken');


router.get("/", (req, res) => {
  res.send("hi")
})


router.get("/getuser", async (req, res) => {
  let data = await UserData.find({})
  console.log(data);
  res.send(data)
})
router.get("/getproduct", async (req, res) => {
  let data = await ProductData.find({})
  console.log(data);
  res.send(data)
})
router.get("/productview/:id", async (req, res) => {
  let productId = req.params.id;
  let data = await ProductData.findOne({ _id:productId })
  console.log(data);
  res.send(data)
})
router.post("/userdata", (req, res) => {
  console.log("hi");
  console.log(req.body);

  var { name, mail, password } = req.body
  let user = new UserData({
    name: name,
    email: mail,
    password: password,
  })
  console.log(user)
  user.save()

  res.send("data stored")
})

router.post("/productdata", (req, res) => {
  console.log("hey");
  console.log(req.body);

  var { productName, price, discription, image } = req.body
  let products = new ProductData({
    productName: productName,
    price: price,
    discription: discription,
    image: image,
  })
  console.log(products)
  products.save()

  res.send("productdata stored")
})

router.post('/login', async (req, res) => {

  const { email, password } = req.body;

  try {
    const user = await UserData.findOne({ email });

    if (password !== user.password) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const token = jwt.sign({ id: user._id }, 'your-secret-key', { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});



module.exports = router;