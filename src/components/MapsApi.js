import { Flex, Spinner } from "@chakra-ui/react";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  Circle,
} from "@react-google-maps/api";

function MapsApi({ localization }) {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyCwQO_cyBSTSB5d1k3UiqR48lm0RY3i2RM",
  });

  if (!isLoaded)
    return (
      <Flex justifyContent="center" alignItems="center">
        <Spinner color="white" />
      </Flex>
    );

  function Map() {
    return (
      <GoogleMap
        zoom={10}
        center={{
          lat: Number(localization.lat),
          lng: Number(localization.long),
        }}
        mapContainerClassName="mapContainer"
        options={{ streetViewControl: false }}
      >
        <Marker
          position={{
            lat: Number(localization.lat),
            lng: Number(localization.long),
          }}
        />
        <Circle
          center={{
            lat: Number(localization.lat),
            lng: Number(localization.long),
          }}
          radius={9000}
          options={{
            strokeColor: "#FF0000",
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: "#FF0000",
            fillOpacity: 0.15,
          }}
        />
      </GoogleMap>
    );
  }

  return <Map />;
}

export default MapsApi;
