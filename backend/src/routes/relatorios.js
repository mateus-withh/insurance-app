const express  = require('express');
const router   = express.Router();
const auth     = require('../middlewares/auth');
const supabase = require('../config/supabase');

router.use(auth);

// Resumo geral para o dashboard
router.get('/resumo', async (req, res) => {
  const hoje = new Date().toISOString().split('T')[0];
  const em30 = new Date(Date.now() + 30 * 86400000).toISOString().split('T')[0];

  const [ativas, vencendo, comissoes] = await Promise.all([
    supabase.from('apolices').select('id', { count: 'exact' }).eq('status', 'ativa'),
    supabase.from('apolices').select('id', { count: 'exact' })
      .eq('status', 'ativa').gte('vigencia_fim', hoje).lte('vigencia_fim', em30),
    supabase.from('comissoes').select('valor').eq('status', 'a_receber'),
  ]);

  const totalComissoes = (comissoes.data || []).reduce((s, c) => s + Number(c.valor), 0);

  res.json({
    apolices_ativas:     ativas.count || 0,
    vencendo_30d:        vencendo.count || 0,
    comissoes_a_receber: totalComissoes,
  });
});

module.exports = router;
