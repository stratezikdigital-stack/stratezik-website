import { motion } from 'framer-motion'
import { Target, TrendingUp, Trophy, BarChart3 } from 'lucide-react'

const StrategyFlow = () => {
  const steps = [
    {
      icon: <BarChart3 className="h-8 w-8" />,
      title: "Strategic Analysis",
      description: "We analyze your market position, competitors, and opportunities to develop a winning strategy.",
      number: "01"
    },
    {
      icon: <Target className="h-8 w-8" />,
      title: "Goal Setting",
      description: "Define clear objectives and KPIs that align with your business vision and market opportunities.",
      number: "02"
    },
    {
      icon: <TrendingUp className="h-8 w-8" />,
      title: "Execution",
      description: "Implement strategic campaigns with precision, monitoring performance and optimizing for results.",
      number: "03"
    },
    {
      icon: <Trophy className="h-8 w-8" />,
      title: "Victory",
      description: "Achieve checkmate with measurable results, increased ROI, and sustainable growth.",
      number: "04"
    }
  ]

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="text-4xl text-red-600">♝</div>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900">
              Our Strategic Process
            </h2>
          </div>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Every successful campaign follows our proven strategic framework. Think like a chess master, act like a champion.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative text-center group"
            >
              {/* Connection Line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-slate-200 z-0"></div>
              )}
              
              <div className="relative z-10 bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6 border-4 border-red-100 group-hover:border-red-600 transition-colors duration-300">
                <div className="bg-red-50 rounded-full w-12 h-12 flex items-center justify-center group-hover:bg-red-600 group-hover:text-white transition-colors duration-300">
                  {step.icon}
                </div>
              </div>
              
              <div className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                {step.number}
              </div>
              
              <h3 className="text-xl font-semibold text-slate-900 mb-3">
                {step.title}
              </h3>
              
              <p className="text-slate-600">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Process Stats */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 pt-16 border-t border-slate-200"
        >
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-red-600 mb-2">500+</div>
            <div className="text-slate-600">Strategic Wins</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-red-600 mb-2">98%</div>
            <div className="text-slate-600">Success Rate</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-red-600 mb-2">$10M+</div>
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

export default StrategyFlow
