import React from "react";
import cn from "classnames";
import global from "../styles/global.module.scss";
import styles from "./styles/styles.module.scss";
import SectionHeader from "../shared/SectionHeader";
import numeral from "numeral";

const BasicInfo = ({ data }) => {
  return (
    <>
      <section className={cn(global.section, global.page_break)}>
        <SectionHeader title="Basic Info" />
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
                Production Start
              </span>
              <span
                className={cn(
                  styles.compare_table_column_cell,
                  styles.table_key
                )}
              >
                Production End
              </span>
              <span
                className={cn(
                  styles.compare_table_column_cell,
                  styles.table_key
                )}
              >
                In Production?
              </span>
              <span
                className={cn(
                  styles.compare_table_column_cell,
                  styles.table_key
                )}
              >
                Number Made
              </span>
              <span
                className={cn(
                  styles.compare_table_column_cell,
                  styles.table_key
                )}
              >
                Number in Service
              </span>
              <span
                className={cn(
                  styles.compare_table_column_cell,
                  styles.table_key
                )}
              >
                Serial Numbers
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
                    {aircraft.production_start}
                  </span>
                  <span className={cn(styles.compare_table_column_cell)}>
                    {aircraft.production_end}
                  </span>
                  <span className={cn(styles.compare_table_column_cell)}>
                    {aircraft.in_production ? "Yes" : "No"}
                  </span>
                  <span className={cn(styles.compare_table_column_cell)}>
                    {aircraft.number_made === 0
                      ? "-"
                      : numeral(aircraft.number_made).format("0,0")}
                  </span>
                  <span className={cn(styles.compare_table_column_cell)}>
                    {aircraft.number_in_service === 0
                      ? "-"
                      : numeral(aircraft.number_in_service).format("0,0")}
                  </span>
                  <span className={cn(styles.compare_table_column_cell)}>
                    {aircraft.serial_numbers === 0
                      ? "-"
                      : numeral(aircraft.serial_numbers).format("0,0")}
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
export default BasicInfo;
