import { useEffect, useState } from 'react'
import Layout from '../components/layout/Layout'
import api from '../services/api'

export default function Dashboard() {
  const [resumo,   setResumo]   = useState(null)
  const [vencendo, setVencendo] = useState([])
  const [loading,  setLoading]  = useState(true)

  useEffect(() => {
    Promise.all([
      api.get('/relatorios/resumo'),
      api.get('/apolices/vencendo'),
    ]).then(([r, v]) => {
      setResumo(r.data)
      setVencendo(v.data)
    }).finally(() => setLoading(false))
  }, [])

  const cards = resumo ? [
    {
      label: 'Apólices ativas',
      valor: resumo.apolices_ativas,
      formato: 'numero',
      cor: '#d4a017',
    },
    {
      label: 'Vencendo em 30 dias',
      valor: resumo.vencendo_30d,
      formato: 'numero',
      cor: resumo.vencendo_30d > 0 ? '#e07060' : '#3a3a3a',
    },
    {
      label: 'Comissões a receber',
      valor: resumo.comissoes_a_receber,
      formato: 'moeda',
      cor: '#6db87a',
    },
  ] : []

  function formatarValor(valor, formato) {
    if (formato === 'moeda') {
      return new Intl.NumberFormat('pt-BR', {
        style: 'currency', currency: 'BRL'
      }).format(valor)
    }
    return valor
  }

  function diasRestantes(dataFim) {
    const hoje  = new Date()
    const fim   = new Date(dataFim)
    const diff  = Math.ceil((fim - hoje) / (1000 * 60 * 60 * 24))
    return diff
  }

  function corDias(dias) {
    if (dias <= 7)  return '#e07060'
    if (dias <= 15) return '#d4a017'
    return '#6db87a'
  }

  return (
    <Layout titulo="Dashboard">
      <div style={s.page}>

        {/* Cards de resumo */}
        {loading ? (
          <div style={s.loading}>Carregando...</div>
        ) : (
          <div style={s.cards}>
            {cards.map((card, i) => (
              <div key={i} style={s.card}>
                <span style={s.cardLabel}>{card.label}</span>
                <span style={{ ...s.cardValor, color: card.cor }}>
                  {formatarValor(card.valor, card.formato)}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Apólices vencendo */}
        <div style={s.section}>
          <div style={s.sectionHeader}>
            <h2 style={s.sectionTitle}>Vencendo em breve</h2>
            <span style={s.sectionSub}>{vencendo.length} apólice(s)</span>
          </div>

          {vencendo.length === 0 && !loading ? (
            <div style={s.empty}>
              Nenhuma apólice vencendo nos próximos 30 dias. ✓
            </div>
          ) : (
            <div style={s.table}>
              <div style={s.tableHead}>
                <span style={{ flex: 2 }}>Cliente</span>
                <span style={{ flex: 2 }}>Número</span>
                <span style={{ flex: 1 }}>Ramo</span>
                <span style={{ flex: 1, textAlign: 'right' }}>Vencimento</span>
                <span style={{ flex: 1, textAlign: 'right' }}>Dias</span>
              </div>

              {vencendo.map(ap => {
                const dias = diasRestantes(ap.vigencia_fim)
                return (
                  <div key={ap.id} style={s.tableRow}>
                    <span style={{ ...s.tableCell, flex: 2, color: '#f0ede8' }}>
                      {ap.clientes?.nome}
                    </span>
                    <span style={{ ...s.tableCell, flex: 2 }}>
                      {ap.numero}
                    </span>
                    <span style={{ ...s.tableCell, flex: 1 }}>
                      {ap.ramos?.nome}
                    </span>
                    <span style={{ ...s.tableCell, flex: 1, textAlign: 'right' }}>
                      {new Date(ap.vigencia_fim).toLocaleDateString('pt-BR')}
                    </span>
                    <span style={{
                      flex: 1,
                      textAlign: 'right',
                      fontSize: '13px',
                      fontWeight: '600',
                      color: corDias(dias),
                    }}>
                      {dias}d
                    </span>
                  </div>
                )
              })}
            </div>
          )}
        </div>

      </div>
    </Layout>
  )
}

const s = {
  page: {
    display: 'flex',
    flexDirection: 'column',
    gap: '32px',
  },
  loading: {
    color: '#3a3a3a',
    fontSize: '14px',
  },
  cards: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '16px',
  },
  card: {
    backgroundColor: '#111113',
    border: '1px solid #1e1e1e',
    borderRadius: '10px',
    padding: '24px',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  cardLabel: {
    fontSize: '11px',
    color: '#3a3a3a',
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
    fontWeight: '500',
  },
  cardValor: {
    fontSize: '32px',
    fontWeight: '700',
    letterSpacing: '-1px',
  },
  section: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  sectionHeader: {
    display: 'flex',
    alignItems: 'baseline',
    gap: '10px',
  },
  sectionTitle: {
    fontSize: '15px',
    fontWeight: '500',
    color: '#f0ede8',
    margin: 0,
    letterSpacing: '-0.3px',
  },
  sectionSub: {
    fontSize: '12px',
    color: '#2a2a2a',
  },
  empty: {
    padding: '24px',
    backgroundColor: '#111113',
    border: '1px solid #1e1e1e',
    borderRadius: '10px',
    fontSize: '13px',
    color: '#3a3a3a',
    textAlign: 'center',
  },
  table: {
    backgroundColor: '#111113',
    border: '1px solid #1e1e1e',
    borderRadius: '10px',
    overflow: 'hidden',
  },
  tableHead: {
    display: 'flex',
    gap: '12px',
    padding: '12px 20px',
    borderBottom: '1px solid #1e1e1e',
    fontSize: '11px',
    color: '#2a2a2a',
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
    fontWeight: '500',
  },
  tableRow: {
    display: 'flex',
    gap: '12px',
    padding: '14px 20px',
    borderBottom: '1px solid #161616',
    alignItems: 'center',
    transition: 'background .1s',
  },
  tableCell: {
    fontSize: '13px',
    color: '#5a5a5a',
  },
}
