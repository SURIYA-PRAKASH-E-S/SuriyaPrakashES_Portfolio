import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { 
  FiLogOut, 
  FiUser, 
  FiBriefcase, 
  FiAward, 
  FiSettings,
  FiMail,
  FiActivity
} from 'react-icons/fi';
import { ref, set, onValue } from 'firebase/database';
import { database } from '../firebase/config';

// Import Manager Components
import HeroManager from '../components/admin/HeroManager';
import ProjectsManager from '../components/admin/ProjectsManager';
import SkillsManager from '../components/admin/SkillsManager';
import AboutManager from '../components/admin/AboutManager';
import ActivitiesManager from '../components/admin/ActivitiesManager';
import ContactFooterManager from '../components/admin/ContactFooterManager';

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('hero');
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  // Form states
  const [heroData, setHeroData] = useState({
    name: '',
    description: '',
    location: '',
    roles: [''],
    avatar: ''
  });

  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState([]);
  const [aboutData, setAboutData] = useState({ education: [] });
  const [activities, setActivities] = useState({ 
    internships: [], 
    certifications: [] 
  });
  const [contactData, setContactData] = useState({
    email: '',
    phone: '',
    location: '',
    social: {},
    web3formsKey: ''
  });

  // Redirect if not authenticated
  useEffect(() => {
    if (!user) {
      navigate('/admin/signin');
    }
  }, [user, navigate]);

  // Load existing data
  useEffect(() => {
    if (!user) return;

    const portfolioRef = ref(database, 'portfolio/');
    
    onValue(portfolioRef, (snapshot) => {
      const data = snapshot.val() || {};
      
      setHeroData(data.hero || {
        name: '',
        description: '',
        location: '',
        roles: [''],
        avatar: ''
      });
      
      setProjects(data.projects || []);
      setSkills(data.skills || []);
      setAboutData(data.about || { education: [] });
      setActivities(data.activities || { internships: [], certifications: [] });
      setContactData(data.contact || {
        email: '',
        phone: '',
        location: '',
        social: {},
        web3formsKey: ''
      });
    });
  }, [user]);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/admin/signin');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const showMessage = (type, text) => {
    setMessage({ type, text });
    setTimeout(() => setMessage({ type: '', text: '' }), 5000);
  };

  const saveData = async (path, data) => {
    setSaving(true);
    try {
      await set(ref(database, `portfolio/${path}`), data);
      showMessage('success', 'Data saved successfully!');
    } catch (error) {
      console.error('Save error:', error);
      showMessage('error', 'Failed to save data');
    }
    setSaving(false);
  };

  const handleSaveHero = (data) => {
    saveData('hero', data);
  };

  const handleSaveProjects = (data) => {
    saveData('projects', data);
  };

  const handleSaveSkills = (data) => {
    saveData('skills', data);
  };

  const handleSaveAbout = (data) => {
    saveData('about', data);
  };

  const handleSaveActivities = (data) => {
    saveData('activities', data);
  };

  const handleSaveContact = (data) => {
    saveData('contact', data);
  };

  if (!user) {
    return null;
  }

  const tabs = [
    { id: 'hero', label: 'Hero Section', icon: FiUser },
    { id: 'about', label: 'About Me', icon: FiUser },
    { id: 'projects', label: 'Projects', icon: FiBriefcase },
    { id: 'skills', label: 'Skills', icon: FiAward },
    { id: 'activities', label: 'Activities', icon: FiActivity },
    { id: 'contact', label: 'Contact & Footer', icon: FiMail }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Admin Dashboard
              </h1>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Manage your portfolio content
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {user?.displayName || 'Admin'}
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  {user?.email}
                </p>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 transition-colors"
              >
                <FiLogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Message Display */}
        {message.text && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-4 rounded-lg mb-6 ${
              message.type === 'error' 
                ? 'bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300' 
                : 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300'
            }`}
          >
            {message.text}
          </motion.div>
        )}

        {/* Render Active Tab Component */}
        {activeTab === 'hero' && (
          <HeroManager 
            heroData={heroData} 
            onSave={handleSaveHero} 
            saving={saving} 
          />
        )}

        {activeTab === 'about' && (
          <AboutManager 
            aboutData={aboutData} 
            onSave={handleSaveAbout} 
            saving={saving} 
          />
        )}

        {activeTab === 'projects' && (
          <ProjectsManager 
            projects={projects} 
            onSave={handleSaveProjects} 
            saving={saving} 
          />
        )}

        {activeTab === 'skills' && (
          <SkillsManager 
            skills={skills} 
            onSave={handleSaveSkills} 
            saving={saving} 
          />
        )}

        {activeTab === 'activities' && (
          <ActivitiesManager 
            activities={activities} 
            onSave={handleSaveActivities} 
            saving={saving} 
          />
        )}

        {activeTab === 'contact' && (
          <ContactFooterManager 
            contactData={contactData} 
            onSave={handleSaveContact} 
            saving={saving} 
          />
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;