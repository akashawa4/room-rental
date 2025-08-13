import { useState, useEffect } from 'react';
import { X, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button.jsx';
import { Checkbox } from '@/components/ui/checkbox.jsx';
import { useLanguage } from '../contexts/LanguageContext.jsx';

const FeatureFilterModal = ({ isOpen, onClose, onApplyFilters, currentFilters = {} }) => {
  const { t } = useLanguage();
  const [selectedFeatures, setSelectedFeatures] = useState(currentFilters);

  // Common features found in rooms
  const availableFeatures = [
    { key: 'BEDS', label: 'Beds' },
    { key: 'WIFI', label: 'WiFi' },
    { key: 'WATER SUPPLY', label: 'Water Supply' },
    { key: 'PARKING', label: 'Parking' },
    { key: 'HOT WATER', label: 'Hot Water' },
    { key: 'TERRACE ACCESS', label: 'Terrace Access' },
    { key: 'NEAR BY MESS', label: 'Near by Mess' },
    { key: 'SELF COOKING ALLOW', label: 'Self Cooking Allowed' },
    { key: 'CHARGING BULB FOR ELECTRICITY ISSUE', label: 'Charging Bulb' },
    { key: 'GAS GEYSER', label: 'Gas Geyser' },
    { key: 'GEYSER', label: 'Geyser' },
    { key: 'CCTV CAMERA', label: 'CCTV Camera' },
    { key: 'SECURITY', label: 'Security' },
    { key: 'STUDY TABLE FOR STUDENTS', label: 'Study Table' },
    { key: 'shoes stand', label: 'Shoes Stand' },
    { key: 'Parents allowed for stay', label: 'Parents Allowed' },
    { key: 'Parets allowed for stay', label: 'Parents Allowed' },
    { key: 'New Room', label: 'New Room' },
    { key: 'New Rooms', label: 'New Rooms' },
    { key: 'Group Studies Allowed', label: 'Group Studies Allowed' },
    { key: 'Mattress', label: 'Mattress' },
    { key: 'Basic furniture', label: 'Basic Furniture' },
    { key: 'Cubert', label: 'Cubert' },
    { key: 'CUBERT', label: 'Cubert' },
    { key: 'LADY DOCTOR SUPPORT', label: 'Lady Doctor Support' },
    { key: 'Solar Panel', label: 'Solar Panel' },
    { key: 'Cloth Drying Area', label: 'Cloth Drying Area' },
    { key: 'cloth Drying Space', label: 'Cloth Drying Space' },
    { key: 'Water Jar Provided for Drinking Water', label: 'Water Jar Provided' },
    { key: 'Market Accessible', label: 'Market Accessible' },
    { key: 'Owner Have Mess', label: 'Owner Have Mess' },
    { key: 'OWNER HAVE MESS', label: 'Owner Have Mess' },
    { key: 'Owner\'s Mess', label: 'Owner\'s Mess' },
    { key: 'FOR LIGHT BILL SEPARATE METER', label: 'Separate Light Meter' },
    { key: 'AQUA FILTRE', label: 'Aqua Filter' },
    { key: 'Electric Induction for Cooking', label: 'Electric Induction' },
    { key: 'dedicated space for washing cloth', label: 'Dedicated Washing Space' },
    { key: 'Stairs with Auto Light Sensor', label: 'Auto Light Sensor' },
    { key: '3 Floor building', label: '3 Floor Building' },
    { key: '3 Floor buliding', label: '3 Floor Building' },
    { key: 'MESS IN NEIGHBOUR HOUSE', label: 'Mess in Neighbour House' },
    { key: 'CHAIRS FOR STUDENTS', label: 'Chairs for Students' },
    { key: '3 CHAIRS FOR STUDENTS', label: '3 Chairs for Students' },
    { key: 'Dressing Table', label: 'Dressing Table' },
    { key: 'Garbage Management by owner', label: 'Garbage Management' },
    { key: 'Garbage Management by students', label: 'Garbage Management by Students' },
    { key: 'No drinking and smoking allowed in room', label: 'No Drinking/Smoking' },
    { key: 'Good Behaviour is required', label: 'Good Behaviour Required' },
    { key: 'Group Studies are not allowed', label: 'Group Studies Not Allowed' },
    { key: 'If some damage happen in room by Student then they have to pay for that', label: 'Damage Payment by Student' },
    { key: 'If there are three student in room then the electricity and water bill will be paid by students', label: 'Electricity/Water Bill by Students' },
    { key: 'Only Laptop and Mobile Charging is allowed', label: 'Only Laptop/Mobile Charging' },
    { key: 'Hairdryer and other electronics is not allowed', label: 'No Hairdryer/Electronics' },
  ];

  useEffect(() => {
    setSelectedFeatures(currentFilters);
  }, [currentFilters]);

  const handleFeatureToggle = (featureKey) => {
    setSelectedFeatures(prev => ({
      ...prev,
      [featureKey]: !prev[featureKey]
    }));
  };

  const handleApplyFilters = () => {
    onApplyFilters(selectedFeatures);
    onClose();
  };

  const handleClearAll = () => {
    setSelectedFeatures({});
  };

  const handleSelectAll = () => {
    const allFeatures = {};
    availableFeatures.forEach(feature => {
      allFeatures[feature.key] = true;
    });
    setSelectedFeatures(allFeatures);
  };

  const selectedCount = Object.values(selectedFeatures).filter(Boolean).length;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-orange-500" />
            <h2 className="text-lg font-semibold text-gray-900">
              {t('filterByFeatures') || 'Filter by Features'}
            </h2>
            {selectedCount > 0 && (
              <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded-full">
                {selectedCount}
              </span>
            )}
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="h-8 w-8 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Content */}
        <div className="p-4 overflow-y-auto max-h-[60vh]">
          <div className="space-y-4">
            {/* Action buttons */}
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleSelectAll}
                className="text-xs"
              >
                {t('selectAll') || 'Select All'}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleClearAll}
                className="text-xs"
              >
                {t('clearAll') || 'Clear All'}
              </Button>
            </div>

            {/* Features list */}
            <div className="space-y-2">
              {availableFeatures.map((feature) => (
                <div key={feature.key} className="flex items-center space-x-3">
                  <Checkbox
                    id={feature.key}
                    checked={selectedFeatures[feature.key] || false}
                    onCheckedChange={() => handleFeatureToggle(feature.key)}
                  />
                  <label
                    htmlFor={feature.key}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer flex-1"
                  >
                    {feature.label}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex gap-2 p-4 border-t bg-gray-50">
          <Button
            variant="outline"
            onClick={onClose}
            className="flex-1"
          >
            {t('cancel') || 'Cancel'}
          </Button>
          <Button
            onClick={handleApplyFilters}
            className="flex-1 bg-orange-500 hover:bg-orange-600"
          >
            {t('applyFilters') || 'Apply Filters'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FeatureFilterModal;
