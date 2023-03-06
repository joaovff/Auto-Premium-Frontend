import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
function Demo({ localization }) {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyCwQO_cyBSTSB5d1k3UiqR48lm0RY3i2RM",
  });

  if (!isLoaded) return <div>Loading...</div>;

  function Map() {
    return (
      <GoogleMap
        zoom={10}
        center={{ lat: localization.lat, lng: localization.long }}
        mapContainerClassName="mapContainer"
      >
        <Marker position={{ lat: localization.lat, lng: localization.long }} />
      </GoogleMap>
    );
  }

  return <Map />;
}

export default Demo;
