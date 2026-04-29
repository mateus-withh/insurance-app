const supabase = require('../config/supabase');

exports.listar = async (req, res) => {
  const { status } = req.query;
  let query = supabase
    .from('comissoes')
    .select('*, apolices(numero, clientes(nome))')
    .order('created_at', { ascending: false });
  if (status) query = query.eq('status', status);
  const { data, error } = await query;
  if (error) return res.status(500).json({ erro: error.message });
  res.json(data);
};

exports.listarPorApolice = async (req, res) => {
  const { data, error } = await supabase
    .from('comissoes').select('*').eq('apolice_id', req.params.apoliceId);
  if (error) return res.status(500).json({ erro: error.message });
  res.json(data);
};

exports.marcarRecebido = async (req, res) => {
  const hoje = new Date().toISOString().split('T')[0];
  const { data, error } = await supabase
    .from('comissoes')
    .update({ status: 'recebido', recebido_em: hoje })
    .eq('id', req.params.id).select().single();
  if (error) return res.status(400).json({ erro: error.message });
  res.json(data);
};
