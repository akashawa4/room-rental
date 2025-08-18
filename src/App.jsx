import { useState, useEffect, useMemo, lazy, Suspense, useCallback } from 'react';
import { Phone, Shield, LogOut, Settings, Search, Users, User, Calendar, Download, X, Filter, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button.jsx';
import RoomCard from './components/RoomCard.jsx';
import Logo from './components/Logo.jsx';
import LanguageSelector from './components/LanguageSelector.jsx';
import TermsAndConditionsModal from './components/TermsAndConditionsModal.jsx';
import Notification from './components/Notification.jsx';
import LoginScreen from './components/LoginScreen.jsx';

import { useLanguage } from './contexts/LanguageContext.jsx';
import { useAuth } from './contexts/AuthContext.jsx';
import './App.css';

// Lazy load modal components to reduce initial bundle size
const RoomDetailModal = lazy(() => import('./components/RoomDetailModal.jsx'));
const AddRoomModal = lazy(() => import('./components/AddRoomModal.jsx'));
const AdminLoginModal = lazy(() => import('./components/AdminLoginModal.jsx'));
const GenderSelectionModal = lazy(() => import('./components/GenderSelectionModal.jsx'));
const BookingModal = lazy(() => import('./components/BookingModal.jsx'));
const BookingManagementModal = lazy(() => import('./components/BookingManagementModal.jsx'));
const FeatureFilterModal = lazy(() => import('./components/FeatureFilterModal.jsx'));
const UserStatisticsModal = lazy(() => import('./components/UserStatisticsModal.jsx'));

// Loading component for lazy-loaded modals
const ModalLoadingSpinner = () => (
  <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
    <div className="bg-white rounded-lg p-8 flex items-center gap-3">
      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-orange-500"></div>
      <span className="text-gray-600">Loading...</span>
    </div>
  </div>
);

function App() {
  const { t, currentLanguage } = useLanguage();
  const { user, loading, logout, isAuthenticated } = useAuth();
  
  const [rooms, setRooms] = useState([]);
  const [isLoadingRooms, setIsLoadingRooms] = useState(true);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [editRoom, setEditRoom] = useState(null);
  const [selectedGender, setSelectedGender] = useState(null);
  const [showGenderSelection, setShowGenderSelection] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(true);
  const [hasAcceptedTerms, setHasAcceptedTerms] = useState(false);
  const [category, setCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedRoomForBooking, setSelectedRoomForBooking] = useState(null);
  const [showBookingManagement, setShowBookingManagement] = useState(false);
  const [showUserStatistics, setShowUserStatistics] = useState(false);
  const [notification, setNotification] = useState({ message: '', type: 'success', isVisible: false });
  const [showInstallGuide, setShowInstallGuide] = useState(false);
  const [showContactPopup, setShowContactPopup] = useState(false);
  const [isWebViewApp, setIsWebViewApp] = useState(false);
  const [showFeatureFilter, setShowFeatureFilter] = useState(false);
  const [featureFilters, setFeatureFilters] = useState({});
  
  // Load rooms data dynamically
  useEffect(() => {
    const loadRooms = async () => {
      try {
        const { sampleRooms, getTranslatedRooms } = await import('./data/rooms.js');
        const translatedRooms = getTranslatedRooms(currentLanguage);
        console.log('Loaded rooms:', translatedRooms.length);
        console.log('All room IDs:', translatedRooms.map(r => r.id));
        console.log('Room 31:', translatedRooms.find(r => r.id === 31));
        console.log('Rooms with IDs 28, 29, and 31:', translatedRooms.filter(r => r.id === 28 || r.id === 29 || r.id === 31));
        setRooms(translatedRooms);
      } catch (error) {
        console.error('Failed to load rooms data:', error);
        setRooms([]);
      } finally {
        setIsLoadingRooms(false);
      }
    };
    
    loadRooms();
  }, [currentLanguage]);

  // Room type categories - use useMemo to update when language changes
  const categories = useMemo(() => [
    { key: 'All', label: t('all') },
    { key: 'Single Room', label: t('singleRoom') },
    { key: 'Cot Basis', label: t('cotBasis') },
    { key: '1 RK', label: t('oneRK') },
    { key: '1 BHK', label: t('oneBHK') },
    { key: '2 BHK', label: t('twoBHK') }
  ], [t]);

  // Helper function to get the original English key for a category
  const getCategoryKey = useCallback((categoryKey) => {
    const categoryMap = {
      'All': 'All',
      'Single Room': 'Single Room',
      'Cot Basis': 'Cot Basis',
      '1 RK': '1 RK',
      '1 BHK': '1 BHK',
      '2 BHK': '2 BHK'
    };
    return categoryMap[categoryKey] || categoryKey;
  }, []);

  // Helper function to check if a room matches a category (handles both English and translated values)
  const roomMatchesCategory = useCallback((room, category) => {
    if (category === 'All') return true;
    
    const originalCategory = getCategoryKey(category);
    
    // Map category keys to translation keys
    const categoryTranslationMap = {
      'Single Room': 'singleRoom',
      'Cot Basis': 'cotBasis',
      '1 RK': 'oneRK',
      '1 BHK': 'oneBHK',
      '2 BHK': 'twoBHK'
    };
    
    const translationKey = categoryTranslationMap[category];
    const translatedCategory = translationKey ? t(translationKey) : category;
    
    return (room.roomType === originalCategory || room.roomType === translatedCategory ||
            room.rooms === originalCategory || room.rooms === translatedCategory);
  }, [t, getCategoryKey]);

  // Enhanced filtering with memoization
  const filteredRooms = useMemo(() => {
    return rooms.filter(room => {
      const matchesGender = selectedGender ? 
        (selectedGender === 'boy' ? (room.gender === 'boy' || room.gender === 'boys') : 
         selectedGender === 'girl' ? (room.gender === 'girl' || room.gender === 'girls') : 
         room.gender === selectedGender) 
        : true;
      const matchesCategory = roomMatchesCategory(room, category);
      const matchesSearch = room.title && room.title.toLowerCase().includes(search.toLowerCase());
      
      // Feature filtering
      const matchesFeatures = Object.keys(featureFilters).length === 0 || 
        Object.entries(featureFilters).every(([feature, isSelected]) => {
          if (!isSelected) return true; // Skip unselected features
          return room.features && room.features.some(roomFeature => 
            roomFeature.toLowerCase().includes(feature.toLowerCase())
          );
        });
      
      return matchesGender && matchesCategory && matchesSearch && matchesFeatures;
    });
  }, [rooms, selectedGender, category, search, featureFilters, roomMatchesCategory]);

  const handleViewDetails = useCallback((room) => {
    setSelectedRoom(room);
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedRoom(null);
  }, []);

  const handleShowAddForm = useCallback(() => {
    if (isAdmin) {
      setShowAddForm(true);
    } else {
      setShowAdminLogin(true);
    }
  }, [isAdmin]);

  const handleAdminLogin = useCallback(() => {
    setIsAdmin(true);
    setShowAdminLogin(false);
    setShowAddForm(true);
  }, []);

  const handleAdminLogout = useCallback(() => {
    setIsAdmin(false);
    setShowAddForm(false);
  }, []);

  const handleAddRoom = useCallback((newRoom) => {
    setRooms(prev => [newRoom, ...prev]);
    setShowAddForm(false);
  }, []);

  const handleContactUs = useCallback(() => {
    setShowContactPopup(true);
  }, []);

  const handleShowFeatureFilter = useCallback(() => {
    setShowFeatureFilter(true);
  }, []);

  const handleApplyFeatureFilters = useCallback((filters) => {
    setFeatureFilters(filters);
  }, []);

  const handleClearFeatureFilters = useCallback(() => {
    setFeatureFilters({});
  }, []);

  // Detect if running in web view app
  useEffect(() => {
    const detectWebView = () => {
      const userAgent = navigator.userAgent.toLowerCase();
      const isWebView = userAgent.includes('wv') || // Android WebView
                       userAgent.includes('mobile') && userAgent.includes('safari') && !userAgent.includes('chrome') || // iOS WebView
                       userAgent.includes('nivasi') || // Custom web view identifier
                       window.ReactNativeWebView || // React Native WebView
                       window.webkit && window.webkit.messageHandlers; // iOS WKWebView
      
      setIsWebViewApp(isWebView);
    };

    detectWebView();
  }, []);

  const handleEditRoom = useCallback((room) => {
    setEditRoom(room);
  }, []);

  const handleUpdateRoom = useCallback((updatedRoom) => {
    setRooms(prev => prev.map(r => r.id === updatedRoom.id ? updatedRoom : r));
    setEditRoom(null);
  }, []);

  const handleTermsAccept = useCallback(() => {
    setHasAcceptedTerms(true);
    setShowTermsModal(false);
    setShowGenderSelection(true);
  }, []);

  const handleTermsDecline = useCallback(() => {
    setShowTermsModal(false);
    // User declined terms, could redirect to logout or show message
  }, []);

  const handleGenderSelect = useCallback(async (gender) => {
    setSelectedGender(gender);
    setShowGenderSelection(false);
    setIsLoading(true);
    
    try {
      // If user is changing gender (not first time), update in Firebase
      if (selectedGender && selectedGender !== gender) {
        const { updateUserGender } = await import('./services/userService.js');
        await updateUserGender(auth.currentUser?.uid, gender);
      }
    } catch (error) {
      console.error('Error updating gender:', error);
      // Show notification for error
      setNotification({
        message: 'Failed to update gender selection. Please try again.',
        type: 'error',
        isVisible: true
      });
    }
    
    // Simulate loading for better UX
    setTimeout(() => setIsLoading(false), 500);
  }, [selectedGender]);

  const handleChangeGender = useCallback(() => {
    setShowGenderSelection(true);
  }, []);

  const handleBookNow = useCallback((room) => {
    setSelectedRoomForBooking(room);
    setShowBookingModal(true);
  }, []);

  const handleBookingSuccess = useCallback((booking) => {
    console.log('Booking submitted successfully:', booking);
    setNotification({
      message: t('bookingSubmittedMessage') || 'Your booking has been submitted successfully!',
      type: 'success',
      isVisible: true
    });
  }, [t]);

  const handleShowBookingManagement = useCallback(() => {
    setShowBookingManagement(true);
  }, []);

  const handleShowUserStatistics = useCallback(() => {
    setShowUserStatistics(true);
  }, []);

  // Show loading screen while auth is initializing
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Show login screen if not authenticated
  if (!isAuthenticated) {
    return <LoginScreen onLoginSuccess={() => {}} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100">
      {/* Notification */}
      <Notification
        message={notification.message}
        type={notification.type}
        isVisible={notification.isVisible}
        onClose={() => setNotification(prev => ({ ...prev, isVisible: false }))}
      />
      {/* Terms and Conditions Modal */}
      <TermsAndConditionsModal
        isOpen={showTermsModal}
        onAccept={handleTermsAccept}
        onDecline={handleTermsDecline}
        t={t}
      />
      
      {/* Enhanced Header */}
      <header className="header-gradient text-white shadow-2xl">
            <div className="container mx-auto px-3 sm:px-4 py-3 sm:py-4 lg:py-6">
                              {/* Mobile Layout - Optimized */}
                <div className="sm:hidden">
                  {/* Top Row - Logo, Title, and Profile */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2 flex-1 min-w-0">
                      <Logo className="bg-white/20 backdrop-blur-sm flex-shrink-0" />
                      <div className="min-w-0 flex-1">
                        <h1 className="text-lg font-bold text-white leading-tight truncate">
                          {t('title')}
                        </h1>
                        <p className="text-white text-xs opacity-90 truncate">
                          {t('tagline')}
                        </p>
                      </div>
                    </div>
                    {/* User Profile - Top Right */}
                    <div className="flex flex-col items-center gap-1 flex-shrink-0 ml-2">
                      <User className="w-8 h-8 text-white" />
                      <span className="text-xs text-white/80 font-medium">Profile</span>
                    </div>
                  </div>

                  {/* Middle Row - Language, Gender, and Status */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2 flex-1">
                      <LanguageSelector />
                      {selectedGender && (
                        <Button
                          onClick={handleChangeGender}
                          variant="outline"
                          size="sm"
                          className="bg-white/20 border-white/30 text-white hover:bg-white/30 backdrop-blur-sm text-xs"
                        >
                          <Settings className="w-4 h-4" />
                          {t('changeGender')}
                        </Button>
                      )}
                    </div>
                    {/* Status Indicators - Right Side */}
                    <div className="flex items-center gap-1 flex-shrink-0">
                      {selectedGender && (
                        <span className="px-2 py-1 bg-white/20 rounded-full text-xs text-white">
                          {selectedGender === 'boy' ? t('forBoys') : t('forGirls')}
                        </span>
                      )}
                      <span className="px-2 py-1 bg-white/10 rounded-full text-xs text-white">
                        {currentLanguage.toUpperCase()}
                      </span>
                      {isAdmin && (
                        <div className="status-badge status-admin animate-fade-scale text-xs">
                          <Shield className="w-3 h-3" />
                          {t('adminMode')}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Bottom Row - Contact and Admin Actions */}
                  <div className="space-y-2">
                    {/* Contact Button */}
                    <Button
                      onClick={handleContactUs}
                      size="sm"
                      className="btn-primary hover-lift w-full"
                    >
                      <Phone className="w-4 h-4" />
                      For Room Registration Contact Us
                    </Button>
                    
                    {/* User Profile and Logout */}
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-2 flex-1">
                        {user?.photoURL ? (
                          <img 
                            src={user.photoURL} 
                            alt={user.displayName || 'User'} 
                            className="w-6 h-6 rounded-full border border-white/30"
                          />
                        ) : (
                          <User className="w-6 h-6 text-white" />
                        )}
                        <span className="text-xs text-white/80 font-medium">
                          {user?.displayName || 'User'}
                        </span>
                      </div>
                      <Button
                        variant="outline"
                        onClick={logout}
                        size="sm"
                        className="bg-white/20 border-white/30 text-white hover:bg-white/30 backdrop-blur-sm"
                      >
                        <LogOut className="w-4 h-4" />
                        {t('logout')}
                      </Button>
                    </div>
                    
                    {/* Admin Buttons - Only show if admin */}
                    {isAdmin && (
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          onClick={handleShowBookingManagement}
                          size="sm"
                          className="bg-white/20 border-white/30 text-white hover:bg-white/30 backdrop-blur-sm flex-1"
                        >
                          <Calendar className="w-4 h-4" />
                          {t('manageBookings') || 'Bookings'}
                        </Button>
                        <Button
                          variant="outline"
                          onClick={handleShowUserStatistics}
                          size="sm"
                          className="bg-white/20 border-white/30 text-white hover:bg-white/30 backdrop-blur-sm flex-1"
                        >
                          <TrendingUp className="w-4 h-4" />
                          Stats
                        </Button>
                        <Button
                          variant="outline"
                          onClick={handleAdminLogout}
                          size="sm"
                          className="bg-white/20 border-white/30 text-white hover:bg-white/30 backdrop-blur-sm flex-1"
                        >
                          <Shield className="w-4 h-4" />
                          {t('adminLogout')}
                        </Button>
                      </div>
                    )}
                  </div>
                </div>

              {/* Desktop Layout */}
              <div className="hidden sm:flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center relative z-10 w-full">
                <div className="flex flex-col xs:flex-row xs:items-center gap-2 sm:gap-4 w-full">
                  <div className="flex items-center gap-3 mx-auto sm:mx-0">
                    <Logo className="bg-white/20 backdrop-blur-sm" />
                    <div className="text-center sm:text-left">
                      <h1 className="text-2xl xs:text-3xl font-bold text-white leading-tight">
                        {t('title')}
                      </h1>
                      <p className="text-white text-sm flex flex-wrap justify-center sm:justify-start items-center gap-1">
                        {t('tagline')}
                        {selectedGender && (
                          <span className="ml-2 px-2 py-1 bg-white/20 rounded-full text-xs">
                            {selectedGender === 'boy' ? t('forBoys') : t('forGirls')}
                          </span>
                        )}
                        <span className="ml-2 px-2 py-1 bg-white/10 rounded-full text-xs">
                          {currentLanguage.toUpperCase()}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3 w-full sm:w-auto mt-2 sm:mt-0">
                  <LanguageSelector />
                  {selectedGender && (
                    <Button
                      onClick={handleChangeGender}
                      variant="outline"
                      className="w-full sm:w-auto bg-white/20 border-white/30 text-white hover:bg-white/30 backdrop-blur-sm"
                    >
                      <Settings className="w-4 h-4" />
                      {t('changeGender')}
                    </Button>
                  )}
                  {isAdmin && (
                    <>
                      <div className="status-badge status-admin animate-fade-scale w-full sm:w-auto text-center">
                        <Shield className="w-4 h-4" />
                        {t('adminMode')}
                      </div>
                      <Button
                        variant="outline"
                        onClick={handleShowBookingManagement}
                        className="w-full sm:w-auto bg-white/20 border-white/30 text-white hover:bg-white/30 backdrop-blur-sm"
                      >
                        <Calendar className="w-4 h-4" />
                        {t('manageBookings') || 'Bookings'}
                      </Button>
                      <Button
                        variant="outline"
                        onClick={handleShowUserStatistics}
                        className="w-full sm:w-auto bg-white/20 border-white/30 text-white hover:bg-white/30 backdrop-blur-sm"
                      >
                        <TrendingUp className="w-4 h-4" />
                        User Stats
                      </Button>
                    </>
                  )}
                  
                  <Button
                    onClick={handleContactUs}
                    className="w-full sm:w-auto btn-primary hover-lift"
                  >
                    <Phone className="w-4 h-4" />
                    For Room Registration Contact Us
                  </Button>
                  
                  {/* User Profile */}
                  <div className="flex flex-col items-center gap-1">
                    {user?.photoURL ? (
                      <img 
                        src={user.photoURL} 
                        alt={user.displayName || 'User'} 
                        className="w-8 h-8 rounded-full border-2 border-white/30"
                      />
                    ) : (
                      <User className="w-8 h-8 text-white" />
                    )}
                    <span className="text-xs text-white/80 font-medium">
                      {user?.displayName || 'Profile'}
                    </span>
                  </div>
                  
                  {/* Logout Button */}
                  <Button
                    variant="outline"
                    onClick={logout}
                    className="w-full sm:w-auto bg-white/20 border-white/30 text-white hover:bg-white/30 backdrop-blur-sm"
                  >
                    <LogOut className="w-4 h-4" />
                    {t('logout')}
                  </Button>
                  
                  {isAdmin && (
                    <Button
                      variant="outline"
                      onClick={handleAdminLogout}
                      className="w-full sm:w-auto bg-white/20 border-white/30 text-white hover:bg-white/30 backdrop-blur-sm"
                    >
                      <Shield className="w-4 h-4" />
                      {t('adminLogout')}
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </header>

        {/* Enhanced Main Content */}
        <main className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        {/* Categories Bar and Search Bar */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4 animate-slide-up">
          <div className="flex flex-wrap gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map(cat => (
              <button
                key={cat.key}
                className={`px-3 sm:px-4 py-2 rounded-full border transition-all text-xs sm:text-sm font-semibold whitespace-nowrap flex-shrink-0 ${category === cat.key ? 'bg-orange-800 text-white border-orange-800 shadow-lg' : 'bg-white text-orange-700 border-orange-400 hover:bg-orange-50 hover:text-orange-800'}`}
                onClick={() => setCategory(cat.key)}
                aria-pressed={category === cat.key}
              >
                {cat.label}
              </button>
            ))}
            
            {/* Feature Filter Button */}
            <button
              className={`px-3 sm:px-4 py-2 rounded-full border transition-all text-xs sm:text-sm font-semibold whitespace-nowrap flex-shrink-0 flex items-center gap-2 ${
                Object.keys(featureFilters).length > 0 
                  ? 'bg-orange-800 text-white border-orange-800 shadow-lg' 
                  : 'bg-white text-orange-700 border-orange-400 hover:bg-orange-50 hover:text-orange-800'
              }`}
              onClick={handleShowFeatureFilter}
            >
              <Filter className="w-4 h-4" />
              {t('filterByFeatures') || 'Filter'}
              {Object.keys(featureFilters).length > 0 && (
                <span className="bg-white text-orange-800 text-xs px-1.5 py-0.5 rounded-full">
                  {Object.values(featureFilters).filter(Boolean).length}
                </span>
              )}
            </button>
            
            {/* Clear Filters Button */}
            {Object.keys(featureFilters).length > 0 && (
              <button
                className="px-3 sm:px-4 py-2 rounded-full border border-red-400 bg-white text-red-600 hover:bg-red-50 hover:text-red-700 transition-all text-xs sm:text-sm font-semibold whitespace-nowrap flex-shrink-0"
                onClick={handleClearFeatureFilters}
              >
                {t('clearAll') || 'Clear'}
              </button>
            )}
          </div>
        </div>

        {/* App Promotion Tagline */}
        {!isWebViewApp ? (
          <div className="mb-8 text-center animate-slide-up">
            <div className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-lg p-4 border border-orange-200">
              <div className="flex items-center justify-center gap-3 mb-2">
                <div className="w-6 h-6 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center">
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                </div>
                <span className="text-sm font-medium text-orange-800">{t('getNivasiApp')}</span>
              </div>
              <div className="flex items-center justify-center gap-4 text-xs text-orange-700 mb-3">
                <span className="flex items-center gap-1">
                  <div className="w-1 h-1 bg-orange-500 rounded-full"></div>
                  {t('browseOffline')}
                </span>
                <span className="flex items-center gap-1">
                  <div className="w-1 h-1 bg-orange-500 rounded-full"></div>
                  {t('instantNotifications')}
                </span>
                <span className="flex items-center gap-1">
                  <div className="w-1 h-1 bg-orange-500 rounded-full"></div>
                  {t('fasterLoading')}
                </span>
              </div>
              {/* Install App Button */}
              <Button
                onClick={() => setShowInstallGuide(true)}
                className="install-app-btn-attractive w-full mt-3"
              >
                <Download className="w-4 h-4 mr-2" />
                {t('installApp') || 'Install App'}
              </Button>
            </div>
          </div>
        ) : (
          <div className="mb-8 text-center animate-slide-up">
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-4 border border-green-200">
              <div className="flex items-center justify-center gap-3 mb-2">
                <div className="w-6 h-6 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center">
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                </div>
                <span className="text-sm font-medium text-green-800">Welcome to Nivasi Space App!</span>
              </div>
              <div className="flex items-center justify-center gap-4 text-xs text-green-700 mb-3">
                <span className="flex items-center gap-1">
                  <div className="w-1 h-1 bg-green-500 rounded-full"></div>
                  Native App Experience
                </span>
                <span className="flex items-center gap-1">
                  <div className="w-1 h-1 bg-green-500 rounded-full"></div>
                  Enhanced Performance
                </span>
                <span className="flex items-center gap-1">
                  <div className="w-1 h-1 bg-green-500 rounded-full"></div>
                  Offline Access
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Enhanced Room Count Section */}
        <div className="mb-8 text-center animate-slide-up">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold title-gradient mb-3">
            {t('availableRooms')}
            {selectedGender && (
              <span className="text-lg sm:text-xl lg:text-2xl ml-2">
                {selectedGender === 'boy' ? t('forBoys') : t('forGirls')}
              </span>
            )}
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 mt-2 px-4">
            {t('poweredBy')}
          </p>
          <div className="w-16 sm:w-24 h-1 bg-gradient-to-r from-purple-400 to-pink-400 mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Enhanced Room Grid */}
        {isLoading || isLoadingRooms ? (
          <div className="flex justify-center items-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
            <span className="ml-3 text-gray-600">{t('loadingRooms')}</span>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {filteredRooms.map((room, index) => (
              <div 
                key={room.id} 
                className="animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <RoomCard
                  room={room}
                  onViewDetails={handleViewDetails}
                  isAdmin={isAdmin}
                  onEdit={handleEditRoom}
                  onBookNow={handleBookNow}
                  isFirst={index < 3}
                />
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {filteredRooms.length === 0 && selectedGender && (
          <div className="text-center py-16 animate-fade-scale">
            <div className="w-28 h-28 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center mx-auto mb-6">
              <img src="/logo.svg" alt="Nivasi.space Logo" className="w-16 h-16 object-contain" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              {t('noRoomsForGender')} {selectedGender === 'boy' ? t('boys') : t('girls')}
            </h3>
            <p className="text-gray-600 mb-6">
              {t('beFirstToAdd')} {selectedGender === 'boy' ? t('boys') : t('girls')} {t('onNivase')}
            </p>
            <Button
              onClick={handleContactUs}
              className="btn-primary"
            >
              <Phone className="w-4 h-4 mr-2" />
              {t('contactUs')}
            </Button>
          </div>
        )}

        {/* Empty State - No gender selected */}
        {filteredRooms.length === 0 && !selectedGender && (
          <div className="text-center py-16 animate-fade-scale">
            <div className="w-28 h-28 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center mx-auto mb-6">
              <img src="/logo.svg" alt="Nivasi.space Logo" className="w-16 h-16 object-contain" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">{t('welcomeToNivase')}</h3>
            <p className="text-gray-600 mb-6">{t('collegeRoomRental')} - {t('beFirstToAddGeneral')}</p>
            <Button
              onClick={handleContactUs}
              className="btn-primary"
            >
              <Phone className="w-4 h-4 mr-2" />
              {t('contactUs')}
            </Button>
          </div>
        )}

        {/* About Us Section */}
        <section className="about-us-section my-20 max-w-4xl mx-auto text-center animate-fade-scale">
          <div className="bg-white/90 rounded-2xl shadow-xl p-8 border border-orange-100">
            <h2 className="text-4xl font-extrabold mb-6 text-orange-600 tracking-tight flex items-center justify-center gap-3">
              <span>{t('aboutUs')}</span>
              <span role="img" aria-label="team">👥</span>
            </h2>
            <p className="text-gray-700 text-lg mb-10 max-w-2xl mx-auto">{t('aboutUsDescription')}</p>
            <div className="grid md:grid-cols-2 gap-8 mt-10">
              <div className="bg-gradient-to-br from-orange-100 to-white rounded-xl p-6 shadow flex flex-col items-center">
                <h3 className="text-2xl font-bold mb-2 text-orange-700 flex items-center gap-2"><span role="img" aria-label="target">🎯</span> {t('ourMission')}</h3>
                <p className="text-gray-700">{t('missionDescription')}</p>
              </div>
              <div className="bg-gradient-to-br from-orange-100 to-white rounded-xl p-6 shadow flex flex-col items-center">
                <h3 className="text-2xl font-bold mb-2 text-orange-700 flex items-center gap-2"><span role="img" aria-label="vision">🌟</span> {t('ourVision')}</h3>
                <p className="text-gray-700">{t('visionDescription')}</p>
              </div>
            </div>
          </div>
        </section>

        </main>

        {/* Professional Footer */}
        <footer className="bg-gradient-to-r from-slate-800 to-slate-900 text-white mt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              
              {/* Branding and Description */}
              <div className="lg:col-span-1">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-white text-2xl">🏠</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">NIVASI.SPACE</h3>
                    <p className="text-orange-300 text-sm font-medium"></p>
                  </div>
                </div>
                <p className="text-gray-300 text-sm leading-relaxed">
                  {t('trustedPlatform')}
                </p>
              </div>

              {/* Contact Information */}
              <div>
                <h4 className="text-lg font-semibold mb-4 text-white">{t('contact')}</h4>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 bg-orange-500 rounded-full flex items-center justify-center mt-0.5">
                      <span className="text-white text-xs">📍</span>
                    </div>
                    <p className="text-gray-300 text-sm">
                    {t('collegeAddress')}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">📞</span>
                    </div>
                    <p className="text-gray-300 text-sm">+91 7385553529</p>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 bg-orange-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">✉️</span>
                    </div>
                    <p className="text-gray-300 text-sm">contact@nivasi.space</p>
                  </div>
                </div>
              </div>

              {/* Quick Links */}
              <div>
                <h4 className="text-lg font-semibold mb-4 text-white">{t('quickLinks')}</h4>
                <div className="space-y-2">
                  <a href="#" className="block text-gray-300 hover:text-orange-300 transition-colors text-sm">{t('aboutUs')}</a>
                  <a href="#" className="block text-gray-300 hover:text-orange-300 transition-colors text-sm">{t('privacyPolicy')}</a>
                  <a href="#" className="block text-gray-300 hover:text-orange-300 transition-colors text-sm">{t('termsOfService')}</a>
                  <a href="#" className="block text-gray-300 hover:text-orange-300 transition-colors text-sm">{t('successStories')}</a>
                  <a href="#" className="block text-gray-300 hover:text-orange-300 transition-colors text-sm">{t('contactUs')}</a>
                </div>
              </div>

              {/* Legal Links */}
              <div>
                <h4 className="text-lg font-semibold mb-4 text-white">{t('legal')}</h4>
                <div className="space-y-2">
                  <a href="#" className="block text-gray-300 hover:text-orange-300 transition-colors text-sm">{t('termsConditions')}</a>
                  <a href="#" className="block text-gray-300 hover:text-orange-300 transition-colors text-sm">{t('privacyPolicy')}</a>
                  <a href="#" className="block text-gray-300 hover:text-orange-300 transition-colors text-sm">{t('refundPolicy')}</a>
                  <a href="#" className="block text-gray-300 hover:text-orange-300 transition-colors text-sm">{t('safetyGuidelines')}</a>
                </div>
              </div>
            </div>

            {/* Bottom Section */}
            <div className="border-t border-gray-700 mt-8 pt-8">
              <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                                                  <p className="text-gray-400 text-sm">
                  {t('allRightsReserved')}
                </p>
                <p className="text-gray-400 text-sm">
                  {t('designDevelopedBy')} <span className="text-orange-300 font-medium">{t('akashSolutions')}</span>
                </p>
              </div>
            </div>
          </div>
        </footer>

        {/* Gender Selection Modal */}
      {showGenderSelection && hasAcceptedTerms && (
        <Suspense fallback={<ModalLoadingSpinner />}>
          <GenderSelectionModal onGenderSelect={handleGenderSelect} />
        </Suspense>
      )}

      {/* Room Detail Modal */}
      {selectedRoom && (
        <Suspense fallback={<ModalLoadingSpinner />}>
          <RoomDetailModal
            room={selectedRoom}
            onClose={handleCloseModal}
          />
        </Suspense>
      )}

      {/* Add Room Form Modal */}
      {showAddForm && (
        <Suspense fallback={<ModalLoadingSpinner />}>
          <AddRoomModal
            onClose={() => setShowAddForm(false)}
            onAddRoom={handleAddRoom}
          />
        </Suspense>
      )}

      {/* Edit Room Modal (reuse AddRoomModal) */}
      {editRoom && (
        <Suspense fallback={<ModalLoadingSpinner />}>
          <AddRoomModal
            onClose={() => setEditRoom(null)}
            onAddRoom={handleUpdateRoom}
            initialRoom={editRoom}
            isEdit
          />
        </Suspense>
      )}

      {/* Admin Login Modal */}
      {showAdminLogin && (
        <Suspense fallback={<ModalLoadingSpinner />}>
          <AdminLoginModal
            onClose={() => setShowAdminLogin(false)}
            onAdminLogin={handleAdminLogin}
          />
        </Suspense>
      )}

      {/* Booking Modal */}
      {showBookingModal && selectedRoomForBooking && (
        <Suspense fallback={<ModalLoadingSpinner />}>
          <BookingModal
            isOpen={showBookingModal}
            onClose={() => {
              setShowBookingModal(false);
              setSelectedRoomForBooking(null);
            }}
            room={selectedRoomForBooking}
            onBookingSuccess={handleBookingSuccess}
          />
        </Suspense>
      )}

      {/* Booking Management Modal */}
      {showBookingManagement && (
        <Suspense fallback={<ModalLoadingSpinner />}>
          <BookingManagementModal
            isOpen={showBookingManagement}
            onClose={() => setShowBookingManagement(false)}
          />
        </Suspense>
      )}

      {/* User Statistics Modal */}
      {showUserStatistics && (
        <Suspense fallback={<ModalLoadingSpinner />}>
          <UserStatisticsModal
            onClose={() => setShowUserStatistics(false)}
          />
        </Suspense>
      )}

      {/* Install Guide Modal */}
      {showInstallGuide && !isWebViewApp && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center">
                  <Download className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">
                    {t('installAppTitle') || 'Install Nivasi Space App'}
                  </h2>
                  <p className="text-sm text-gray-600">
                    {t('enhancedExperience') || 'Get the best experience'}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowInstallGuide(false)}
                className="w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6">
              <div className="space-y-6">
                {/* Benefits */}
                <div className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-lg p-4 border border-orange-200">
                  <h3 className="font-semibold text-orange-800 mb-3">
                    {t('installationBenefits') || 'App Benefits'}
                  </h3>
                  <div className="space-y-2 text-sm text-orange-700">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                      <span>{t('browseOffline') || 'Browse offline'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                      <span>{t('instantNotifications') || 'Instant notifications'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                      <span>{t('fasterLoading') || 'Faster loading'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                      <span>{t('nativeFeatures') || 'Native app features'}</span>
                    </div>
                  </div>
                </div>

                {/* Installation Steps */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-900">
                    {t('installationGuide') || 'Installation Guide'}
                  </h3>
                  
                  <div className="space-y-3">
                    <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                      <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                        1
                      </div>
                      <div>
                        <h4 className="font-medium text-blue-900 mb-1">
                          {t('step1Title') || 'Download APK'}
                        </h4>
                        <p className="text-sm text-blue-700">
                          {t('step1Description') || 'Download the Nivasi Space App APK file'}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                      <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                        2
                      </div>
                      <div>
                        <h4 className="font-medium text-blue-900 mb-1">
                          {t('step2Title') || 'Enable Installation'}
                        </h4>
                        <p className="text-sm text-blue-700">
                          {t('step2Description') || 'Allow installation from unknown sources in settings'}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                      <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                        3
                      </div>
                      <div>
                        <h4 className="font-medium text-blue-900 mb-1">
                          {t('step3Title') || 'Install App'}
                        </h4>
                        <p className="text-sm text-blue-700">
                          {t('step3Description') || 'Open the downloaded APK and tap Install'}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                      <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                        4
                      </div>
                      <div>
                        <h4 className="font-medium text-blue-900 mb-1">
                          {t('step4Title') || 'Open App'}
                        </h4>
                        <p className="text-sm text-blue-700">
                          {t('step4Description') || 'Launch the app and enjoy the enhanced experience'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <Button
                    onClick={() => {
                      const link = document.createElement('a');
                      link.href = '/Nivasi Space App.apk';
                      link.download = 'Nivasi Space App.apk';
                      link.click();
                      setShowInstallGuide(false);
                    }}
                    className="w-full bg-orange-600 hover:bg-orange-700 text-white"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    {t('downloadNow') || 'Download Now'}
                  </Button>
                  
                  <Button
                    onClick={() => setShowInstallGuide(false)}
                    variant="outline"
                    className="w-full"
                  >
                    {t('close') || 'Close'}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Contact Popup Modal */}
      {showContactPopup && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center">
                  <Phone className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">
                    Contact Us
                  </h2>
                  <p className="text-sm text-gray-600">
                    For Room Registration
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowContactPopup(false)}
                className="w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6">
              <div className="space-y-6">
                {/* Contact Information */}
                <div className="space-y-4">
                  {/* Address */}
                  <div className="flex items-start gap-3 p-4 bg-orange-50 rounded-lg border border-orange-200">
                    <div className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-orange-800 mb-1">📍 Address</h3>
                      <p className="text-sm text-orange-700 leading-relaxed">
                        Dr. DY Patil Pratishthan's College of Engineering, Salokhenaga, Kolhapur, Maharashtra, 416007 India
                      </p>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center flex-shrink-0">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-blue-800 mb-1">📞 Phone</h3>
                      <a 
                        href="tel:+917385553529"
                        className="text-sm text-blue-700 hover:text-blue-900 transition-colors"
                      >
                        +91 7385553529
                      </a>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-start gap-3 p-4 bg-green-50 rounded-lg border border-green-200">
                    <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-green-800 mb-1">✉️ Email</h3>
                      <a 
                        href="mailto:contact@nivasi.space"
                        className="text-sm text-green-700 hover:text-green-900 transition-colors"
                      >
                        contact@nivasi.space
                      </a>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <Button
                    onClick={() => window.open('tel:+917385553529', '_self')}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    Call Now
                  </Button>
                  
                  <Button
                    onClick={() => window.open('mailto:contact@nivasi.space', '_self')}
                    className="w-full bg-green-600 hover:bg-green-700 text-white"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    Send Email
                  </Button>
                  
                  <Button
                    onClick={() => setShowContactPopup(false)}
                    variant="outline"
                    className="w-full"
                  >
                    Close
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Feature Filter Modal */}
      {showFeatureFilter && (
        <Suspense fallback={<ModalLoadingSpinner />}>
          <FeatureFilterModal
            isOpen={showFeatureFilter}
            onClose={() => setShowFeatureFilter(false)}
            onApplyFilters={handleApplyFeatureFilters}
            currentFilters={featureFilters}
          />
        </Suspense>
      )}
    </div>
  );
}

export default App;

