import { Link, NavLink, Navigate, Route, Routes } from 'react-router-dom'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'
import './App.css'

const navigation = [
  { to: '/activities', label: 'Activities' },
  { to: '/leaderboard', label: 'Leaderboard' },
  { to: '/teams', label: 'Teams' },
  { to: '/users', label: 'Users' },
  { to: '/workouts', label: 'Workouts' },
]

function Dashboard() {
  return (
    <section className="dashboard">
      <p className="eyebrow">Your movement, your momentum</p>
      <h1>Make every move count.</h1>
      <p className="dashboard-copy">
        Track your activity, find your team, and see how your effort adds up.
      </p>
      <div className="dashboard-links">
        {navigation.map(({ to, label }) => (
          <Link className="dashboard-link" key={to} to={to}>
            <span>{label}</span>
            <span aria-hidden="true">→</span>
          </Link>
        ))}
      </div>
    </section>
  )
}

function App() {
  return (
    <div className="app-shell">
      <header className="app-header">
        <Link className="brand" to="/" aria-label="Octofit Tracker home">
          <span className="brand-mark" aria-hidden="true">O</span>
          <span>Octofit <span className="brand-light">Tracker</span></span>
        </Link>
        <nav className="navbar-nav app-nav" aria-label="Main navigation">
          {navigation.map(({ to, label }) => (
            <NavLink
              className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
              key={to}
              to={to}
            >
              {label}
            </NavLink>
          ))}
        </nav>
      </header>

      <main className="app-main container">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/users" element={<Users />} />
          <Route path="/workouts" element={<Workouts />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      <footer className="app-footer">
        <span>Octofit Tracker</span>
        <span>Build healthy habits together.</span>
      </footer>
    </div>
  )
}

export default App
