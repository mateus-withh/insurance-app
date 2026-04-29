const cron     = require('node-cron');
const supabase = require('../config/supabase');
const { enviarEmail } = require('../services/emailService');

// Roda todo dia às 08:00
cron.schedule('0 8 * * *', async () => {
  console.log('[CRON] Verificando alertas de vencimento...');
  const hoje = new Date().toISOString().split('T')[0];

  const { data: alertas, error } = await supabase
    .from('alertas')
    .select('*, apolices(numero, vigencia_fim, clientes(nome, email))')
    .eq('enviado', false)
    .lte('data_agendada', hoje);

  if (error || !alertas?.length) {
    console.log('[CRON] Nenhum alerta pendente.');
    return;
  }

  for (const alerta of alertas) {
    const apolice = alerta.apolices;
    const cliente = apolice?.clientes;
    if (!cliente?.email) continue;

    try {
      await enviarEmail({
        para:    cliente.email,
        assunto: `Apólice ${apolice.numero} vence em breve`,
        html: `
          <p>Olá, <strong>${cliente.nome}</strong>!</p>
          <p>Sua apólice <strong>${apolice.numero}</strong> vence em
             <strong>${new Date(apolice.vigencia_fim).toLocaleDateString('pt-BR')}</strong>.</p>
          <p>Entre em contato com sua corretora para a renovação.</p>
        `,
      });

      await supabase.from('alertas')
        .update({ enviado: true, enviado_em: new Date().toISOString() })
        .eq('id', alerta.id);

    } catch (err) {
      console.error(`[CRON] Erro ao enviar alerta ${alerta.id}:`, err.message);
      await supabase.from('alertas').update({ erro: err.message }).eq('id', alerta.id);
    }
  }

  console.log(`[CRON] ${alertas.length} alerta(s) processado(s).`);
});
