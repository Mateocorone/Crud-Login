/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {

  'GET /panel': 'PanelController.index',

  'GET /productos': 'ProductoController.listar',
  'POST /productos': 'ProductoController.crear',
  'PUT /productos/:id': 'ProductoController.actualizar',
  'DELETE /productos/:id': 'ProductoController.eliminar',

  'POST /auth/registro': 'AuthController.registrar',
  'POST /auth/login': 'AuthController.login',
  'POST /auth/logout': 'AuthController.logout',

  'GET /csrfToken': {
    action: 'security/grant-csrf-token'
  },

  'GET /login': { 
    view: 'login',
    locals: {layout: false} 
  },

  '/': { 
    view: 'login', 
    locals: {layout: false}
  },

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` your home page.            *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/



  /***************************************************************************
  *                                                                          *
  * More custom routes here...                                               *
  * (See https://sailsjs.com/config/routes for examples.)                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the routes in this file, it   *
  * is matched against "shadow routes" (e.g. blueprint routes).  If it does  *
  * not match any of those, it is matched against static assets.             *
  *                                                                          *
  ***************************************************************************/


};
