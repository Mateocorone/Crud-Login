/**
 * Producto.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    nombre: {
      type: 'string',
      required: true,
    },

    precio: {
      type: 'number',
      required: true,
    },

    cantidad: {
      type: 'number',
      defaultsTo: 0,
    },

    descripcion: {
      type: 'string',
      required: false,
      defaultsTo: 'Sin descripcion',
    },
  },

};

