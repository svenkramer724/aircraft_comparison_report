import cn from "classnames";
import global from "../styles/global.module.scss";
import SectionHeader from "../shared/SectionHeader";
import {
  GoogleMap,
  Circle,
  LoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import { useState } from "react";
import Slider from "@mui/material/Slider";
import TextField from "@mui/material/TextField";

import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import styles from "./styles/styles.module.scss";

const Range = ({ params }) => {
  var rangesDec = [
    params[0].range_decrease_per_passenger,
    params[1].range_decrease_per_passenger,
    params[2] !== undefined ? params[2].range_decrease_per_passenger : 0,
  ];
  var rangesAircrafts = [
    params[0].range_km,
    params[1].range_km,
    params[2] !== undefined ? params[2].range_km : 0,
  ];
  const [maxPax, setMaxPax] = useState([
    params[0].max_pax,
    params[1].max_pax,
    params[2] !== undefined ? params[2].max_pax : 0,
  ]);

  return (
    <section className={cn(global.section)}>
      <SectionHeader title="Range Map" />
      <main className={styles.main_range_map}>
        <Map
          max_pax={maxPax}
          rangesDecrease={rangesDec}
          aicraftsRange={rangesAircrafts}
        />
        {
          <div className={styles.squares}>
            <div className={styles.square0}></div>
            {params[0].aircraft_name}

            {params[2] !== undefined ? (
              <>
                <div className={styles.square1}></div>
                {params[1].aircraft_name}
                <div className={styles.square2}></div>
                {params[2].aircraft_name}
              </>
            ) : (
              <>
                <div className={styles.square1}></div>
                {params[1].aircraft_name}{" "}
              </>
            )}
          </div>
        }
      </main>
    </section>
  );
};

export default Range;

function Map({ rangesDecrease, aicraftsRange, max_pax }) {
  const [latLng, setLatLong] = useState({ lat: 37.772, lng: -80 });
  const [address, setAddress] = useState("");
  const [nbPax, setNbPax] = useState();
  const [NbSlide, setNbSlide] = useState(
    Math.max(max_pax[0], max_pax[1], max_pax[2])
  );
  const [range0, setRange0] = useState(aicraftsRange[0]);
  const [range1, setRange1] = useState(aicraftsRange[1]);
  const [range2, setRange2] = useState(
    aicraftsRange[2] !== undefined ? aicraftsRange[2] : 0
  );
  const [rangeDecrease2, setrangeDecrease2] = useState(
    rangesDecrease[2] !== undefined ? rangesDecrease[2] : 0
  );

  function handleChange(address) {
    setAddress(address);
  }

  function handleSelect(address) {
    geocodeByAddress(address)
      .then((results) => getLatLng(results[0]))
      .then((latLng) => setLatLong(latLng))
      .catch((error) => console.error("Error", error));
  }

  var options0 = {
    strokeColor: "#FF0000",
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: "#FF0000",
    fillOpacity: 0.35,
    clickable: false,
    draggable: false,
    editable: false,
    visible: true,
    radius: range0 * 1000,
    zIndex: 1,
  };

  var options1 = {
    strokeColor: "#0000FF",
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: "#0000FF",
    fillOpacity: 0.35,
    clickable: false,
    draggable: false,
    editable: false,
    visible: true,
    radius: range1 * 1000,
    zIndex: 1,
  };

  var options2 = {
    strokeColor: "#FFFF00",
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: "#FFFF00",
    fillOpacity: 0.35,
    clickable: false,
    draggable: false,
    editable: false,
    visible: true,
    radius: range2 * 1000,
    zIndex: 1,
  };

  const handlePaxChange = (e, newValue) => {
    setNbPax(newValue);
    if (newValue !== "") {
      if (newValue < max_pax[0]) {
        setRange0(
          aicraftsRange[0] -
            parseFloat(newValue) * parseFloat(rangesDecrease[0])
        );
      }
      if (newValue < max_pax[1]) {
        setRange1(
          aicraftsRange[1] -
            parseFloat(newValue) * parseFloat(rangesDecrease[1])
        );
      }

      if (aicraftsRange[2] !== 0) {
        if (newValue < max_pax[2]) {
          setRange2(
            aicraftsRange[2] -
              parseFloat(newValue) * parseFloat(rangesDecrease[2])
          );
        }
      }
    }
  };

  const circleName = "Your Circle Name";
  const [infoOpen, setInfoOpen] = useState(false);

  const handleCircleClick = () => {
    setInfoOpen(!infoOpen);
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
              <div className={styles.map_inputs}>
                <label htmlFor="paxNumber" className={styles.pax_slider}>
                  Pax number
                  <Slider
                    valueLabelDisplay="auto"
                    aria-label="Volume"
                    value={nbPax}
                    max={NbSlide}
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
          <Circle
            center={latLng}
            options={options0}
            onClick={handleCircleClick}
          />
          <Circle center={latLng} options={options1} />
          <Circle center={latLng} options={options2} />
          <Marker position={latLng} />
          {infoOpen && (
            <InfoWindow
              position={latLng}
              onCloseClick={() => setInfoOpen(false)}
            >
              <div>{circleName}</div>
            </InfoWindow>
          )}
        </GoogleMap>
      </LoadScript>
    </div>
  );
}
