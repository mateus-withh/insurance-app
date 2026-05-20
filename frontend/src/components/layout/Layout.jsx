import Sidebar from './Sidebar'
import Header from './Header'

export default function Layout({ children, titulo }) {
  return (
    <div style={s.shell}>
      <Sidebar />
      <div style={s.main}>
        <Header titulo={titulo} />
        <div style={s.content}>
          {children}
        </div>
      </div>
    </div>
  )
}

const s = {
  shell: {
    display: 'flex',
    minHeight: '100vh',
    backgroundColor: '#0c0c0e',
    fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
  },
  main: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    minWidth: 0,
  },
  content: {
    flex: 1,
    padding: '32px 36px',
    overflowY: 'auto',
  },
}
