import { Request, Response } from "express";
import Customer = require("../models/customer");
import validateId = require("../utilities/validateId");
import { StatusCodes } from "http-status-codes";
import Product = require("../models/product");

const addAndRemoveWishlist = async (req: Request, res: Response) => {
  const { productId } = req.body;

  const { _id: customerId } = req.user;

  validateId(productId);

  validateId(customerId);

  try {
    const customer = await Customer.findById(customerId).populate("wishLists");

    const wishlists: Product[] = customer.wishLists;

    const alreadyInWishlists = Boolean(
      wishlists.find(
        (wishList) => wishList._id.toString() === productId.toString()
      )
    );

    if (alreadyInWishlists) {
      await Customer.findByIdAndUpdate(customerId, {
        $pull: { wishLists: productId },
      });

      return res.json({ message: "Product removed from wishlist." });
    } else {
      await Customer.findByIdAndUpdate(customerId, {
        $push: { wishLists: productId },
      });

      return res.json({ message: "Product added to wishlist." });
    }
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Something went wrong, please try again." });
  }
};

const getWishlists = async (req: Request, res: Response) => {
  const { _id: customerId } = req.user;

  try {
    const customer = await Customer.findById(customerId).populate({
      path: "wishLists",
    });

    const wishlists = customer.wishLists;

    return res.json(wishlists);
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Something went wrong, please try again." });
  }
};

const getCreativeAllProducts = async (req: Request, res: Response) => {
  const { creativeId } = req.query;

  validateId(creativeId as string);

  try {
    const products = await Product.find({ owner: creativeId });

    return res.json(products);
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Something went wrong, please try again." });
  }
};

export = {
  addAndRemoveWishlist,
  getWishlists,
  getCreativeAllProducts,
};
