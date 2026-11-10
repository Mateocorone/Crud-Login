module.exports = function (req, res, procced) {

    if (req.session && req.session.usuarioId) {
        return procced();
    }

    return res.status(401).json({
        mensaje: 'Invalido, debes inicar sesion'
    });
        
};