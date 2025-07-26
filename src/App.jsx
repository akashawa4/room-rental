import { useState, useEffect } from 'react';
import { Home, Plus, Shield, LogOut, Settings, Search } from 'lucide-react';
import { Button } from '@/components/ui/button.jsx';
import RoomCard from './components/RoomCard.jsx';
import RoomDetailModal from './components/RoomDetailModal.jsx';
import AddRoomModal from './components/AddRoomModal.jsx';
import AdminLoginModal from './components/AdminLoginModal.jsx';
import GenderSelectionModal from './components/GenderSelectionModal.jsx';
import { sampleRooms } from './data/rooms.js';
import './App.css';

function App() {
  const [rooms, setRooms] = useState(sampleRooms);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [editRoom, setEditRoom] = useState(null);
  const [selectedGender, setSelectedGender] = useState(null);
  const [showGenderSelection, setShowGenderSelection] = useState(true);
  const [category, setCategory] = useState('All');
  const [search, setSearch] = useState('');

  // Room type categories
  const categories = ['All', 'Single Room', 'Cot Basis', '1 RK', '1 BHK', '2 BHK'];

  // Enhanced filtering
  const filteredRooms = rooms.filter(room => {
    const matchesGender = selectedGender ? room.gender === selectedGender : true;
    const matchesCategory = category === 'All' || (room.roomType && room.roomType === category);
    const matchesSearch = room.title && room.title.toLowerCase().includes(search.toLowerCase());
    return matchesGender && matchesCategory && matchesSearch;
  });

  const handleViewDetails = (room) => {
    setSelectedRoom(room);
  };

  const handleCloseModal = () => {
    setSelectedRoom(null);
  };

  const handleShowAddForm = () => {
    if (isAdmin) {
      setShowAddForm(true);
    } else {
      setShowAdminLogin(true);
    }
  };

  const handleAdminLogin = () => {
    setIsAdmin(true);
    setShowAdminLogin(false);
    setShowAddForm(true);
  };

  const handleAdminLogout = () => {
    setIsAdmin(false);
    setShowAddForm(false);
  };

  const handleAddRoom = (newRoom) => {
    setRooms(prev => [newRoom, ...prev]);
    setShowAddForm(false);
  };

  const handleEditRoom = (room) => {
    setEditRoom(room);
  };

  const handleUpdateRoom = (updatedRoom) => {
    setRooms(prev => prev.map(r => r.id === updatedRoom.id ? updatedRoom : r));
    setEditRoom(null);
  };

  const handleGenderSelect = (gender) => {
    setSelectedGender(gender);
    setShowGenderSelection(false);
  };

  const handleChangeGender = () => {
    setShowGenderSelection(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100">
      {/* Enhanced Header */}
      <header className="header-gradient text-white shadow-2xl">
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center relative z-10">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                <Home className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">
                  College Room Rental
                </h1>
                <p className="text-blue-100 text-sm">
                  Find your perfect room near campus
                  {selectedGender && (
                    <span className="ml-2 px-2 py-1 bg-white/20 rounded-full text-xs">
                      {selectedGender === 'boy' ? 'Boys' : 'Girls'} Rooms
                    </span>
                  )}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {selectedGender && (
                <Button
                  onClick={handleChangeGender}
                  variant="outline"
                  className="bg-white/20 border-white/30 text-white hover:bg-white/30 backdrop-blur-sm"
                >
                  <Settings className="w-4 h-4" />
                  Change Gender
                </Button>
              )}
              {isAdmin && (
                <div className="status-badge status-admin animate-fade-scale">
                  <Shield className="w-4 h-4" />
                  Admin Mode
                </div>
              )}
              <Button
                onClick={handleShowAddForm}
                className="btn-primary hover-lift"
              >
                <Plus className="w-4 h-4" />
                Add Room
              </Button>
              {isAdmin && (
                <Button
                  variant="outline"
                  onClick={handleAdminLogout}
                  className="bg-white/20 border-white/30 text-white hover:bg-white/30 backdrop-blur-sm"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
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
                key={cat}
                className={`px-4 py-2 rounded-full border transition-all text-sm font-semibold ${category === cat ? 'bg-orange-500 text-white border-orange-500' : 'bg-white text-orange-500 border-orange-300 hover:bg-orange-100'}`}
                onClick={() => setCategory(cat)}
                aria-pressed={category === cat}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="relative w-full md:w-72">
            <input
              type="text"
              placeholder="Search by room title..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-orange-400"
              aria-label="Search rooms by title"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-orange-400 w-5 h-5 pointer-events-none" />
          </div>
        </div>

        {/* Enhanced Room Count Section */}
        <div className="mb-8 text-center animate-slide-up">
          <h2 className="text-4xl font-bold title-gradient mb-3">
            Available Rooms
            {selectedGender && (
              <span className="text-2xl ml-2">
                for {selectedGender === 'boy' ? 'Boys' : 'Girls'}
              </span>
            )}
          </h2>
          <p className="text-gray-600 text-lg">
            {filteredRooms.length} room{filteredRooms.length !== 1 ? 's' : ''} available for rent
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-400 to-pink-400 mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Enhanced Room Grid */}
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

        {/* Empty State */}
        {filteredRooms.length === 0 && selectedGender && (
          <div className="text-center py-16 animate-fade-scale">
            <div className="w-24 h-24 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center mx-auto mb-6">
              <Home className="w-12 h-12 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              No rooms available for {selectedGender === 'boy' ? 'boys' : 'girls'}
            </h3>
            <p className="text-gray-600 mb-6">
              Be the first to add a room listing for {selectedGender === 'boy' ? 'boys' : 'girls'}!
            </p>
            <Button
              onClick={handleShowAddForm}
              className="btn-primary"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add First Room
            </Button>
          </div>
        )}

        {/* Empty State - No gender selected */}
        {filteredRooms.length === 0 && !selectedGender && (
          <div className="text-center py-16 animate-fade-scale">
            <div className="w-24 h-24 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center mx-auto mb-6">
              <Home className="w-12 h-12 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No rooms available</h3>
            <p className="text-gray-600 mb-6">Be the first to add a room listing!</p>
            <Button
              onClick={handleShowAddForm}
              className="btn-primary"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add First Room
            </Button>
          </div>
        )}

        {/* About Us Section */}
        <section className="my-20 max-w-4xl mx-auto text-center animate-fade-scale">
          <div className="bg-white/90 rounded-2xl shadow-xl p-8 border border-orange-100">
            <h2 className="text-4xl font-extrabold mb-6 text-orange-600 tracking-tight flex items-center justify-center gap-3">
              <span>About Us</span>
              <span role="img" aria-label="team">👥</span>
            </h2>
            <p className="text-gray-700 text-lg mb-10 max-w-2xl mx-auto">We are dedicated to helping students find the perfect room near their college campus. Our platform is designed to be transparent, easy to use, and focused on student needs.</p>
            {/* Team/Creators Section */}
            <div className="flex flex-wrap justify-center gap-10 mb-10">
              <div className="flex flex-col items-center bg-orange-50 rounded-xl p-4 shadow-md w-48">
                <img src="/Ayan Mulla/mulla 0_converted.avif" alt="Ayan Mulla" className="w-24 h-24 rounded-full object-cover border-4 border-orange-200 mb-2 shadow" />
                <div className="font-bold text-gray-900 text-lg">Ayan Mulla</div>
                <div className="text-sm text-gray-600">Developer</div>
              </div>
              <div className="flex flex-col items-center bg-orange-50 rounded-xl p-4 shadow-md w-48">
                <img src="/Dipali Teli/Teli 0_converted.avif" alt="Dipali Teli" className="w-24 h-24 rounded-full object-cover border-4 border-orange-200 mb-2 shadow" />
                <div className="font-bold text-gray-900 text-lg">Dipali Teli</div>
                <div className="text-sm text-gray-600">Developer</div>
              </div>
              <div className="flex flex-col items-center bg-orange-50 rounded-xl p-4 shadow-md w-48">
                <img src="/Sabgita Gavde/S Gavde 0_converted.avif" alt="Sabgita Gavde" className="w-24 h-24 rounded-full object-cover border-4 border-orange-200 mb-2 shadow" />
                <div className="font-bold text-gray-900 text-lg">Sabgita Gavde</div>
                <div className="text-sm text-gray-600">Developer</div>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-8 mt-10">
              <div className="bg-gradient-to-br from-orange-100 to-white rounded-xl p-6 shadow flex flex-col items-center">
                <h3 className="text-2xl font-bold mb-2 text-orange-500 flex items-center gap-2"><span role="img" aria-label="target">🎯</span> Our Mission</h3>
                <p className="text-gray-700">To simplify the room rental process for students and property owners, making it safe, reliable, and accessible for everyone.</p>
              </div>
              <div className="bg-gradient-to-br from-orange-100 to-white rounded-xl p-6 shadow flex flex-col items-center">
                <h3 className="text-2xl font-bold mb-2 text-orange-500 flex items-center gap-2"><span role="img" aria-label="vision">🌟</span> Our Vision</h3>
                <p className="text-gray-700">To become the most trusted and student-friendly room rental platform, empowering students to make informed choices and fostering a supportive community.</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-orange-100 to-orange-200 border-t border-orange-200 py-8 mt-16 text-center text-gray-700 text-base animate-fade-scale shadow-inner">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <p className="font-semibold">&copy; {new Date().getFullYear()} College Room Rental. All rights reserved.</p>
            <p>Contact: <a href="mailto:info@collegeroomrental.com" className="text-orange-600 hover:underline font-medium">info@collegeroomrental.com</a></p>
          </div>
          <div className="flex gap-4 justify-center mt-2 md:mt-0">
            <a href="#" className="hover:text-orange-600 transition">Privacy Policy</a>
            <a href="#" className="hover:text-orange-600 transition">Terms of Service</a>
          </div>
        </div>
      </footer>

      {/* Gender Selection Modal */}
      {showGenderSelection && (
        <GenderSelectionModal onGenderSelect={handleGenderSelect} />
      )}

      {/* Room Detail Modal */}
      {selectedRoom && (
        <RoomDetailModal
          room={selectedRoom}
          onClose={handleCloseModal}
        />
      )}

      {/* Add Room Form Modal */}
      {showAddForm && (
        <AddRoomModal
          onClose={() => setShowAddForm(false)}
          onAddRoom={handleAddRoom}
        />
      )}

      {/* Edit Room Modal (reuse AddRoomModal) */}
      {editRoom && (
        <AddRoomModal
          onClose={() => setEditRoom(null)}
          onAddRoom={handleUpdateRoom}
          initialRoom={editRoom}
          isEdit
        />
      )}

      {/* Admin Login Modal */}
      {showAdminLogin && (
        <AdminLoginModal
          onClose={() => setShowAdminLogin(false)}
          onAdminLogin={handleAdminLogin}
        />
      )}
    </div>
  );
}

export default App;

