import { motion } from 'framer-motion'
import { Users, Target, Award, TrendingUp } from 'lucide-react'

const About = () => {
  const features = [
    {
      icon: <Target className="h-8 w-8" />,
      title: "Strategic Planning",
      description: "Data-driven strategies that align with your business goals and market opportunities."
    },
    {
      icon: <TrendingUp className="h-8 w-8" />,
      title: "Growth Optimization",
      description: "Scalable solutions that drive sustainable growth and maximize ROI."
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Expert Team",
      description: "Experienced professionals dedicated to delivering exceptional results."
    },
    {
      icon: <Award className="h-8 w-8" />,
      title: "Proven Results",
      description: "Track record of success with measurable outcomes and client satisfaction."
    }
  ]

  return (
    <section id="about" className="section-padding bg-white">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            About Stratezik
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            We are a strategic consulting firm that helps businesses navigate the complexities of the digital age with innovative solutions and proven methodologies.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
              Transforming Businesses Through Strategic Innovation
            </h3>
            <p className="text-gray-600 mb-6">
              At Stratezik, we believe that every business has the potential to achieve extraordinary growth. Our approach combines deep industry expertise with cutting-edge technology to deliver solutions that drive real results.
            </p>
            <p className="text-gray-600 mb-8">
              With over a decade of experience working with companies across various industries, we've developed a proven framework that helps organizations identify opportunities, overcome challenges, and achieve their strategic objectives.
            </p>
            
            <div className="grid grid-cols-2 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">10+</div>
                <div className="text-sm text-gray-600">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">50+</div>
                <div className="text-sm text-gray-600">Team Members</div>
              </div>
            </div>
          </motion.div>

          {/* Right Content - Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl p-8">
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <Users className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Team Collaboration</h4>
                      <p className="text-sm text-gray-600">Working together for success</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                      <Target className="h-6 w-6 text-accent" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Goal Achievement</h4>
                      <p className="text-sm text-gray-600">Focused on your objectives</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-green-500/10 rounded-full flex items-center justify-center">
                      <TrendingUp className="h-6 w-6 text-green-500" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Sustainable Growth</h4>
                      <p className="text-sm text-gray-600">Long-term success strategies</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center group"
            >
              <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default About
