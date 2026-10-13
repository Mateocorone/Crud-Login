/**
 * PanelController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  
     index: async function (req, res) {

    const productos = await Producto.find();

    return res.view('panel', {
      layout: false,
      productos: productos
    });

  }
  
};

