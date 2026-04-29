import api from './api';

export const getClientes    = (busca)      => api.get('/clientes', { params: { busca } });
export const getCliente     = (id)         => api.get(`/clientes/${id}`);
export const criarCliente   = (dados)      => api.post('/clientes', dados);
export const editarCliente  = (id, dados)  => api.put(`/clientes/${id}`, dados);
export const removerCliente = (id)         => api.delete(`/clientes/${id}`);
