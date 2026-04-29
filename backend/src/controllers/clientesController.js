const supabase = require('../config/supabase');

exports.listar = async (req, res) => {
  const { busca } = req.query;
  let query = supabase.from('clientes').select('*').eq('ativo', true).order('nome');
  if (busca) query = query.ilike('nome', `%${busca}%`);
  const { data, error } = await query;
  if (error) return res.status(500).json({ erro: error.message });
  res.json(data);
};

exports.buscar = async (req, res) => {
  const { data, error } = await supabase
    .from('clientes').select('*, apolices(*)').eq('id', req.params.id).single();
  if (error) return res.status(404).json({ erro: 'Cliente não encontrado' });
  res.json(data);
};

exports.criar = async (req, res) => {
  const { data, error } = await supabase.from('clientes').insert(req.body).select().single();
  if (error) return res.status(400).json({ erro: error.message });
  res.status(201).json(data);
};

exports.atualizar = async (req, res) => {
  const { data, error } = await supabase
    .from('clientes').update(req.body).eq('id', req.params.id).select().single();
  if (error) return res.status(400).json({ erro: error.message });
  res.json(data);
};

exports.remover = async (req, res) => {
  // Soft delete — apenas marca como inativo
  const { error } = await supabase
    .from('clientes').update({ ativo: false }).eq('id', req.params.id);
  if (error) return res.status(400).json({ erro: error.message });
  res.status(204).send();
};
