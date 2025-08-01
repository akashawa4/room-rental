import { useState, useEffect, useMemo, lazy, Suspense, useCallback } from 'react';
import { Phone, Shield, LogOut, Settings, Search, Users } from 'lucide-react';
import { Button } from '@/components/ui/button.jsx';
import RoomCard from './components/RoomCard.jsx';
import Logo from './components/Logo.jsx';
import LanguageSelector from './components/LanguageSelector.jsx';

import { useLanguage } from './contexts/LanguageContext.jsx';
import './App.css';

// Lazy load modal components to reduce initial bundle size
const RoomDetailModal = lazy(() => import('./components/RoomDetailModal.jsx'));
const AddRoomModal = lazy(() => import('./components/AddRoomModal.jsx'));
const AdminLoginModal = lazy(() => import('./components/AdminLoginModal.jsx'));
const GenderSelectionModal = lazy(() => import('./components/GenderSelectionModal.jsx'));

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
  const [rooms, setRooms] = useState([]);
  const [isLoadingRooms, setIsLoadingRooms] = useState(true);
  
  // Load rooms data dynamically
  useEffect(() => {
    const loadRooms = async () => {
      try {
        const { sampleRooms, getTranslatedRooms } = await import('./data/rooms.js');
        setRooms(getTranslatedRooms(currentLanguage));
      } catch (error) {
        console.error('Failed to load rooms data:', error);
        setRooms([]);
      } finally {
        setIsLoadingRooms(false);
      }
    };
    
    loadRooms();
  }, [currentLanguage]);
  
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [editRoom, setEditRoom] = useState(null);
  const [selectedGender, setSelectedGender] = useState(null);
  const [showGenderSelection, setShowGenderSelection] = useState(true);
  const [category, setCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(false);

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
  const getCategoryKey = (categoryKey) => {
    const categoryMap = {
      'All': 'All',
      'Single Room': 'Single Room',
      'Cot Basis': 'Cot Basis',
      '1 RK': '1 RK',
      '1 BHK': '1 BHK',
      '2 BHK': '2 BHK'
    };
    return categoryMap[categoryKey] || categoryKey;
  };

  // Helper function to check if a room matches a category (handles both English and translated values)
  const roomMatchesCategory = (room, category) => {
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
  };

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
      return matchesGender && matchesCategory && matchesSearch;
    });
  }, [rooms, selectedGender, category, search]);

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
    // Scroll to the bottom of the page smoothly
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth'
    });
  }, []);

  const handleEditRoom = useCallback((room) => {
    setEditRoom(room);
  }, []);

  const handleUpdateRoom = useCallback((updatedRoom) => {
    setRooms(prev => prev.map(r => r.id === updatedRoom.id ? updatedRoom : r));
    setEditRoom(null);
  }, []);

  const handleGenderSelect = useCallback((gender) => {
    setSelectedGender(gender);
    setShowGenderSelection(false);
    setIsLoading(true);
    // Simulate loading for better UX
    setTimeout(() => setIsLoading(false), 500);
  }, []);

  const handleChangeGender = useCallback(() => {
    setShowGenderSelection(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100">
      {/* Enhanced Header */}
      <header className="header-gradient text-white shadow-2xl">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center relative z-10 w-full">
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
                <div className="status-badge status-admin animate-fade-scale w-full sm:w-auto text-center">
                  <Shield className="w-4 h-4" />
                  {t('adminMode')}
                </div>
              )}
              <Button
                onClick={handleContactUs}
                className="w-full sm:w-auto btn-primary hover-lift"
              >
                <Phone className="w-4 h-4" />
                {t('contactUs')}
              </Button>
              {isAdmin && (
                <Button
                  variant="outline"
                  onClick={handleAdminLogout}
                  className="w-full sm:w-auto bg-white/20 border-white/30 text-white hover:bg-white/30 backdrop-blur-sm"
                >
                  <LogOut className="w-4 h-4" />
                  {t('logout')}
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Enhanced Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Categories Bar and Search Bar */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8 animate-slide-up">
          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <button
                key={cat.key}
                className={`px-4 py-2 rounded-full border transition-all text-sm font-semibold ${category === cat.key ? 'bg-orange-800 text-white border-orange-800 shadow-lg' : 'bg-white text-orange-700 border-orange-400 hover:bg-orange-50 hover:text-orange-800'}`}
                onClick={useCallback(() => setCategory(cat.key), [cat.key])}
                aria-pressed={category === cat.key}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Enhanced Room Count Section */}
        <div className="mb-8 text-center animate-slide-up">
          <h2 className="text-4xl font-bold title-gradient mb-3">
            {t('availableRooms')}
            {selectedGender && (
              <span className="text-2xl ml-2">
                {selectedGender === 'boy' ? t('forBoys') : t('forGirls')}
              </span>
            )}
          </h2>
          <p className="text-sm text-gray-500 mt-2">
            {t('poweredBy')}
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-400 to-pink-400 mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Enhanced Room Grid */}
        {isLoading || isLoadingRooms ? (
          <div className="flex justify-center items-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
            <span className="ml-3 text-gray-600">{t('loadingRooms')}</span>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                  isFirst={index === 0}
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
      {showGenderSelection && (
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
    </div>
  );
}

export default App;

