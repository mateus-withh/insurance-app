import { useState, useEffect } from 'react';
import { getClientes } from '../services/clientes';

export function useClientes(busca = '') {
  const [clientes, setClientes] = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [erro,     setErro]     = useState(null);

  useEffect(() => {
    setLoading(true);
    getClientes(busca)
      .then(r => setClientes(r.data))
      .catch(e => setErro(e.message))
      .finally(() => setLoading(false));
  }, [busca]);

  return { clientes, loading, erro };
}
