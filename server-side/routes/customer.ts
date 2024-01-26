import express = require("express");
const router = express.Router();
import customerController = require("../controllers/customer");
import authorization = require("../middlewares/authorization");

const { authorizeUser } = authorization;
const { addToCart, removeFromCart, getCartItems } = customerController;

router.get("/getCartItems", authorizeUser, getCartItems);
router.put("/addToCart", authorizeUser, addToCart);
router.put("/removeFromCart", authorizeUser, removeFromCart);

export = router;