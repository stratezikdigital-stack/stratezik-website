import { motion } from 'framer-motion'
import { Target, BarChart3, Users, Zap, Shield, TrendingUp } from 'lucide-react'

const ServicesSection = () => {
  const services = [
    {
      icon: <Target className="h-8 w-8" />,
      title: "Strategic Planning",
      description: "Data-driven strategies that think several moves ahead, ensuring your business achieves checkmate in the marketplace.",
      features: ["Market Analysis", "Competitive Research", "Goal Setting", "ROI Forecasting"]
    },
    {
      icon: <BarChart3 className="h-8 w-8" />,
      title: "Analytics & Data",
      description: "Transform your data into actionable insights with advanced analytics and strategic reporting.",
      features: ["Performance Tracking", "Conversion Optimization", "A/B Testing", "Real-time Reporting"]
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Brand Strategy",
      description: "Build a powerful brand presence that positions you as the king in your industry.",
      features: ["Brand Identity", "Messaging Strategy", "Visual Design", "Brand Guidelines"]
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: "Creative Campaigns",
      description: "Innovative campaigns that capture attention and drive results with chess master precision.",
      features: ["Content Creation", "Social Media", "Email Marketing", "PPC Campaigns"]
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Digital Security",
      description: "Protect your digital assets with enterprise-grade security and compliance solutions.",
      features: ["Security Audits", "Data Protection", "Compliance", "Risk Management"]
    },
    {
      icon: <TrendingUp className="h-8 w-8" />,
      title: "Growth Optimization",
      description: "Scalable growth strategies that maximize your ROI and market position.",
      features: ["Conversion Optimization", "Lead Generation", "Customer Retention", "Market Expansion"]
    }
  ]

  return (
    <section id="services" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="text-4xl text-red-600">♛</div>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900">
              Our Strategic Services
            </h2>
          </div>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Every move calculated, every strategy planned. We help businesses achieve checkmate in the digital marketplace.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 group border border-slate-200"
            >
              <div className="bg-red-50 rounded-full w-16 h-16 flex items-center justify-center mb-6 group-hover:bg-red-600 group-hover:text-white transition-colors duration-300">
                {service.icon}
              </div>
              
              <h3 className="text-xl font-semibold text-slate-900 mb-3">
                {service.title}
              </h3>
              
              <p className="text-slate-600 mb-4">
                {service.description}
              </p>
              
              <ul className="space-y-2">
                {service.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center text-sm text-slate-600">
                    <div className="w-2 h-2 bg-red-600 rounded-full mr-3"></div>
                    {feature}
                  </li>
                ))}
              </ul>
              
              <button className="mt-6 text-red-600 font-semibold hover:text-red-700 transition-colors duration-200">
                Learn Strategy →
              </button>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-2xl p-8 text-white">
            <div className="text-4xl mb-4">♚</div>
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Ready to Make Your Strategic Move?
            </h3>
            <p className="text-lg mb-6 opacity-90">
              Let's discuss how our strategic services can help you achieve checkmate.
            </p>
            <button className="bg-white text-red-600 px-8 py-3 rounded-lg font-semibold hover:bg-slate-100 transition-colors duration-200">
              Get Free Strategy Session
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default ServicesSection
