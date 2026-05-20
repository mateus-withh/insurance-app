import { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [erro, setErro] = useState('')
  const [loading, setLoading] = useState(false)
  const [focusEmail, setFocusEmail] = useState(false)
  const [focusSenha, setFocusSenha] = useState(false)

  async function handleLogin(e) {
    e.preventDefault()
    setErro('')
    setLoading(true)
    const { error } = await login(email, senha)
    if (error) {
      setErro('E-mail ou senha incorretos.')
      setLoading(false)
      return
    }
    navigate('/dashboard')
  }

  return (
    <div style={s.page}>

      {/* Coluna esquerda — identidade visual */}
      <div style={s.left}>
        <div style={s.lineTop} />
        <div style={s.lineBottom} />

        <div style={s.leftContent}>
          <div style={s.badge}>Sistema de Gestão</div>

          <h1 style={s.headline}>
            Sua carteira.<br />
            <span style={s.headlineAccent}>Sob controle.</span>
          </h1>

          <p style={s.sub}>
            Apólices, clientes e comissões<br />num só lugar.
          </p>

          <div style={s.metrics}>
            <div style={s.metric}>
              <span style={s.metricNum}>+2.4k</span>
              <span style={s.metricLabel}>apólices gerenciadas</span>
            </div>
            <div style={s.metricDivider} />
            <div style={s.metric}>
              <span style={s.metricNum}>30d</span>
              <span style={s.metricLabel}>alertas antecipados</span>
            </div>
          </div>
        </div>

        <div style={s.geoCircle} />
        <div style={s.geoSquare} />
      </div>

      {/* Coluna direita — formulário */}
      <div style={s.right}>
        <div style={s.formWrap}>

          <div style={s.formTop}>
            <div style={s.logoMark}>C</div>
            <span style={s.logoText}>Corretora</span>
          </div>

          <h2 style={s.formTitle}>Entrar</h2>
          <p style={s.formSub}>Acesse sua conta para continuar.</p>

          <form onSubmit={handleLogin} style={s.form}>

            <div style={s.field}>
              <label style={s.label}>E-mail</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="voce@corretora.com.br"
                required
                style={{
                  ...s.input,
                  borderColor: focusEmail ? '#d4a017' : '#2a2a2a',
                  boxShadow: focusEmail ? '0 0 0 3px rgba(212,160,23,0.12)' : 'none',
                }}
                onFocus={() => setFocusEmail(true)}
                onBlur={() => setFocusEmail(false)}
              />
            </div>

            <div style={s.field}>
              <label style={s.label}>Senha</label>
              <input
                type="password"
                value={senha}
                onChange={e => setSenha(e.target.value)}
                placeholder="••••••••"
                required
                style={{
                  ...s.input,
                  borderColor: focusSenha ? '#d4a017' : '#2a2a2a',
                  boxShadow: focusSenha ? '0 0 0 3px rgba(212,160,23,0.12)' : 'none',
                }}
                onFocus={() => setFocusSenha(true)}
                onBlur={() => setFocusSenha(false)}
              />
            </div>

            {erro && (
              <div style={s.erroBox}>⚠ {erro}</div>
            )}

            <button
              type="submit"
              disabled={loading}
              style={{ ...s.btn, opacity: loading ? 0.6 : 1 }}
            >
              {loading ? 'Verificando...' : 'Acessar sistema →'}
            </button>
          </form>

          <p style={s.hint}>Esqueceu a senha? Fale com o administrador.</p>
        </div>
      </div>

    </div>
  )
}

