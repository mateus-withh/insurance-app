require('dotenv').config();
const express = require('express');
const cors = require('cors');

const clientesRoutes   = require('./src/routes/clientes');
const apolicesRoutes   = require('./src/routes/apolices');
const parcelasRoutes   = require('./src/routes/parcelas');
const comissoesRoutes  = require('./src/routes/comissoes');
const relatoriosRoutes = require('./src/routes/relatorios');

require('./src/jobs/alertasCron'); // inicia o job de alertas

const app = express();

app.use(cors());
app.use(express.json());

// Rotas
app.use('/api/clientes',   clientesRoutes);
app.use('/api/apolices',   apolicesRoutes);
app.use('/api/parcelas',   parcelasRoutes);
app.use('/api/comissoes',  comissoesRoutes);
app.use('/api/relatorios', relatoriosRoutes);

// Health check
app.get('/health', (req, res) => res.json({ status: 'ok' }));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
