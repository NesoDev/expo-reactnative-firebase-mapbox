const TOMTOM_API_KEY = "Dqe4W5PK4DrT498CdiuR3yAijlA4wXGe";

export const getTraffic = async (latitude, longitude) => {
    const response = await fetch(`https://api.tomtom.com/traffic/services/4/flowSegmentData/absolute/10/json?key=${TOMTOM_API_KEY}&point=${latitude},${longitude}`);
    console.log(`response: ${JSON.stringify(response)}`)
    const data = await response.json();
    return data;
};

export const getCoordinates = async (address) => {
    const addressFormat = `${address}, Chincha, Ica, Perú`
    const response = await fetch(`https://api.tomtom.com/search/2/geocode/${addressFormat}.json?key=${TOMTOM_API_KEY}`);
    const data = await response.json();
    let sumLatitude = 0
    let sumLongitude = 0
    data.results.forEach(result => {
        sumLatitude += result.position.lat
        sumLongitude += result.position.lon
    })
    return { latitude: String(sumLatitude/data.results.length), longitude: String(sumLongitude/data.results.length) }
};

export const getRoutes = async (start, end) => {
    const response = await fetch(`https://api.tomtom.com/routing/1/calculateRoute/${start.latitude},${start.longitude}:${end.latitude},${end.longitude}/json?key=${TOMTOM_API_KEY}&maxAlternatives=5&traffic=true`);
    const data = await response.json();
    return data.routes;
};

const calculateDataTraffic = async (points) => {
    let freeFlowTravelTimeTotal = 0;
    let currentTravelTimeTotal = 0;
    points.forEach(async (point) => {
        const data = await getTraffic(point.latitude, point.longitude);
        freeFlowTravelTimeTotal += data.flowSegmentData.freeFlowTravelTime;
        currentTravelTimeTotal += data.flowSegmentData.currentTravelTime;
    })
    return { currentTravelTime: currentTravelTimeTotal, freeFlowTravelTime: freeFlowTravelTimeTotal };
};

export const getBestBadRouteTraffic = async (addressStart, addressEnd) => {
    const start = await getCoordinates(addressStart);
    const end = await getCoordinates(addressEnd);
    console.log(`start: ${addressStart}, ${JSON.stringify(start)}`);
    console.log(`end: ${addressEnd}, ${JSON.stringify(end)}`);
    const routes = await getRoutes(start, end);
    console.log(`routes: ${JSON.stringify(routes)}`)
    const dataTraffic = [];

    routes.forEach(async (route) => {
        const points = route.legs[0].points
        //const traffic = await calculateDataTraffic(points)
        const traffic = route.summary.travelTimeInSeconds
        dataTraffic.push({ points: points, traffic: traffic })
    })
    console.log('------------------------------------------------')
    //console.log(`traffic: ${JSON.stringify(dataTraffic)}`)

    //const valuesTraffic = dataTraffic.map(data => data.traffic.currentTravelTime - data.traffic.freeFlowTravelTime);
    const dataTrafficSorted = dataTraffic.sort((a, b) => Math.max(a.traffic, b.traffic))

    const bestRoute = dataTrafficSorted[0]
    const badRoute = dataTrafficSorted.at(-1)
    const result = { 
        start: { latitude: Number(start.latitude), longitude: Number(start.longitude)}, 
        end: { latitude: Number(end.latitude), longitude: Number(end.longitude)}, 
        bestRoute: bestRoute, 
        badRoute: badRoute 
    }

    //console.log(JSON.stringify(bestRoute.traffic))
    //console.log(JSON.stringify(badRoute.traffic))

    return result;
}