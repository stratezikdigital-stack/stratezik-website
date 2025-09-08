import React from 'react';
import { Mail, MapPin, Users, Target } from 'lucide-react';

const CareerPage: React.FC = () => {

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white">
      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              {/* Headline */}
              <div className="space-y-4">
                <h1 className="text-5xl lg:text-6xl font-bold text-slate-900 leading-tight">
                  Love meeting people?<br />
                  <span className="text-red-600">Join us.</span>
                </h1>
              </div>

              {/* Company Logo and Name */}
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center">
                  <div className="text-white text-2xl font-bold">$</div>
                  <div className="absolute -top-1 -right-1 w-6 h-6 bg-white rounded-full flex items-center justify-center">
                    <div className="text-red-600 text-xs">♔</div>
                  </div>
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-slate-900">Stratezik</h2>
                  <p className="text-slate-600">Digital Marketing Excellence</p>
                </div>
              </div>

              {/* Job Title */}
              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-slate-900">
                  Business Development<br />
                  Representative – Toronto
                </h3>
                <p className="text-slate-600 text-lg">
                  Join our dynamic team and help businesses grow through strategic digital marketing solutions.
                </p>
              </div>

              {/* Company Footer */}
              <div className="space-y-4">
                <p className="text-sm text-slate-500">Stratezik Digital Inc.</p>
              </div>
            </div>

            {/* Right Content - Professional Headshot */}
            <div className="relative">
              <div className="w-80 h-80 mx-auto rounded-full overflow-hidden shadow-lg">
                <img 
                  src="/headshot.jpeg" 
                  alt="Professional team member" 
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Job Details Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-slate-900 text-center mb-12">
              Why Join Stratezik?
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="text-center p-6 bg-slate-50 rounded-xl">
                <Target className="w-12 h-12 text-red-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-slate-900 mb-2">Strategic Growth</h3>
                <p className="text-slate-600">Help businesses achieve their digital marketing goals through data-driven strategies.</p>
              </div>
              
              <div className="text-center p-6 bg-slate-50 rounded-xl">
                <Users className="w-12 h-12 text-red-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-slate-900 mb-2">Team Collaboration</h3>
                <p className="text-slate-600">Work with passionate professionals in a collaborative and innovative environment.</p>
              </div>
              
              <div className="text-center p-6 bg-slate-50 rounded-xl">
                <MapPin className="w-12 h-12 text-red-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-slate-900 mb-2">Toronto Location</h3>
                <p className="text-slate-600">Based in the heart of Toronto's business district with flexible work options.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Application Instructions */}
      <section className="py-16 px-4 bg-slate-50">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-slate-900 mb-8">
              How to Apply
            </h2>
            
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <Mail className="w-16 h-16 text-red-600 mx-auto mb-6" />
              <h3 className="text-2xl font-semibold text-slate-900 mb-4">
                Email Your Resume
              </h3>
              <p className="text-lg text-slate-600 mb-6">
                Send your resume and cover letter to:
              </p>
              <a 
                href="mailto:dave@stratezikdigital.com?subject=Application for Business Development Representative - Toronto"
                className="text-2xl font-bold text-red-600 hover:text-red-700 transition-colors duration-300"
              >
                dave@stratezikdigital.com
              </a>
              <p className="text-sm text-slate-500 mt-4">
                Please include "Business Development Representative - Toronto" in the subject line.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Company Info */}
      <section className="py-16 px-4 bg-slate-900 text-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8">
              About Stratezik Digital Inc.
            </h2>
            <p className="text-xl text-slate-300 leading-relaxed">
              We are a Toronto-based digital marketing agency specializing in strategic growth solutions. 
              Our team combines creativity with data-driven insights to help businesses achieve their goals. 
              Join us in shaping the future of digital marketing.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CareerPage;
