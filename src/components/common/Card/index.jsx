import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import cn from "classnames";
import styles from "./Card.module.scss";
import {
  HiOutlineUsers,
  HiOutlineMap,
  HiOutlineShoppingCart,
  HiOutlineCurrencyDollar,
  HiOutlineTrendingDown,
  HiOutlineTrendingUp,
  HiOutlineCube,
  HiOutlineFire,
  HiOutlineClock,
} from "react-icons/hi";
import { ImWarning } from "react-icons/im";
import { SiSpeedtest } from "react-icons/si";
import numeral from "numeral";
import axios from "axios";

const Card = ({ className, item, unit, currency, country }) => {
  const [info, setInfo] = useState([]);
  const [from, setFrom] = useState("usd");
  const [to, setTo] = useState("usd");
  const [conversionRate, setConversionRate] = useState(0);

  useEffect(() => {
    axios
      .get(
        `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${from}.json`
      )
      .then((res) => {
        setInfo(res.data[from]);
      });
  }, [from]);

  useEffect(() => {
    currency === "USD"
      ? setTo("usd")
      : currency === "GBP"
      ? setTo("gbp")
      : setTo("eur");
    setFrom("usd");
    setConversionRate(info[to]);
  }, [info, currency, to]);

  const aircraftName = item?.aircraft_name.replace(/\s/g, "-");
  return (
    <div className={cn(styles.card, className)} aria-hidden="true">
      <Link
        to={`/${aircraftName}`}
        state={{
          aircraftData: item,
        }}
      >
        <div className={styles.preview}>
          <img src={`${item?.image_name}`} alt={`${item?.aircraft_name}`} />
        </div>
        <div className={styles.foot}>
          <div className={styles.status}>
            <p>{`${item?.aircraft_name}`} </p>

            <p className={styles.count}>
              <HiOutlineUsers name="search" size="16" /> Number of Passengers:{" "}
              {item?.max_pax > 0 ? `${item?.max_pax} ` : "N/A"}
            </p>
            <p className={styles.count}>
              <HiOutlineMap name="search" size="16" /> Range:{" "}
              {unit === "Imperial Units"
                ? item?.range_NM > 0
                  ? `${numeral(item?.range_NM).format("0,0")} NM`
                  : "N/A"
                : item?.range_km > 0
                ? `${numeral(item?.range_km).format("0,0")} KM`
                : "N/A"}
            </p>
            <p className={styles.count}>
              <SiSpeedtest name="search" size="16" /> High Speed Cruise:{" "}
              {unit === "Imperial Units"
                ? item?.high_cruise_knots > 0
                  ? `${numeral(item?.high_cruise_knots).format("0,0")} knots`
                  : "N/A"
                : item?.high_speed_cruise_kmh > 0
                ? `${numeral(item?.high_speed_cruise_kmh).format("0,0")} kmh`
                : "N/A"}
            </p>
            <p className={styles.count}>
              <ImWarning name="search" size="16" /> Max Altitude:{" "}
              {unit === "Imperial Units"
                ? item?.max_altitude_feet > 0
                  ? `${numeral(item?.max_altitude_feet).format("0,0")} `
                  : "N/A"
                : item?.max_altitude_meters > 0
                ? `${numeral(item?.max_altitude_meters).format("0,0")} `
                : "N/A"}
            </p>
            <p className={styles.count}>
              <HiOutlineFire name="search" size="16" /> Hourly Fuel Burn:{" "}
              {unit === "Imperial Units"
                ? item?.hourly_fuel_burn_GPH > 0
                  ? `${numeral(item?.hourly_fuel_burn_GPH).format("0,0")} GPH`
                  : "N/A"
                : item?.hourly_fuel_burn_LPH > 0
                ? `${numeral(item?.hourly_fuel_burn_LPH).format("0,0")} LPH`
                : "N/A"}
            </p>
            <p className={styles.count}>
              <HiOutlineCube name="search" size="16" /> Baggage Capacity:{" "}
              {unit === "Imperial Units"
                ? item?.baggage_capacity_CF > 0
                  ? `${item?.baggage_capacity_CF} CF`
                  : "N/A"
                : item?.baggage_capacity_cubicmeters > 0
                ? `${item?.baggage_capacity_cubicmeters} CM`
                : "N/A"}
            </p>
            <p className={styles.count}>
              <HiOutlineTrendingUp name="search" size="16" /> Take-Off Distance:{" "}
              {unit === "Imperial Units"
                ? item?.TO_distance_feet > 0
                  ? `${numeral(item?.TO_distance_feet).format("0,0")} feet`
                  : "N/A"
                : item?.TO_distance_meters > 0
                ? `${numeral(item?.TO_distance_meters).format("0,0")} meters`
                : "N/A"}
            </p>
            <p className={styles.count}>
              <HiOutlineTrendingDown name="search" size="16" /> Landing
              Distance:{" "}
              {unit === "Imperial Units"
                ? item?.landing_distance_feet > 0
                  ? `${numeral(item?.landing_distance_feet).format("0,0")} feet`
                  : "N/A"
                : item?.landing_distance_meters > 0
                ? `${numeral(item?.landing_distance_meters).format(
                    "0,0"
                  )} meters`
                : "N/A"}
            </p>
            <p className={styles.count}>
              <HiOutlineCurrencyDollar name="search" size="16" /> Annual Fixed
              Costs: {currency === "USD" ? "$" : currency === "GBP" ? "£" : "€"}
              {country === "North America"
                ? item?.NA_annual_total > 0
                  ? `${numeral(
                      currency === "USD"
                        ? item?.NA_annual_total
                        : item?.NA_annual_total * conversionRate
                    ).format("0,0")} `
                  : "N/A"
                : country === "South America"
                ? item?.SA_annual_total > 0
                  ? `${numeral(
                      currency === "USD"
                        ? item?.SA_annual_total
                        : item?.SA_annual_total * conversionRate
                    ).format("0,0")} `
                  : "N/A"
                : country === "Europe"
                ? item?.EU_annual_total > 0
                  ? `${numeral(
                      currency === "USD"
                        ? item?.EU_annual_total
                        : item?.EU_annual_total * conversionRate
                    ).format("0,0")} `
                  : "N/A"
                : item?.AS_annual_total > 0
                ? `${numeral(
                    currency === "USD"
                      ? item?.AS_annual_total
                      : item?.AS_annual_total * conversionRate
                  ).format("0,0")} `
                : "N/A"}
            </p>
            <p className={styles.count}>
              <HiOutlineCurrencyDollar name="search" size="16" /> Hourly Cost:{" "}
              {currency === "USD" ? "$" : currency === "GBP" ? "£" : "€"}
              {country === "North America"
                ? item?.NA_hourly_total > 0
                  ? `${numeral(
                      currency === "USD"
                        ? item?.NA_hourly_total
                        : item?.NA_hourly_total * conversionRate
                    ).format("0,0")} `
                  : "N/A"
                : country === "South America"
                ? item?.SA_hourly_total > 0
                  ? `${numeral(
                      currency === "USD"
                        ? item?.SA_hourly_total
                        : item?.SA_hourly_total * conversionRate
                    ).format("0,0")} `
                  : "N/A"
                : country === "Europe"
                ? item?.EU_hourly_total > 0
                  ? `${numeral(
                      currency === "USD"
                        ? item?.EU_hourly_total
                        : item?.EU_hourly_total * conversionRate
                    ).format("0,0")} `
                  : "N/A"
                : item?.AS_hourly_total > 0
                ? `${numeral(
                    currency === "USD"
                      ? item?.AS_hourly_total
                      : item?.AS_hourly_total * conversionRate
                  ).format("0,0")} `
                : "N/A"}
            </p>
            <p className={styles.count}>
              <HiOutlineShoppingCart name="search" size="16" /> Price (New):{" "}
              {currency === "USD" ? "$" : currency === "GBP" ? "£" : "€"}
              {item?.new_purchase > 0
                ? `${numeral(
                    currency === "USD"
                      ? item?.new_purchase
                      : item?.new_purchase * conversionRate
                  ).format("0,0")} `
                : "N/A"}
            </p>
            <p className={styles.count}>
              <HiOutlineShoppingCart name="search" size="16" /> Average
              Pre-Owned:{" "}
              {currency === "USD" ? "$" : currency === "GBP" ? "£" : "€"}
              {item?.average_pre_owned > 0
                ? `${numeral(
                    currency === "USD"
                      ? item?.average_pre_owned
                      : item?.average_pre_owned * conversionRate
                  ).format("0,0")} `
                : "N/A"}
            </p>
            <p className={styles.count}>
              <HiOutlineClock name="search" size="16" /> Years Produced:{" "}
              {item?.production_start > 0
                ? `${item?.production_start} - ${item?.production_end} `
                : "N/A"}
            </p>
          </div>
          <div
            className={styles.bid}
            dangerouslySetInnerHTML={{ __html: item?.count }}
          />
        </div>
      </Link>
    </div>
  );
};

export default Card;
