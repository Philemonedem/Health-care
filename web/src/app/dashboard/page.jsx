import React, { useState, useEffect } from "react";
import useUser from "@/utils/useUser";
import {
  Calendar,
  MessageCircle,
  Heart,
  Clock,
  Star,
  ChevronRight,
  Users,
  Stethoscope,
  Plus,
  ArrowRight,
  Menu,
  X,
  Bell,
  Settings,
  FileText,
  Activity,
  User,
  Phone,
  Mail,
  MapPin,
  Edit3
} from "lucide-react";

export default function Dashboard() {
  const { data: user, loading: userLoading } = useUser();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [appointments, setAppointments] = useState([]);
  const [recentChats, setRecentChats] = useState([]);
  const [healthRecords, setHealthRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Fetch user's appointments, chats, and health records
        // For now, we'll use mock data since the API endpoints aren't implemented yet
        setAppointments([
          {
            id: 1,
            doctor_name: "Dr. Sarah Johnson",
            specialization: "Cardiologist",
            appointment_date: "2024-08-15",
            appointment_time: "10:00",
            status: "scheduled"
          },
          {
            id: 2,
            doctor_name: "Dr. Michael Chen",
            specialization: "Dermatologist",
            appointment_date: "2024-08-20",
            appointment_time: "14:30",
            status: "scheduled"
          }
        ]);

        setRecentChats([
          {
            id: 1,
            doctor_name: "Dr. Sarah Johnson",
            last_message: "Your test results look good. Let's schedule a follow-up.",
            timestamp: "2 hours ago"
          },
          {
            id: 2,
            doctor_name: "AI Health Assistant",
            last_message: "How are you feeling today? Any symptoms to report?",
            timestamp: "1 day ago"
          }
        ]);

        setHealthRecords([
          {
            id: 1,
            record_title: "Blood Test Results",
            record_type: "Lab Report",
            created_at: "2024-08-10",
            doctor_name: "Dr. Sarah Johnson"
          },
          {
            id: 2,
            record_title: "Annual Physical Exam",
            record_type: "Checkup",
            created_at: "2024-07-25",
            doctor_name: "Dr. Michael Chen"
          }
        ]);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchDashboardData();
    }
  }, [user]);

  if (userLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1A5DFF]"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[#1B2E54] mb-4">Access Denied</h1>
          <p className="text-[#5C6F92] mb-6">Please sign in to access your dashboard.</p>
          <a href="/account/signin" className="gradient-bg text-white px-6 py-3 rounded-lg hover:opacity-90 transition-all">
            Sign In
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FBFF] font-inter">
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
              <a href="/dashboard" className="text-[#1A5DFF] font-medium">
                Dashboard
              </a>
              <a href="/appointments" className="text-[#5C6F92] hover:text-[#1A5DFF] transition-colors">
                Appointments
              </a>
              <a href="/chat" className="text-[#5C6F92] hover:text-[#1A5DFF] transition-colors">
                Chat
              </a>
              <a href="/health-records" className="text-[#5C6F92] hover:text-[#1A5DFF] transition-colors">
                Records
              </a>
            </nav>

            {/* User Actions */}
            <div className="flex items-center space-x-4">
              <button className="p-2 text-[#5C6F92] hover:text-[#1A5DFF] transition-colors">
                <Bell className="w-5 h-5" />
              </button>
              <button className="p-2 text-[#5C6F92] hover:text-[#1A5DFF] transition-colors">
                <Settings className="w-5 h-5" />
              </button>
              <a href="/account/logout" className="text-[#5C6F92] hover:text-[#1B2E54] transition-colors">
                Sign Out
              </a>

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
                <a href="/dashboard" className="text-[#1A5DFF] font-medium py-2">
                  Dashboard
                </a>
                <a href="/appointments" className="text-[#5C6F92] hover:text-[#1A5DFF] py-2">
                  Appointments
                </a>
                <a href="/chat" className="text-[#5C6F92] hover:text-[#1A5DFF] py-2">
                  Chat
                </a>
                <a href="/health-records" className="text-[#5C6F92] hover:text-[#1A5DFF] py-2">
                  Records
                </a>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="font-geist font-bold text-3xl lg:text-4xl gradient-text mb-2">
            Welcome back, {user.name || 'Patient'}!
          </h1>
          <p className="text-[#5C6F92] text-lg">
            Here's an overview of your health journey and upcoming appointments.
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <a
            href="/book-appointment"
            className="bg-white p-6 rounded-2xl shadow-sm border border-[#EEF2FA] hover:shadow-lg transition-all group"
          >
            <div className="w-12 h-12 gradient-bg rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Calendar className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-bricolage font-bold text-lg text-[#1B2E54] mb-1">
              Book Appointment
            </h3>
            <p className="text-[#5C6F92] text-sm">Schedule with a doctor</p>
          </a>

          <a
            href="/chat"
            className="bg-white p-6 rounded-2xl shadow-sm border border-[#EEF2FA] hover:shadow-lg transition-all group"
          >
            <div className="w-12 h-12 gradient-bg rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <MessageCircle className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-bricolage font-bold text-lg text-[#1B2E54] mb-1">
              Start Chat
            </h3>
            <p className="text-[#5C6F92] text-sm">AI health assistant</p>
          </a>

          <a
            href="/health-records"
            className="bg-white p-6 rounded-2xl shadow-sm border border-[#EEF2FA] hover:shadow-lg transition-all group"
          >
            <div className="w-12 h-12 gradient-bg rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-bricolage font-bold text-lg text-[#1B2E54] mb-1">
              Health Records
            </h3>
            <p className="text-[#5C6F92] text-sm">View your records</p>
          </a>

          <a
            href="/profile"
            className="bg-white p-6 rounded-2xl shadow-sm border border-[#EEF2FA] hover:shadow-lg transition-all group"
          >
            <div className="w-12 h-12 gradient-bg rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <User className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-bricolage font-bold text-lg text-[#1B2E54] mb-1">
              Profile
            </h3>
            <p className="text-[#5C6F92] text-sm">Update your info</p>
          </a>
        </div>

        {/* Main Dashboard Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Appointments & Chats */}
          <div className="lg:col-span-2 space-y-8">
            {/* Upcoming Appointments */}
            <div className="bg-white rounded-2xl shadow-sm border border-[#EEF2FA] p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-bricolage font-bold text-xl text-[#1B2E54]">
                  Upcoming Appointments
                </h2>
                <a
                  href="/appointments"
                  className="text-[#1A5DFF] font-medium inline-flex items-center hover:translate-x-1 transition-transform"
                >
                  View All <ChevronRight className="w-4 h-4 ml-1" />
                </a>
              </div>

              {loading ? (
                <div className="space-y-4">
                  {[1, 2].map((index) => (
                    <div key={index} className="animate-pulse">
                      <div className="h-4 bg-gray-200 rounded mb-2"></div>
                      <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                    </div>
                  ))}
                </div>
              ) : appointments.length > 0 ? (
                <div className="space-y-4">
                  {appointments.map((appointment) => (
                    <div
                      key={appointment.id}
                      className="flex items-center justify-between p-4 bg-[#F8FBFF] rounded-xl border border-[#EEF2FA]"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-[#1A5DFF]/10 rounded-xl flex items-center justify-center">
                          <Stethoscope className="w-6 h-6 text-[#1A5DFF]" />
                        </div>
                        <div>
                          <h3 className="font-medium text-[#1B2E54]">
                            {appointment.doctor_name}
                          </h3>
                          <p className="text-[#5C6F92] text-sm">
                            {appointment.specialization}
                          </p>
                          <div className="flex items-center space-x-4 mt-1">
                            <span className="text-[#1A5DFF] text-sm font-medium">
                              {appointment.appointment_date}
                            </span>
                            <span className="text-[#5C6F92] text-sm">
                              {appointment.appointment_time}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                          {appointment.status}
                        </span>
                        <button className="p-2 text-[#5C6F92] hover:text-[#1A5DFF] transition-colors">
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Calendar className="w-12 h-12 text-[#5C6F92] mx-auto mb-4" />
                  <p className="text-[#5C6F92] mb-4">No upcoming appointments</p>
                  <a
                    href="/book-appointment"
                    className="gradient-bg text-white px-6 py-2 rounded-lg hover:opacity-90 transition-all"
                  >
                    Book Your First Appointment
                  </a>
                </div>
              )}
            </div>

            {/* Recent Chats */}
            <div className="bg-white rounded-2xl shadow-sm border border-[#EEF2FA] p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-bricolage font-bold text-xl text-[#1B2E54]">
                  Recent Conversations
                </h2>
                <a
                  href="/chat"
                  className="text-[#1A5DFF] font-medium inline-flex items-center hover:translate-x-1 transition-transform"
                >
                  View All <ChevronRight className="w-4 h-4 ml-1" />
                </a>
              </div>

              {loading ? (
                <div className="space-y-4">
                  {[1, 2].map((index) => (
                    <div key={index} className="animate-pulse">
                      <div className="h-4 bg-gray-200 rounded mb-2"></div>
                      <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                    </div>
                  ))}
                </div>
              ) : recentChats.length > 0 ? (
                <div className="space-y-4">
                  {recentChats.map((chat) => (
                    <div
                      key={chat.id}
                      className="flex items-start space-x-4 p-4 bg-[#F8FBFF] rounded-xl border border-[#EEF2FA] hover:shadow-sm transition-all cursor-pointer"
                    >
                      <div className="w-10 h-10 bg-[#1A5DFF]/10 rounded-full flex items-center justify-center">
                        <MessageCircle className="w-5 h-5 text-[#1A5DFF]" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-[#1B2E54] mb-1">
                          {chat.doctor_name}
                        </h3>
                        <p className="text-[#5C6F92] text-sm mb-2">
                          {chat.last_message}
                        </p>
                        <span className="text-[#9CA3B0] text-xs">
                          {chat.timestamp}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <MessageCircle className="w-12 h-12 text-[#5C6F92] mx-auto mb-4" />
                  <p className="text-[#5C6F92] mb-4">No recent conversations</p>
                  <a
                    href="/chat"
                    className="gradient-bg text-white px-6 py-2 rounded-lg hover:opacity-90 transition-all"
                  >
                    Start a Conversation
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Profile & Health Records */}
          <div className="space-y-8">
            {/* Profile Summary */}
            <div className="bg-white rounded-2xl shadow-sm border border-[#EEF2FA] p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-bricolage font-bold text-xl text-[#1B2E54]">
                  Profile
                </h2>
                <a
                  href="/profile"
                  className="text-[#1A5DFF] hover:text-[#4D8BFF] transition-colors"
                >
                  <Edit3 className="w-4 h-4" />
                </a>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-[#1A5DFF]/10 rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-[#1A5DFF]" />
                  </div>
                  <div>
                    <h3 className="font-medium text-[#1B2E54]">
                      {user.name || 'Update your name'}
                    </h3>
                    <p className="text-[#5C6F92] text-sm">Patient</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Mail className="w-4 h-4 text-[#5C6F92]" />
                    <span className="text-[#5C6F92] text-sm">{user.email}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="w-4 h-4 text-[#5C6F92]" />
                    <span className="text-[#5C6F92] text-sm">Add phone number</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <MapPin className="w-4 h-4 text-[#5C6F92]" />
                    <span className="text-[#5C6F92] text-sm">Add address</span>
                  </div>
                </div>

                <a
                  href="/profile"
                  className="block w-full text-center gradient-bg text-white font-medium py-2 px-4 rounded-xl hover:opacity-90 transition-all"
                >
                  Complete Profile
                </a>
              </div>
            </div>

            {/* Health Records */}
            <div className="bg-white rounded-2xl shadow-sm border border-[#EEF2FA] p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-bricolage font-bold text-xl text-[#1B2E54]">
                  Recent Records
                </h2>
                <a
                  href="/health-records"
                  className="text-[#1A5DFF] font-medium inline-flex items-center hover:translate-x-1 transition-transform"
                >
                  View All <ChevronRight className="w-4 h-4 ml-1" />
                </a>
              </div>

              {loading ? (
                <div className="space-y-4">
                  {[1, 2].map((index) => (
                    <div key={index} className="animate-pulse">
                      <div className="h-4 bg-gray-200 rounded mb-2"></div>
                      <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                    </div>
                  ))}
                </div>
              ) : healthRecords.length > 0 ? (
                <div className="space-y-4">
                  {healthRecords.map((record) => (
                    <div
                      key={record.id}
                      className="p-4 bg-[#F8FBFF] rounded-xl border border-[#EEF2FA] hover:shadow-sm transition-all cursor-pointer"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-3">
                          <div className="w-8 h-8 bg-[#1A5DFF]/10 rounded-lg flex items-center justify-center">
                            <FileText className="w-4 h-4 text-[#1A5DFF]" />
                          </div>
                          <div>
                            <h3 className="font-medium text-[#1B2E54] text-sm">
                              {record.record_title}
                            </h3>
                            <p className="text-[#5C6F92] text-xs mb-1">
                              {record.record_type}
                            </p>
                            <p className="text-[#9CA3B0] text-xs">
                              {record.created_at} • {record.doctor_name}
                            </p>
                          </div>
                        </div>
                        <ChevronRight className="w-4 h-4 text-[#5C6F92]" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6">
                  <FileText className="w-10 h-10 text-[#5C6F92] mx-auto mb-3" />
                  <p className="text-[#5C6F92] text-sm mb-3">No health records yet</p>
                  <a
                    href="/health-records"
                    className="text-[#1A5DFF] text-sm font-medium hover:text-[#4D8BFF] transition-colors"
                  >
                    Upload Records
                  </a>
                </div>
              )}
            </div>

            {/* Health Stats */}
            <div className="bg-white rounded-2xl shadow-sm border border-[#EEF2FA] p-6">
              <h2 className="font-bricolage font-bold text-xl text-[#1B2E54] mb-6">
                Health Overview
              </h2>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                      <Heart className="w-4 h-4 text-red-500" />
                    </div>
                    <span className="text-[#5C6F92] text-sm">Heart Rate</span>
                  </div>
                  <span className="text-[#1B2E54] font-medium">-- bpm</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Activity className="w-4 h-4 text-blue-500" />
                    </div>
                    <span className="text-[#5C6F92] text-sm">Blood Pressure</span>
                  </div>
                  <span className="text-[#1B2E54] font-medium">--/-- mmHg</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                      <Users className="w-4 h-4 text-green-500" />
                    </div>
                    <span className="text-[#5C6F92] text-sm">Weight</span>
                  </div>
                  <span className="text-[#1B2E54] font-medium">-- kg</span>
                </div>

                <a
                  href="/health-tracking"
                  className="block w-full text-center border-2 border-[#1A5DFF] text-[#1A5DFF] font-medium py-2 px-4 rounded-xl hover:bg-[#F8FBFF] transition-all"
                >
                  Update Health Data
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}