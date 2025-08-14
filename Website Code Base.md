**Pages**

import React, { useState, useEffect } from 'react';  
import { motion, AnimatePresence } from 'framer-motion';  
import { ChevronRight, Play, Users, Target, TrendingUp, Award, ArrowRight, Mail, Phone, MapPin, CheckCircle } from 'lucide-react';  
import { Button } from '@/components/ui/button';  
import { Card, CardContent } from '@/components/ui/card';  
import { Badge } from '@/components/ui/badge';

import HeroSection from '../components/home/HeroSection';  
import ServicesSection from '../components/home/ServicesSection';  
import StrategyFlow from '../components/home/StrategyFlow';  
import PortfolioSection from '../components/home/PortfolioSection';  
import TeamSection from '../components/home/TeamSection';  
import ContactSection from '../components/home/ContactSection';

export default function Home() {  
 return (  
   \<div className="min-h-screen bg-gradient-to-b from-slate-50 to-white"\>  
     \<HeroSection /\>  
     \<ServicesSection /\>  
     \<StrategyFlow /\>  
     \<PortfolioSection /\>  
     \<TeamSection /\>  
     \<ContactSection /\>  
   \</div\>  
 );  
}

**Components**

import React, { useState } from 'react';  
import { motion } from 'framer-motion';  
import { Card, CardContent } from '@/components/ui/card';  
import { Button } from '@/components/ui/button';  
import { Input } from '@/components/ui/input';  
import { Textarea } from '@/components/ui/textarea';  
import { Label } from '@/components/ui/label';  
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react';

