import cn from "classnames";
import global from "../styles/global.module.scss";
import SectionHeader from "../shared/SectionHeader";
import { GoogleMap, Circle, LoadScript, Marker } from "@react-google-maps/api";
import { useEffect, useState } from "react";
import Slider from "@mui/material/Slider";
import TextField from "@mui/material/TextField";

import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import styles from "./styles/styles.module.scss";

const RangeMap = ({ params }) => {
  const rangeDec = params.range_decrease_per_passenger;
  const rangesAircraft = params.range_km;
  const maxPax = params.max_pax;

  return (
    <section className={cn(global.section, global.page_break)}>
      <SectionHeader title="Range Map" />
      <main className={styles.main_range_map}>
        <Map
          max_pax={maxPax}
          rangeDecrease={rangeDec}
          aicraftRange={rangesAircraft}
        />
      </main>
    </section>
  );
};

export default RangeMap;

function Map({ rangeDecrease, aicraftRange, max_pax }) {
  const [latLng, setLatLong] = useState({ lat: 37.772, lng: -80 });
  const [address, setAddress] = useState("");
  const [nbPax, setNbPax] = useState(1);
  const [range, setRange] = useState(0);

  useEffect(() => {
    setRange(aicraftRange);
  }, []);

  function handleChange(address) {
    setAddress(address);
  }

  function handleSelect(address) {
    geocodeByAddress(address)
      .then((results) => getLatLng(results[0]))
      .then((latLng) => setLatLong(latLng))
      .catch((error) => console.error("Error", error));
  }

  var options = {
    strokeColor: "#FF0000",
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: "#FF0000",
    fillOpacity: 0.35,
    clickable: false,
    draggable: false,
    editable: false,
    visible: true,
    radius: range === undefined ? aicraftRange * 1000 : range * 1000,
    zIndex: 1,
  };

  const handlePaxChange = (e, newValue) => {
    setNbPax(newValue);
    if (newValue !== "") {
      setRange(aicraftRange - parseFloat(newValue) * parseFloat(rangeDecrease));
    }
  };

  return (
    <div>
      <LoadScript
        id="script-loader"
        googleMapsApiKey="AIzaSyB7zRbK_udn4vYNr4neiaPd71SuyldNIg4"
        libraries={["places"]}
      >
        <PlacesAutocomplete
          value={address}
          onChange={handleChange}
          onSelect={handleSelect}
        >
          {({
            getInputProps,
            suggestions,
            getSuggestionItemProps,
            loading,
          }) => (
            <div className={styles.range_configs}>
              <div className={cn(styles.map_inputs, global.pdf_hidden)}>
                <label htmlFor="paxNumber" className={styles.pax_slider}>
                  Pax number
                  <Slider
                    valueLabelDisplay="auto"
                    aria-label="Volume"
                    value={nbPax}
                    max={max_pax}
                    onChange={handlePaxChange}
                  />
                </label>
                
                <label htmlFor="startLocation">
                  <TextField
                    {...getInputProps({
                      placeholder: "Start location",
                      className: "location-search-input",
                    })}
                    id="startLocation"
                    label="Start Location"
                    variant="standard"
                  />
                </label>
              </div>
              <div className="autocomplete-dropdown-container">
                {loading && <div>Loading...</div>}
                {suggestions.map((suggestion) => {
                  const className = suggestion.active
                    ? "suggestion-item--active"
                    : "suggestion-item";
                  // inline style for demonstration purpose
                  const style = suggestion.active
                    ? { backgroundColor: "#fafafa", cursor: "pointer" }
                    : { backgroundColor: "#ffffff", cursor: "pointer" };
                  return (
                    <div
                      {...getSuggestionItemProps(suggestion, {
                        className,
                        style,
                      })}
                    >
                      <span>{suggestion.description}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </PlacesAutocomplete>
        <GoogleMap
          zoom={2}
          center={latLng}
          options={{
            streetViewControl: false,
            fullscreenControl: false,
            mapTypeControl: false,
          }}
          mapContainerClassName="map-container"
          mapContainerStyle={{ height: 700 + "px" }}
        >
          <Circle center={latLng} options={options} />
          <Marker position={latLng} />
        </GoogleMap>
      </LoadScript>
    </div>
  );
}
