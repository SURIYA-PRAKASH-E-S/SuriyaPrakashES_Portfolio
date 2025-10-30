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
  FiHome,
  FiSave,
  FiPlus,
  FiTrash2
} from 'react-icons/fi';
import { ref, set, push, remove, onValue } from 'firebase/database';
import { database } from '../firebase/config';

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

  // Redirect if not authenticated
  useEffect(() => {
    if (!user) {
      navigate('/admin/signin');
    }
  }, [user, navigate]);

  // Load existing data
  useEffect(() => {
    if (!user) return;

    const heroRef = ref(database, 'portfolio/hero');
    const projectsRef = ref(database, 'portfolio/projects');
    const skillsRef = ref(database, 'portfolio/skills');

    onValue(heroRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setHeroData({
          name: data.name || '',
          description: data.description || '',
          location: data.location || '',
          roles: data.roles || [''],
          avatar: data.avatar || ''
        });
      }
    });

    onValue(projectsRef, (snapshot) => {
      const data = snapshot.val();
      setProjects(Array.isArray(data) ? data : []);
    });

    onValue(skillsRef, (snapshot) => {
      const data = snapshot.val();
      setSkills(Array.isArray(data) ? data : []);
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

  const handleSaveHero = () => {
    const filteredRoles = heroData.roles.filter(role => role.trim() !== '');
    saveData('hero', { ...heroData, roles: filteredRoles });
  };

  const handleAddProject = () => {
    const newProject = {
      id: Date.now(),
      title: 'New Project',
      description: 'Project description',
      image: '',
      technologies: [],
      category: 'frontend',
      liveLink: '',
      githubLink: '',
      featured: false
    };
    setProjects([...projects, newProject]);
  };

  const handleUpdateProject = (index, field, value) => {
    const updatedProjects = [...projects];
    updatedProjects[index][field] = value;
    setProjects(updatedProjects);
  };

  const handleRemoveProject = (index) => {
    const updatedProjects = projects.filter((_, i) => i !== index);
    setProjects(updatedProjects);
  };

  const handleSaveProjects = () => {
    saveData('projects', projects);
  };

  const handleAddRole = () => {
    setHeroData({ ...heroData, roles: [...heroData.roles, ''] });
  };

  const handleRemoveRole = (index) => {
    const updatedRoles = heroData.roles.filter((_, i) => i !== index);
    setHeroData({ ...heroData, roles: updatedRoles });
  };

  const handleRoleChange = (index, value) => {
    const updatedRoles = [...heroData.roles];
    updatedRoles[index] = value;
    setHeroData({ ...heroData, roles: updatedRoles });
  };

  if (!user) {
    return null;
  }

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
          {[
            { id: 'hero', label: 'Hero Section', icon: FiUser },
            { id: 'projects', label: 'Projects', icon: FiBriefcase },
            { id: 'skills', label: 'Skills', icon: FiAward },
            { id: 'about', label: 'About', icon: FiSettings }
          ].map((tab) => (
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

        {/* Hero Section Form */}
        {activeTab === 'hero' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
          >
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
              Hero Section
            </h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  value={heroData.name}
                  onChange={(e) => setHeroData({ ...heroData, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Description
                </label>
                <textarea
                  value={heroData.description}
                  onChange={(e) => setHeroData({ ...heroData, description: e.target.value })}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  placeholder="Your description"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Location
                </label>
                <input
                  type="text"
                  value={heroData.location}
                  onChange={(e) => setHeroData({ ...heroData, location: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Your location"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Roles (for typewriter effect)
                  </label>
                  <button
                    type="button"
                    onClick={handleAddRole}
                    className="flex items-center gap-1 px-3 py-1 text-sm bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
                  >
                    <FiPlus className="w-3 h-3" />
                    Add Role
                  </button>
                </div>
                {heroData.roles.map((role, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={role}
                      onChange={(e) => handleRoleChange(index, e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder={`Role ${index + 1}`}
                    />
                    {heroData.roles.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveRole(index)}
                        className="px-3 py-2 text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 transition-colors"
                      >
                        <FiTrash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Avatar URL
                </label>
                <input
                  type="url"
                  value={heroData.avatar}
                  onChange={(e) => setHeroData({ ...heroData, avatar: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="https://example.com/avatar.jpg"
                />
              </div>

              <button
                onClick={handleSaveHero}
                disabled={saving}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white py-3 px-4 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
              >
                {saving ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <FiSave className="w-5 h-5" />
                    Save Hero Section
                  </>
                )}
              </button>
            </div>
          </motion.div>
        )}

        {/* Projects Section Form */}
        {activeTab === 'projects' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Projects Management
              </h2>
              <div className="flex gap-2">
                <button
                  onClick={handleAddProject}
                  className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
                >
                  <FiPlus className="w-4 h-4" />
                  Add Project
                </button>
                <button
                  onClick={handleSaveProjects}
                  disabled={saving}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-lg transition-colors"
                >
                  <FiSave className="w-4 h-4" />
                  Save All
                </button>
              </div>
            </div>

            <div className="space-y-6">
              {projects.map((project, index) => (
                <div key={project.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      Project {index + 1}
                    </h3>
                    <button
                      onClick={() => handleRemoveProject(index)}
                      className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 transition-colors"
                    >
                      <FiTrash2 className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Title
                      </label>
                      <input
                        type="text"
                        value={project.title}
                        onChange={(e) => handleUpdateProject(index, 'title', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Category
                      </label>
                      <select
                        value={project.category}
                        onChange={(e) => handleUpdateProject(index, 'category', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="frontend">Frontend</option>
                        <option value="backend">Backend</option>
                        <option value="fullstack">Full Stack</option>
                        <option value="mobile">Mobile</option>
                      </select>
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Description
                      </label>
                      <textarea
                        value={project.description}
                        onChange={(e) => handleUpdateProject(index, 'description', e.target.value)}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Live Link
                      </label>
                      <input
                        type="url"
                        value={project.liveLink}
                        onChange={(e) => handleUpdateProject(index, 'liveLink', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        GitHub Link
                      </label>
                      <input
                        type="url"
                        value={project.githubLink}
                        onChange={(e) => handleUpdateProject(index, 'githubLink', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Image URL
                      </label>
                      <input
                        type="url"
                        value={project.image}
                        onChange={(e) => handleUpdateProject(index, 'image', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        checked={project.featured}
                        onChange={(e) => handleUpdateProject(index, 'featured', e.target.checked)}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      />
                      <label className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                        Featured Project
                      </label>
                    </div>
                  </div>
                </div>
              ))}

              {projects.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-gray-500 dark:text-gray-400 text-lg">
                    No projects added yet. Click "Add Project" to get started.
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* Skills Section Form (Placeholder) */}
        {activeTab === 'skills' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
          >
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
              Skills Management
            </h2>
            <p className="text-gray-500 dark:text-gray-400 text-center py-8">
              Skills management section coming soon...
            </p>
          </motion.div>
        )}

        {/* About Section Form (Placeholder) */}
        {activeTab === 'about' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
          >
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
              About Section Management
            </h2>
            <p className="text-gray-500 dark:text-gray-400 text-center py-8">
              About section management coming soon...
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;