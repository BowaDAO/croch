import express = require("express");
const router = express.Router();
import creativeController = require("../controllers/creative");
import authorization = require("../middlewares/authorization");
import imageOptimization = require("../middlewares/imageOptimization");

const { authorizeUser, isCreative, isProductOwner } = authorization;

const { resizePhoto, uploadPhoto } = imageOptimization;

const {
  createProduct,
  updateProduct,
  deleteProduct,
  getProducts,
  updateYearsOfExperience,
  updateFunFacts,
  updateIsAvailable,
  updatePersonalDescription,
  getOrders,
  setBrandName,
} = creativeController;

router.post(
  "/createProduct",
  authorizeUser,
  isCreative,
  uploadPhoto.array("files", 10),
  createProduct
);

router.get("/getProducts", authorizeUser, getProducts);

router.get("/getOrders", authorizeUser, isCreative, getOrders);

router.put(
  "/updateProduct/:id",
  authorizeUser,
  isProductOwner,
  uploadPhoto.array("files", 10),
  updateProduct
);

router.patch(
  "/updateYearsOfExperience",
  authorizeUser,
  isCreative,
  updateYearsOfExperience
);

router.patch("/updateFunFacts", authorizeUser, isCreative, updateFunFacts);

router.patch(
  "/updateIsAvailable",
  authorizeUser,
  isCreative,
  updateIsAvailable
);

router.patch(
  "/updatePersonalDescription",
  authorizeUser,
  isCreative,
  updatePersonalDescription
);

router.patch("/setBrandName", authorizeUser, isCreative, setBrandName);

router.delete(
  "/deleteProduct/:id",
  authorizeUser,
  isProductOwner,
  deleteProduct
);

export = router;
