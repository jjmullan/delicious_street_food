// API
export { fetchLocation, fetchLocationByProduct, fetchLocations } from './api/location';

// Lib
export {
	DEGREES_TO_RADIANS,
	EARTH_RADIUS_METERS,
	MAXIMUM_DISTANCE_FROM_CURRENT_LOCATION_METERS,
	MINIMUM_LOCATION_DISTANCE_METERS,
} from './lib/distance';
export { getFullLocationAddress, getLocationAddress } from './lib/getLocationAddress';
export { getLocationData } from './lib/getLocationData';
export { initialLocation } from './lib/location';
export {
	calculateDistanceFromLocation,
	validateLocationDistance,
	validateMaxDistanceFromCurrentLocation,
} from './lib/validateLocationDistance';

// Model
export { useIsLocationUpdated, useLocation, useLocationStore, useSetLocation } from './model/location';
export type { AbbrLocation } from './model/types';
export { default as useFetchLocation } from './model/useFetchLocation';
export { default as useFetchLocations } from './model/useFetchLocations';
export { default as useFetchLocationsByProducts } from './model/useFetchLocationsByProducts';

// UI
export { default as LocationMap } from './ui/LocationMap';
export { default as LocationProvider } from './ui/LocationProvider';
