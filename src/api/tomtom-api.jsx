const TOMTOM_API_KEY = "W1l3RDqTj13DGHjLcDRzhBwHdvUgFYNd";
const versionNumber = "4";
const style = "absolute";
const zoom = "10";
const format = "json";

export const getTraffic = async (latitude, longitude) => {
    const response = await fetch(`https://api.tomtom.com/traffic/services/${versionNumber}/flowSegmentData/${style}/${zoom}/${format}?key=${TOMTOM_API_KEY}&point=${latitude},${longitude}`);
    const data = await response.json();
    return data;
};

export const getCoordinates = async (address) => {
    const response = await fetch(`https://api.tomtom.com/search/2/geocode/${address}.json?key=${TOMTOM_API_KEY}`);
    const data = await response.json();
    return data.results.map(result => ({
        latitude: result.position.lat,
        longitude: result.position.lon,
    }));
};