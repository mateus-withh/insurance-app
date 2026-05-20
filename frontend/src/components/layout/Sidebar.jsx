import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'

const nav = [
  { to: '/dashboard',  label: 'Dashboard',   icon: '⊡' },
  { to: '/apolices',   label: 'Apólices',    icon: '◈' },
  { to: '/clientes',   label: 'Clientes',    icon: '◉' },
  { to: '/financeiro', label: 'Financeiro',  icon: '◎' },
  { to: '/relatorios', label: 'Relatórios',  icon: '▤'  },
]

export default function Sidebar() {
  const { logout } = useAuth()
  const navigate   = useNavigate()

  async function handleLogout() {
    await logout()
    navigate('/login')
  }

  return (
    <aside style={s.aside}>

      {/* Logo */}
      <div style={s.logo}>
        <div style={s.logoMark}>C</div>
        <span style={s.logoText}>Corretora</span>
      </div>

      {/* Divisor */}
      <div style={s.divider} />

      {/* Navegação */}
      <nav style={s.nav}>
        <p style={s.navLabel}>Menu</p>
        {nav.map(item => (
          <NavLink
            key={item.to}
            to={item.to}
            style={({ isActive }) => ({
              ...s.navItem,
              backgroundColor: isActive ? 'rgba(212,160,23,0.08)' : 'transparent',
              borderLeft: isActive ? '2px solid #d4a017' : '2px solid transparent',
              color: isActive ? '#d4a017' : '#3a3a3a',
            })}
          >
            <span style={s.navIcon}>{item.icon}</span>
            {item.label}
          </NavLink>
        ))}
      </nav>

      {/* Rodapé — logout */}
      <div style={s.footer}>
        <div style={s.divider} />
        <button onClick={handleLogout} style={s.logoutBtn}>
          <span>↩</span>
          Sair
        </button>
      </div>

    </aside>
  )
}

const s = {
  aside: {
    width: '220px',
    flexShrink: 0,
    backgroundColor: '#0c0c0e',
    borderRight: '1px solid #1e1e1e',
    display: 'flex',
    flexDirection: 'column',
    padding: '28px 0',
    position: 'sticky',
    top: 0,
    height: '100vh',
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '0 20px 0 24px',
    marginBottom: '24px',
  },
  logoMark: {
    width: '30px',
    height: '30px',
    borderRadius: '7px',
    backgroundColor: '#d4a017',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '14px',
    fontWeight: '700',
    color: '#0c0c0e',
    flexShrink: 0,
  },
  logoText: {
    fontSize: '14px',
    fontWeight: '500',
    color: '#f0ede8',
    letterSpacing: '-0.3px',
  },
  divider: {
    height: '1px',
    backgroundColor: '#1e1e1e',
    margin: '0 24px',
  },
  nav: {
    flex: 1,
    padding: '20px 12px',
    display: 'flex',
    flexDirection: 'column',
    gap: '2px',
  },
  navLabel: {
    fontSize: '10px',
    fontWeight: '500',
    color: '#2a2a2a',
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
    padding: '0 12px',
    margin: '0 0 8px',
  },
  navItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '9px 12px',
    borderRadius: '7px',
    fontSize: '13px',
    fontWeight: '400',
    textDecoration: 'none',
    transition: 'color .15s, background .15s',
    cursor: 'pointer',
  },
  navIcon: {
    fontSize: '15px',
    width: '18px',
    textAlign: 'center',
  },
  footer: {
    padding: '0',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  logoutBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '9px 24px',
    fontSize: '13px',
    color: '#2a2a2a',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    width: '100%',
    textAlign: 'left',
    transition: 'color .15s',
    marginTop: '12px',
  },
}
