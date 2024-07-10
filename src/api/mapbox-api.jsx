import tt from '@tomtom-international/web-sdk-maps';
import { mapApikey } from '../core/config';

const initializeTomTomMap = (containerId, center, zoom) => {
  return tt.map({
    key: mapApikey,
    container: containerId,
    style: 'tomtom://vector/1/basic-main',
    center: center,
    zoom: zoom,
  });
};

export default initializeTomTomMap;
