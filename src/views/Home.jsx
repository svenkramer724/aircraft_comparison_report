import React, { useState, useEffect, CSSProperties } from "react";
import cn from "classnames";
import { HiOutlineSearch } from "react-icons/hi";
import BounceLoader from "react-spinners/BounceLoader";

import useDebounce from "../utils/hooks/useDebounce";
import { searchService } from "../utils/hooks/utils";
import Card from "../components/common/Card";
import Dropdown from "../components/common/Dropdown";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import {
  CATEGORY_OPTIONS,
  MANUFACTURER_OPTIONS,
  PRODUCTION_OPTIONS,
  CATEGORY_OPTIONS_DIC,
  MANUFACTURER_OPTIONS_DIC,
  PRODUCTION_OPTIONS_DIC,
  CURRENCY_OPTIONS,
  COUNTRY_OPTIONS,
  UNIT_OPTIONS,
} from "../utils/constants/app-constants";
import aircraftService from "../services/aircraft-service";
import axios from "axios";
import { MdOutlineExpandMore } from "react-icons/md";
import styles from "../styles/Search.module.scss";
import { Slider } from "@mui/material";

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";

function valuetext(value) {
  return `${value}°C`;
}

const minDistance = 2;

export default function Search() {
  const [currency, setCurrency] = useState(CURRENCY_OPTIONS[0]);
  const [country, setCountry] = useState(COUNTRY_OPTIONS[0]);
  const [unit, setUnit] = useState(UNIT_OPTIONS[0]);
  const [passengerExpanded, setPassengerExpanded] = useState(false);
  const [rangeExpanded, setRangeExpanded] = useState(false);
  const [cruiseExpanded, setCruiseExpanded] = useState(false);
  const [altitudeExpanded, setAltitudeExpanded] = useState(false);
  const [fuelBurnExpanded, setfuelBurnExpanded] = useState(false);
  const [baggageExpanded, setbaggageExpanded] = useState(false);
  const [takeOffExpanded, settakeOffExpanded] = useState(false);
  const [landingDistanceExpanded, setLandingDistanceExpanded] = useState(false);
  const [hourlyPriceExpanded, setHourlyPriceExpanded] = useState(false);
  const [annualPriceExpanded, setannualPriceExpanded] = useState(false);
  const [purchasePriceAccordion, setPurchasePriceAccordion] = useState(false);
  const [preOwnedExpanded, setpreOwnedExpanded] = useState(false);
  const [maxPax, setMaxPax] = useState([null, null]);
  const [range, setRange] = useState([null, null]);
  const [cruiseSpeed, setcruiseSpeed] = useState([null, null]);
  const [maxAltitude, setmaxAltitude] = useState([null, null]);
  const [fuelBurn, setfuelBurn] = useState([null, null]);
  const [baggageCapacity, setbaggageCapacity] = useState([null, null]);
  const [takeOffDistance, settakeOffDistance] = useState([null, null]);
  const [landingDistance, setlandingDistance] = useState([null, null]);
  const [annualFixedCost, setannualFixedCost] = useState([null, null]);
  const [hourlyprice, sethourlyprice] = useState([null, null]);
  const [purchaseprice, setpurchaseprice] = useState([null, null]);
  const [preowned, setpreowned] = useState([null, null]);
  const [max_pax, setmax_pax] = useState(0);
  const [high_cruise_knots, sethigh_cruise_knots] = useState(0);
  const [max_altitude_feet, setmax_altitude_feet] = useState(0);
  const [rangeNM, setMaxRangeNM] = useState(0);
  const [hourly_fuel_burn_GPH, sethourly_fuel_burn_GPH] = useState(0);
  const [baggage_capacity_CF, setbaggage_capacity_CF] = useState(0);
  const [TO_distance_feet, setTO_distance_feet] = useState(0);
  const [landing_distance_feet, setlanding_distance_feet] = useState(0);
  const [annual_cost, setannual_cost] = useState(0);
  const [estimated_hourly_charter, setestimated_hourly_charter] = useState(0);
  const [new_purchase, setnew_purchase] = useState(0);
  const [average_pre_owned, setaverage_pre_owned] = useState(0);

  const onCurrencyChanged = (val) => {
    setCurrency(val);
  };

  const onUnitChanged = (val) => {
    setUnit(val);
  };

  const onCountryChanged = (val) => {
    setCountry(val);
  };

  const handlePassengerAccordion = () => {
    setPassengerExpanded(!passengerExpanded);
  };
  const handleRangeAccordion = () => {
    setRangeExpanded(!rangeExpanded);
  };
  const handleCruiseAccordion = () => {
    setCruiseExpanded(!cruiseExpanded);
  };
  const handleAltitudeAccordion = () => {
    setAltitudeExpanded(!altitudeExpanded);
  };
  const handleFuelAccordion = () => {
    setfuelBurnExpanded(!fuelBurnExpanded);
  };
  const handleBaggageAccordion = () => {
    setbaggageExpanded(!baggageExpanded);
  };
  const handleTakeOffAccordion = () => {
    settakeOffExpanded(!takeOffExpanded);
  };
  const handleLandingAccordion = () => {
    setLandingDistanceExpanded(!landingDistanceExpanded);
  };
  const handleAnnualPriceAccordion = () => {
    setannualPriceExpanded(!annualPriceExpanded);
  };

  const handleHourlyPriceAccordion = () => {
    setHourlyPriceExpanded(!hourlyPriceExpanded);
  };

  const handlePurchaseAccordion = () => {
    setPurchasePriceAccordion(!purchasePriceAccordion);
  };

  const handlePreOwnedAccordion = () => {
    setpreOwnedExpanded(!preOwnedExpanded);
  };

  const [search, setSearch] = useState({
    aircraft_name: "",
    category: "",
    in_production: "",
    aircraft_manufacturer: "",
    max_pax: 120,
    max_pax_min: 0,
    range_NM_min: 0,
    range_NM: 8000,
    high_cruise_knots_min: 0,
    high_cruise_knots: 12312,
    max_altitude_feet_min: 0,
    max_altitude_feet: 60000,
    hourly_fuel_burn_GPH_min: 0,
    hourly_fuel_burn_GPH: 50000,
    baggage_capacity_CF_min: 0,
    baggage_capacity_CF: 10000,
    TO_distance_feet_min: 0,
    TO_distance_feet: 10000,
    landing_distance_feet_min: 0,
    landing_distance_feet: 10000,
    annual_cost_min: 0,
    annual_cost: 9000000,
    estimated_hourly_charter_min: 0,
    estimated_hourly_charter: 1000000,
    new_purchase_min: 0,
    new_purchase: 100000000,
    average_pre_owned_min: 0,
    average_pre_owned: 100000000,
  });
  const debouncedSearchTerm = useDebounce(search, 500);

  const [aircraftsData, setAircraftsData] = useState([]);
  const [filterResult, setFilterResult] = useState([]);

  useEffect(() => {
    aircraftService.getAircrafts().then((data) => {
      const range_NM = data.reduce((max, aircraft) => {
        return aircraft.range_NM > max ? aircraft.range_NM : max;
      }, 0);
      const max_pax = data.reduce((max, aircraft) => {
        return aircraft.max_pax > max ? aircraft.max_pax : max;
      }, 0);
      const high_cruise_knots = data.reduce((max, aircraft) => {
        return aircraft.high_cruise_knots > max
          ? aircraft.high_cruise_knots
          : max;
      }, 0);
      const max_altitude_feet = data.reduce((max, aircraft) => {
        return aircraft.max_altitude_feet > max
          ? aircraft.max_altitude_feet
          : max;
      }, 0);
      const hourly_fuel_burn_GPH = data.reduce((max, aircraft) => {
        return aircraft.hourly_fuel_burn_GPH > max
          ? aircraft.hourly_fuel_burn_GPH
          : max;
      }, 0);
      const baggage_capacity_CF = data.reduce((max, aircraft) => {
        return aircraft.baggage_capacity_CF > max
          ? aircraft.baggage_capacity_CF
          : max;
      }, 0);
      const TO_distance_feet = data.reduce((max, aircraft) => {
        return aircraft.TO_distance_feet > max
          ? aircraft.TO_distance_feet
          : max;
      }, 0);
      const landing_distance_feet = data.reduce((max, aircraft) => {
        return aircraft.landing_distance_feet > max
          ? aircraft.landing_distance_feet
          : max;
      }, 0);
      const annual_cost = data.reduce((max, aircraft) => {
        return aircraft.annual_cost > max ? aircraft.annual_cost : max;
      }, 0);
      const estimated_hourly_charter = data.reduce((max, aircraft) => {
        return aircraft.estimated_hourly_charter > max
          ? aircraft.estimated_hourly_charter
          : max;
      }, 0);
      const new_purchase = data.reduce((max, aircraft) => {
        return aircraft.new_purchase > max ? aircraft.new_purchase : max;
      }, 0);

      const average_pre_owned = data.reduce((max, aircraft) => {
        return aircraft.average_pre_owned > max
          ? aircraft.average_pre_owned
          : max;
      }, 0);
      setMaxRangeNM(range_NM);
      setmax_pax(max_pax);
      sethigh_cruise_knots(high_cruise_knots);
      setmax_altitude_feet(max_altitude_feet);
      sethourly_fuel_burn_GPH(hourly_fuel_burn_GPH);
      setbaggage_capacity_CF(baggage_capacity_CF);
      setTO_distance_feet(TO_distance_feet);
      setlanding_distance_feet(landing_distance_feet);
      setannual_cost(annual_cost);
      setestimated_hourly_charter(estimated_hourly_charter);
      setnew_purchase(new_purchase);
      setaverage_pre_owned(average_pre_owned);
    });
  }, []);

  useEffect(() => {
    aircraftService.getAircrafts().then((data) => setAircraftsData(data));
  }, []);

  useEffect(() => {
    searchAircraft();
  }, [search]);

  const handleRangeChanged = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return;
    }
    if (activeThumb === 0) {
      setRange([Math.min(newValue[0], range[1] - minDistance), range[1]]);
    } else {
      setRange([range[0], Math.max(newValue[1], range[0] + minDistance)]);
    }
    handleSearchChanged("range_NM", newValue[1]);
    handleSearchChanged("range_NM_min", newValue[0]);
  };

  const handlePaxChanged = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return;
    }
    if (activeThumb === 0) {
      setMaxPax([Math.min(newValue[0], maxPax[1] - minDistance), maxPax[1]]);
    } else {
      setMaxPax([maxPax[0], Math.max(newValue[1], maxPax[0] + minDistance)]);
    }
    handleSearchChanged("max_pax", newValue[1]);
    handleSearchChanged("max_pax_min", newValue[0]);
  };

  const handleCruiseChanged = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return;
    }
    if (activeThumb === 0) {
      setcruiseSpeed([
        Math.min(newValue[0], cruiseSpeed[1] - minDistance),
        cruiseSpeed[1],
      ]);
    } else {
      setcruiseSpeed([
        cruiseSpeed[0],
        Math.max(newValue[1], cruiseSpeed[0] + minDistance),
      ]);
    }
    handleSearchChanged("high_cruise_knots", newValue[1]);
    handleSearchChanged("high_cruise_knots_min", newValue[0]);
  };

  const handleMaxAltitudeChanged = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return;
    }
    if (activeThumb === 0) {
      setmaxAltitude([
        Math.min(newValue[0], maxAltitude[1] - minDistance),
        maxAltitude[1],
      ]);
    } else {
      setmaxAltitude([
        maxAltitude[0],
        Math.max(newValue[1], maxAltitude[0] + minDistance),
      ]);
    }
    handleSearchChanged("max_altitude_feet", newValue[1]);
    handleSearchChanged("max_altitude_feet_min", newValue[0]);
  };

  const handleFuelBurnChanged = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return;
    }
    if (activeThumb === 0) {
      setfuelBurn([
        Math.min(newValue[0], fuelBurn[1] - minDistance),
        fuelBurn[1],
      ]);
    } else {
      setfuelBurn([
        fuelBurn[0],
        Math.max(newValue[1], fuelBurn[0] + minDistance),
      ]);
    }
    handleSearchChanged("hourly_fuel_burn_GPH", newValue[1]);
    handleSearchChanged("hourly_fuel_burn_GPH_min", newValue[0]);
  };

  const handleBaggageCapacityChanged = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return;
    }
    if (activeThumb === 0) {
      setbaggageCapacity([
        Math.min(newValue[0], baggageCapacity[1] - minDistance),
        baggageCapacity[1],
      ]);
    } else {
      setbaggageCapacity([
        baggageCapacity[0],
        Math.max(newValue[1], baggageCapacity[0] + minDistance),
      ]);
    }
    handleSearchChanged("baggage_capacity_CF", newValue[1]);
    handleSearchChanged("baggage_capacity_CF_min", newValue[0]);
  };

  const handleTakeOffChanged = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return;
    }
    if (activeThumb === 0) {
      settakeOffDistance([
        Math.min(newValue[0], takeOffDistance[1] - minDistance),
        takeOffDistance[1],
      ]);
    } else {
      settakeOffDistance([
        takeOffDistance[0],
        Math.max(newValue[1], takeOffDistance[0] + minDistance),
      ]);
    }
    handleSearchChanged("TO_distance_feet", newValue[1]);
    handleSearchChanged("TO_distance_feet_min", newValue[0]);
  };

  const handleLandingDistanceChanged = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return;
    }
    if (activeThumb === 0) {
      setlandingDistance([
        Math.min(newValue[0], landingDistance[1] - minDistance),
        landingDistance[1],
      ]);
    } else {
      setlandingDistance([
        landingDistance[0],
        Math.max(newValue[1], landingDistance[0] + minDistance),
      ]);
    }
    handleSearchChanged("landing_distance_feet", newValue[1]);
    handleSearchChanged("landing_distance_feet_min", newValue[0]);
  };

  const handleAnnualFixedChanged = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return;
    }
    if (activeThumb === 0) {
      setannualFixedCost([
        Math.min(newValue[0], annualFixedCost[1] - minDistance),
        annualFixedCost[1],
      ]);
    } else {
      setannualFixedCost([
        annualFixedCost[0],
        Math.max(newValue[1], annualFixedCost[0] + minDistance),
      ]);
    }
    handleSearchChanged("annual_cost", newValue[1]);
    handleSearchChanged("annual_cost_min", newValue[0]);
  };

  const handleHourlyPriceChange = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return;
    }
    if (activeThumb === 0) {
      sethourlyprice([
        Math.min(newValue[0], hourlyprice[1] - minDistance),
        hourlyprice[1],
      ]);
    } else {
      sethourlyprice([
        hourlyprice[0],
        Math.max(newValue[1], hourlyprice[0] + minDistance),
      ]);
    }
    handleSearchChanged("estimated_hourly_charter", newValue[1]);
    handleSearchChanged("estimated_hourly_charter_min", newValue[0]);
  };

  const handlePurchasePriceChanged = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return;
    }
    if (activeThumb === 0) {
      setpurchaseprice([
        Math.min(newValue[0], purchaseprice[1] - minDistance),
        purchaseprice[1],
      ]);
    } else {
      setpurchaseprice([
        purchaseprice[0],
        Math.max(newValue[1], purchaseprice[0] + minDistance),
      ]);
    }
    handleSearchChanged("new_purchase", newValue[1]);
    handleSearchChanged("new_purchase_min", newValue[0]);
  };

  const handlePreOwnedChanged = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return;
    }
    if (activeThumb === 0) {
      setpreowned([
        Math.min(newValue[0], preowned[1] - minDistance),
        preowned[1],
      ]);
    } else {
      setpreowned([
        preowned[0],
        Math.max(newValue[1], preowned[0] + minDistance),
      ]);
    }
    handleSearchChanged("average_pre_owned", newValue[1]);
    handleSearchChanged("average_pre_owned_min", newValue[0]);
  };

  const handleSearchChanged = (key, value) => {
    setSearch((currentSearch) => ({ ...currentSearch, [key]: value }));
  };

  const searchAircraft = async () => {
    const searchParams = new URLSearchParams(search);
    console.log(searchParams.toString());
    const res = await searchService(`/api/search?${searchParams.toString()}`);
    console.log(res);
    setFilterResult(res);
  };

  const openFilter = () => {
    const filter = document.querySelector(".filters_target");
    if (filter.style.display === "none") {
      filter.style.display = "flex";
    } else {
      filter.style.display = "none";
    }
  };

  return (
    <div className={cn("section-pt80", styles.section)}>
      <div className={cn(styles.container)}>
        <div className={styles.row}>
          <span className={styles.open_filter} onClick={() => openFilter()}>
            <i className="fa-solid fa-sliders"></i>
          </span>
          <div className={"filters_target " + styles.filters}>
            <div className={styles.top}>
              <div className={styles.title}>Search Aircraft</div>
            </div>
            <div className={styles.form}>
              <form className={styles.search} action="">
                <input
                  className={styles.input}
                  type="text"
                  value={search.aircraft_name}
                  onChange={(e) =>
                    handleSearchChanged("aircraft_name", e.target.value)
                  }
                  name="search"
                  placeholder="Search Aircraft"
                  required
                />
                <button className={styles.result}>
                  <HiOutlineSearch name="search" size="16" />
                </button>
              </form>
            </div>

            <div className={styles.sorting}>
              <div className={styles.dropdown}>
                <div className={styles.label}>Category</div>
                <Dropdown
                  className={styles.dropdown}
                  value={CATEGORY_OPTIONS_DIC[search.category]}
                  setValue={(value) => handleSearchChanged("category", value)}
                  options={CATEGORY_OPTIONS}
                />
              </div>
            </div>
            <div className={styles.sorting}>
              <div className={styles.dropdown}>
                <div className={styles.label}>Manufacturer</div>
                <Dropdown
                  className={styles.dropdown}
                  value={MANUFACTURER_OPTIONS_DIC[search.aircraft_manufacturer]}
                  setValue={(value) =>
                    handleSearchChanged("aircraft_manufacturer", value)
                  }
                  options={MANUFACTURER_OPTIONS}
                />
              </div>
            </div>
            <div className={styles.sorting}>
              <div className={styles.dropdown}>
                <div className={styles.label}>In Production</div>{" "}
                <Dropdown
                  className={styles.dropdown}
                  value={
                    PRODUCTION_OPTIONS_DIC[
                      search.in_production === true
                        ? "Yes"
                        : search.in_production === false
                        ? "No"
                        : "Select"
                    ]
                  }
                  setValue={(value) =>
                    handleSearchChanged(
                      "in_production",
                      value === "Yes" ? true : false
                    )
                  }
                  options={PRODUCTION_OPTIONS}
                />
              </div>
            </div>

            <div>
              <Accordion
                expanded={passengerExpanded}
                onChange={handlePassengerAccordion}
              >
                <AccordionSummary
                  expandIcon={<MdOutlineExpandMore />}
                  aria-controls="panel4bh-content"
                  id="panel4bh-header"
                >
                  <div className={styles.label}>
                    Max Passengers: {maxPax[0]} - {maxPax[1]}
                  </div>
                </AccordionSummary>
                <div className={styles.range}>
                  <Slider
                    className={styles.slider_home}
                    getAriaLabel={() => "Minimum passengers"}
                    value={maxPax}
                    max={max_pax}
                    onChange={handlePaxChanged}
                    valueLabelDisplay="auto"
                    disableSwap
                  />
                </div>
              </Accordion>
            </div>

            <div>
              <Accordion
                expanded={rangeExpanded}
                onChange={handleRangeAccordion}
              >
                <AccordionSummary
                  expandIcon={<MdOutlineExpandMore />}
                  aria-controls="panel4bh-content"
                  id="panel4bh-header"
                >
                  <div className={styles.label}>
                    Max Range: {range[0]} - {range[1]}
                  </div>
                </AccordionSummary>
                <div className={styles.range}>
                  <Slider
                    className={styles.slider_home}
                    getAriaLabel={() => "Minimum distance"}
                    value={range}
                    max={rangeNM}
                    onChange={handleRangeChanged}
                    valueLabelDisplay="auto"
                    disableSwap
                  />
                </div>
              </Accordion>
            </div>

            <div>
              <Accordion
                expanded={cruiseExpanded}
                onChange={handleCruiseAccordion}
              >
                <AccordionSummary
                  expandIcon={<MdOutlineExpandMore />}
                  aria-controls="panel4bh-content"
                  id="panel4bh-header"
                >
                  <div className={styles.label}>
                    Cruise Speed (Knots): {cruiseSpeed[0]} - {cruiseSpeed[1]}
                  </div>
                </AccordionSummary>
                <div className={styles.range}>
                  <Slider
                    className={styles.slider_home}
                    getAriaLabel={() => "Minimum cruise"}
                    value={cruiseSpeed}
                    max={high_cruise_knots}
                    onChange={handleCruiseChanged}
                    valueLabelDisplay="auto"
                    disableSwap
                  />
                </div>
              </Accordion>
            </div>

            <div>
              <Accordion
                expanded={altitudeExpanded}
                onChange={handleAltitudeAccordion}
              >
                <AccordionSummary
                  expandIcon={<MdOutlineExpandMore />}
                  aria-controls="panel4bh-content"
                  id="panel4bh-header"
                >
                  <div className={styles.label}>
                    Max Altitude (Feet): {maxAltitude[0]} - {maxAltitude[1]}
                  </div>
                </AccordionSummary>
                <div className={styles.range}>
                  <Slider
                    className={styles.slider_home}
                    getAriaLabel={() => "Minimum altitude"}
                    value={maxAltitude}
                    max={max_altitude_feet}
                    onChange={handleMaxAltitudeChanged}
                    valueLabelDisplay="auto"
                    disableSwap
                  />
                </div>
              </Accordion>
            </div>

            <div>
              <Accordion
                expanded={fuelBurnExpanded}
                onChange={handleFuelAccordion}
              >
                <AccordionSummary
                  expandIcon={<MdOutlineExpandMore />}
                  aria-controls="panel4bh-content"
                  id="panel4bh-header"
                >
                  <div className={styles.label}>
                    Fuel Burn (Gallons/Hour): {fuelBurn[0]} -{" "}
                    {fuelBurn[1]}
                  </div>
                </AccordionSummary>
                <div className={styles.range}>
                  <Slider
                    className={styles.slider_home}
                    getAriaLabel={() => "Minimum fuel"}
                    value={fuelBurn}
                    max={hourly_fuel_burn_GPH}
                    onChange={handleFuelBurnChanged}
                    valueLabelDisplay="auto"
                    disableSwap
                  />
                </div>
              </Accordion>
            </div>

            <div>
              <Accordion
                expanded={baggageExpanded}
                onChange={handleBaggageAccordion}
              >
                <AccordionSummary
                  expandIcon={<MdOutlineExpandMore />}
                  aria-controls="panel4bh-content"
                  id="panel4bh-header"
                >
                  <div className={styles.label}>
                    Baggage Capacity (cu ft): {baggageCapacity[0]} -{" "}
                    {baggageCapacity[1]}
                  </div>
                </AccordionSummary>
                <div className={styles.range}>
                  <Slider
                    className={styles.slider_home}
                    getAriaLabel={() => "Minimum baggage"}
                    value={baggageCapacity}
                    max={baggage_capacity_CF}
                    onChange={handleBaggageCapacityChanged}
                    valueLabelDisplay="auto"
                    disableSwap
                  />
                </div>
              </Accordion>
            </div>

            <div>
              <Accordion
                expanded={takeOffExpanded}
                onChange={handleTakeOffAccordion}
              >
                <AccordionSummary
                  expandIcon={<MdOutlineExpandMore />}
                  aria-controls="panel4bh-content"
                  id="panel4bh-header"
                >
                  <div className={styles.label}>
                    Take-Off Distance (feet): {takeOffDistance[0]} -{" "}
                    {takeOffDistance[1]}
                  </div>
                </AccordionSummary>
                <div className={styles.range}>
                  <Slider
                    className={styles.slider_home}
                    getAriaLabel={() => "Minimum takeoff"}
                    value={takeOffDistance}
                    max={TO_distance_feet}
                    onChange={handleTakeOffChanged}
                    valueLabelDisplay="auto"
                    disableSwap
                  />
                </div>
              </Accordion>
            </div>

            <div>
              <Accordion
                expanded={landingDistanceExpanded}
                onChange={handleLandingAccordion}
              >
                <AccordionSummary
                  expandIcon={<MdOutlineExpandMore />}
                  aria-controls="panel4bh-content"
                  id="panel4bh-header"
                >
                  <div className={styles.label}>
                    Landing Distance (feet): {landingDistance[0]} -{" "}
                    {landingDistance[1]}
                  </div>
                </AccordionSummary>
                <div className={styles.range}>
                  <Slider
                    className={styles.slider_home}
                    getAriaLabel={() => "Minimum landing"}
                    value={landingDistance}
                    max={landing_distance_feet}
                    onChange={handleLandingDistanceChanged}
                    valueLabelDisplay="auto"
                    disableSwap
                  />
                </div>
              </Accordion>
            </div>

            <div>
              <Accordion
                expanded={annualPriceExpanded}
                onChange={handleAnnualPriceAccordion}
              >
                <AccordionSummary
                  expandIcon={<MdOutlineExpandMore />}
                  aria-controls="panel4bh-content"
                  id="panel4bh-header"
                >
                  <div className={styles.label}>
                    Annual Fixed Cost ($): {annualFixedCost[0]} -{" "}
                    {annualFixedCost[1]}
                  </div>
                </AccordionSummary>
                <div className={styles.range}>
                  <Slider
                    className={styles.slider_home}
                    getAriaLabel={() => "Minimum fixed cost"}
                    value={annualFixedCost}
                    max={annual_cost}
                    onChange={handleAnnualFixedChanged}
                    valueLabelDisplay="auto"
                    disableSwap
                  />
                </div>
              </Accordion>
            </div>

            <div>
              <Accordion
                expanded={hourlyPriceExpanded}
                onChange={handleHourlyPriceAccordion}
              >
                <AccordionSummary
                  expandIcon={<MdOutlineExpandMore />}
                  aria-controls="panel4bh-content"
                  id="panel4bh-header"
                >
                  <div className={styles.label}>
                    Hourly Price ($): {hourlyprice[0]} - {hourlyprice[1]}
                  </div>
                </AccordionSummary>
                <div className={styles.range}>
                  <Slider
                    className={styles.slider_home}
                    getAriaLabel={() => "Minimum hourly price"}
                    value={hourlyprice}
                    max={estimated_hourly_charter}
                    onChange={handleHourlyPriceChange}
                    valueLabelDisplay="auto"
                    disableSwap
                  />
                </div>
              </Accordion>
            </div>

            <div>
              <Accordion
                expanded={purchasePriceAccordion}
                onChange={handlePurchaseAccordion}
              >
                <AccordionSummary
                  expandIcon={<MdOutlineExpandMore />}
                  aria-controls="panel4bh-content"
                  id="panel4bh-header"
                >
                  <div className={styles.label}>
                    Purchase Price ($): {purchaseprice[0]} - {purchaseprice[1]}
                  </div>
                </AccordionSummary>
                <div className={styles.range}>
                  <Slider
                    className={styles.slider_home}
                    getAriaLabel={() => "Minimum purchase"}
                    value={purchaseprice}
                    max={new_purchase}
                    min={100000}
                    onChange={handlePurchasePriceChanged}
                    valueLabelDisplay="auto"
                    disableSwap
                  />
                </div>
              </Accordion>
            </div>

            <div>
              <Accordion
                expanded={preOwnedExpanded}
                onChange={handlePreOwnedAccordion}
              >
                <AccordionSummary
                  expandIcon={<MdOutlineExpandMore />}
                  aria-controls="panel4bh-content"
                  id="panel4bh-header"
                >
                  <div className={styles.label}>
                    Pre-Owned ($ million): {preowned[0]} - {preowned[1]}
                  </div>
                </AccordionSummary>
                <div className={styles.range}>
                  <Slider
                    className={styles.slider_home}
                    getAriaLabel={() => "Minimum preowned"}
                    value={preowned}
                    max={average_pre_owned}
                    min={100000}
                    onChange={handlePreOwnedChanged}
                    valueLabelDisplay="auto"
                    disableSwap
                  />
                </div>
              </Accordion>
            </div>
          </div>
          <div className={styles.wrapper}>
            <div className={styles.dropdown}>
              <Dropdown
                className={styles.dropdown}
                headerDropdown={true}
                value={unit}
                setValue={(value) => onUnitChanged(value)}
                options={UNIT_OPTIONS}
              />
              <Dropdown
                headerDropdown={true}
                className={styles.dropdown}
                value={country}
                setValue={(value) => onCountryChanged(value)}
                options={COUNTRY_OPTIONS}
              />
              <Dropdown
                className={styles.dropdown}
                headerDropdown={true}
                value={currency}
                setValue={(value) => onCurrencyChanged(value)}
                options={CURRENCY_OPTIONS}
              />
            </div>
            <div className={styles.list}>
              {filterResult?.length ? (
                filterResult?.map((product) => (
                  <>
                    <Card
                      className={styles.card}
                      item={product}
                      key={product.aircraft_id}
                      unit={unit}
                      currency={currency}
                      country={country}
                    />
                  </>
                ))
              ) : (
                <div className={styles.spinner}>
                  <BounceLoader color={"#81B8E1"} loading={true} size={50} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
