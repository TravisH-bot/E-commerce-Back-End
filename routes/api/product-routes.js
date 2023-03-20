const router = require("express").Router();
const { Product, Category, Tag, ProductTag } = require("../../models");

// The `/api/products` endpoint
// http://localhost:3001/api/products

// GET all products
router.get("/", async (req, res) => {
  // be sure to include its associated Category and Tag data
  try {
    const productData = await Product.findAll({
      attributes: ["id", "product_name", "price", "stock", "category_id"],
      include: [
        {
          model: Tag,
          attributes: ["id", "tag_name"],
          through: ProductTag,
        },
        {
          model: Category,
          attributes: ["id", "category_name"],
        },
      ],
    });
    res.status(200).json(productData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET one product by its `id`
router.get("/:id", async (req, res) => {
  // be sure to include its associated Category and Tag data
  try {
    const productData = await Product.findByPk(req.params.id, {
      attributes: ["id", "product_name", "price", "stock", "category_id"],
      include: [
        {
          model: Tag,
          attributes: ["id", "tag_name"],
          through: ProductTag,
        },
        {
          model: Category,
          attributes: ["id", "category_name"],
        },
      ],
    });

    if (!productData) {
      res.status(404).json({ message: "No product with that id!" });
      return;
    }

    res.status(200).json(productData);
  } catch (err) {
    res.status(500).json(err);
  }
});

//NEW
//CREATE new product using async
router.post("/", async (req, res) => {
  try {
    const productData = await Product.create({
      product_name: req.body.product_name,
      price: req.body.price,
      stock: req.body.stock,
      category_id: req.body.category_id,
    });

    res.status(200).json(productData);
  } catch (err) {
    res.status(400).json(err);
  }
});

//NEW
//UPDATE product using async
router.put("/:id", async (req, res) => {
  try {
    const productData = await Product.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!productData[0]) {
      res.status(404).json({ message: "No product by that id!" });
      return;
    }
    res.status(200).json(productData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE one product by its `id` value
router.delete("/:id", async (req, res) => {
  try {
    const productData = await Product.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!productData) {
      res.status(404).json({ message: "No product found with that id!" });
      return;
    }

    res.status(200).json(productData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
