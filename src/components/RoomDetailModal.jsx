import { useState } from 'react';
import { 
  X, 
  Phone, 
  MessageCircle, 
  MapPin, 
  ExternalLink, 
  Share2, 
  ChevronLeft, 
  ChevronRight,
  Check,
  Copy,
  Heart,
  Star,
  Home,
  Wifi,
  Car,
  Shield,
  Zap
} from 'lucide-react';
import { Button } from '@/components/ui/button.jsx';

const RoomDetailModal = ({ room, onClose }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [shareMessage, setShareMessage] = useState('');
  const [isFavorite, setIsFavorite] = useState(false);

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? room.images.length - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === room.images.length - 1 ? 0 : prev + 1
    );
  };

  const handleCall = () => {
    window.location.href = `tel:${room.contact}`;
  };

  const handleWhatsApp = () => {
    const message = encodeURIComponent(
      `Hi! I'm interested in the room: ${room.title} (₹${room.rent}/month). Can you provide more details?`
    );
    window.open(`https://wa.me/${room.contact.replace(/[^0-9]/g, '')}?text=${message}`, '_blank');
  };

  const handleViewOnMap = () => {
    window.open(room.mapLink, '_blank');
  };

  const handleShare = async () => {
    const shareData = {
      title: room.title,
      text: `Check out this room: ${room.title} - ₹${room.rent}/month`,
      url: window.location.href
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        setShareMessage('Shared successfully!');
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      // Fallback to clipboard
      const shareText = `${shareData.title}\n${shareData.text}\n${shareData.url}`;
      navigator.clipboard.writeText(shareText).then(() => {
        setShareMessage('Link copied to clipboard!');
      });
    }

    setTimeout(() => setShareMessage(''), 3000);
  };

  const getMapEmbedUrl = () => {
    const encodedAddress = encodeURIComponent(room.address);
    return `https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=${encodedAddress}`;
  };

  const getAmenityIcon = (amenity) => {
    const lower = amenity.toLowerCase();
    if (lower.includes('wifi')) return <Wifi className="w-4 h-4" />;
    if (lower.includes('parking')) return <Car className="w-4 h-4" />;
    if (lower.includes('security')) return <Shield className="w-4 h-4" />;
    if (lower.includes('furnished')) return <Home className="w-4 h-4" />;
    return <Zap className="w-4 h-4" />;
  };

  return (
    <div className="modal-backdrop fixed inset-0 flex items-center justify-center p-4 z-50">
      <div className="modal-content max-w-4xl w-full max-h-[90vh] overflow-y-auto animate-fade-scale">
        {/* Enhanced Header */}
        <div className="sticky top-0 bg-white border-b p-6 flex justify-between items-center z-10">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h2 className="text-2xl font-bold title-gradient">{room.title}</h2>
              <button
                onClick={() => setIsFavorite(!isFavorite)}
                className={`p-2 rounded-full transition-all ${
                  isFavorite 
                    ? 'bg-red-100 text-red-500' 
                    : 'bg-gray-100 text-gray-400 hover:bg-red-50 hover:text-red-500'
                }`}
              >
                <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
              </button>
            </div>
            <div className="flex items-center gap-4">
              <p className="text-gray-600 flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                {room.location}
              </p>
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-yellow-500 fill-current" />
                <span className="text-sm font-semibold text-gray-700">4.8</span>
                <span className="text-sm text-gray-500">(24 reviews)</span>
              </div>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={onClose}
            className="hover:bg-red-50 hover:border-red-200 hover:text-red-600"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>

        {/* Enhanced Content */}
        <div className="p-6 space-y-8">
          {/* Enhanced Image Carousel */}
          <div className="relative">
            <div className="relative h-80 bg-gradient-to-br from-orange-100 to-orange-50 rounded-2xl overflow-hidden">
              {room.images && room.images.length > 0 ? (
                <>
                  <img
                    src={room.images[currentImageIndex]}
                    alt={`${room.title} - Image ${currentImageIndex + 1}`}
                    className="w-full h-full object-cover"
                  />
                  {room.images.length > 1 && (
                    <>
                      <button
                        onClick={handlePrevImage}
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-all"
                      >
                        <ChevronLeft className="w-5 h-5 text-gray-700" />
                      </button>
                      <button
                        onClick={handleNextImage}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-all"
                      >
                        <ChevronRight className="w-5 h-5 text-gray-700" />
                      </button>
                      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                        {room.images.map((_, index) => (
                          <button
                            key={index}
                            onClick={() => setCurrentImageIndex(index)}
                            className={`w-2 h-2 rounded-full transition-all ${
                              index === currentImageIndex 
                                ? 'bg-white w-6' 
                                : 'bg-white/60 hover:bg-white/80'
                            }`}
                          />
                        ))}
                      </div>
                    </>
                  )}
                </>
              ) : (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center">
                    <div className="w-20 h-20 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Home className="w-10 h-10 text-white" />
                    </div>
                    <p className="text-gray-500">No images available</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Enhanced Price and Contact Section */}
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <div className="price-highlight text-4xl font-bold mb-4">
                ₹{room.rent.toLocaleString()}/month
              </div>
              <p className="text-gray-600 mb-6 leading-relaxed">
                {room.description}
              </p>
              
              {/* Enhanced Amenities */}
              {room.amenities && room.amenities.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Amenities</h3>
                  <div className="flex flex-wrap gap-2">
                    {room.amenities.map((amenity, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-orange-50 to-orange-100 border border-orange-200 rounded-full text-sm font-medium text-gray-700"
                      >
                        {getAmenityIcon(amenity)}
                        {amenity}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-4">
              {/* Enhanced Contact Buttons */}
              <div className="grid grid-cols-2 gap-3">
                <Button
                  onClick={handleCall}
                  className="contact-btn contact-btn-call flex items-center justify-center gap-2 py-3"
                >
                  <Phone className="w-5 h-5" />
                  Call Now
                </Button>
                <Button
                  onClick={handleWhatsApp}
                  className="contact-btn contact-btn-success flex items-center justify-center gap-2 py-3"
                  style={{ background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)' }}
                >
                  <MessageCircle className="w-5 h-5" />
                  WhatsApp
                </Button>
              </div>

              <Button
                onClick={handleViewOnMap}
                className="contact-btn contact-btn-map w-full flex items-center justify-center gap-2 py-3"
              >
                <ExternalLink className="w-5 h-5" />
                View on Google Maps
              </Button>

              <Button
                onClick={handleShare}
                variant="outline"
                className="w-full flex items-center justify-center gap-2 py-3 hover:bg-orange-50 hover:border-orange-200"
              >
                <Share2 className="w-5 h-5" />
                Share Room
              </Button>

              {shareMessage && (
                <div className="flex items-center gap-2 text-green-600 text-sm bg-green-50 p-3 rounded-lg">
                  <Check className="w-4 h-4" />
                  {shareMessage}
                </div>
              )}
            </div>
          </div>

          {/* Enhanced Address Section */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Location</h3>
            <div className="bg-gradient-to-r from-orange-50 to-orange-100 p-4 rounded-xl border border-orange-200">
              <p className="text-gray-700 mb-2">{room.address}</p>
              <div className="text-sm text-gray-600">
                <MapPin className="w-4 h-4 inline mr-1" />
                {room.location}
              </div>
            </div>
          </div>

          {/* Enhanced Google Maps Embed */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Map View</h3>
            <div className="relative h-64 bg-gray-100 rounded-xl overflow-hidden">
              <iframe
                src={getMapEmbedUrl()}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="rounded-xl"
                title="Room Location"
              />
              <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
                <p className="text-gray-500">Map will load with valid Google Maps API key</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomDetailModal;

