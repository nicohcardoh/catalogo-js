const productCtrl = {};
const Product = require("../database/models/Product");
const cloudinary = require("../libs/cloudinary");

productCtrl.renderAllprod = async (req, res) => {
  Product.findAll().then((prods) => {
    res.render("productos", { prods });
  });
};

productCtrl.createProd = async (req, res) => {
  if (req.file != null) {
    const result = await cloudinary.v2.uploader.upload(req.file.path, {
      folder: "catalogo_js",
    });
    await Product.create({
      title: req.body.title,
      price: req.body.price,
      description: req.body.description,
      imageUrl: result.secure_url,
      publicId: result.public_id,
    });
    req.flash("success_msg", "Producto agregado");
    res.redirect("/add");
  }
};

productCtrl.findByPK = async (req, res) => {
  Product.findByPk(req.params.id).then((prod) => {
    res.render("card", { prod });
  });
};

productCtrl.findByPK2 = async (req, res) => {
  Product.findByPk(req.params.id).then((prod) => {
    res.render("edit", { prod });
  });
};

//Hacer funcionar
productCtrl.updateProd = async (req, res) => {
  if (req.file != null) {
    //cloudinary.v2.uploader.destroy();
    result = await cloudinary.v2.uploader.upload(req.file.path, {
      folder: "catalogo_js",
    });

    await Product.update(
      {
        title: req.body.title,
        price: req.body.price,
        description: req.body.description,
        imageUrl: result.secure_url,
        publicId: result.public_id,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
  }
  req.flash("success_msg", "Producto actualizado");
  res.redirect("/add");
};

productCtrl.deleteProd = async (req, res) => {
  await Product.findByPk(req.params.id)
    .then(async (prod) => {
      await cloudinary.v2.uploader.destroy(prod.publicId), prod.destroy();
    })
    .then((result) => {
      res.render("productos", { result });
      req.flash("success_msg", "Producto Eliminado");
      res.redirect("/add");
    });
};

module.exports = productCtrl;
