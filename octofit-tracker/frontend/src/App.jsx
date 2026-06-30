import { Navigate, NavLink, Route, Routes } from 'react-router-dom'
import './App.css'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'

const sections = [
  {
    path: '/users',
    label: 'Users',
    description: 'Profiles, roles, teams, and fitness goals.',
  },
  {
    path: '/teams',
    label: 'Teams',
    description: 'City squads ranked by weekly points.',
  },
  {
    path: '/activities',
    label: 'Activities',
    description: 'Recent cardio, strength, and mixed sessions.',
  },
  {
    path: '/leaderboard',
    label: 'Leaderboard',
    description: 'Competitive standings across members and teams.',
  },
  {
    path: '/workouts',
    label: 'Workouts',
    description: 'Suggested training plans by focus and level.',
  },
]

function App() {
  return (
    <div className="app-shell">
      <header className="app-hero">
        <div>
          <p className="eyebrow">React 19 presentation tier</p>
          <h1>Octofit Tracker</h1>
          <p className="hero-copy">
            Monitor athletes, teams, activities, standings, and workout suggestions
            through the Express API running in the paired backend tier.
          </p>
        </div>
        <nav className="section-nav" aria-label="Primary">
          {sections.map((section) => (
            <NavLink
              key={section.path}
              to={section.path}
              className={({ isActive }) =>
                isActive ? 'nav-chip nav-chip-active' : 'nav-chip'
              }
            >
              {section.label}
            </NavLink>
          ))}
        </nav>
      </header>

      <section className="overview-grid" aria-label="Section overview">
        {sections.map((section) => (
          <article key={section.path} className="overview-card">
            <p className="overview-label">{section.label}</p>
            <p className="overview-copy">{section.description}</p>
            <NavLink to={section.path} className="overview-link">
              Open {section.label}
            </NavLink>
          </article>
        ))}
      </section>

      <main className="content-panel">
        <Routes>
          <Route path="/" element={<Navigate to="/users" replace />} />
          <Route path="/users" element={<Users />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/workouts" element={<Workouts />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
