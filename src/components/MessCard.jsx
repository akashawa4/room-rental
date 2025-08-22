import React, { memo, useCallback } from 'react';
import { MapPin, Phone, ExternalLink, Utensils } from 'lucide-react';
import { Button } from '@/components/ui/button.jsx';

const MessCard = memo(({ mess, isFirst }) => {
  const handleCallClick = useCallback(() => {
    window.location.href = `tel:${mess.contact}`;
  }, [mess.contact]);

  const handleMapClick = useCallback(() => {
    window.open(mess.mapLink, '_blank');
  }, [mess.mapLink]);

  return (
    <div className="room-card p-6 hover-lift h-full flex flex-col">
      <div className="relative mb-4 overflow-hidden rounded-xl flex-shrink-0">
        <div className="w-full h-48 md:h-56 lg:h-64 bg-gradient-to-br from-green-100 to-green-50 flex items-center justify-center">
          {mess.images && mess.images.length > 0 ? (
            <img
              src={mess.images[0]}
              alt={`${mess.title} - 1`}
              className="h-44 md:h-52 lg:h-60 w-full object-cover rounded-lg border border-green-100 hover:scale-105 transition-transform"
              loading={isFirst ? 'eager' : 'lazy'}
              decoding="sync"
              onError={(e) => {
                e.currentTarget.onerror = null; e.currentTarget.src = '/logo.svg';
              }}
            />
          ) : (
            <div className="text-center w-full">
              <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-2">
                <Utensils className="w-10 h-10 text-white" />
              </div>
              <p className="text-gray-500 text-sm">No image available</p>
            </div>
          )}
        </div>
      </div>

      <div className="space-y-4 flex-1 flex flex-col">
        <div className="flex-shrink-0">
          <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">{mess.title}</h3>
          <div className="text-2xl font-bold text-green-700">
            ₹{mess.pricePerMonth?.toLocaleString()}/month
            {mess.pricePerMeal && (
              <span className="text-base font-semibold text-gray-700 ml-2">(₹{mess.pricePerMeal} per meal)</span>
            )}
          </div>
          {mess.cuisine && mess.cuisine.length > 0 && (
            <div className="mt-1 text-sm text-gray-700">Cuisine: {mess.cuisine.join(', ')}</div>
          )}
          {mess.mealTypes && mess.mealTypes.length > 0 && (
            <div className="text-sm text-gray-700">Meals: {mess.mealTypes.join(', ')}</div>
          )}
          {mess.timings && (
            <div className="text-sm text-gray-700">Timings: {mess.timings}</div>
          )}
        </div>

        <div className="flex items-center gap-2 text-gray-600 flex-shrink-0">
          <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-green-500 rounded-full flex items-center justify-center">
            <MapPin className="w-4 h-4 text-white" />
          </div>
          <span className="font-medium">{mess.location}</span>
        </div>

        <div className="flex items-center gap-2 text-gray-600 flex-shrink-0">
          <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center">
            <Phone className="w-4 h-4 text-white" />
          </div>
          <button onClick={handleCallClick} className="font-medium hover:text-blue-600 transition-colors">
            {mess.contact}
          </button>
        </div>

        <div className="grid grid-cols-2 gap-3 pt-4 flex-shrink-0 mt-auto">
          <Button onClick={handleCallClick} className="contact-btn contact-btn-call flex items-center justify-center gap-2" size="sm">
            <Phone className="w-4 h-4" />
            Call Now
          </Button>
          <Button onClick={handleMapClick} className="contact-btn contact-btn-map flex items-center justify-center gap-2" size="sm">
            <ExternalLink className="w-4 h-4" />
            View on Map
          </Button>
        </div>
      </div>
    </div>
  );
});

export default MessCard;