export default function ContactSection() {  
 const \[formData, setFormData\] \= useState({  
   name: '',  
   email: '',  
   company: '',  
   message: ''  
 });  
 const \[isSubmitting, setIsSubmitting\] \= useState(false);  
 const \[isSubmitted, setIsSubmitted\] \= useState(false);

 const handleInputChange \= (e) \=\> {  
   setFormData({  
     ...formData,  
     \[e.target.name\]: e.target.value  
   });  
 };

 const handleSubmit \= async (e) \=\> {  
   e.preventDefault();  
   setIsSubmitting(true);  
    
   // Simulate form submission  
   setTimeout(() \=\> {  
     setIsSubmitting(false);  
     setIsSubmitted(true);  
     setFormData({ name: '', email: '', company: '', message: '' });  
   }, 2000);  
 };

 return (  
   \<section className="py-24 bg-white relative overflow-hidden"\>  
     {/\* Chess board background \*/}  
     \<div className="absolute inset-0 opacity-5"\>  
       \<div className="grid grid-cols-8 h-full"\>  
         {Array.from({ length: 64 }).map((\_, i) \=\> (  
           \<div  
             key={i}  
             className={\`${  
               (Math.floor(i / 8) \+ i) % 2 \=== 0 ? 'bg-slate-800' : 'bg-white'  
             }\`}  
           /\>  
         ))}  
       \</div\>  
     \</div\>

     \<div className="max-w-7xl mx-auto px-6 relative z-10"\>  
       \<motion.div  
         className="text-center mb-16"  
         initial={{ opacity: 0, y: 30 }}  
         whileInView={{ opacity: 1, y: 0 }}  
         transition={{ duration: 0.8 }}  
         viewport={{ once: true }}  
       \>  
         \<h2 className="text-5xl font-bold text-slate-900 mb-6"\>  
           Ready to Make Your \<span className="text-red-600"\>Move?\</span\>  
         \</h2\>  
         \<p className="text-xl text-slate-600 max-w-3xl mx-auto"\>  
           Let's discuss your digital marketing strategy.  
           Every great campaign starts with a conversation.  
         \</p\>  
       \</motion.div\>

       \<div className="grid lg:grid-cols-2 gap-12"\>  
         {/\* Contact Form \*/}  
         \<motion.div  
           initial={{ opacity: 0, x: \-50 }}  
           whileInView={{ opacity: 1, x: 0 }}  
           transition={{ duration: 0.8 }}  
           viewport={{ once: true }}  
         \>  
           \<Card className="border-2 border-slate-200 shadow-xl"\>  
             \<CardContent className="p-8"\>  
               \<div className="flex items-center gap-3 mb-6"\>  
                 \<div className="text-3xl text-red-600"\>♛\</div\>  
                 \<h3 className="text-2xl font-bold text-slate-900"\>  
                   Start Your Strategy Session  
                 \</h3\>  
               \</div\>

               {isSubmitted ? (  
                 \<div className="text-center py-8"\>  
                   \<CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" /\>  
                   \<h4 className="text-xl font-bold text-slate-900 mb-2"\>  
                     Message Sent Successfully\!  
                   \</h4\>  
                   \<p className="text-slate-600"\>  
                     We'll get back to you within 24 hours to discuss your strategy.  
                   \</p\>  
                 \</div\>  
               ) : (  
                 \<form onSubmit={handleSubmit} className="space-y-6"\>  
                   \<div className="grid md:grid-cols-2 gap-4"\>  
                     \<div\>  
                       \<Label htmlFor="name"\>Full Name\</Label\>  
                       \<Input  
                         id="name"  
                         name="name"  
                         value={formData.name}  
                         onChange={handleInputChange}  
                         required  
                         className="mt-1"  
                       /\>  
                     \</div\>  
                     \<div\>  
                       \<Label htmlFor="email"\>Email Address\</Label\>  
                       \<Input  
                         id="email"  
                         name="email"  
                         type="email"  
                         value={formData.email}  
                         onChange={handleInputChange}  
                         required  
                         className="mt-1"  
                       /\>  
                     \</div\>  
                   \</div\>  
                    
                   \<div\>  
                     \<Label htmlFor="company"\>Company Name\</Label\>  
                     \<Input  
                       id="company"  
                       name="company"  
                       value={formData.company}  
                       onChange={handleInputChange}  
                       className="mt-1"  
                     /\>  
                   \</div\>  
                    
                   \<div\>  
                     \<Label htmlFor="message"\>Tell us about your project\</Label\>  
                     \<Textarea  
                       id="message"  
                       name="message"  
                       value={formData.message}  
                       onChange={handleInputChange}  
                       rows={4}  
                       className="mt-1"  
                       placeholder="What are your marketing goals? What challenges are you facing?"  
                     /\>  
                   \</div\>  
                    
                   \<Button  
                     type="submit"  
                     className="w-full bg-red-600 hover:bg-red-700 text-white py-6 text-lg font-semibold"  
                     disabled={isSubmitting}  
                   \>  
                     {isSubmitting ? (  
                       \<\>  
                         \<motion.div  
                           className="w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"  
                           animate={{ rotate: 360 }}  
                           transition={{ duration: 1, repeat: Infinity, ease: "linear" }}  
                         /\>  
                         Sending...  
                       \</\>  
                     ) : (  
                       \<\>  
                         \<Send className="w-4 h-4 mr-2" /\>  
                         Send Message  
                       \</\>  
                     )}  
                   \</Button\>  
                 \</form\>  
               )}  
             \</CardContent\>  
           \</Card\>  
         \</motion.div\>

         {/\* Contact Info \*/}  
         \<motion.div  
           initial={{ opacity: 0, x: 50 }}  
           whileInView={{ opacity: 1, x: 0 }}  
           transition={{ duration: 0.8 }}  
           viewport={{ once: true }}  
           className="space-y-8"  
         \>  
           \<Card className="border-2 border-slate-200 shadow-xl"\>  
             \<CardContent className="p-8"\>  
               \<div className="flex items-center gap-3 mb-6"\>  
                 \<div className="text-3xl text-slate-800"\>♜\</div\>  
                 \<h3 className="text-2xl font-bold text-slate-900"\>  
                   Get in Touch  
                 \</h3\>  
               \</div\>  
                
               \<div className="space-y-6"\>  
                 \<div className="flex items-start gap-4"\>  
                   \<Mail className="w-6 h-6 text-red-600 mt-1" /\>  
                   \<div\>  
                     \<h4 className="font-semibold text-slate-900"\>Email\</h4\>  
                     \<p className="text-slate-600"\>strategy@stratezik.com\</p\>  
                     \<p className="text-slate-600"\>hello@stratezik.com\</p\>  
                   \</div\>  
                 \</div\>  
                  
                 \<div className="flex items-start gap-4"\>  
                   \<Phone className="w-6 h-6 text-red-600 mt-1" /\>  
                   \<div\>  
                     \<h4 className="font-semibold text-slate-900"\>Phone\</h4\>  
                     \<p className="text-slate-600"\>+1 (555) 123\-4567\</p\>  
                     \<p className="text-slate-600"\>+1 (555) 765\-4321\</p\>  
                   \</div\>  
                 \</div\>  
                  
                 \<div className="flex items-start gap-4"\>  
                   \<MapPin className="w-6 h-6 text-red-600 mt-1" /\>  
                   \<div\>  
                     \<h4 className="font-semibold text-slate-900"\>Office\</h4\>  
                     \<p className="text-slate-600"\>123 Strategy Street\</p\>  
                     \<p className="text-slate-600"\>New York, NY 10001\</p\>  
                   \</div\>  
                 \</div\>  
               \</div\>  
             \</CardContent\>  
           \</Card\>

           \<Card className="bg-gradient-to-br from-red-50 to-red-100 border-2 border-red-200 shadow-xl"\>  
             \<CardContent className="p-8 text-center"\>  
               \<div className="text-4xl text-red-600 mb-4"\>♚\</div\>  
               \<h3 className="text-xl font-bold text-slate-900 mb-4"\>  
                 Free Strategy Consultation  
               \</h3\>  
               \<p className="text-slate-600 mb-6"\>  
                 Book a 30\-minute strategy session to discuss your marketing goals  
                 and see how we can help you achieve checkmate.  
               \</p\>  
               \<Button  
                 className="bg-red-600 hover:bg-red-700 text-white font-semibold px-8 py-3"  
               \>  
                 Schedule Call  
               \</Button\>  
             \</CardContent\>  
           \</Card\>  
         \</motion.div\>  
       \</div\>  
     \</div\>  
   \</section\>  
 );  
}

[Layout.js](http://Layout.js)

import React from 'react';  
import { Link } from 'react-router-dom';  
import { motion } from 'framer-motion';  
import { createPageUrl } from '@/utils';

export default function Layout({ children, currentPageName }) {  
 return (  
   \<div className="min-h-screen"\>  
     {/\* Navigation \*/}  
     \<nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200"\>  
       \<div className="max-w-7xl mx-auto px-6 py-4"\>  
         \<div className="flex items-center justify-between"\>  
           \<Link to={createPageUrl('Home')} className="flex items-center gap-3"\>  
             \<div className="text-3xl text-red-600"\>♚\</div\>  
             \<div className="text-2xl font-bold"\>  
               \<span className="text-slate-900"\>STRATE\</span\>  
               \<span className="text-red-600"\>ZIK\</span\>  
             \</div\>  
           \</Link\>  
            
           \<div className="hidden md:flex items-center gap-8"\>  
             \<Link to={createPageUrl('Home')} className="text-slate-600 hover:text-red-600 transition-colors font-medium"\>  
               Home  
             \</Link\>  
             \<Link to={createPageUrl('Home')} className="text-slate-600 hover:text-red-600 transition-colors font-medium"\>  
               Services  
             \</Link\>  
             \<Link to={createPageUrl('Home')} className="text-slate-600 hover:text-red-600 transition-colors font-medium"\>  
               Portfolio  
             \</Link\>  
             \<Link to={createPageUrl('Home')} className="text-slate-600 hover:text-red-600 transition-colors font-medium"\>  
               About  
             \</Link\>  
             \<Link to={createPageUrl('Home')} className="text-slate-600 hover:text-red-600 transition-colors font-medium"\>  
               Contact  
             \</Link\>  
           \</div\>  
            
           \<div className="flex items-center gap-4"\>  
             \<button className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors"\>  
               Get Started  
             \</button\>  
           \</div\>  
         \</div\>  
       \</div\>  
     \</nav\>

     {/\* Main Content \*/}  
     \<main className="pt-20"\>  
       {children}  
     \</main\>

     {/\* Footer \*/}  
     \<footer className="bg-slate-900 text-white py-16"\>  
       \<div className="max-w-7xl mx-auto px-6"\>  
         \<div className="grid md:grid-cols-4 gap-8"\>  
           \<div\>  
             \<div className="flex items-center gap-3 mb-6"\>  
               \<div className="text-3xl text-red-600"\>♚\</div\>  
               \<div className="text-2xl font-bold"\>  
                 \<span className="text-white"\>STRATE\</span\>  
                 \<span className="text-red-600"\>ZIK\</span\>  
               \</div\>  
             \</div\>  
             \<p className="text-slate-400 leading-relaxed"\>  
               Strategic digital marketing that thinks several moves ahead.  
               Every campaign planned with chess master precision.  
             \</p\>  
           \</div\>  
            
           \<div\>  
             \<h3 className="text-xl font-bold mb-4"\>Services\</h3\>  
             \<ul className="space-y-2 text-slate-400"\>  
               \<li\>\<Link to={createPageUrl('Home')} className="hover:text-red-600 transition-colors"\>Strategic Planning\</Link\>\</li\>  
               \<li\>\<Link to={createPageUrl('Home')} className="hover:text-red-600 transition-colors"\>Analytics & Data\</Link\>\</li\>  
               \<li\>\<Link to={createPageUrl('Home')} className="hover:text-red-600 transition-colors"\>Brand Strategy\</Link\>\</li\>  
               \<li\>\<Link to={createPageUrl('Home')} className="hover:text-red-600 transition-colors"\>Creative Campaigns\</Link\>\</li\>  
             \</ul\>  
           \</div\>  
            
           \<div\>  
             \<h3 className="text-xl font-bold mb-4"\>Company\</h3\>  
             \<ul className="space-y-2 text-slate-400"\>  
               \<li\>\<Link to={createPageUrl('Home')} className="hover:text-red-600 transition-colors"\>About\</Link\>\</li\>  
               \<li\>\<Link to={createPageUrl('Home')} className="hover:text-red-600 transition-colors"\>Team\</Link\>\</li\>  
               \<li\>\<Link to={createPageUrl('Home')} className="hover:text-red-600 transition-colors"\>Careers\</Link\>\</li\>  
               \<li\>\<Link to={createPageUrl('Home')} className="hover:text-red-600 transition-colors"\>Contact\</Link\>\</li\>  
             \</ul\>  
           \</div\>  
            
           \<div\>  
             \<h3 className="text-xl font-bold mb-4"\>Connect\</h3\>  
             \<ul className="space-y-2 text-slate-400"\>  
               \<li\>\<a href="\#" className="hover:text-red-600 transition-colors"\>LinkedIn\</a\>\</li\>  
               \<li\>\<a href="\#" className="hover:text-red-600 transition-colors"\>Twitter\</a\>\</li\>  
               \<li\>\<a href="\#" className="hover:text-red-600 transition-colors"\>Instagram\</a\>\</li\>  
               \<li\>\<a href="\#" className="hover:text-red-600 transition-colors"\>Medium\</a\>\</li\>  
             \</ul\>  
           \</div\>  
         \</div\>  
          
         \<div className="border-t border-slate-800 mt-12 pt-8 text-center text-slate-400"\>  
           \<p\>\&copy; 2024 Stratezik. All rights reserved. Every move strategic, every campaign victorious.\</p\>  
         \</div\>  
       \</div\>  
     \</footer\>  
   \</div\>  
 );  
}  
