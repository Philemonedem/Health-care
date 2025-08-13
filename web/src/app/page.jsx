import React, { useState, useEffect } from "react";
import useUser from "@/utils/useUser";
import {
  Calendar,
  MessageCircle,
  Heart,
  Shield,
  Clock,
  Star,
  ChevronRight,
  Play,
  Users,
  Award,
  Stethoscope,
  Plus,
  ArrowRight,
  Menu,
  X
} from "lucide-react";

export default function Homepage() {
  const { data: user } = useUser();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await fetch('/api/doctors');
        if (response.ok) {
          const data = await response.json();
          setDoctors(data.slice(0, 3)); // Get top 3 doctors for homepage
        }
      } catch (error) {
        console.error('Error fetching doctors:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  return (
    <div className="min-h-screen bg-white font-inter">
      {/* Global Styles */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Geist:wght@400;700&family=Bricolage+Grotesque:wght@600;800&family=Inter:wght@300;400;500;600&display=swap');
        
        .font-geist { font-family: 'Geist', sans-serif; }
        .font-bricolage { font-family: 'Bricolage Grotesque', sans-serif; }
        .font-inter { font-family: 'Inter', sans-serif; }
        
        .gradient-text {
          background: linear-gradient(135deg, #1A5DFF 0%, #4D8BFF 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        .gradient-bg {
          background: linear-gradient(135deg, #1A5DFF 0%, #4D8BFF 100%);
        }
        
        .gradient-hero {
          background: linear-gradient(135deg, #F8FBFF 0%, #E8F3FF 100%);
        }
        
        .floating-card {
          animation: float 6s ease-in-out infinite;
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
      `}</style>

      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-[#EEF2FA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-lg gradient-bg flex items-center justify-center">
                <Stethoscope className="w-4 h-4 text-white" />
              </div>
              <span className="text-[#1B2E54] font-bricolage font-extrabold text-xl">
                HealthCare+
              </span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#services" className="text-[#5C6F92] hover:text-[#1A5DFF] transition-colors">
                Services
              </a>
              <a href="#doctors" className="text-[#5C6F92] hover:text-[#1A5DFF] transition-colors">
                Doctors
              </a>
              <a href="#about" className="text-[#5C6F92] hover:text-[#1A5DFF] transition-colors">
                About
              </a>
              <a href="#contact" className="text-[#5C6F92] hover:text-[#1A5DFF] transition-colors">
                Contact
              </a>
            </nav>

            {/* User Actions */}
            <div className="flex items-center space-x-4">
              {user ? (
                <div className="flex items-center space-x-3">
                  <a href="/dashboard" className="gradient-bg text-white px-4 py-2 rounded-lg hover:opacity-90 transition-all">
                    Dashboard
                  </a>
                  <a href="/account/logout" className="text-[#5C6F92] hover:text-[#1B2E54] transition-colors">
                    Sign Out
                  </a>
                </div>
              ) : (
                <div className="flex items-center space-x-3">
                  <a href="/account/signin" className="text-[#5C6F92] hover:text-[#1B2E54] transition-colors">
                    Sign In
                  </a>
                  <a href="/account/signup" className="gradient-bg text-white px-4 py-2 rounded-lg hover:opacity-90 transition-all">
                    Get Started
                  </a>
                </div>
              )}

              {/* Mobile menu button */}
              <button
                className="md:hidden p-2"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? (
                  <X className="w-6 h-6 text-[#1B2E54]" />
                ) : (
                  <Menu className="w-6 h-6 text-[#1B2E54]" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-[#EEF2FA]">
              <nav className="flex flex-col space-y-3">
                <a href="#services" className="text-[#5C6F92] hover:text-[#1A5DFF] py-2">
                  Services
                </a>
                <a href="#doctors" className="text-[#5C6F92] hover:text-[#1A5DFF] py-2">
                  Doctors
                </a>
                <a href="#about" className="text-[#5C6F92] hover:text-[#1A5DFF] py-2">
                  About
                </a>
                <a href="#contact" className="text-[#5C6F92] hover:text-[#1A5DFF] py-2">
                  Contact
                </a>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="gradient-hero py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="font-geist font-bold text-4xl sm:text-5xl lg:text-6xl leading-tight gradient-text">
                  Your Health, Our Priority
                </h1>
                <p className="text-[#5C6F92] text-lg lg:text-xl leading-relaxed max-w-2xl">
                  Book appointments with top doctors, get AI-powered health insights, and manage your healthcare journey all in one place.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href={user ? "/book-appointment" : "/account/signup"}
                  className="inline-flex items-center justify-center px-8 py-4 gradient-bg text-white font-semibold rounded-xl hover:opacity-90 hover:scale-[1.02] transition-all group"
                >
                  <Calendar className="w-5 h-5 mr-2" />
                  Book Appointment
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </a>
                <a
                  href={user ? "/chat" : "/account/signup"}
                  className="inline-flex items-center justify-center px-8 py-4 bg-white border-2 border-[#1A5DFF] text-[#1A5DFF] font-semibold rounded-xl hover:bg-[#F8FBFF] transition-all"
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Start Chat
                </a>
              </div>

              <div className="flex items-center space-x-8">
                <div className="text-center">
                  <div className="font-geist font-bold text-2xl text-[#1B2E54]">1000+</div>
                  <div className="text-[#5C6F92] text-sm">Patients</div>
                </div>
                <div className="text-center">
                  <div className="font-geist font-bold text-2xl text-[#1B2E54]">50+</div>
                  <div className="text-[#5C6F92] text-sm">Doctors</div>
                </div>
                <div className="text-center">
                  <div className="font-geist font-bold text-2xl text-[#1B2E54]">24/7</div>
                  <div className="text-[#5C6F92] text-sm">Support</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="relative z-10 floating-card">
                <img
                  src="https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&dpr=1"
                  alt="Doctor consultation"
                  className="rounded-2xl shadow-2xl w-full"
                />
              </div>
              
              {/* Floating Cards */}
              <div className="absolute -top-4 -right-4 bg-white p-4 rounded-xl shadow-lg floating-card" style={{ animationDelay: '1s' }}>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-sm font-medium">Available Now</span>
                </div>
              </div>
              
              <div className="absolute -bottom-4 -left-4 bg-white p-4 rounded-xl shadow-lg floating-card" style={{ animationDelay: '2s' }}>
                <div className="flex items-center space-x-2">
                  <Heart className="w-4 h-4 text-red-500" />
                  <span className="text-sm font-medium">AI Health Check</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-geist font-bold text-3xl lg:text-4xl gradient-text mb-4">
              Complete Healthcare Services
            </h2>
            <p className="text-[#5C6F92] text-lg max-w-2xl mx-auto">
              From virtual consultations to AI-powered health insights, we provide comprehensive care for all your medical needs.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-[#F8FBFF] p-8 rounded-2xl hover:shadow-lg transition-all group">
              <div className="w-12 h-12 gradient-bg rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bricolage font-bold text-xl text-[#1B2E54] mb-3">
                Online Appointments
              </h3>
              <p className="text-[#5C6F92] mb-4">
                Book appointments with top doctors at your convenience. No waiting rooms, no hassle.
              </p>
              <a href="/book-appointment" className="text-[#1A5DFF] font-medium inline-flex items-center hover:translate-x-1 transition-transform">
                Book Now <ChevronRight className="w-4 h-4 ml-1" />
              </a>
            </div>

            <div className="bg-[#F8FBFF] p-8 rounded-2xl hover:shadow-lg transition-all group">
              <div className="w-12 h-12 gradient-bg rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <MessageCircle className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bricolage font-bold text-xl text-[#1B2E54] mb-3">
                AI Doctor Chat
              </h3>
              <p className="text-[#5C6F92] mb-4">
                Get instant medical advice with our AI-powered chat system and connect with real doctors.
              </p>
              <a href="/chat" className="text-[#1A5DFF] font-medium inline-flex items-center hover:translate-x-1 transition-transform">
                Start Chat <ChevronRight className="w-4 h-4 ml-1" />
              </a>
            </div>

            <div className="bg-[#F8FBFF] p-8 rounded-2xl hover:shadow-lg transition-all group">
              <div className="w-12 h-12 gradient-bg rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bricolage font-bold text-xl text-[#1B2E54] mb-3">
                Health Records
              </h3>
              <p className="text-[#5C6F92] mb-4">
                Secure digital health records accessible anytime, anywhere. Keep track of your health journey.
              </p>
              <a href="/health-records" className="text-[#1A5DFF] font-medium inline-flex items-center hover:translate-x-1 transition-transform">
                View Records <ChevronRight className="w-4 h-4 ml-1" />
              </a>
            </div>

            <div className="bg-[#F8FBFF] p-8 rounded-2xl hover:shadow-lg transition-all group">
              <div className="w-12 h-12 gradient-bg rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bricolage font-bold text-xl text-[#1B2E54] mb-3">
                Secure & Private
              </h3>
              <p className="text-[#5C6F92] mb-4">
                Your health data is protected with enterprise-grade security and privacy measures.
              </p>
              <a href="/privacy" className="text-[#1A5DFF] font-medium inline-flex items-center hover:translate-x-1 transition-transform">
                Learn More <ChevronRight className="w-4 h-4 ml-1" />
              </a>
            </div>

            <div className="bg-[#F8FBFF] p-8 rounded-2xl hover:shadow-lg transition-all group">
              <div className="w-12 h-12 gradient-bg rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bricolage font-bold text-xl text-[#1B2E54] mb-3">
                24/7 Available
              </h3>
              <p className="text-[#5C6F92] mb-4">
                Round-the-clock access to healthcare services and emergency support when you need it.
              </p>
              <a href="/emergency" className="text-[#1A5DFF] font-medium inline-flex items-center hover:translate-x-1 transition-transform">
                Emergency <ChevronRight className="w-4 h-4 ml-1" />
              </a>
            </div>

            <div className="bg-[#F8FBFF] p-8 rounded-2xl hover:shadow-lg transition-all group">
              <div className="w-12 h-12 gradient-bg rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bricolage font-bold text-xl text-[#1B2E54] mb-3">
                Expert Doctors
              </h3>
              <p className="text-[#5C6F92] mb-4">
                Connect with board-certified specialists and experienced healthcare professionals.
              </p>
              <a href="#doctors" className="text-[#1A5DFF] font-medium inline-flex items-center hover:translate-x-1 transition-transform">
                View Doctors <ChevronRight className="w-4 h-4 ml-1" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Doctors Section */}
      <section id="doctors" className="py-16 lg:py-24 bg-[#F8FBFF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-geist font-bold text-3xl lg:text-4xl gradient-text mb-4">
              Meet Our Expert Doctors
            </h2>
            <p className="text-[#5C6F92] text-lg max-w-2xl mx-auto">
              Our team of experienced healthcare professionals is here to provide you with the best medical care.
            </p>
          </div>

          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((index) => (
                <div key={index} className="bg-white p-8 rounded-2xl shadow-lg animate-pulse">
                  <div className="w-20 h-20 bg-gray-200 rounded-full mx-auto mb-6"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded mb-4"></div>
                  <div className="h-8 bg-gray-200 rounded"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {doctors.map((doctor) => (
                <div key={doctor.id} className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all group">
                  <div className="text-center mb-6">
                    <img
                      src={doctor.avatar_url}
                      alt={doctor.name}
                      className="w-20 h-20 rounded-full mx-auto mb-4 object-cover"
                    />
                    <h3 className="font-bricolage font-bold text-xl text-[#1B2E54] mb-1">
                      {doctor.name}
                    </h3>
                    <p className="text-[#1A5DFF] font-medium mb-2">{doctor.specialization}</p>
                    <p className="text-[#5C6F92] text-sm">{doctor.hospital}</p>
                  </div>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center justify-between">
                      <span className="text-[#5C6F92] text-sm">Experience</span>
                      <span className="text-[#1B2E54] font-medium">{doctor.experience_years} years</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[#5C6F92] text-sm">Rating</span>
                      <div className="flex items-center">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-[#1B2E54] font-medium ml-1">{doctor.rating}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[#5C6F92] text-sm">Consultation Fee</span>
                      <span className="text-[#1B2E54] font-medium">${doctor.consultation_fee}</span>
                    </div>
                  </div>

                  <a
                    href={`/doctor/${doctor.id}`}
                    className="block w-full gradient-bg text-white font-medium py-3 px-4 rounded-xl text-center hover:opacity-90 group-hover:scale-[1.02] transition-all"
                  >
                    Book Appointment
                  </a>
                </div>
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <a
              href="/doctors"
              className="inline-flex items-center px-8 py-3 bg-white border-2 border-[#1A5DFF] text-[#1A5DFF] font-semibold rounded-xl hover:bg-[#F8FBFF] transition-all"
            >
              View All Doctors
              <ArrowRight className="w-4 h-4 ml-2" />
            </a>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24 gradient-bg">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-geist font-bold text-3xl lg:text-4xl text-white mb-6">
            Ready to Take Control of Your Health?
          </h2>
          <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of patients who trust HealthCare+ for their medical needs. Get started today and experience the future of healthcare.
          </p>
          <a
            href="/account/signup"
            className="inline-flex items-center px-8 py-4 bg-white text-[#1A5DFF] font-semibold rounded-xl hover:scale-[1.05] transition-all"
          >
            <Plus className="w-5 h-5 mr-2" />
            Get Started Free
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1B2E54] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-lg gradient-bg flex items-center justify-center">
                  <Stethoscope className="w-4 h-4 text-white" />
                </div>
                <span className="font-bricolage font-extrabold text-xl">
                  HealthCare+
                </span>
              </div>
              <p className="text-white/70">
                Your trusted healthcare partner providing quality medical services online.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Services</h3>
              <div className="space-y-2">
                <a href="/book-appointment" className="block text-white/70 hover:text-white transition-colors">
                  Book Appointment
                </a>
                <a href="/chat" className="block text-white/70 hover:text-white transition-colors">
                  AI Chat
                </a>
                <a href="/health-records" className="block text-white/70 hover:text-white transition-colors">
                  Health Records
                </a>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <div className="space-y-2">
                <a href="/about" className="block text-white/70 hover:text-white transition-colors">
                  About Us
                </a>
                <a href="/contact" className="block text-white/70 hover:text-white transition-colors">
                  Contact
                </a>
                <a href="/careers" className="block text-white/70 hover:text-white transition-colors">
                  Careers
                </a>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <div className="space-y-2">
                <a href="/privacy" className="block text-white/70 hover:text-white transition-colors">
                  Privacy Policy
                </a>
                <a href="/terms" className="block text-white/70 hover:text-white transition-colors">
                  Terms of Service
                </a>
                <a href="/hipaa" className="block text-white/70 hover:text-white transition-colors">
                  HIPAA Compliance
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-white/20 mt-12 pt-8 text-center text-white/70">
            <p>&copy; 2024 HealthCare+. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}