import React, { useState, useEffect } from "react";
import useUser from "@/utils/useUser";
import {
  FileText,
  Upload,
  Download,
  Eye,
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
  Calendar,
  User,
  Heart,
  Activity,
  Pill,
  TestTube,
  Image,
  FileImage,
  File,
  Share2,
  Edit3,
  Trash2,
  Lock,
  Unlock,
} from "lucide-react";

export default function HealthRecordsPage() {
  const { data: user, loading: userLoading } = useUser();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [healthRecords, setHealthRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all"); // all, lab-report, prescription, imaging, checkup
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchHealthRecords = async () => {
      try {
        // Mock data for now - replace with actual API call
        setHealthRecords([
          {
            id: 1,
            record_title: "Complete Blood Count (CBC)",
            record_type: "lab-report",
            record_data: {
              test_date: "2024-08-10",
              results: {
                "White Blood Cells": "7.2 K/uL",
                "Red Blood Cells": "4.8 M/uL",
                Hemoglobin: "14.2 g/dL",
                Hematocrit: "42.1%",
              },
            },
            file_url: "https://example.com/cbc-report.pdf",
            doctor_id: 1,
            doctor_name: "Dr. Sarah Johnson",
            appointment_id: 1,
            is_private: false,
            created_at: "2024-08-10T10:30:00Z",
            updated_at: "2024-08-10T10:30:00Z",
          },
          {
            id: 2,
            record_title: "Chest X-Ray",
            record_type: "imaging",
            record_data: {
              imaging_type: "X-Ray",
              body_part: "Chest",
              findings:
                "Normal chest X-ray. No acute cardiopulmonary abnormalities.",
            },
            file_url: "https://example.com/chest-xray.jpg",
            doctor_id: 2,
            doctor_name: "Dr. Michael Chen",
            appointment_id: 2,
            is_private: false,
            created_at: "2024-08-05T14:15:00Z",
            updated_at: "2024-08-05T14:15:00Z",
          },
          {
            id: 3,
            record_title: "Prescription - Lisinopril",
            record_type: "prescription",
            record_data: {
              medication: "Lisinopril",
              dosage: "10mg",
              frequency: "Once daily",
              duration: "30 days",
              instructions:
                "Take with or without food. Monitor blood pressure regularly.",
            },
            file_url: null,
            doctor_id: 1,
            doctor_name: "Dr. Sarah Johnson",
            appointment_id: 3,
            is_private: false,
            created_at: "2024-07-28T09:45:00Z",
            updated_at: "2024-07-28T09:45:00Z",
          },
          {
            id: 4,
            record_title: "Annual Physical Examination",
            record_type: "checkup",
            record_data: {
              height: "175 cm",
              weight: "70 kg",
              blood_pressure: "120/80 mmHg",
              heart_rate: "72 bpm",
              temperature: "98.6°F",
              notes:
                "Patient in good health. Continue current lifestyle and medications.",
            },
            file_url: "https://example.com/physical-exam.pdf",
            doctor_id: 3,
            doctor_name: "Dr. Emily Rodriguez",
            appointment_id: 4,
            is_private: true,
            created_at: "2024-07-15T11:00:00Z",
            updated_at: "2024-07-15T11:00:00Z",
          },
          {
            id: 5,
            record_title: "Lipid Panel",
            record_type: "lab-report",
            record_data: {
              test_date: "2024-07-10",
              results: {
                "Total Cholesterol": "185 mg/dL",
                "LDL Cholesterol": "110 mg/dL",
                "HDL Cholesterol": "55 mg/dL",
                Triglycerides: "100 mg/dL",
              },
            },
            file_url: "https://example.com/lipid-panel.pdf",
            doctor_id: 1,
            doctor_name: "Dr. Sarah Johnson",
            appointment_id: 5,
            is_private: false,
            created_at: "2024-07-10T16:20:00Z",
            updated_at: "2024-07-10T16:20:00Z",
          },
        ]);
      } catch (error) {
        console.error("Error fetching health records:", error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchHealthRecords();
    }
  }, [user]);

  const getRecordIcon = (recordType) => {
    switch (recordType) {
      case "lab-report":
        return <TestTube className="w-5 h-5 text-blue-500" />;
      case "prescription":
        return <Pill className="w-5 h-5 text-green-500" />;
      case "imaging":
        return <Image className="w-5 h-5 text-purple-500" />;
      case "checkup":
        return <Heart className="w-5 h-5 text-red-500" />;
      default:
        return <FileText className="w-5 h-5 text-gray-500" />;
    }
  };

  const getRecordTypeColor = (recordType) => {
    switch (recordType) {
      case "lab-report":
        return "bg-blue-100 text-blue-800";
      case "prescription":
        return "bg-green-100 text-green-800";
      case "imaging":
        return "bg-purple-100 text-purple-800";
      case "checkup":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getFileIcon = (fileUrl) => {
    if (!fileUrl) return <FileText className="w-4 h-4" />;

    const extension = fileUrl.split(".").pop().toLowerCase();
    switch (extension) {
      case "pdf":
        return <FileText className="w-4 h-4 text-red-500" />;
      case "jpg":
      case "jpeg":
      case "png":
      case "gif":
        return <FileImage className="w-4 h-4 text-green-500" />;
      default:
        return <File className="w-4 h-4 text-gray-500" />;
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const filteredRecords = healthRecords.filter((record) => {
    const matchesFilter = filter === "all" || record.record_type === filter;
    const matchesSearch =
      record.record_title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.doctor_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.record_type.toLowerCase().includes(searchTerm.toLowerCase());
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
          <h1 className="text-2xl font-bold text-[#1B2E54] mb-4">
            Access Denied
          </h1>
          <p className="text-[#5C6F92] mb-6">
            Please sign in to view your health records.
          </p>
          <a
            href="/account/signin"
            className="gradient-bg text-white px-6 py-3 rounded-lg hover:opacity-90 transition-all"
          >
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
              <a
                href="/dashboard"
                className="text-[#5C6F92] hover:text-[#1A5DFF] transition-colors"
              >
                Dashboard
              </a>
              <a
                href="/appointments"
                className="text-[#5C6F92] hover:text-[#1A5DFF] transition-colors"
              >
                Appointments
              </a>
              <a
                href="/chat"
                className="text-[#5C6F92] hover:text-[#1A5DFF] transition-colors"
              >
                Chat
              </a>
              <a href="/health-records" className="text-[#1A5DFF] font-medium">
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
              <a
                href="/account/logout"
                className="text-[#5C6F92] hover:text-[#1B2E54] transition-colors"
              >
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
                <a
                  href="/dashboard"
                  className="text-[#5C6F92] hover:text-[#1A5DFF] py-2"
                >
                  Dashboard
                </a>
                <a
                  href="/appointments"
                  className="text-[#5C6F92] hover:text-[#1A5DFF] py-2"
                >
                  Appointments
                </a>
                <a
                  href="/chat"
                  className="text-[#5C6F92] hover:text-[#1A5DFF] py-2"
                >
                  Chat
                </a>
                <a
                  href="/health-records"
                  className="text-[#1A5DFF] font-medium py-2"
                >
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
                Health Records
              </h1>
              <p className="text-[#5C6F92] text-lg">
                Securely store and manage your medical records and test results.
              </p>
            </div>
            <button className="inline-flex items-center px-6 py-3 gradient-bg text-white font-semibold rounded-xl hover:opacity-90 hover:scale-[1.02] transition-all mt-4 sm:mt-0">
              <Upload className="w-5 h-5 mr-2" />
              Upload Record
            </button>
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#5C6F92]" />
              <input
                type="text"
                placeholder="Search records, doctors, or types..."
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
                <option value="all">All Records</option>
                <option value="lab-report">Lab Reports</option>
                <option value="prescription">Prescriptions</option>
                <option value="imaging">Imaging</option>
                <option value="checkup">Checkups</option>
              </select>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="bg-white p-4 rounded-xl border border-[#EEF2FA]">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <TestTube className="w-5 h-5 text-blue-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-[#1B2E54]">
                    {
                      healthRecords.filter(
                        (r) => r.record_type === "lab-report",
                      ).length
                    }
                  </p>
                  <p className="text-sm text-[#5C6F92]">Lab Reports</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-4 rounded-xl border border-[#EEF2FA]">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <Pill className="w-5 h-5 text-green-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-[#1B2E54]">
                    {
                      healthRecords.filter(
                        (r) => r.record_type === "prescription",
                      ).length
                    }
                  </p>
                  <p className="text-sm text-[#5C6F92]">Prescriptions</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-4 rounded-xl border border-[#EEF2FA]">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Image className="w-5 h-5 text-purple-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-[#1B2E54]">
                    {
                      healthRecords.filter((r) => r.record_type === "imaging")
                        .length
                    }
                  </p>
                  <p className="text-sm text-[#5C6F92]">Imaging</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-4 rounded-xl border border-[#EEF2FA]">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                  <Heart className="w-5 h-5 text-red-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-[#1B2E54]">
                    {
                      healthRecords.filter((r) => r.record_type === "checkup")
                        .length
                    }
                  </p>
                  <p className="text-sm text-[#5C6F92]">Checkups</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Health Records List */}
        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-sm border border-[#EEF2FA] p-6 animate-pulse"
              >
                <div className="flex items-start space-x-4 mb-4">
                  <div className="w-12 h-12 bg-gray-200 rounded-xl"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="h-3 bg-gray-200 rounded"></div>
                  <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                </div>
              </div>
            ))}
          </div>
        ) : filteredRecords.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRecords.map((record) => (
              <div
                key={record.id}
                className="bg-white rounded-2xl shadow-sm border border-[#EEF2FA] p-6 hover:shadow-lg transition-all group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-12 h-12 bg-[#F8FBFF] rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                      {getRecordIcon(record.record_type)}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bricolage font-bold text-lg text-[#1B2E54] mb-1 line-clamp-2">
                        {record.record_title}
                      </h3>
                      <span
                        className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${getRecordTypeColor(record.record_type)}`}
                      >
                        {record.record_type
                          .replace("-", " ")
                          .replace(/\b\w/g, (l) => l.toUpperCase())}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1">
                    {record.is_private ? (
                      <Lock className="w-4 h-4 text-[#5C6F92]" />
                    ) : (
                      <Unlock className="w-4 h-4 text-[#5C6F92]" />
                    )}
                  </div>
                </div>

                <div className="space-y-3 mb-4">
                  <div className="flex items-center space-x-2 text-sm text-[#5C6F92]">
                    <User className="w-4 h-4" />
                    <span>{record.doctor_name}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-[#5C6F92]">
                    <Calendar className="w-4 h-4" />
                    <span>{formatDate(record.created_at)}</span>
                  </div>
                  {record.file_url && (
                    <div className="flex items-center space-x-2 text-sm text-[#5C6F92]">
                      {getFileIcon(record.file_url)}
                      <span>File attached</span>
                    </div>
                  )}
                </div>

                {/* Record Data Preview */}
                {record.record_data && (
                  <div className="bg-[#F8FBFF] rounded-lg p-3 mb-4">
                    {record.record_type === "lab-report" &&
                      record.record_data.results && (
                        <div className="space-y-1">
                          <p className="text-xs font-medium text-[#5C6F92] mb-2">
                            Key Results:
                          </p>
                          {Object.entries(record.record_data.results)
                            .slice(0, 2)
                            .map(([key, value]) => (
                              <div
                                key={key}
                                className="flex justify-between text-xs"
                              >
                                <span className="text-[#5C6F92]">{key}:</span>
                                <span className="text-[#1B2E54] font-medium">
                                  {value}
                                </span>
                              </div>
                            ))}
                          {Object.keys(record.record_data.results).length >
                            2 && (
                            <p className="text-xs text-[#5C6F92] italic">
                              +
                              {Object.keys(record.record_data.results).length -
                                2}{" "}
                              more
                            </p>
                          )}
                        </div>
                      )}
                    {record.record_type === "prescription" && (
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span className="text-[#5C6F92]">Medication:</span>
                          <span className="text-[#1B2E54] font-medium">
                            {record.record_data.medication}
                          </span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-[#5C6F92]">Dosage:</span>
                          <span className="text-[#1B2E54] font-medium">
                            {record.record_data.dosage}
                          </span>
                        </div>
                      </div>
                    )}
                    {record.record_type === "imaging" && (
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span className="text-[#5C6F92]">Type:</span>
                          <span className="text-[#1B2E54] font-medium">
                            {record.record_data.imaging_type}
                          </span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-[#5C6F92]">Body Part:</span>
                          <span className="text-[#1B2E54] font-medium">
                            {record.record_data.body_part}
                          </span>
                        </div>
                      </div>
                    )}
                    {record.record_type === "checkup" && (
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span className="text-[#5C6F92]">BP:</span>
                          <span className="text-[#1B2E54] font-medium">
                            {record.record_data.blood_pressure}
                          </span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-[#5C6F92]">Weight:</span>
                          <span className="text-[#1B2E54] font-medium">
                            {record.record_data.weight}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex space-x-2">
                  <button className="flex-1 gradient-bg text-white px-3 py-2 rounded-lg hover:opacity-90 transition-all text-sm font-medium flex items-center justify-center">
                    <Eye className="w-4 h-4 mr-1" />
                    View
                  </button>
                  {record.file_url && (
                    <button className="border border-[#1A5DFF] text-[#1A5DFF] px-3 py-2 rounded-lg hover:bg-[#F8FBFF] transition-all text-sm font-medium">
                      <Download className="w-4 h-4" />
                    </button>
                  )}
                  <button className="border border-[#1A5DFF] text-[#1A5DFF] px-3 py-2 rounded-lg hover:bg-[#F8FBFF] transition-all text-sm font-medium">
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-sm border border-[#EEF2FA] p-12 text-center">
            <FileText className="w-16 h-16 text-[#5C6F92] mx-auto mb-6" />
            <h3 className="font-bricolage font-bold text-xl text-[#1B2E54] mb-2">
              {filter === "all"
                ? "No health records found"
                : `No ${filter.replace("-", " ")} records`}
            </h3>
            <p className="text-[#5C6F92] mb-6">
              {searchTerm
                ? `No records match your search for "${searchTerm}"`
                : filter === "all"
                  ? "You haven't uploaded any health records yet. Start by uploading your first document."
                  : `You don't have any ${filter.replace("-", " ")} records.`}
            </p>
            <button className="inline-flex items-center px-6 py-3 gradient-bg text-white font-semibold rounded-xl hover:opacity-90 hover:scale-[1.02] transition-all">
              <Upload className="w-5 h-5 mr-2" />
              Upload Your First Record
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
