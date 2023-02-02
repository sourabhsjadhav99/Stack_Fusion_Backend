let express = require("express")
let multer = require("multer")
const Product = require("../connectionAndSchema/product");
const router = express.Router();
const nodemailer = require("nodemailer");
router.use(express.json());


router.get("/", async (req, res) => {
  try {
    let data = await Product.find();
    res.status(201).json({
      status: "Success",
      data: data
    });
  } catch (e) {
    res.status(404).json({
      status: "Failed",
      message: e.message,
    });
  }
});

router.get("/:_id", async (req, res) => {
  try {
    let data = await Product.find({ _id: req.params._id });
    res.send(data);
  } catch (e) {
    res.status(404).json({
      status: "Failed",
      message: e.message,
    });
  }
});



async function sendMail(email, name) {
  let testAccount = await nodemailer.createTestAccount();
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, 
    auth: {
      user: process.env.EMAIL, 
      pass: process.env.PASS,
    },
  });
  let info = await transporter.sendMail({
    from: process.env.EMAIL,
    to: email,
    subject: "New user in stack fusion app", 
    text: `Congratulations! ${name} you added in stack fusion app`,
  });
}

router.post("/", async (req, res) => {
  try {
    let email =req.body.email
    let name =req.body.name
    let data = new Product(req.body);
    let result = await data.save()
    res.status(201).json({
      status: "Success",
      data: result
    })
    sendMail(email, name)
  } catch (e) {
    res.status(400).json({
      status: "Failed",
      message: e.message,
    });
  }
});

router.put("/:_id", async (req, res) => {
  try {
    let data = await Product.updateOne({ _id: req.params._id }, { $set: req.body })
    res.send(data);
  } catch (e) {
    res.status(400).json({
      status: "Failed",
      message: e.message,
    });
  }
});

router.delete("/:_id", async (req, res) => {
  try {
    let data = await Product.deleteOne({ _id: req.params._id });
    res.send(data);
  } catch (e) {
    res.status(404).json({
      status: "Failed",
      message: e.message,
    });
  }
});

module.exports = router;