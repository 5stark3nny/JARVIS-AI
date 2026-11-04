import { useState } from 'react'
import {
  Activity, Atom, AudioLines, Bell, Bot, BrainCircuit, ChevronDown,
  CircleHelp, Command, Cpu, Gauge, Home, Layers3, Menu, MessageSquare,
  Mic, MicOff, Monitor, MoreHorizontal, PanelLeftClose, Plus, Search,
  Send, Settings, ShieldCheck, Sparkles, Terminal, Wifi, Zap
} from 'lucide-react'

const initialMessages = [
  { role: 'assistant', text: 'Good evening. I am J.A.R.V.I.S., your personal intelligence system. My interface is online and ready. How may I assist you?' }
]

const suggestions = [
  { icon: '⌘', title: 'Plan my day', detail: 'Organise priorities and tasks' },
  { icon: '⌁', title: 'Explain a concept', detail: 'Get a clear, concise explanation' },
  { icon: '◈', title: 'Help me build', detail: 'Work through a project step by step' }
]

function App() {
  const [active, setActive] = useState('Overview')
  const [messages, setMessages] = useState(initialMessages)
  const [input, setInput] = useState('')
  const [listening, setListening] = useState(false)
  const [mobileNav, setMobileNav] = useState(false)
  const [notice, setNotice] = useState('')

  const sendMessage = (value = input) => {
    const text = value.trim()
    if (!text) return
    setMessages(prev => [...prev, { role: 'user', text }, {
      role: 'assistant',
      text: 'I have received your request. The interface is currently running in preview mode; connect an AI service to enable live reasoning and responses.'
    }])
    setInput('')
    setActive('AI Chat')
  }

  const startVoice = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    if (!SpeechRecognition) {
      setNotice('Voice recognition is not supported in this browser. Try the latest version of Chrome or Edge.')
      return
    }
    const recognition = new SpeechRecognition()
    recognition.lang = 'en-US'
    recognition.interimResults = false
    recognition.onstart = () => { setListening(true); setNotice('Listening…') }
    recognition.onresult = event => {
      const transcript = event.results[0][0].transcript
      setInput(transcript)
      setNotice('Voice captured. Press send when ready.')
    }
    recognition.onerror = () => setNotice('Microphone access failed. Check your browser permissions.')
    recognition.onend = () => setListening(false)
    recognition.start()
  }

  const navItems = [
    { label: 'Overview', icon: Home },
    { label: 'AI Chat', icon: MessageSquare },
    { label: 'Voice Control', icon: AudioLines },
    { label: 'System Monitor', icon: Activity },
    { label: 'Memory', icon: BrainCircuit },
    { label: 'Task Centre', icon: Layers3 }
  ]

  return (
    <div className="app-shell">
      <aside className={`sidebar ${mobileNav ? 'sidebar-open' : ''}`}>
        <div className="brand">
          <div className="brand-mark"><Atom size={23} /></div>
          <div><div className="brand-name">J.A.R.V.I.S.</div><div className="brand-sub">PERSONAL INTELLIGENCE</div></div>
          <button className="icon-button mobile-close" onClick={() => setMobileNav(false)} aria-label="Close menu"><PanelLeftClose size={18}/></button>
        </div>

        <button className="new-session" onClick={() => { setMessages(initialMessages); setActive('Overview') }}>
          <Plus size={16}/> New session <span>⌘ K</span>
        </button>

        <div className="nav-caption">WORKSPACE</div>
        <nav>
          {navItems.map(({ label, icon: Icon }) => (
            <button key={label} className={`nav-item ${active === label ? 'active' : ''}`} onClick={() => { setActive(label); setMobileNav(false) }}>
              <Icon size={17}/><span>{label}</span>{label === 'AI Chat' && <i className="nav-dot"/>}
            </button>
          ))}
        </nav>

        <div className="nav-caption tools-caption">TOOLS</div>
        <button className="nav-item" onClick={() => setNotice('Command console will be available after the backend is connected.')}><Terminal size={17}/><span>Command console</span></button>
        <button className="nav-item" onClick={() => setActive('Settings')}><Settings size={17}/><span>Settings</span></button>

        <div className="sidebar-bottom">
          <div className="secure-card">
            <div className="secure-icon"><ShieldCheck size={17}/></div>
            <div><strong>Local preview</strong><span>AI connection pending</span></div>
            <span className="secure-pulse"/>
          </div>
          <div className="profile">
            <div className="avatar">SK</div>
            <div className="profile-info"><strong>Operator</strong><span>Administrator</span></div>
            <MoreHorizontal size={19} className="muted"/>
          </div>
        </div>
      </aside>

      <main className="main-area">
        <header className="topbar">
          <div className="crumbs">
            <button className="icon-button mobile-menu" onClick={() => setMobileNav(true)} aria-label="Open menu"><Menu size={19}/></button>
            <span>Workspace</span><span className="slash">/</span><strong>{active}</strong>
          </div>
          <div className="top-actions">
            <div className="system-pill"><span className="green-dot"/> All systems nominal</div>
            <button className="icon-button" aria-label="Search" onClick={() => setNotice('Search will be connected to your JARVIS memory and conversations later.')}><Search size={18}/></button>
            <button className="icon-button notification" aria-label="Notifications" onClick={() => setNotice('You are all caught up.')}><Bell size={18}/></button>
            <div className="top-avatar">SK</div>
          </div>
        </header>

        <div className="content">
          <section className="welcome-row">
            <div>
              <div className="eyebrow"><span className="eyebrow-line"/> PERSONAL AI ENVIRONMENT</div>
              <h1>{active === 'Overview' ? <>Good evening<span className="cyan">, Operator.</span></> : active}</h1>
              <p>{active === 'Overview' ? 'Your command environment is ready. What shall we work on today?' : `Your ${active.toLowerCase()} workspace. Some capabilities require the JARVIS backend.`}</p>
            </div>
            <button className="date-chip"><span className="calendar-dot"/> SYSTEM PREVIEW <ChevronDown size={14}/></button>
          </section>

          <section className="status-grid">
            <StatusCard icon={<Bot size={17}/>} label="AI CORE" value="STANDBY" detail="Awaiting model connection" />
            <StatusCard icon={<Wifi size={17}/>} label="NETWORK" value="CONNECTED" detail="Browser connection active" good />
            <StatusCard icon={<Cpu size={17}/>} label="COMPUTER ACCESS" value="RESTRICTED" detail="Desktop agent not installed" />
            <StatusCard icon={<ShieldCheck size={17}/>} label="SECURITY" value="PROTECTED" detail="No privileged actions enabled" good />
          </section>

          <section className="hero-grid">
            <div className="core-panel panel">
              <div className="panel-top"><div className="panel-label"><span className="tiny-orb"/> JARVIS CORE</div><span className="live-label"><i/> VISUALIZER ACTIVE</span></div>
              <div className="core-stage">
                <div className="orbit orbit-one"/><div className="orbit orbit-two"/><div className="orbit orbit-three"/>
                <div className="core-glow"/>
                <div className="core-ring"><div className="core-inner"><AudioLines size={39} strokeWidth={1.35}/></div></div>
                <div className="orbit-node node-a"/><div className="orbit-node node-b"/><div className="orbit-node node-c"/>
              </div>
              <div className="core-status"><span className="status-indicator"/> J.A.R.V.I.S. IS {listening ? 'LISTENING' : 'AWAITING INPUT'}</div>
              <div className="core-subtitle">“At your service.”</div>
              <div className="core-controls">
                <button className={`voice-button ${listening ? 'listening' : ''}`} onClick={startVoice}><Mic size={17}/>{listening ? 'Listening…' : 'Activate voice'}</button>
                <button className="round-control" onClick={() => setNotice('Voice output will be enabled when speech synthesis is connected.')} aria-label="Voice output"><AudioLines size={17}/></button>
                <button className="round-control" onClick={() => setNotice('Core diagnostics: visualizer operational. AI engine pending connection.')} aria-label="Diagnostics"><Gauge size={17}/></button>
              </div>
            </div>

            <div className="right-stack">
              <div className="panel intelligence-panel">
                <div className="panel-heading"><div><div className="panel-label">INTELLIGENCE</div><h3>Ready when you are.</h3></div><div className="heading-icon"><BrainCircuit size={19}/></div></div>
                <p className="muted-copy">Start a conversation, ask a question, or give JARVIS a task to think through.</p>
                <button className="text-action" onClick={() => setActive('AI Chat')}>Open AI conversation <span>↗</span></button>
              </div>
              <div className="panel quick-panel">
                <div className="panel-heading"><div className="panel-label">QUICK ACCESS</div><Zap size={17} className="quick-zap"/></div>
                <QuickLink icon={<MessageSquare size={17}/>} title="Start a conversation" subtitle="Chat with your assistant" onClick={() => setActive('AI Chat')}/>
                <QuickLink icon={<Mic size={17}/>} title="Voice command" subtitle="Speak to JARVIS" onClick={startVoice}/>
                <QuickLink icon={<Monitor size={17}/>} title="System overview" subtitle="View connected systems" onClick={() => setActive('System Monitor')}/>
              </div>
            </div>
          </section>

          <section className="lower-grid">
            <div className="panel activity-panel">
              <div className="section-heading"><div><div className="panel-label">RECENT ACTIVITY</div><h3>System timeline</h3></div><button className="subtle-button" onClick={() => setNotice('There is no additional activity in this preview.')}>View log <span>↗</span></button></div>
              <div className="timeline">
                <TimelineItem icon={<ShieldCheck size={15}/>} title="Security layer initialised" time="Just now" detail="Protected preview environment established."/>
                <TimelineItem icon={<Activity size={15}/>} title="Interface systems online" time="Just now" detail="Dashboard and visualizer loaded successfully."/>
                <TimelineItem icon={<Sparkles size={15}/>} title="Awaiting AI engine" time="Pending" detail="Connect an AI provider to enable live responses."/>
              </div>
            </div>
            <div className="panel suggestions-panel">
              <div className="panel-label">SUGGESTED PROMPTS</div>
              <h3>Make your next move.</h3>
              {suggestions.map(s => <button className="suggestion" key={s.title} onClick={() => sendMessage(s.title)}><span className="suggestion-icon">{s.icon}</span><span><strong>{s.title}</strong><small>{s.detail}</small></span><span className="suggestion-arrow">↗</span></button>)}
            </div>
          </section>

          <section className="chat-panel panel">
            <div className="chat-head"><div><div className="panel-label">COMMAND INTERFACE</div><h3>Talk to JARVIS</h3></div><span className="preview-tag">PREVIEW MODE</span></div>
            <div className="messages">
              {messages.map((m, i) => <div className={`message ${m.role}`} key={i}><div className="message-avatar">{m.role === 'assistant' ? <Atom size={16}/> : 'SK'}</div><div><div className="message-name">{m.role === 'assistant' ? 'J.A.R.V.I.S.' : 'YOU'} <span>{m.role === 'assistant' ? 'AI ASSISTANT' : 'OPERATOR'}</span></div><p>{m.text}</p></div></div>)}
            </div>
            <form className="composer" onSubmit={e => { e.preventDefault(); sendMessage() }}>
              <input value={input} onChange={e => setInput(e.target.value)} placeholder="Message JARVIS or enter a command…" aria-label="Message JARVIS"/>
              <button type="button" className="composer-mic" onClick={startVoice} aria-label="Use microphone">{listening ? <MicOff size={17}/> : <Mic size={17}/>}</button>
              <button className="send-button" type="submit" aria-label="Send message"><Send size={16}/></button>
            </form>
            <div className="composer-note"><CircleHelp size={12}/> Preview replies are simulated. Connect the backend for real AI responses.</div>
          </section>

          <footer><span>J.A.R.V.I.S. PERSONAL INTELLIGENCE SYSTEM</span><span>INTERFACE BUILD 1.0.0 <i/> SECURE PREVIEW</span></footer>
        </div>
      </main>
      {notice && <div className="toast" role="status"><span>{notice}</span><button onClick={() => setNotice('')}>×</button></div>}
    </div>
  )
}

function StatusCard({ icon, label, value, detail, good }) {
  return <div className="panel status-card"><div className="status-top"><span className="status-icon">{icon}</span><span className="panel-label">{label}</span><span className={`mini-light ${good ? 'good' : ''}`}/></div><strong>{value}</strong><small>{detail}</small></div>
}
function QuickLink({ icon, title, subtitle, onClick }) {
  return <button className="quick-link" onClick={onClick}><span className="quick-icon">{icon}</span><span><strong>{title}</strong><small>{subtitle}</small></span><span className="quick-arrow">↗</span></button>
}
function TimelineItem({ icon, title, time, detail }) {
  return <div className="timeline-item"><div className="timeline-icon">{icon}</div><div className="timeline-copy"><strong>{title}</strong><small>{detail}</small></div><span className="timeline-time">{time}</span></div>
}

export default App