import { motion } from 'framer-motion'
import { Linkedin, Twitter, Mail } from 'lucide-react'

const TeamSection = () => {
  const team = [
    {
      name: "Sarah Johnson",
      role: "Strategic Director",
      description: "Chess master turned marketing strategist with 15+ years of experience in digital marketing.",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face",
      chessPiece: "♚",
      specialties: ["Strategic Planning", "Brand Strategy", "Market Analysis"]
    },
    {
      name: "Michael Chen",
      role: "Analytics Master",
      description: "Data scientist who transforms numbers into winning strategies and measurable results.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
      chessPiece: "♛",
      specialties: ["Data Analytics", "ROI Optimization", "Performance Tracking"]
    },
    {
      name: "Emily Rodriguez",
      role: "Creative Strategist",
      description: "Creative genius who designs campaigns that capture attention and drive engagement.",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
      chessPiece: "♜",
      specialties: ["Creative Campaigns", "Content Strategy", "Visual Design"]
    },
    {
      name: "David Thompson",
      role: "Growth Specialist",
      description: "Growth hacker who scales businesses with innovative strategies and proven tactics.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
      chessPiece: "♝",
      specialties: ["Lead Generation", "Conversion Optimization", "Growth Hacking"]
    }
  ]

  return (
    <section id="about" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="text-4xl text-red-600">♔</div>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900">
              Meet Our Strategic Team
            </h2>
          </div>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Our team of chess masters and marketing strategists work together to ensure every move leads to victory.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center group"
            >
              <div className="relative mb-6">
                <div className="relative w-48 h-48 mx-auto">
                  <div className="w-full h-full bg-gradient-to-br from-slate-200 to-slate-300 rounded-full border-4 border-slate-200 group-hover:border-red-600 transition-colors duration-300 flex items-center justify-center">
                    <div className="text-6xl text-slate-500 font-bold">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </div>
                  </div>
                  <div className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold">
                    {member.chessPiece}
                  </div>
                </div>
              </div>
              
              <h3 className="text-xl font-semibold text-slate-900 mb-2">
                {member.name}
              </h3>
              
              <p className="text-red-600 font-semibold mb-3">
                {member.role}
              </p>
              
              <p className="text-slate-600 mb-4">
                {member.description}
              </p>
              
              <div className="space-y-2 mb-6">
                {member.specialties.map((specialty, specialtyIndex) => (
                  <div key={specialtyIndex} className="text-sm text-slate-600">
                    • {specialty}
                  </div>
                ))}
              </div>
              
              <div className="flex justify-center space-x-3">
                <a href="#" className="text-slate-400 hover:text-red-600 transition-colors duration-200">
                  <Linkedin className="h-5 w-5" />
                </a>
                <a href="#" className="text-slate-400 hover:text-red-600 transition-colors duration-200">
                  <Twitter className="h-5 w-5" />
                </a>
                <a href="#" className="text-slate-400 hover:text-red-600 transition-colors duration-200">
                  <Mail className="h-5 w-5" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Team Stats */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 pt-16 border-t border-slate-200"
        >
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-red-600 mb-2">15+</div>
            <div className="text-slate-600">Years Experience</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-red-600 mb-2">50+</div>
            <div className="text-slate-600">Team Members</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-red-600 mb-2">500+</div>
            <div className="text-slate-600">Projects Won</div>
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

export default TeamSection