const s = {
  page: {
    display: 'flex',
    minHeight: '100vh',
    fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
    backgroundColor: '#0c0c0e',
  },
  left: {
    flex: '0 0 52%',
    backgroundColor: '#0c0c0e',
    position: 'relative',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    borderRight: '1px solid #1e1e1e',
  },
  leftContent: {
    position: 'relative',
    zIndex: 2,
    padding: '64px 72px',
  },
  badge: {
    display: 'inline-block',
    fontSize: '11px',
    fontWeight: '500',
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    color: '#d4a017',
    border: '1px solid rgba(212,160,23,0.3)',
    padding: '5px 12px',
    borderRadius: '4px',
    marginBottom: '36px',
  },
  headline: {
    fontSize: '54px',
    fontWeight: '700',
    letterSpacing: '-2px',
    lineHeight: 1.1,
    color: '#f0ede8',
    margin: '0 0 20px',
  },
  headlineAccent: {
    color: '#d4a017',
  },
  sub: {
    fontSize: '16px',
    color: '#5a5a5a',
    lineHeight: 1.7,
    margin: '0 0 56px',
    fontWeight: '400',
  },
  metrics: {
    display: 'flex',
    alignItems: 'center',
    gap: '28px',
  },
  metric: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  },
  metricNum: {
    fontSize: '22px',
    fontWeight: '700',
    color: '#f0ede8',
    letterSpacing: '-0.5px',
  },
  metricLabel: {
    fontSize: '11px',
    color: '#3a3a3a',
    textTransform: 'uppercase',
    letterSpacing: '0.07em',
  },
  metricDivider: {
    width: '1px',
    height: '36px',
    backgroundColor: '#1e1e1e',
  },
  lineTop: {
    position: 'absolute',
    top: '72px',
    right: '0',
    width: '40%',
    height: '1px',
    backgroundColor: '#1e1e1e',
  },
  lineBottom: {
    position: 'absolute',
    bottom: '72px',
    left: '0',
    width: '60%',
    height: '1px',
    backgroundColor: '#1e1e1e',
  },
  geoCircle: {
    position: 'absolute',
    width: '480px',
    height: '480px',
    borderRadius: '50%',
    border: '1px solid #1a1a1a',
    bottom: '-180px',
    right: '-160px',
    zIndex: 1,
  },
  geoSquare: {
    position: 'absolute',
    width: '180px',
    height: '180px',
    border: '1px solid #1e1e1e',
    top: '60px',
    right: '48px',
    transform: 'rotate(18deg)',
    zIndex: 1,
  },
  right: {
    flex: 1,
    backgroundColor: '#0e0e10',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '48px 32px',
  },
  formWrap: {
    width: '100%',
    maxWidth: '380px',
  },
  formTop: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    marginBottom: '48px',
  },
  logoMark: {
    width: '34px',
    height: '34px',
    borderRadius: '8px',
    backgroundColor: '#d4a017',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '16px',
    fontWeight: '700',
    color: '#0c0c0e',
    letterSpacing: '-0.5px',
  },
  logoText: {
    fontSize: '15px',
    fontWeight: '500',
    color: '#f0ede8',
    letterSpacing: '-0.3px',
  },
  formTitle: {
    fontSize: '26px',
    fontWeight: '700',
    color: '#f0ede8',
    letterSpacing: '-0.8px',
    margin: '0 0 6px',
  },
  formSub: {
    fontSize: '14px',
    color: '#3a3a3a',
    margin: '0 0 36px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '18px',
  },
  field: {
    display: 'flex',
    flexDirection: 'column',
    gap: '7px',
  },
  label: {
    fontSize: '12px',
    fontWeight: '500',
    color: '#5a5a5a',
    textTransform: 'uppercase',
    letterSpacing: '0.07em',
  },
  input: {
    padding: '12px 14px',
    borderRadius: '8px',
    border: '1px solid #2a2a2a',
    backgroundColor: '#141416',
    fontSize: '14px',
    color: '#f0ede8',
    outline: 'none',
    transition: 'border-color .15s, box-shadow .15s',
  },
  erroBox: {
    padding: '10px 14px',
    borderRadius: '7px',
    backgroundColor: 'rgba(212,60,30,0.1)',
    border: '1px solid rgba(212,60,30,0.25)',
    color: '#e07060',
    fontSize: '13px',
  },
  btn: {
    marginTop: '6px',
    padding: '13px',
    borderRadius: '8px',
    backgroundColor: '#d4a017',
    color: '#0c0c0e',
    fontSize: '14px',
    fontWeight: '600',
    border: 'none',
    cursor: 'pointer',
    letterSpacing: '-0.1px',
    transition: 'opacity .15s',
  },
  hint: {
    marginTop: '24px',
    fontSize: '12px',
    color: '#2e2e2e',
    textAlign: 'center',
  },
}
