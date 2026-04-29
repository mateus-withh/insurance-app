import api from './api';

export const getApolices     = (filtros)      => api.get('/apolices', { params: filtros });
export const getApolice      = (id)           => api.get(`/apolices/${id}`);
export const getVencendo     = ()             => api.get('/apolices/vencendo');
export const criarApolice    = (dados)        => api.post('/apolices', dados);
export const editarApolice   = (id, dados)    => api.put(`/apolices/${id}`, dados);
export const atualizarStatus = (id, status)   => api.patch(`/apolices/${id}/status`, { status });
export const removerApolice  = (id)           => api.delete(`/apolices/${id}`);
