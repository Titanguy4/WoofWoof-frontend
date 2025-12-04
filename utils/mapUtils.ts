import { Stay } from "@/types/stayservice/Stay";

export const groupStaysByCoordinates = (stays: Stay[]) => {
  const groups = new Map<string, Stay[]>();

  stays.forEach((stay) => {
    const key = `${stay.localisation[0]},${stay.localisation[1]}`;
    if (!groups.has(key)) {
      groups.set(key, []);
    }
    groups.get(key)!.push(stay);
  });

  return Array.from(groups.entries()).map(([coords, staysAtLocation]) => {
    const [lat, lng] = coords.split(",").map(Number);
    return {
      coordinate: { latitude: lat, longitude: lng },
      stays: staysAtLocation,
    };
  });
};

export const calculateMapRegion = (stays: Stay[]) => {
  const coordinates = stays.map((stay) => ({
    latitude: stay.localisation[0],
    longitude: stay.localisation[1],
  }));

  return {
    latitude:
      coordinates.reduce((sum, coord) => sum + coord.latitude, 0) /
      coordinates.length,
    longitude:
      coordinates.reduce((sum, coord) => sum + coord.longitude, 0) /
      coordinates.length,
    latitudeDelta: 5,
    longitudeDelta: 5,
  };
};

export const getInitialMapRegion = (stays: Stay[]) => {
  return {
    latitude: stays.length > 0 ? stays[0].localisation[0] : 46.5,
    longitude: stays.length > 0 ? stays[0].localisation[1] : 2.2,
    latitudeDelta: 6,
    longitudeDelta: 6,
  };
};
