const express = require('express');
const router  = express.Router();
const auth    = require('../middlewares/auth');
const ctrl    = require('../controllers/comissoesController');

router.use(auth);

router.get('/',                   ctrl.listar);
router.get('/apolice/:apoliceId', ctrl.listarPorApolice);
router.patch('/:id/receber',      ctrl.marcarRecebido);

module.exports = router;
