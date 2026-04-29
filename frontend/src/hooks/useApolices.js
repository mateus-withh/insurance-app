import { useState, useEffect } from 'react';
import { getApolices } from '../services/apolices';

export function useApolices(filtros = {}) {
  const [apolices, setApolices] = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [erro,     setErro]     = useState(null);

  useEffect(() => {
    setLoading(true);
    getApolices(filtros)
      .then(r => setApolices(r.data))
      .catch(e => setErro(e.message))
      .finally(() => setLoading(false));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(filtros)]);

  return { apolices, loading, erro };
}
