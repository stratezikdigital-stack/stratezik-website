import { motion } from 'framer-motion'
import { ChevronRight } from 'lucide-react'

const HeroSection = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-50 to-white overflow-hidden">
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
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              <div className="flex items-center justify-center lg:justify-start gap-3 mb-6">
                <img src="/stratezik logo/vertical logo (1).png" alt="Stratezik Logo" className="h-16 w-auto" />
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight">
                  Toronto's Premier Digital Marketing Agency
                </h1>
              </div>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto lg:mx-0"
            >
              Think several moves ahead. Every campaign planned with chess master precision. 
              We help businesses achieve checkmate in the digital marketplace.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <button className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg font-semibold flex items-center justify-center group transition-colors">
                Get Your Free 1-Hour Consultation
                <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="mt-8 space-y-2 text-center lg:text-left"
            >
              <p className="text-slate-600">
                <strong>Phone:</strong> <a href="tel:+16479546557" className="text-red-600 hover:text-red-700">+1 (647) 954-6557</a>
              </p>
              <p className="text-slate-600">
                <strong>Email:</strong> <a href="mailto:dave@stratezik.com" className="text-red-600 hover:text-red-700">dave@stratezik.com</a>
              </p>
              <p className="text-slate-600">
                <strong>Address:</strong> 2466 Eglinton Ave E, Toronto, ON, Canada
              </p>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="grid grid-cols-3 gap-8 mt-12 max-w-md mx-auto lg:mx-0"
            >
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">500+</div>
                <div className="text-sm text-slate-600">Victories</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">98%</div>
                <div className="text-sm text-slate-600">Win Rate</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">24/7</div>
                <div className="text-sm text-slate-600">Strategy</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Content - Chess Board */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="relative"
          >
            <div className="relative bg-white rounded-2xl shadow-2xl p-8 transform rotate-3 hover:rotate-0 transition-transform duration-300">
              <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 text-white">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold">Strategic Dashboard</h3>
                  <div className="text-2xl">♛</div>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Market Position</span>
                    <span className="font-semibold text-green-400">Checkmate</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Growth Strategy</span>
                    <span className="font-semibold text-yellow-400">+150%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>ROI</span>
                    <span className="font-semibold text-blue-400">$2.5M</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Floating Chess Pieces */}
            <div className="absolute -top-4 -right-4 bg-red-600 text-white rounded-full p-3 shadow-lg">
              <div className="w-8 h-8 flex items-center justify-center">
                <span className="text-sm font-bold">♜</span>
              </div>
            </div>
            <div className="absolute -bottom-4 -left-4 bg-slate-800 text-white rounded-full p-3 shadow-lg">
              <div className="w-8 h-8 flex items-center justify-center">
                <span className="text-sm font-bold">♝</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className="animate-bounce">
          <div className="w-6 h-10 border-2 border-slate-400 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-slate-400 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}

export default HeroSection
