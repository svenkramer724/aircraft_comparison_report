import React from "react";
import cn from "classnames";
import global from "../styles/global.module.scss";
import styles from "./styles/styles.module.scss";
import numeral from "numeral";
import SectionHeader from "../shared/SectionHeader";

const Performance = ({ data, currency, country, unit }) => {
  return (
    <>
      <section className={cn(global.section, global.page_break)}>
        <SectionHeader title="Performance" />
        <main>
          <div className={cn(styles.compare_table)}>
            <div className={cn(styles.compare_table_column)}>
              <span
                className={cn(
                  styles.compare_table_column_cell,
                  styles.invisible
                )}
              >
                invisible
              </span>
              <span
                className={cn(
                  styles.compare_table_column_cell,
                  styles.table_key
                )}
              >
                Range (NM)
              </span>
              <span
                className={cn(
                  styles.compare_table_column_cell,
                  styles.table_key
                )}
              >
                Range {unit === "Imperial Units" ? "(Miles)" : "(KM)"}
              </span>
              <span
                className={cn(
                  styles.compare_table_column_cell,
                  styles.table_key
                )}
              >
                Fuel Burn {unit === "Imperial Units" ? "(GPH)" : "(LPH)"}
              </span>
              <span
                className={cn(
                  styles.compare_table_column_cell,
                  styles.table_key
                )}
              >
                Max Altitude {unit === "Imperial Units" ? "(Feet)" : "(Meters)"}
              </span>
              <span
                className={cn(
                  styles.compare_table_column_cell,
                  styles.table_key
                )}
              >
                Rate of Climb{" "}
                {unit === "Imperial Units" ? "(Feet / Min)" : "(Meters / Min)"}
              </span>
              <span
                className={cn(
                  styles.compare_table_column_cell,
                  styles.table_key
                )}
              >
                Initial Cruise Altitude{" "}
                {unit === "Imperial Units" ? "(Feet)" : "(Meters)"}
              </span>
              <span
                className={cn(
                  styles.compare_table_column_cell,
                  styles.table_key
                )}
              >
                Take-Off Distance{" "}
                {unit === "Imperial Units" ? "(Feet)" : "(Meters)"}
              </span>
              <span
                className={cn(
                  styles.compare_table_column_cell,
                  styles.table_key
                )}
              >
                Landing Distance{" "}
                {unit === "Imperial Units" ? "(Feet)" : "(Meters)"}
              </span>
              <span
                className={cn(
                  styles.compare_table_column_cell,
                  styles.table_key
                )}
              ></span>
              <span
                className={cn(
                  styles.compare_table_column_cell,
                  styles.table_key
                )}
              >
                High Speed Cruise:
              </span>
              <span
                className={cn(
                  styles.compare_table_column_cell,
                  styles.table_key
                )}
              >
                Knots
              </span>
              <span
                className={cn(
                  styles.compare_table_column_cell,
                  styles.table_key
                )}
              >
                {unit === "Imperial Units" ? "MPH" : "KMH"}
              </span>
              <span
                className={cn(
                  styles.compare_table_column_cell,
                  styles.table_key
                )}
              >
                Mach
              </span>
              <br></br>
              <span
                className={cn(
                  styles.compare_table_column_cell,
                  styles.table_key
                )}
              >
                Long Range Cruise:
              </span>
              <span
                className={cn(
                  styles.compare_table_column_cell,
                  styles.table_key
                )}
              >
                Knots
              </span>
              <span
                className={cn(
                  styles.compare_table_column_cell,
                  styles.table_key
                )}
              >
                {unit === "Imperial Units" ? "MPH" : "KMH"}
              </span>
              <span
                className={cn(
                  styles.compare_table_column_cell,
                  styles.table_key
                )}
              >
                Mach
              </span>
            </div>
            {data.map((aircraft) => {
              return (
                <div
                  className={cn(styles.compare_table_column)}
                  key={aircraft.aircraft_id}
                >
                  <span
                    className={cn(
                      styles.compare_table_column_cell,
                      styles.table_column_head
                    )}
                  >
                    {aircraft.aircraft_name}
                  </span>
                  <span className={cn(styles.compare_table_column_cell)}>
                    {aircraft.range_NM === 0
                      ? "-"
                      : numeral(aircraft.range_NM).format("0,0")}
                  </span>
                  <span className={cn(styles.compare_table_column_cell)}>
                    {unit === "Imperial Units"
                      ? aircraft.range_Miles === 0
                        ? "-"
                        : numeral(aircraft.range_Miles).format("0,0")
                      : aircraft.range_km === 0
                      ? "-"
                      : numeral(aircraft.range_km).format("0,0")}
                  </span>
                  <span className={cn(styles.compare_table_column_cell)}>
                    {unit === "Imperial Units"
                      ? aircraft.hourly_fuel_burn_GPH === 0
                        ? "-"
                        : numeral(aircraft.hourly_fuel_burn_GPH).format("0,0")
                      : aircraft.hourly_fuel_burn_LPH === 0
                      ? "-"
                      : numeral(aircraft.hourly_fuel_burn_LPH).format("0,0")}
                  </span>
                  <span className={cn(styles.compare_table_column_cell)}>
                    {aircraft.max_altitude_feet === 0
                      ? "-"
                      : unit === "Imperial Units"
                      ? numeral(aircraft.max_altitude_feet).format("0,0")
                      : numeral(aircraft.max_altitude_meters).format("0,0")}
                  </span>
                  <span className={cn(styles.compare_table_column_cell)}>
                    {unit === "Imperial Units"
                      ? aircraft.rate_climb === 0
                        ? "-"
                        : numeral(aircraft.rate_climb).format("0,0")
                      : aircraft.rate_climb_meters === 0
                      ? "-"
                      : numeral(aircraft.rate_climb_meters).format("0,0")}
                  </span>
                  <span className={cn(styles.compare_table_column_cell)}>
                    {unit === "Imperial Units"
                      ? aircraft.initial_cruise_altitude === 0
                        ? "-"
                        : numeral(aircraft.initial_cruise_altitude).format(
                            "0,0"
                          )
                      : aircraft.initial_cruise_altitude_meters === 0
                      ? "-"
                      : numeral(aircraft.initial_cruise_altitude_meters).format(
                          "0,0"
                        )}
                  </span>
                  <span className={cn(styles.compare_table_column_cell)}>
                    {unit === "Imperial Units"
                      ? aircraft.TO_distance_feet === 0
                        ? "-"
                        : numeral(aircraft.TO_distance_feet).format("0,0")
                      : aircraft.TO_distance_meters === 0
                      ? "-"
                      : numeral(aircraft.TO_distance_meters).format("0,0")}
                  </span>
                  <span className={cn(styles.compare_table_column_cell)}>
                    {unit === "Imperial Units"
                      ? aircraft.landing_distance_feet === 0
                        ? "-"
                        : numeral(aircraft.landing_distance_feet).format("0,0")
                      : aircraft.landing_distance_meters === 0
                      ? "-"
                      : numeral(aircraft.landing_distance_meters).format("0,0")}
                  </span>
                  <span className={cn(styles.compare_table_column_cell)}></span>
                  <span className={cn(styles.compare_table_column_cell)}></span>
                  <span className={cn(styles.compare_table_column_cell)}></span>
                  <span className={cn(styles.compare_table_column_cell)}>
                    {aircraft.high_cruise_knots === 0
                      ? "-"
                      : numeral(aircraft.high_cruise_knots).format("0,0")}
                  </span>
                  <span className={cn(styles.compare_table_column_cell)}>
                    {unit === "Imperial Units"
                      ? aircraft.high_cruise_MPH === 0
                        ? "-"
                        : numeral(aircraft.high_cruise_MPH).format("0,0")
                      : aircraft.high_speed_cruise_kmh === 0
                      ? "-"
                      : numeral(aircraft.high_speed_cruise_kmh).format("0,0")}
                  </span>
                  <span className={cn(styles.compare_table_column_cell)}>
                    {aircraft.high_cruise_Mach === 0
                      ? "-"
                      : numeral(aircraft.high_cruise_Mach).format("0,0.00")}
                  </span>
                  <span className={cn(styles.compare_table_column_cell)}></span>
                  <span className={cn(styles.compare_table_column_cell)}></span>
                  <span className={cn(styles.compare_table_column_cell)}></span>
                  <span className={cn(styles.compare_table_column_cell)}>
                    {aircraft.long_range_cruise_knots === 0
                      ? "-"
                      : numeral(aircraft.long_range_cruise_knots).format("0,0")}
                  </span>
                  <span className={cn(styles.compare_table_column_cell)}>
                    {unit === "Imperial Units"
                      ? aircraft.long_range_cruise_MPH === 0
                        ? "-"
                        : numeral(aircraft.long_range_cruise_MPH).format("0,0")
                      : aircraft.long_range_cruise_kmh === 0
                      ? "-"
                      : numeral(aircraft.long_range_cruise_kmh).format("0,0")}
                  </span>
                  <span className={cn(styles.compare_table_column_cell)}>
                    {aircraft.long_range_cruise_Mach === 0
                      ? "-"
                      : numeral(aircraft.long_range_cruise_Mach).format(
                          "0,0.00"
                        )}
                  </span>
                </div>
              );
            })}
          </div>
        </main>
      </section>
    </>
  );
};
export default Performance;
