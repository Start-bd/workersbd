import dynamic from 'next/dynamic';

// Placeholder Map component - can be enhanced with Leaflet or other mapping libraries
export default function Map({ locations = [], zoom = 7, center = [23.6850, 90.3563] }) {
  return (
    <div className="w-full h-full min-h-96 bg-gray-200 rounded-lg flex items-center justify-center">
      <div className="text-center">
        <p className="text-gray-600 text-lg">Interactive Map</p>
        <p className="text-gray-500 text-sm mt-2">{locations.length} locations available</p>
      </div>
    </div>
  );
}
