const supabase = require('../config/supabase');

exports.listarPorApolice = async (req, res) => {
  const { data, error } = await supabase
    .from('parcelas').select('*')
    .eq('apolice_id', req.params.apoliceId).order('numero_parcela');
  if (error) return res.status(500).json({ erro: error.message });
  res.json(data);
};

exports.marcarPago = async (req, res) => {
  const hoje = new Date().toISOString().split('T')[0];
  const { data, error } = await supabase
    .from('parcelas')
    .update({ status: 'pago', pago_em: hoje })
    .eq('id', req.params.id).select().single();
  if (error) return res.status(400).json({ erro: error.message });
  res.json(data);
};
