import type { AbbrLocation } from '@entities/location/model/location';
import type { ReactNode } from 'react';
import { Map } from 'react-kakao-maps-sdk';

export default function LocationMap({ lat, lng, children }: AbbrLocation & { children: ReactNode }) {
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
