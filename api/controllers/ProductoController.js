/**
 * ProductoController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

    listar : async (req, res) => {
        const productos = await Producto.find();
        return res.json(productos);
    },
  
    crear: async (req, res) => {

        const { nombre, precio, cantidad, descripcion } = req.body;

        const producto = await Producto.create({
            nombre: nombre,
            precio: precio,
            cantidad: cantidad,
            descripcion: descripcion
        }).fetch();

        return res.status(201).json(producto);
    },

    actualizar: async function (req, res) {
        const id = req.params.id;
        const { nombre, precio, cantidad, descripcion } = req.body;
        const producto = await Producto.updateOne({id: id})
            .set({
                nombre: nombre,
                precio: precio,
                cantidad: cantidad,
                descripcion: descripcion
            });
        if (!producto) {
            return res.status(404).json({
                mensaje: "No se pudo encontrar"
            });
        }
        return res.json(producto);
    },

    eliminar: async function (req, res) {
        
        const id = req.params.id;

        const producto = await Producto.destroyOne({ id: id});

        if (!producto) {
            return res.status(404).json({
                mensaje: "No se pudo encontrar"
            });
        }

        return res.json({
            mensaje: "Se elimino correctamente"
        });
    },




};

