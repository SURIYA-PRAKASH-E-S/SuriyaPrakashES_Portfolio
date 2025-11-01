import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { FirebaseProvider } from './contexts/FirebaseContext';
import { AuthProvider } from './contexts/AuthContext';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Activities from './components/Activities';
import Skills from './components/Skills';
import Contact from './components/Contact';
import LoadingSpinner from './components/LoadingSpinner';
import AdminSignIn from './pages/AdminSignIn';
import AdminDashboard from './pages/AdminDashboard';
import ProtectedRoute from './components/ProtectedRoute';
import FooterDock from './components/FooterDock';


// @suriyaes2004
function App() {
  return (
    <ThemeProvider>
      <FirebaseProvider>
        <AuthProvider>
          <Router>
            <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={
                  <>
                    <main>
                      <Hero />
                      <About />
                      <Projects />
                      <Activities />
                      <Skills />
                      <Contact />
                    </main>
                    <FooterDock />
                  </>
                } />
                
                {/* Admin Routes */}
                <Route path="/admin/signin" element={<AdminSignIn />} />
                <Route 
                  path="/admin" 
                  element={
                    <ProtectedRoute>
                      <AdminDashboard />
                    </ProtectedRoute>
                  } 
                />
              </Routes>
              <LoadingSpinner />
            </div>
          </Router>
        </AuthProvider>
      </FirebaseProvider>
    </ThemeProvider>
  );
}

export default App;

// Reserved by @2025 Suriya Prakash E S