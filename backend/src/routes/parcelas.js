const express = require('express');
const router  = express.Router();
const auth    = require('../middlewares/auth');
const ctrl    = require('../controllers/parcelasController');

router.use(auth);

router.get('/apolice/:apoliceId', ctrl.listarPorApolice);
router.patch('/:id/pagar',        ctrl.marcarPago);

module.exports = router;
