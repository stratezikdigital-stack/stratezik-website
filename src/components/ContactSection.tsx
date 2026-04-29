import React, { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react'
import { scrollToContactForm } from '../utils/navigation'
import { useSection } from '../three/world/useSection'
import { useWorldStore } from '../three/world/store'

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null)
  useSection('contact', sectionRef)
  const setResigned = useWorldStore((s) => s.setResigned)

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  // Mirror submission state into the world store so the global opposing king
  // topples in the persistent canvas when the user submits.
  useEffect(() => {
    setResigned(isSubmitted)
  }, [isSubmitted, setResigned])

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
      // Use GET request with query parameters to bypass CORS issues
      const params = new URLSearchParams({
        name: formData.name,
        email: formData.email,
        company: formData.company,
        message: formData.message,
        source: 'stratezik.com'
      })
      
      await fetch(`https://script.google.com/macros/s/AKfycbyRQyW4slnqjxI4yY75-Tj2RX-uTlJg5dUIZBbaRnsJ1yBB8tPdOZmI3sV0T3WX4wL_/exec?${params}`, {
        method: 'GET',
        mode: 'no-cors'
      })
      
      // Since we're using no-cors, we can't check the response
      // But if we get here without an error, assume it worked
      setIsSubmitted(true)
      setFormData({ name: '', email: '', company: '', message: '' })
      
    } catch (error) {
      console.error('Form submission error:', error)
      alert('Sorry, there was an error submitting your form. Please try again or contact us directly.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative overflow-hidden lg:min-h-[180vh]"
    >
      {/* Sticky inner container — on lg+ the form + HUD stay pinned for one
          viewport while the camera dollies in to the promotion square and
          the pawn promotes to a queen in the persistent canvas behind.
          On mobile we let everything scroll naturally so the form stays
          reachable, while the camera animation still plays from global
          scroll progress. */}
      <div className="lg:sticky lg:top-0 w-full lg:min-h-screen flex items-center py-24">
      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2
            className="font-display text-4xl md:text-5xl font-semibold text-white mb-4 tracking-tight"
            style={{ fontFamily: '"Fraunces", "Inter", serif' }}
          >
            Ready to make your <span className="bg-gradient-to-br from-red-400 to-amber-300 bg-clip-text text-transparent">move</span>?
          </h2>
          <p className="text-lg text-white/80 max-w-3xl mx-auto bg-slate-900/50 backdrop-blur rounded-xl px-4 py-2 inline-block">
            Submit your details to deliver checkmate. The opposing king will visibly resign.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            id="contact-form"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="border border-white/60 bg-white/80 backdrop-blur-md shadow-xl rounded-2xl">
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
            {/* HUD overlay — narrates the game state. The actual 3D promotion
                + opposing king resign animation is rendered by the global
                world canvas behind the page. */}
            <motion.div
              animate={isSubmitted
                ? { scale: [1, 1.04, 1], boxShadow: [
                    '0 10px 30px rgba(0,0,0,0.10)',
                    '0 18px 50px rgba(220, 38, 38, 0.35)',
                    '0 10px 30px rgba(0,0,0,0.10)',
                  ] }
                : { scale: 1 }}
              transition={{ duration: 1.4, ease: 'easeOut' }}
              className={`relative rounded-2xl border backdrop-blur-md shadow-xl px-5 py-4 flex items-center gap-3 transition-colors duration-700 ${
                isSubmitted
                  ? 'border-amber-300/70 bg-gradient-to-r from-amber-50/95 via-white/85 to-red-50/95'
                  : 'border-white/60 bg-white/70'
              }`}
            >
              <motion.span
                animate={isSubmitted ? { rotate: [0, -8, 8, 0], scale: [1, 1.25, 1] } : {}}
                transition={{ duration: 1.0, ease: 'easeOut' }}
                className={`text-3xl ${isSubmitted ? 'text-amber-500 drop-shadow-[0_0_12px_rgba(245,158,11,0.6)]' : 'text-amber-500'}`}
              >
                {isSubmitted ? '\u2655' : '\u265A'}
              </motion.span>
              <div>
                <div className={`text-[11px] uppercase tracking-[0.2em] ${
                  isSubmitted ? 'text-red-700' : 'text-slate-500'
                }`}>
                  {isSubmitted ? 'Checkmate' : 'Your move'}
                </div>
                <div className="text-base font-semibold text-slate-900">
                  {isSubmitted ? 'They resigned. Welcome to the winning side.' : 'The board awaits your strategy'}
                </div>
              </div>
            </motion.div>

            <div className="border border-white/60 bg-white/80 backdrop-blur-md shadow-xl rounded-2xl">
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
                        <a href="tel:+14375254772" className="hover:text-red-600 transition-colors">
                          437-525-4772
                        </a>
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

            <div className="bg-gradient-to-br from-red-50/95 to-red-100/95 backdrop-blur-md border border-red-200/80 shadow-xl rounded-2xl">
              <div className="p-5 text-center">
                <div className="text-3xl text-red-600 mb-3">♚</div>
                <h3 className="text-lg font-bold text-slate-900 mb-3">
                  Free Strategy Consultation
                </h3>
                <p className="text-sm text-slate-600 mb-4 leading-relaxed">
                  Book a 30-minute strategy session to discuss your marketing goals
                  and see how we can help you achieve checkmate.
                </p>
                <button
                  type="button"
                  onClick={scrollToContactForm}
                  className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-2 rounded-lg transition-colors text-sm"
                >
                  Schedule Call
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      </div>
    </section>
  )
}
