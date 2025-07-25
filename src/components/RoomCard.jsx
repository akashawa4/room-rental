import { MapPin, Phone, ExternalLink, Heart, Star, Home } from 'lucide-react';
import { Button } from '@/components/ui/button.jsx';

const RoomCard = ({ room, onViewDetails, isAdmin, onEdit, isFirst }) => {
  const handleCallClick = () => {
    window.location.href = `tel:${room.contact}`;
  };

  const handleMapClick = () => {
    window.open(room.mapLink, '_blank');
  };

  return (
    <div className="room-card p-6 hover-lift">
      {/* Enhanced Image Section */}
      <div className="relative mb-4 overflow-hidden rounded-xl">
        <div className="w-full h-48 bg-gradient-to-br from-orange-100 to-orange-50 flex items-center justify-center">
          <picture>
            <source srcSet={room.images[0]?.replace(/\.(jpg|jpeg|png)$/i, '.avif')} type="image/avif" />
            <source srcSet={room.images[0]?.replace(/\.(jpg|jpeg|png)$/i, '.webp')} type="image/webp" />
            <img
              src={room.images[0]}
              alt={room.title}
              className="w-full h-full object-cover"
              decoding="async"
              {...(isFirst ? {} : { loading: 'lazy' })}
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            />
          </picture>
          <div className="text-center" style={{ display: 'none' }}>
            <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-2">
              <Home className="w-8 h-8 text-white" />
            </div>
            <p className="text-gray-500 text-sm">No image available</p>
          </div>
        </div>
        
        {/* Favorite Button */}
        <button aria-label="Add to favorites" className="absolute top-3 right-3 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-all">
          <Heart className="w-4 h-4 text-gray-600 hover:text-red-500" />
        </button>
        
      </div>

      {/* Enhanced Content Section */}
      <div className="space-y-4">
        {/* Title and Price */}
        <div>
          <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
            {room.title}
          </h3>
          <div className="price-highlight text-2xl font-bold">
            ₹{room.rent.toLocaleString()}/month <span className="text-base font-semibold">per student</span>
          </div>
          {room.note && (
            <div className="text-base font-bold text-gray-700 mt-1">
              {room.note}
            </div>
          )}
        </div>

        {/* Location */}
        <div className="flex items-center gap-2 text-gray-600">
          <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-orange-500 rounded-full flex items-center justify-center">
            <MapPin className="w-4 h-4 text-white" />
          </div>
          <span className="font-medium">{room.location}</span>
        </div>

        {/* Contact */}
        <div className="flex items-center gap-2 text-gray-600">
          <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center">
            <Phone className="w-4 h-4 text-white" />
          </div>
          <button
            onClick={handleCallClick}
            className="font-medium hover:text-blue-600 transition-colors"
            aria-label="Call contact number"
          >
            {room.contact}
          </button>
        </div>

        {/* Enhanced Action Buttons */}
        <div className="grid grid-cols-2 gap-3 pt-4">
          <Button
            onClick={handleCallClick}
            className="contact-btn contact-btn-call flex items-center justify-center gap-2"
            size="sm"
          >
            <Phone className="w-4 h-4" />
            Call
          </Button>
          <Button
            onClick={handleMapClick}
            className="contact-btn contact-btn-map flex items-center justify-center gap-2"
            size="sm"
          >
            <ExternalLink className="w-4 h-4" />
            Map
          </Button>
        </div>

        {/* Details Button */}
        <Button
          onClick={() => onViewDetails(room)}
          className="contact-btn contact-btn-details w-full flex items-center justify-center gap-2 mt-3"
        >
          View Details
        </Button>

        {/* Edit Button for Admins */}
        {isAdmin && (
          <Button
            onClick={() => onEdit(room)}
            className="btn-secondary w-full flex items-center justify-center gap-2 mt-2"
            size="sm"
          >
            Edit
          </Button>
        )}
      </div>
    </div>
  );
};

export default RoomCard;

