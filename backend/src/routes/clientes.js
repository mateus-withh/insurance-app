const express = require('express');
const router  = express.Router();
const auth    = require('../middlewares/auth');
const ctrl    = require('../controllers/clientesController');

router.use(auth);

router.get('/',       ctrl.listar);
router.get('/:id',    ctrl.buscar);
router.post('/',      ctrl.criar);
router.put('/:id',    ctrl.atualizar);
router.delete('/:id', ctrl.remover);

module.exports = router;
