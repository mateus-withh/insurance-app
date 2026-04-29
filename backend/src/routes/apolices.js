const express = require('express');
const router  = express.Router();
const auth    = require('../middlewares/auth');
const ctrl    = require('../controllers/apolicesController');

router.use(auth);

router.get('/',             ctrl.listar);
router.get('/vencendo',     ctrl.vencendo);
router.get('/:id',          ctrl.buscar);
router.post('/',            ctrl.criar);
router.put('/:id',          ctrl.atualizar);
router.patch('/:id/status', ctrl.atualizarStatus);
router.delete('/:id',       ctrl.remover);

module.exports = router;
