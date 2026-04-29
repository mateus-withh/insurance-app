const supabase = require('../config/supabase');

exports.listar = async (req, res) => {
  const { status, cliente_id, ramo_id } = req.query;
  let query = supabase
    .from('apolices')
    .select('*, clientes(nome, cpf_cnpj), seguradoras(nome), ramos(nome)')
    .order('vigencia_fim', { ascending: true });
  if (status)     query = query.eq('status', status);
  if (cliente_id) query = query.eq('cliente_id', cliente_id);
  if (ramo_id)    query = query.eq('ramo_id', ramo_id);
  const { data, error } = await query;
  if (error) return res.status(500).json({ erro: error.message });
  res.json(data);
};

exports.vencendo = async (req, res) => {
  const hoje = new Date().toISOString().split('T')[0];
  const em30 = new Date(Date.now() + 30 * 86400000).toISOString().split('T')[0];
  const { data, error } = await supabase
    .from('apolices')
    .select('*, clientes(nome, email, celular), seguradoras(nome), ramos(nome)')
    .eq('status', 'ativa').gte('vigencia_fim', hoje).lte('vigencia_fim', em30)
    .order('vigencia_fim');
  if (error) return res.status(500).json({ erro: error.message });
  res.json(data);
};

exports.buscar = async (req, res) => {
  const { data, error } = await supabase
    .from('apolices')
    .select('*, clientes(*), seguradoras(*), ramos(*), parcelas(*), comissoes(*)')
    .eq('id', req.params.id).single();
  if (error) return res.status(404).json({ erro: 'Apólice não encontrada' });
  res.json(data);
};

exports.criar = async (req, res) => {
  const { data, error } = await supabase.from('apolices').insert(req.body).select().single();
  if (error) return res.status(400).json({ erro: error.message });
  res.status(201).json(data);
};

exports.atualizar = async (req, res) => {
  const { data, error } = await supabase
    .from('apolices').update(req.body).eq('id', req.params.id).select().single();
  if (error) return res.status(400).json({ erro: error.message });
  res.json(data);
};

exports.atualizarStatus = async (req, res) => {
  const { status } = req.body;
  const validos = ['ativa', 'vencida', 'cancelada', 'pendente_renovacao', 'em_analise'];
  if (!validos.includes(status)) return res.status(400).json({ erro: 'Status inválido' });
  const { data, error } = await supabase
    .from('apolices').update({ status }).eq('id', req.params.id).select().single();
  if (error) return res.status(400).json({ erro: error.message });
  res.json(data);
};

exports.remover = async (req, res) => {
  const { error } = await supabase.from('apolices').delete().eq('id', req.params.id);
  if (error) return res.status(400).json({ erro: error.message });
  res.status(204).send();
};
