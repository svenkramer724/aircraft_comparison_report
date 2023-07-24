import React from "react";
import cn from "classnames";
import global from "../styles/global.module.scss";
import SectionHeader from "../shared/SectionHeader";
import styles from "./styles/styles.module.scss";

const Dimensions = ({ data, currency, country, unit }) => {
  return (
    <>
      <section className={cn(global.section, global.page_break)}>
        <SectionHeader title="Dimensions" />
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
                Exterior Length{" "}
                {unit === "Imperial Units" ? "(Feet)" : "(Meters)"}
              </span>
              <span
                className={cn(
                  styles.compare_table_column_cell,
                  styles.table_key
                )}
              >
                Exterior Height{" "}
                {unit === "Imperial Units" ? "(Feet)" : "(Meters)"}
              </span>
              <span
                className={cn(
                  styles.compare_table_column_cell,
                  styles.table_key
                )}
              >
                Wingspan {unit === "Imperial Units" ? "(Feet)" : "(Meters)"}
              </span>
              <span
                className={cn(
                  styles.compare_table_column_cell,
                  styles.table_key
                )}
              >
                Interior Length{" "}
                {unit === "Imperial Units" ? "(Feet)" : "(Meters)"}
              </span>
              <span
                className={cn(
                  styles.compare_table_column_cell,
                  styles.table_key
                )}
              >
                Interior Height{" "}
                {unit === "Imperial Units" ? "(Feet)" : "(Meters)"}
              </span>
              <span
                className={cn(
                  styles.compare_table_column_cell,
                  styles.table_key
                )}
              >
                Interior Width{" "}
                {unit === "Imperial Units" ? "(Feet)" : "(Meters)"}
              </span>
              <span
                className={cn(
                  styles.compare_table_column_cell,
                  styles.table_key
                )}
              >
                Door Height {unit === "Imperial Units" ? "(Feet)" : "(Meters)"}
              </span>
              <span
                className={cn(
                  styles.compare_table_column_cell,
                  styles.table_key
                )}
              >
                Door Width {unit === "Imperial Units" ? "(Feet)" : "(Meters)"}
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
                    {aircraft.ext_length_feet === 0
                      ? "-"
                      : unit === "Imperial Units"
                      ? aircraft.ext_length_feet
                      : aircraft.ext_length_meters}{" "}
                  </span>
                  <span className={cn(styles.compare_table_column_cell)}>
                    {aircraft.exterior_height_feet === 0
                      ? "-"
                      : unit === "Imperial Units"
                      ? aircraft.exterior_height_feet
                      : aircraft.ext_height_meters}{" "}
                  </span>
                  <span className={cn(styles.compare_table_column_cell)}>
                    {aircraft.wingspan_feet === 0
                      ? "-"
                      : unit === "Imperial Units"
                      ? aircraft.wingspan_feet
                      : aircraft.wingspan_meters}{" "}
                  </span>
                  <span className={cn(styles.compare_table_column_cell)}>
                    {unit === "Imperial Units"
                      ? aircraft.int_length_feet === 0
                        ? "-"
                        : aircraft.int_length_feet
                      : aircraft.int_length_meters === 0
                      ? "-"
                      : aircraft.int_length_meters}{" "}
                  </span>
                  <span className={cn(styles.compare_table_column_cell)}>
                    {unit === "Imperial Units"
                      ? aircraft.int_height_feet === 0
                        ? "-"
                        : aircraft.int_height_feet
                      : aircraft.int_height_meters === 0
                      ? "-"
                      : aircraft.int_height_meters}{" "}
                  </span>
                  <span className={cn(styles.compare_table_column_cell)}>
                    {unit === "Imperial Units"
                      ? aircraft.int_width_feet === 0
                        ? "-"
                        : aircraft.int_width_feet
                      : aircraft.int_width_meters === 0
                      ? "-"
                      : aircraft.int_width_meters}{" "}
                  </span>
                  <span className={cn(styles.compare_table_column_cell)}>
                    {unit === "Imperial Units"
                      ? aircraft.door_height_feet === 0
                        ? "-"
                        : aircraft.door_height_feet
                      : aircraft.door_height_meters === 0
                      ? "-"
                      : aircraft.door_height_meters}{" "}
                  </span>
                  <span className={cn(styles.compare_table_column_cell)}>
                    {unit === "Imperial Units"
                      ? aircraft.door_width_feet === 0
                        ? "-"
                        : aircraft.door_width_feet
                      : aircraft.door_width_meters === 0
                      ? "-"
                      : aircraft.door_width_meters}{" "}
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
export default Dimensions;
