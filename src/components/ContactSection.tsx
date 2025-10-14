import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react'

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      // Send to Google Sheets via Apps Script
      const response = await fetch('https://script.google.com/macros/s/AKfycbyykUFfL_h4hq9xtTr8uY2zus3QRlWNjFA5sGPg4uJaOxDzsoWXlGQFvgJVQdbL3dXt/exec', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          company: formData.company,
          message: formData.message,
          source: 'stratezik.com'
        })
      })
      
      const result = await response.json()
      
      if (result.success) {
        setIsSubmitted(true)
        setFormData({ name: '', email: '', company: '', message: '' })
      } else {
        throw new Error(result.error || 'Failed to submit form')
      }
    } catch (error) {
      console.error('Form submission error:', error)
      alert('Sorry, there was an error submitting your form. Please try again or contact us directly.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="py-24 bg-white relative overflow-hidden">
      {/* Chess board background */}
      <div className="absolute inset-0 opacity-5">
        <div className="grid grid-cols-8 h-full">
          {Array.from({ length: 64 }).map((_, i) => (
            <div
              key={i}
              className={`${
                (Math.floor(i / 8) + i) % 2 === 0 ? 'bg-slate-800' : 'bg-white'
              }`}
            />
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl font-bold text-slate-900 mb-6">
            Ready to Make Your <span className="text-red-600">Move?</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Let's discuss your digital marketing strategy.
            Every great campaign starts with a conversation.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="border-2 border-slate-200 shadow-xl rounded-lg">
              <div className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="text-3xl text-red-600">♛</div>
                  <h3 className="text-2xl font-bold text-slate-900">
                    Start Your Strategy Session
                  </h3>
                </div>

                {isSubmitted ? (
                  <div className="text-center py-8">
                    <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                    <h4 className="text-xl font-bold text-slate-900 mb-2">
                      Message Sent Successfully!
                    </h4>
                    <p className="text-slate-600">
                      We'll get back to you within 24 hours to discuss your strategy.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">
                          Full Name
                        </label>
                        <input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent transition-colors duration-200"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                          Email Address
                        </label>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent transition-colors duration-200"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="company" className="block text-sm font-medium text-slate-700 mb-2">
                        Company Name
                      </label>
                      <input
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent transition-colors duration-200"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-2">
                        Tell us about your project
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        rows={4}
                        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent transition-colors duration-200"
                        placeholder="What are your marketing goals? What challenges are you facing?"
                      />
                    </div>
                    
                    <button
                      type="submit"
                      className="w-full bg-red-600 hover:bg-red-700 text-white py-6 text-lg font-semibold rounded-lg transition-colors disabled:opacity-50"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <motion.div
                            className="w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2 inline-block"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4 mr-2 inline-block" />
                          Send Message
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="border-2 border-slate-200 shadow-xl rounded-lg">
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="text-2xl text-slate-800">♜</div>
                  <h3 className="text-xl font-bold text-slate-900">
                    Get in Touch
                  </h3>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Mail className="w-5 h-5 text-red-600 mt-1" />
                    <div>
                      <h4 className="font-semibold text-slate-900">Email</h4>
                      <p className="text-slate-600">
                        <a href="mailto:dave@stratezik.com" className="hover:text-red-600 transition-colors">dave@stratezik.com</a>
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-red-600 mt-1" />
                    <div>
                      <h4 className="font-semibold text-slate-900">Phone</h4>
                      <p className="text-slate-600">
                        <a href="tel:+16479546557" className="hover:text-red-600 transition-colors">+1 (647) 954-6557</a>
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-red-600 mt-1" />
                    <div>
                      <h4 className="font-semibold text-slate-900">Office</h4>
                      <p className="text-slate-600">2466 Eglinton Ave E</p>
                      <p className="text-slate-600">Toronto, ON, Canada</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-red-50 to-red-100 border-2 border-red-200 shadow-xl rounded-lg">
              <div className="p-5 text-center">
                <div className="text-3xl text-red-600 mb-3">♚</div>
                <h3 className="text-lg font-bold text-slate-900 mb-3">
                  Free Strategy Consultation
                </h3>
                <p className="text-sm text-slate-600 mb-4 leading-relaxed">
                  Book a 30-minute strategy session to discuss your marketing goals
                  and see how we can help you achieve checkmate.
                </p>
                <button className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-2 rounded-lg transition-colors text-sm">
                  Schedule Call
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
