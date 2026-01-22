// API
export { fetchLocation, fetchLocationByProduct, fetchLocations } from './api/location';

// Lib
export {
	DEGREES_TO_RADIANS,
	EARTH_RADIUS_METERS,
	MAXIMUM_DISTANCE_FROM_CURRENT_LOCATION_METERS,
	MINIMUM_LOCATION_DISTANCE_METERS,
} from './lib/constants/distance';
export { initialLocation } from './lib/constants/location';
export { getFullLocationAddress, getLocationAddress } from './lib/func/getLocationAddress';
export { getLocationData } from './lib/func/getLocationData';
export {
	calculateDistanceFromLocation,
	validateLocationDistance,
	validateMaxDistanceFromCurrentLocation,
} from './lib/func/validateLocationDistance';

// Model
export { default as useFetchLocation } from './model/query/useFetchLocation';
export { default as useFetchLocations } from './model/query/useFetchLocations';
export { default as useFetchLocationsByProducts } from './model/query/useFetchLocationsByProducts';
export { useIsLocationUpdated, useLocation, useLocationStore, useSetLocation } from './model/store/location';
export type { AbbrLocation } from './model/types/types';

// UI
export { default as LocationMap } from './ui/LocationMap';
export { default as LocationProvider } from './ui/LocationProvider';
