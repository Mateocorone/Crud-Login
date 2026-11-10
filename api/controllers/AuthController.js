/**
 * AuthController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
const bcrypt = require('bcrypt');

module.exports = {
  
            registrar: async function (req, res) {

                const { username, password } = req.body;

                if (
                    typeof username !== 'string' ||
                    !username.trim() ||
                    typeof password !== 'string' ||
                    password.trim().length < 8
                ){
                    return res.status(400).json({
                        mensaje: 'Usuario invalido o contrasena menor a 8 caracteres'
                });
            }

        const existente = await Usuario.findOne({
            username: username.trim()
        });

        if (existente) {
            return res.status(400).json({
                mensaje: 'Usuario ya existente'
        });
        }

        const passwordHash = await bcrypt.hash(password, 12);

        try {
            const usuario = await Usuario.create({
                username: username.trim(),
                password: passwordHash
            }).fetch();

            return res.status(201).json({
                mensaje: 'Usuario registrado correctamente',
                id: usuario.id,
                username: usuario.username
            });
        } catch (error) {
            sails.log.error(error);

            return res.status(500).json({
                mensaje: 'Error al registrar usuario'
            });
            
        }
    },

    login: async function (req, res) {
        const { username, password } = req.body;

        if (
            typeof username !== 'string' ||
            typeof password !== 'string'
        ) {
            return res.status(400).json({
                mensaje: 'Debes ingresar un usuario y una contraseña'
        });
    }

    const usuario = await Usuario.findOne({
        username: username.trim()
    }).decrypt();

    if(!usuario) {
        return res.status(401).json({
            mensaje: 'Credenciales incorrectas'
        });
    }

    const passwordValida = await bcrypt.compare(
        password, 
        usuario.password
    );

    if(!passwordValida) {
        return res.status(401).json({
            mensaje: 'Credenciales incorrectas'
        });
    }

    req.session.usuarioId = usuario.id;

        return res.json({
            mensaje: 'Sesion iniciada correctamente',
            username: usuario.username
        });
        
    },

    logout: function (req, res) {
        req.session.destroy(function (error){
            if (error) {
                return res.status(500).json({
                    mensaje: 'Error al cerrar sesion'
            });
            }
            return res.json({
                mensaje: 'Sesion cerrada correctamente'
            });
        })
    },
};