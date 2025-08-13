import React, { useState, useEffect } from "react";
import useUser from "@/utils/useUser";
import {
  Calendar,
  Clock,
  Star,
  ChevronRight,
  Stethoscope,
  Menu,
  X,
  Bell,
  Settings,
  Filter,
  Search,
  Plus,
  MapPin,
  Phone,
  Video,
  CheckCircle,
  XCircle,
  AlertCircle,
  Edit3,
  Trash2
} from "lucide-react";

export default function AppointmentsPage() {
  const { data: user, loading: userLoading } = useUser();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // all, upcoming, past, cancelled
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        // Mock data for now - replace with actual API call
        setAppointments([
          {
            id: 1,
            doctor_name: "Dr. Sarah Johnson",
            specialization: "Cardiologist",
            hospital: "City Medical Center",
            appointment_date: "2024-08-15",
            appointment_time: "10:00",
            duration_minutes: 30,
            appointment_type: "consultation",
            status: "scheduled",
            symptoms: "Chest pain and shortness of breath",
            total_cost: 150.00,
            doctor_avatar: "https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1",
            doctor_rating: 4.8,
            consultation_type: "video"
          },
          {
            id: 2,
            doctor_name: "Dr. Michael Chen",
            specialization: "Dermatologist",
            hospital: "Skin Care Clinic",
            appointment_date: "2024-08-20",
            appointment_time: "14:30",
            duration_minutes: 45,
            appointment_type: "consultation",
            status: "scheduled",
            symptoms: "Skin rash and irritation",
            total_cost: 120.00,
            doctor_avatar: "https://images.pexels.com/photos/5327921/pexels-photo-5327921.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1",
            doctor_rating: 4.9,
            consultation_type: "in-person"
          },
          {
            id: 3,
            doctor_name: "Dr. Emily Rodriguez",
            specialization: "General Practitioner",
            hospital: "Family Health Center",
            appointment_date: "2024-08-05",
            appointment_time: "09:15",
            duration_minutes: 30,
            appointment_type: "checkup",
            status: "completed",
            symptoms: "Annual physical examination",
            total_cost: 100.00,
            doctor_avatar: "https://images.pexels.com/photos/5327656/pexels-photo-5327656.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1",
            doctor_rating: 4.7,
            consultation_type: "in-person"
          },
          {
            id: 4,
            doctor_name: "Dr. James Wilson",
            specialization: "Orthopedic Surgeon",
            hospital: "Sports Medicine Institute",
            appointment_date: "2024-07-28",
            appointment_time: "11:00",
            duration_minutes: 60,
            appointment_type: "consultation",
            status: "cancelled",
            symptoms: "Knee pain after sports injury",
            total_cost: 200.00,
            doctor_avatar: "https://images.pexels.com/photos/5327580/pexels-photo-5327580.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1",
            doctor_rating: 4.6,
            consultation_type: "in-person"
          }
        ]);
      } catch (error) {
        console.error('Error fetching appointments:', error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchAppointments();
    }
  }, [user]);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'scheduled':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-blue-500" />;
      case 'cancelled':
        return <XCircle className="w-4 h-4 text-red-500" />;
      default:
        return <AlertCircle className="w-4 h-4 text-yellow-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'scheduled':
        return 'bg-green-100 text-green-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  const filteredAppointments = appointments.filter(appointment => {
    const matchesFilter = filter === 'all' || appointment.status === filter || 
      (filter === 'upcoming' && (appointment.status === 'scheduled'));
    const matchesSearch = appointment.doctor_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.specialization.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

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
          <p className="text-[#5C6F92] mb-6">Please sign in to view your appointments.</p>
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
              <a href="/dashboard" className="text-[#5C6F92] hover:text-[#1A5DFF] transition-colors">
                Dashboard
              </a>
              <a href="/appointments" className="text-[#1A5DFF] font-medium">
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
                <a href="/dashboard" className="text-[#5C6F92] hover:text-[#1A5DFF] py-2">
                  Dashboard
                </a>
                <a href="/appointments" className="text-[#1A5DFF] font-medium py-2">
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
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
            <div>
              <h1 className="font-geist font-bold text-3xl lg:text-4xl gradient-text mb-2">
                My Appointments
              </h1>
              <p className="text-[#5C6F92] text-lg">
                Manage your healthcare appointments and consultations.
              </p>
            </div>
            <a
              href="/book-appointment"
              className="inline-flex items-center px-6 py-3 gradient-bg text-white font-semibold rounded-xl hover:opacity-90 hover:scale-[1.02] transition-all mt-4 sm:mt-0"
            >
              <Plus className="w-5 h-5 mr-2" />
              Book New Appointment
            </a>
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#5C6F92]" />
              <input
                type="text"
                placeholder="Search doctors or specializations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white border border-[#EEF2FA] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1A5DFF] focus:border-transparent"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-[#5C6F92]" />
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="px-4 py-3 bg-white border border-[#EEF2FA] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1A5DFF] focus:border-transparent"
              >
                <option value="all">All Appointments</option>
                <option value="upcoming">Upcoming</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>
        </div>

        {/* Appointments List */}
        {loading ? (
          <div className="space-y-6">
            {[1, 2, 3].map((index) => (
              <div key={index} className="bg-white rounded-2xl shadow-sm border border-[#EEF2FA] p-6 animate-pulse">
                <div className="flex items-start space-x-4">
                  <div className="w-16 h-16 bg-gray-200 rounded-full"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/4"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : filteredAppointments.length > 0 ? (
          <div className="space-y-6">
            {filteredAppointments.map((appointment) => (
              <div
                key={appointment.id}
                className="bg-white rounded-2xl shadow-sm border border-[#EEF2FA] p-6 hover:shadow-lg transition-all"
              >
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                  <div className="flex items-start space-x-4 mb-4 lg:mb-0">
                    <img
                      src={appointment.doctor_avatar}
                      alt={appointment.doctor_name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-bricolage font-bold text-xl text-[#1B2E54] mb-1">
                            {appointment.doctor_name}
                          </h3>
                          <p className="text-[#1A5DFF] font-medium mb-1">
                            {appointment.specialization}
                          </p>
                          <div className="flex items-center space-x-4 text-sm text-[#5C6F92] mb-2">
                            <div className="flex items-center space-x-1">
                              <MapPin className="w-4 h-4" />
                              <span>{appointment.hospital}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                              <span>{appointment.doctor_rating}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          {getStatusIcon(appointment.status)}
                          <span className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(appointment.status)}`}>
                            {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                          </span>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                        <div className="flex items-center space-x-2">
                          <Calendar className="w-4 h-4 text-[#5C6F92]" />
                          <span className="text-sm text-[#1B2E54] font-medium">
                            {appointment.appointment_date}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Clock className="w-4 h-4 text-[#5C6F92]" />
                          <span className="text-sm text-[#1B2E54] font-medium">
                            {appointment.appointment_time} ({appointment.duration_minutes}min)
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          {appointment.consultation_type === 'video' ? (
                            <Video className="w-4 h-4 text-[#5C6F92]" />
                          ) : (
                            <Phone className="w-4 h-4 text-[#5C6F92]" />
                          )}
                          <span className="text-sm text-[#1B2E54] font-medium capitalize">
                            {appointment.consultation_type.replace('-', ' ')}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-[#5C6F92]">Fee:</span>
                          <span className="text-sm text-[#1B2E54] font-medium">
                            ${appointment.total_cost}
                          </span>
                        </div>
                      </div>

                      {appointment.symptoms && (
                        <div className="mb-4">
                          <p className="text-sm text-[#5C6F92] mb-1">Reason for visit:</p>
                          <p className="text-sm text-[#1B2E54]">{appointment.symptoms}</p>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row lg:flex-col gap-2 lg:w-48">
                    {appointment.status === 'scheduled' && (
                      <>
                        {appointment.consultation_type === 'video' ? (
                          <button className="gradient-bg text-white px-4 py-2 rounded-lg hover:opacity-90 transition-all text-sm font-medium">
                            Join Video Call
                          </button>
                        ) : (
                          <button className="gradient-bg text-white px-4 py-2 rounded-lg hover:opacity-90 transition-all text-sm font-medium">
                            View Details
                          </button>
                        )}
                        <div className="flex space-x-2">
                          <button className="flex-1 border border-[#1A5DFF] text-[#1A5DFF] px-3 py-2 rounded-lg hover:bg-[#F8FBFF] transition-all text-sm font-medium">
                            <Edit3 className="w-4 h-4 mx-auto" />
                          </button>
                          <button className="flex-1 border border-red-300 text-red-600 px-3 py-2 rounded-lg hover:bg-red-50 transition-all text-sm font-medium">
                            <Trash2 className="w-4 h-4 mx-auto" />
                          </button>
                        </div>
                      </>
                    )}
                    {appointment.status === 'completed' && (
                      <button className="border border-[#1A5DFF] text-[#1A5DFF] px-4 py-2 rounded-lg hover:bg-[#F8FBFF] transition-all text-sm font-medium">
                        View Summary
                      </button>
                    )}
                    {appointment.status === 'cancelled' && (
                      <button className="gradient-bg text-white px-4 py-2 rounded-lg hover:opacity-90 transition-all text-sm font-medium">
                        Book Again
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-sm border border-[#EEF2FA] p-12 text-center">
            <Calendar className="w-16 h-16 text-[#5C6F92] mx-auto mb-6" />
            <h3 className="font-bricolage font-bold text-xl text-[#1B2E54] mb-2">
              {filter === 'all' ? 'No appointments found' : `No ${filter} appointments`}
            </h3>
            <p className="text-[#5C6F92] mb-6">
              {searchTerm 
                ? `No appointments match your search for "${searchTerm}"`
                : filter === 'all' 
                  ? "You haven't booked any appointments yet. Start by booking your first consultation."
                  : `You don't have any ${filter} appointments.`
              }
            </p>
            <a
              href="/book-appointment"
              className="inline-flex items-center px-6 py-3 gradient-bg text-white font-semibold rounded-xl hover:opacity-90 hover:scale-[1.02] transition-all"
            >
              <Plus className="w-5 h-5 mr-2" />
              Book Your First Appointment
            </a>
          </div>
        )}
      </main>
    </div>
  );
}