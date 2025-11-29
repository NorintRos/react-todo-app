import { Routes, Route } from 'react-router-dom'
import Header from './components/layout/Header.jsx'
import Footer from './components/layout/Footer.jsx'
import DashboardPage from './pages/Dashboard.jsx'
import TodayPage from './pages/Today.jsx'
import CategoriesPage from './pages/Categories.jsx'
import CompletedPage from './pages/Completed.jsx'
import SettingsPage from './pages/Settings.jsx'
import LoginPage from './pages/Login.jsx'
import GetStartedPage from './pages/GetStarted.jsx'
import NotFoundPage from './pages/NotFound.jsx'

function App() {
  return (
    <div className="app-shell">
      <Header />
      <main className="app-content">
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/today" element={<TodayPage />} />
          <Route path="/categories" element={<CategoriesPage />} />
          <Route path="/completed" element={<CompletedPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/get-started" element={<GetStartedPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App
