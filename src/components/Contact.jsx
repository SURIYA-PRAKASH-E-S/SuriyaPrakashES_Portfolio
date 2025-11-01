import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiSend, FiLinkedin, FiGithub } from 'react-icons/fi';
import { useContactData } from '../hooks/usePortfolioData';
import FooterBottom from './FooterBottom';

const Contact = () => {
  const { data: contactData } = useContactData();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const defaultContactData = {
    email: 'suriyaprakashes@example.com',
    social: {
      github: 'https://github.com/suriyaprakash',
      linkedin: 'https://linkedin.com/in/suriyaprakash',
    },
    web3formsKey: '',
  };

  const data = contactData || defaultContactData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    const accessKey = data.web3formsKey || import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;

    if (!accessKey) {
      setError('Contact form is not configured properly. Please email me directly.');
      setIsSubmitting(false);
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append('access_key', accessKey);
    formDataToSend.append('name', formData.name);
    formDataToSend.append('email', formData.email);
    formDataToSend.append('message', formData.message);
    formDataToSend.append('subject', 'New Contact Form Submission from Portfolio');
    formDataToSend.append('from_name', 'Portfolio Contact Form');

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formDataToSend,
      });

      const result = await response.json();

      if (result.success) {
        setIsSubmitted(true);
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setIsSubmitted(false), 5000);
      } else {
        setError(result.message || 'Failed to send message. Please try again.');
      }
    } catch (err) {
      setError('Network error. Please check your connection and try again.');
      console.error('Contact form error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const socialLinks = [
    {
      icon: <FiMail className="w-5 h-5" />,
      name: 'Email',
      url: `mailto:${data.email}`,
      color: 'hover:text-red-600 dark:hover:text-red-400',
    },
    {
      icon: <FiLinkedin className="w-5 h-5" />,
      name: 'LinkedIn',
      url: data.social?.linkedin,
      color: 'hover:text-blue-600 dark:hover:text-blue-400',
    },
    {
      icon: <FiGithub className="w-5 h-5" />,
      name: 'GitHub',
      url: data.social?.github,
      color: 'hover:text-gray-900 dark:hover:text-white',
    },
  ].filter((link) => link.url);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
 <section
  id="contact"
  className="py-20 bg-gradient-to-b from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 transition-all duration-500"
>

      <div className="container mx-auto px-4">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-blue-700 dark:text-blue-400 mb-4">
            Let’s Connect 💬
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto mb-6 rounded-full"></div>
          <p className="text-lg text-gray-900 dark:text-gray-500 max-w-2xl mx-auto leading-relaxed">
            I’d love to hear from you — whether it’s about a project, an opportunity, or just a friendly chat.
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid lg:grid-cols-2 gap-12"
          >
            {/* Info Section */}
            <div>
              <motion.p
                variants={itemVariants}
                className="text-gray-800 dark:text-gray-700 mb-8 leading-relaxed"
              >
                Drop me a message — I’m always excited to collaborate and connect with creative people.
              </motion.p>

              {socialLinks.length > 0 && (
                <motion.div variants={itemVariants} className="mt-6">
                  <h4 className="text-lg font-semibold text-blue-700 dark:text-blue-400 mb-4">
                    Connect with Me
                  </h4>
                  <div className="flex gap-4">
                    {socialLinks.map((social, index) => (
                      <motion.a
                        key={index}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.08, y: -2 }}
                        className={`p-3 bg-white dark:bg-gray-800 rounded-lg shadow-md text-gray-700 dark:text-gray-400 border border-gray-200 dark:border-gray-700 hover:shadow-xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-300 ${social.color}`}
                        aria-label={social.name}
                      >
                        {social.icon}
                      </motion.a>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>

            {/* Contact Form */}
            <motion.div
              variants={itemVariants}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 p-8 transition-all duration-500"
            >
              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-8"
                >
                  <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FiSend className="w-8 h-8 text-green-600 dark:text-green-400" />
                  </div>
                  <h3 className="text-xl font-bold text-blue-700 dark:text-blue-400 mb-2">
                    Message Sent!
                  </h3>
                  <p className="text-gray-800 dark:text-gray-400">
                    Thanks for reaching out. I’ll get back to you soon.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-300 rounded-lg"
                    >
                      {error}
                    </motion.div>
                  )}

                  {/* Inputs */}
                  {['name', 'email', 'message'].map((field) => (
                    <div key={field}>
                      <label
                        htmlFor={field}
                        className="block text-sm font-medium text-blue-700 dark:text-blue-400 mb-2"
                      >
                        {field === 'name'
                          ? 'Full Name'
                          : field === 'email'
                          ? 'Email Address'
                          : 'Message'}
                      </label>
                      {field === 'message' ? (
                        <textarea
                          id={field}
                          name={field}
                          value={formData[field]}
                          onChange={handleChange}
                          required
                          disabled={isSubmitting}
                          rows="6"
                          className="w-full px-4 py-3 border border-blue-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                          placeholder="Tell me about your project or just say hello..."
                        />
                      ) : (
                        <input
                          type={field === 'email' ? 'email' : 'text'}
                          id={field}
                          name={field}
                          value={formData[field]}
                          onChange={handleChange}
                          required
                          disabled={isSubmitting}
                          className="w-full px-4 py-3 border border-blue-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                          placeholder={
                            field === 'name'
                              ? 'Enter your full name'
                              : 'Enter your email address'
                          }
                        />
                      )}
                    </div>
                  ))}

                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:from-blue-400 disabled:to-indigo-400 text-white py-3 px-6 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all duration-300 shadow-md hover:shadow-xl disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <FiSend className="w-5 h-5" />
                        Send Message
                      </>
                    )}
                  </motion.button>

                  <p className="text-xs text-gray-700 dark:text-gray-400 text-center">
                    Your information is secure and will only be used to respond to your inquiry.
                  </p>
                </form>
              )}
            </motion.div>
          </motion.div>
        </div>
      </div>

      <FooterBottom />
    </section>
  );
};

export default Contact;
