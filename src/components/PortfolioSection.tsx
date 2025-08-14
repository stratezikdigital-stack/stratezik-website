import { motion } from 'framer-motion'
import { ExternalLink, ArrowRight } from 'lucide-react'

const PortfolioSection = () => {
  const projects = [
    {
      title: "E-Commerce Checkmate",
      category: "Digital Marketing",
      description: "Strategic e-commerce campaign that achieved 300% increase in sales and market dominance.",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=500&h=300&fit=crop",
      technologies: ["Google Ads", "Facebook Ads", "SEO", "Analytics"],
      results: "300% increase in sales"
    },
    {
      title: "Brand Strategy Victory",
      category: "Brand Strategy",
      description: "Complete brand transformation that positioned the client as the industry king.",
      image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=500&h=300&fit=crop",
      technologies: ["Brand Identity", "Messaging", "Visual Design", "Positioning"],
      results: "Market leadership achieved"
    },
    {
      title: "Data Analytics Mastery",
      category: "Analytics & Data",
      description: "Advanced analytics implementation that provided strategic insights and optimization.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&h=300&fit=crop",
      technologies: ["Google Analytics", "Data Studio", "A/B Testing", "ROI Tracking"],
      results: "40% improvement in decisions"
    },
    {
      title: "Social Media Domination",
      category: "Social Media",
      description: "Comprehensive social media strategy that captured the market and drove engagement.",
      image: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=500&h=300&fit=crop",
      technologies: ["Instagram", "LinkedIn", "Content Strategy", "Community Management"],
      results: "500% engagement increase"
    },
    {
      title: "Lead Generation Success",
      category: "Lead Generation",
      description: "Strategic lead generation campaign that filled the sales pipeline with qualified prospects.",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=500&h=300&fit=crop",
      technologies: ["PPC", "Landing Pages", "CRM", "Automation"],
      results: "200% more qualified leads"
    },
    {
      title: "Conversion Optimization",
      category: "Conversion Optimization",
      description: "Data-driven optimization that maximized conversion rates and revenue growth.",
      image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=500&h=300&fit=crop",
      technologies: ["A/B Testing", "UX Design", "Analytics", "CRO"],
      results: "150% conversion increase"
    }
  ]

  return (
    <section id="portfolio" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="text-4xl text-red-600">♜</div>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900">
              Strategic Victories
            </h2>
          </div>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Explore our successful campaigns and see how we've helped businesses achieve checkmate in their markets.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 group border border-slate-200"
            >
              <div className="relative overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <button className="bg-white text-slate-900 px-4 py-2 rounded-lg font-semibold flex items-center space-x-2 hover:bg-slate-100 transition-colors duration-200">
                    <ExternalLink className="h-4 w-4" />
                    <span>View Victory</span>
                  </button>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-red-600 font-semibold">
                    {project.category}
                  </span>
                  <span className="text-sm text-green-600 font-semibold">
                    {project.results}
                  </span>
                </div>
                
                <h3 className="text-xl font-semibold text-slate-900 mb-3">
                  {project.title}
                </h3>
                
                <p className="text-slate-600 mb-4">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-3 py-1 bg-slate-100 text-slate-700 text-sm rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                
                <button className="text-red-600 font-semibold hover:text-red-700 transition-colors duration-200 flex items-center group">
                  Case Study
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Portfolio Stats */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 pt-16 border-t border-slate-200"
        >
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-red-600 mb-2">150+</div>
            <div className="text-slate-600">Strategic Victories</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-red-600 mb-2">98%</div>
            <div className="text-slate-600">Client Satisfaction</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-red-600 mb-2">$5M+</div>
            <div className="text-slate-600">Revenue Generated</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-red-600 mb-2">24/7</div>
            <div className="text-slate-600">Strategic Support</div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default PortfolioSection
