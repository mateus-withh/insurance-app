import { useAuth } from '../../contexts/AuthContext'

export default function Header({ titulo }) {
  const { user } = useAuth()
  const hora     = new Date().getHours()
  const saudacao = hora < 12 ? 'Bom dia' : hora < 18 ? 'Boa tarde' : 'Boa noite'

  return (
    <header style={s.header}>
      <div>
        <h1 style={s.titulo}>{titulo}</h1>
      </div>
      <div style={s.right}>
        <span style={s.saudacao}>{saudacao} 👋</span>
        <div style={s.avatar}>
          {user?.email?.[0]?.toUpperCase() ?? 'U'}
        </div>
      </div>
    </header>
  )
}

const s = {
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '20px 36px',
    borderBottom: '1px solid #1e1e1e',
    backgroundColor: '#0c0c0e',
    position: 'sticky',
    top: 0,
    zIndex: 10,
  },
  titulo: {
    fontSize: '16px',
    fontWeight: '500',
    color: '#f0ede8',
    margin: 0,
    letterSpacing: '-0.3px',
  },
  right: {
    display: 'flex',
    alignItems: 'center',
    gap: '14px',
  },
  saudacao: {
    fontSize: '13px',
    color: '#3a3a3a',
  },
  avatar: {
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    backgroundColor: 'rgba(212,160,23,0.15)',
    border: '1px solid rgba(212,160,23,0.3)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '13px',
    fontWeight: '600',
    color: '#d4a017',
  },
}
