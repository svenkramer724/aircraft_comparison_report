import React from "react";
import cn from "classnames";
import global from "../styles/global.module.scss";
import styles from "./styles/styles.module.scss";
import numeral from "numeral";
import SectionHeader from "../shared/SectionHeader";

const Interior = ({ data, currency, country, unit }) => {
  return (
    <>
      <section className={cn(global.section)}>
        <SectionHeader title="Interior" />
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
                Max Passengers
              </span>
              <span
                className={cn(
                  styles.compare_table_column_cell,
                  styles.table_key
                )}
              >
                Typical Passengers
              </span>
              <span
                className={cn(
                  styles.compare_table_column_cell,
                  styles.table_key
                )}
              >
                Cabin Noise (dB)
              </span>
              <span
                className={cn(
                  styles.compare_table_column_cell,
                  styles.table_key
                )}
              >
                Cabin Altitude{" "}
                {unit === "Imperial Units" ? "(Feet)" : "(Meters)"}
              </span>
              <span
                className={cn(
                  styles.compare_table_column_cell,
                  styles.table_key
                )}
              >
                Sea Level Cabin{" "}
                {unit === "Imperial Units" ? "(Feet)" : "(Meters)"}
              </span>
              <span
                className={cn(
                  styles.compare_table_column_cell,
                  styles.table_key
                )}
              >
                Pressure Differential{" "}
                {unit === "Imperial Units" ? "(PSI)" : "(kPa)"}
              </span>
              <span
                className={cn(
                  styles.compare_table_column_cell,
                  styles.table_key
                )}
              >
                Living Zone Count
              </span>
              <span
                className={cn(
                  styles.compare_table_column_cell,
                  styles.table_key
                )}
              >
                Cabin Volume{" "}
                {unit === "Imperial Units" ? "(Cubic Feet)" : "(Cubic Meters)"}
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
                    {aircraft.max_pax === 0
                      ? "-"
                      : numeral(aircraft.max_pax).format("0,0")}
                  </span>
                  <span className={cn(styles.compare_table_column_cell)}>
                    {aircraft.typical_pax === 0
                      ? "-"
                      : numeral(aircraft.typical_pax).format("0,0")}
                  </span>
                  <span className={cn(styles.compare_table_column_cell)}>
                    {aircraft.cabin_noise === 0
                      ? "-"
                      : numeral(aircraft.cabin_noise).format("0,0")}
                  </span>
                  <span className={cn(styles.compare_table_column_cell)}>
                    {unit === "Imperial Units"
                      ? aircraft.cabin_altitude === 0
                        ? "-"
                        : numeral(aircraft.cabin_altitude).format("0,0")
                      : aircraft.cabin_altitude_ceiling_meters === 0
                      ? "-"
                      : numeral(aircraft.cabin_altitude_ceiling_meters).format(
                          "0,0"
                        )}
                  </span>
                  <span className={cn(styles.compare_table_column_cell)}>
                    {unit === "Imperial Units"
                      ? aircraft.sea_level_cabin === 0
                        ? "-"
                        : numeral(aircraft.sea_level_cabin).format("0,0")
                      : aircraft.altitude_sea_level_meters === 0
                      ? "-"
                      : numeral(aircraft.altitude_sea_level_meters).format(
                          "0,0"
                        )}
                  </span>
                  <span className={cn(styles.compare_table_column_cell)}>
                    {unit === "Imperial Units"
                      ? aircraft.pressure_differential_psi === 0
                        ? "-"
                        : numeral(aircraft.pressure_differential_psi).format(
                            "0,0"
                          )
                      : aircraft.cabin_pressure === 0
                      ? "-"
                      : numeral(aircraft.cabin_pressure).format("0,0")}
                  </span>
                  <span className={cn(styles.compare_table_column_cell)}>
                    {aircraft.living_zones === 0
                      ? "-"
                      : numeral(aircraft.living_zones).format("0,0")}
                  </span>
                  <span className={cn(styles.compare_table_column_cell)}>
                    {unit === "Imperial Units"
                      ? aircraft.cabin_volume_CF === 0
                        ? "-"
                        : numeral(aircraft.cabin_volume_CF).format("0,0")
                      : aircraft.cabin_volume_cubicmeters === 0
                      ? "-"
                      : numeral(aircraft.cabin_volume_cubicmeters).format(
                          "0,0"
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
export default Interior;
