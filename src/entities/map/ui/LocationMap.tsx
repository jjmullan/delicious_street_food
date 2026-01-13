import type { AbbrLocation } from '@features/location/types/location';
import type { ReactNode } from 'react';
import { Map } from 'react-kakao-maps-sdk';

function LocationMap({ lat, lng, children }: AbbrLocation & { children: ReactNode }) {
	return (
		<Map
			center={{ lat, lng }}
			level={2}
			className="auto-width aspect-square"
			disableDoubleClick={false}
			disableDoubleClickZoom={false}
		>
			{children}
		</Map>
	);
}

export default LocationMap;
