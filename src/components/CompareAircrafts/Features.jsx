import React from "react";
import cn from "classnames";
import global from "../styles/global.module.scss";
import styles from "./styles/styles.module.scss";
import numeral from "numeral";
import SectionHeader from "../shared/SectionHeader";

const Features = ({ data, currency, country, unit }) => {
  return (
    <>
      <section className={cn(global.section, global.page_break)}>
        <SectionHeader title="Features" />
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
                Minimum Pilots
              </span>
              <span
                className={cn(
                  styles.compare_table_column_cell,
                  styles.table_key
                )}
              >
                Avionics Suite
              </span>
              <span
                className={cn(
                  styles.compare_table_column_cell,
                  styles.table_key
                )}
              >
                Toilet Available
              </span>
              <span
                className={cn(
                  styles.compare_table_column_cell,
                  styles.table_key
                )}
              >
                Flat Floor
              </span>
              <span
                className={cn(
                  styles.compare_table_column_cell,
                  styles.table_key
                )}
              >
                Inflight Baggage Access
              </span>
              <span
                className={cn(
                  styles.compare_table_column_cell,
                  styles.table_key
                )}
              >
                Shower Available
              </span>
              <span
                className={cn(
                  styles.compare_table_column_cell,
                  styles.table_key
                )}
              >
                Space to Sleep
              </span>
              <span
                className={cn(
                  styles.compare_table_column_cell,
                  styles.table_key
                )}
              >
                Dedicated Bedroom
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
                    {aircraft.minimum_pilots === 0
                      ? "-"
                      : aircraft.minimum_pilots}
                  </span>
                  <span className={cn(styles.compare_table_column_cell)}>
                    {aircraft.typical_avionic_suite}
                  </span>
                  <span className={cn(styles.compare_table_column_cell)}>
                    {aircraft.toilet ? "Yes" : "No"}
                  </span>
                  <span className={cn(styles.compare_table_column_cell)}>
                    {aircraft.flat_floor ? "Yes" : "No"}
                  </span>
                  <span className={cn(styles.compare_table_column_cell)}>
                    {aircraft.baggage_access ? "Yes" : "No"}
                  </span>
                  <span className={cn(styles.compare_table_column_cell)}>
                    {aircraft.shower ? "Yes" : "No"}
                  </span>
                  <span className={cn(styles.compare_table_column_cell)}>
                    {aircraft.space_to_sleep ? "Yes" : "No"}
                  </span>
                  <span className={cn(styles.compare_table_column_cell)}>
                    {aircraft.dedicated_bed ? "Yes" : "No"}
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
export default Features;
