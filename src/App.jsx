import { useState } from 'react';
import { Home, Plus, Shield, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button.jsx';
import RoomCard from './components/RoomCard.jsx';
import RoomDetailModal from './components/RoomDetailModal.jsx';
import AddRoomModal from './components/AddRoomModal.jsx';
import AdminLoginModal from './components/AdminLoginModal.jsx';
import { sampleRooms } from './data/rooms.js';
import './App.css';

function App() {
  const [rooms, setRooms] = useState(sampleRooms);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [editRoom, setEditRoom] = useState(null); // NEW: track room being edited

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

  // NEW: handle edit button click
  const handleEditRoom = (room) => {
    setEditRoom(room);
  };

  // NEW: handle edit form submit
  const handleUpdateRoom = (updatedRoom) => {
    setRooms(prev => prev.map(r => r.id === updatedRoom.id ? updatedRoom : r));
    setEditRoom(null);
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
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
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
        {/* Enhanced Room Count Section */}
        <div className="mb-8 text-center animate-slide-up">
          <h2 className="text-4xl font-bold title-gradient mb-3">
            Available Rooms
          </h2>
          <p className="text-gray-600 text-lg">
            {rooms.length} room{rooms.length !== 1 ? 's' : ''} available for rent
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-400 to-pink-400 mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Enhanced Room Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {rooms.map((room, index) => (
            <div 
              key={room.id} 
              className="animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <RoomCard
                room={room}
                onViewDetails={handleViewDetails}
                isAdmin={isAdmin} // NEW
                onEdit={handleEditRoom} // NEW
              />
            </div>
          ))}
        </div>

        {/* Empty State */}
        {rooms.length === 0 && (
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
      </main>

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
          initialRoom={editRoom} // NEW PROP
          isEdit // NEW PROP
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

