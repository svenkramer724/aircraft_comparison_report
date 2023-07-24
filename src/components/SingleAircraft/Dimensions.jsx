import cn from "classnames";
import global from "../styles/global.module.scss";
import SectionHeader from "../shared/SectionHeader";

const Dimensions = ({ params, unit }) => {
  return (
    <section className={cn(global.section)}>
      <SectionHeader title="Dimensions" />
      <main className={cn(global.flex_main)}>
        <div className={cn(global.table_container)}>
          <div className={cn(global.details_table)}>
            <div className={cn(global.column)}>
              <span className={cn(global.column_header)}>
                Exterior Dimensions{" "}
                {unit === "Imperial Units" ? "(Feet)" : "(Meters)"}
              </span>
              <div className={cn(global.rows_dimensions)}>
                <div className={cn(global.row)}>
                  <span className={cn(global.key)}>Length</span>
                  <span className={cn(global.key)}>Height</span>
                  <span className={cn(global.key)}>Wingspan</span>
                </div>
                <div className={cn(global.row)}>
                  <span className={cn(global.value)}>
                    {params.ext_length_feet === 0
                      ? "-"
                      : unit === "Imperial Units"
                      ? params.ext_length_feet
                      : params.ext_length_meters}
                  </span>
                  <span className={cn(global.value)}>
                    {params.exterior_height_feet === 0
                      ? "-"
                      : unit === "Imperial Units"
                      ? params.exterior_height_feet
                      : params.ext_height_meters}
                  </span>
                  <span className={cn(global.value)}>
                    {params.wingspan_feet === 0
                      ? "-"
                      : unit === "Imperial Units"
                      ? params.wingspan_feet
                      : params.wingspan_meters}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <span className={cn(global.line)}></span>
        <div className={cn(global.table_container)}>
          <div className={cn(global.details_table)}>
            <div className={cn(global.column)}>
              <span className={cn(global.column_header)}>
                Interior Dimensions{" "}
                {unit === "Imperial Units" ? "(Feet)" : "(Meters)"}
              </span>
              <div className={cn(global.rows_dimensions)}>
                <div className={cn(global.row)}>
                  <span className={cn(global.key)}>Length</span>
                  <span className={cn(global.key)}>Height</span>
                  <span className={cn(global.key)}>Width</span>
                </div>
                <div className={cn(global.row)}>
                  <span className={cn(global.value)}>
                    {unit === "Imperial Units"
                      ? params.int_length_feet === 0
                        ? "-"
                        : params.int_length_feet
                      : params.int_length_meters === 0
                      ? "-"
                      : params.int_length_meters}
                  </span>
                  <span className={cn(global.value)}>
                    {unit === "Imperial Units"
                      ? params.int_height_feet === 0
                        ? "-"
                        : params.int_height_feet
                      : params.int_height_meters === 0
                      ? "-"
                      : params.int_height_meters}
                  </span>
                  <span className={cn(global.value)}>
                    {unit === "Imperial Units"
                      ? params.int_width_feet === 0
                        ? "-"
                        : params.int_width_feet
                      : params.int_width_meters === 0
                      ? "-"
                      : params.int_width_meters}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <span className={cn(global.line)}></span>
        <div className={cn(global.table_container)}>
          <div className={cn(global.details_table)}>
            <div className={cn(global.column)}>
              <span className={cn(global.column_header)}>
                Door Dimensions{" "}
                {unit === "Imperial Units" ? "(Feet)" : "(Meters)"}
              </span>
              <div className={cn(global.rows_dimensions)}>
                <div className={cn(global.row)}>
                  <span className={cn(global.key)}>Height</span>
                  <span className={cn(global.key)}>Width</span>
                </div>
                <div className={cn(global.row)}>
                  <span className={cn(global.value)}>
                    {unit === "Imperial Units"
                      ? params.door_height_feet === 0
                        ? "-"
                        : params.door_height_feet
                      : params.door_height_meters === 0
                      ? "-"
                      : params.door_height_meters}
                  </span>
                  <span className={cn(global.value)}>
                    {unit === "Imperial Units"
                      ? params.door_width_feet === 0
                        ? "-"
                        : params.door_width_feet
                      : params.door_width_meters === 0
                      ? "-"
                      : params.door_width_meters}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </section>
  );
};

export default Dimensions;
