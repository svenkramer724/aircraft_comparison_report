import cn from "classnames";
import global from "../styles/global.module.scss";
import styles from "./styles/styles.module.scss";
import SectionHeader from "../shared/SectionHeader";
import numeral from "numeral";

const PerformanceData = ({ params, unit }) => {
  return (
    <section className={cn(global.section,global.new_page)}>
      <SectionHeader title="Performance Data" />
      <main>
        <div className={cn(global.details_table)}>
          <div className={cn(global.column)}>
            <div className={cn(global.rows)}>
              <div className={cn(global.row)}>
                <span className={cn(global.key, global.key_realign)}>
                  Range (Nautical Miles)
                </span>
                <span>
                  {params.range_NM === 0
                    ? "-"
                    : numeral(params.range_NM).format("0,0")}
                </span>
              </div>
              <div className={cn(global.row)}>
                <span className={cn(global.key, global.key_realign)}>
                  Range {unit === "Imperial Units" ? "(Miles)" : "(KM)"}
                </span>
                <span>
                  {unit === "Imperial Units"
                    ? params.range_Miles === 0
                      ? "-"
                      : numeral(params.range_Miles).format("0,0")
                    : params.range_km === 0
                    ? "-"
                    : numeral(params.range_km).format("0,0")}
                </span>
              </div>
              <div className={cn(global.row)}>
                <span className={cn(global.key, global.key_realign)}>
                  Fuel Burn{" "}
                  {unit === "Imperial Units"
                    ? "(Gallons per Hour)"
                    : "(Liters per Hour)"}
                </span>
                <span>
                  {unit === "Imperial Units"
                    ? params.hourly_fuel_burn_GPH === 0
                      ? "-"
                      : numeral(params.hourly_fuel_burn_GPH).format("0,0")
                    : params.hourly_fuel_burn_LPH === 0
                    ? "-"
                    : numeral(params.hourly_fuel_burn_LPH).format("0,0")}
                </span>
              </div>
            </div>
          </div>
          <span className={cn(global.seperator)}></span>
          <div className={cn(global.column)}>
            <div className={cn(global.rows)}>
              <div className={cn(global.row)}>
                <span className={cn(global.key, global.key_realign)}>
                  Max Altitude{" "}
                  {unit === "Imperial Units" ? "(Feet)" : "(Meters)"}
                </span>
                <span>
                  {params.max_altitude_feet === 0
                    ? "-"
                    : unit === "Imperial Units"
                    ? numeral(params.max_altitude_feet).format("0,0")
                    : numeral(params.max_altitude_meters).format("0,0")}
                </span>
              </div>
              <div className={cn(global.row)}>
                <span className={cn(global.key, global.key_realign)}>
                  Rate of Climb{" "}
                  {unit === "Imperial Units"
                    ? "(Feet / Min)"
                    : "(Meters / Min)"}
                </span>
                <span>
                  {unit === "Imperial Units"
                    ? params.rate_climb === 0
                      ? "-"
                      : numeral(params.rate_climb).format("0,0")
                    : params.rate_climb_meters === 0
                    ? "-"
                    : numeral(params.rate_climb_meters).format("0,0")}
                </span>
              </div>
              <div className={cn(global.row)}>
                <span className={cn(global.key, global.key_realign)}>
                  Initial Cruise Altitude{" "}
                  {unit === "Imperial Units" ? "(Feet)" : "(Meters)"}
                </span>
                <span>
                  {unit === "Imperial Units"
                    ? params.initial_cruise_altitude === 0
                      ? "-"
                      : numeral(params.initial_cruise_altitude).format("0,0")
                    : params.initial_cruise_altitude_meters === 0
                    ? "-"
                    : numeral(params.initial_cruise_altitude_meters).format(
                        "0,0"
                      )}
                </span>
              </div>
            </div>
          </div>
        </div>
        {/* ------------------------------- */}
        <div className={cn(global.details_table)}>
          <div className={cn(global.column)}>
            <span className={cn(global.column_header)}>High Speed Cruise</span>
            <div className={cn(global.rows)}>
              <div className={cn(global.row)}>
                <span className={cn(global.key)}>Knots</span>
                <span className={cn(global.key)}>
                  {unit === "Imperial Units" ? "MPH" : "KMH"}
                </span>
                <span className={cn(global.key)}>Mach</span>
              </div>
              <div className={cn(global.row)}>
                <span className={cn(global.value)}>
                  {params.high_cruise_knots === 0
                    ? "-"
                    : numeral(params.high_cruise_knots).format("0,0")}
                </span>
                <span className={cn(global.value)}>
                  {unit === "Imperial Units"
                    ? params.high_cruise_MPH === 0
                      ? "-"
                      : numeral(params.high_cruise_MPH).format("0,0")
                    : params.high_speed_cruise_kmh === 0
                    ? "-"
                    : numeral(params.high_speed_cruise_kmh).format("0,0")}
                </span>
                <span className={cn(global.value)}>
                  {params.high_cruise_Mach === 0
                    ? "-"
                    : numeral(params.high_cruise_Mach).format("0,0.00")}
                </span>
              </div>
            </div>
          </div>

          <span className={cn(global.seperator)}></span>
          <div className={cn(global.column)}>
            <span className={cn(global.column_header)}>Long Range Cruise</span>
            <div className={cn(global.rows)}>
              <div className={cn(global.row)}>
                <span className={cn(global.key)}>Knots</span>
                <span className={cn(global.key)}>
                  {" "}
                  {unit === "Imperial Units" ? "MPH" : "KMH"}
                </span>
                <span className={cn(global.key)}>Mach</span>
              </div>
              <div className={cn(global.row)}>
                <span className={cn(global.value)}>
                  {params.long_range_cruise_knots === 0
                    ? "-"
                    : numeral(params.long_range_cruise_knots).format("0,0")}
                </span>
                <span className={cn(global.value)}>
                  {unit === "Imperial Units"
                    ? params.long_range_cruise_MPH === 0
                      ? "-"
                      : numeral(params.long_range_cruise_MPH).format("0,0")
                    : params.long_range_cruise_kmh === 0
                    ? "-"
                    : numeral(params.long_range_cruise_kmh).format("0,0")}
                </span>
                <span className={cn(global.value)}>
                  {params.long_range_cruise_Mach === 0
                    ? "-"
                    : numeral(params.long_range_cruise_Mach).format("0,0.00")}
                </span>
              </div>
            </div>
          </div>
        </div>
        {/* --------------------- */}
        <center>
          <img
            className={cn(styles.runaway_img)}
            src="https://compareprivateplanes.com/tools/runway.jpg"
          ></img>
        </center>

        <div className={cn(styles.additional_infos)}>
          <div className={cn(styles.info)}>
            <span className={cn(styles.subtitle)}>
              Take-Off Distance{" "}
              {unit === "Imperial Units" ? "(feet)" : "(meters)"}
            </span>
            <span className={cn(styles.subtitle)}>
              Landing Distance{" "}
              {unit === "Imperial Units" ? "(feet)" : "(meters)"}
            </span>
          </div>
          <div className={cn(styles.bars)}>
            <span
              className={styles.distance_bar}
              style={{
                width: !isNaN(
                  parseInt(params.TO_distance_feet) /
                    (parseInt(params.TO_distance_feet) +
                      parseInt(params.landing_distance_feet))
                )
                  ? (parseInt(params.TO_distance_feet) /
                      (parseInt(params.TO_distance_feet) +
                        parseInt(params.landing_distance_feet))) *
                    1000
                  : "100%",
              }}
            >
              {unit === "Imperial Units"
                ? numeral(params.TO_distance_feet).format("0,0")
                : numeral(params.TO_distance_meters).format("0,0")}
            </span>
            <span
              className={styles.landing_distance_bar}
              style={{
                width: !isNaN(
                  parseInt(params.landing_distance_feet) /
                    (parseInt(params.TO_distance_feet) +
                      parseInt(params.landing_distance_feet))
                )
                  ? (parseInt(params.landing_distance_feet) /
                      (parseInt(params.TO_distance_feet) +
                        parseInt(params.landing_distance_feet))) *
                    1000
                  : "100%",
              }}
            >
              {unit === "Imperial Units"
                ? numeral(params.landing_distance_feet).format("0,0")
                : numeral(params.landing_distance_meters).format("0,0")}
            </span>
          </div>
        </div>
      </main>
    </section>
  );
};

export default PerformanceData;
