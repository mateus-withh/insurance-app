const supabase = require('../config/supabase');

async function auth(req, res, next) {
  const token = req.headers.authorization?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ erro: 'Token não fornecido' });

  const { data: { user }, error } = await supabase.auth.getUser(token);
  if (error || !user) return res.status(401).json({ erro: 'Token inválido' });

  req.user = user;
  next();
}

module.exports = auth;
