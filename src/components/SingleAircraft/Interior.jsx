import cn from "classnames";
import global from "../styles/global.module.scss";
import SectionHeader from "../shared/SectionHeader";
import numeral from "numeral";

const Interior = ({ params, unit }) => {
  return (
    <section className={cn(global.section, global.page_break)}>
      <SectionHeader title="Interior" />
      <main>
        <div className={cn(global.details_table)}>
          <div className={cn(global.column)}>
            <div className={cn(global.rows)}>
              <div className={cn(global.row)}>
                <span className={cn(global.key, global.key_realign)}>
                  Maximum Passengers
                </span>
                <span>
                  {params.max_pax === 0
                    ? "-"
                    : numeral(params.max_pax).format("0,0")}
                </span>
              </div>
              <div className={cn(global.row)}>
                <span className={cn(global.key, global.key_realign)}>
                  Typical Passengers
                </span>
                <span>
                  {params.typical_pax === 0
                    ? "-"
                    : numeral(params.typical_pax).format("0,0")}
                </span>
              </div>
              <div className={cn(global.row)}>
                <span className={cn(global.key, global.key_realign)}>
                  Number of Living Zones
                </span>
                <span>
                  {params.living_zones === 0
                    ? "-"
                    : numeral(params.living_zones).format("0,0")}
                </span>
              </div>
              <div className={cn(global.row)}>
                <span className={cn(global.key, global.key_realign)}>
                  Cabin Noise (dB)
                </span>
                <span>
                  {params.cabin_noise === 0
                    ? "-"
                    : numeral(params.cabin_noise).format("0,0")}
                </span>
              </div>
            </div>
          </div>
          <span className={cn(global.seperator)}></span>
          <div className={cn(global.column)}>
            <div className={cn(global.rows)}>
              <div className={cn(global.row)}>
                <span className={cn(global.key, global.key_realign)}>
                  Max Cabin Altitude{" "}
                  {unit === "Imperial Units" ? "(Feet)" : "(Meters)"}
                </span>
                <span>
                  {unit === "Imperial Units"
                    ? params.cabin_altitude === 0
                      ? "-"
                      : numeral(params.cabin_altitude).format("0,0")
                    : params.cabin_altitude_ceiling_meters === 0
                    ? "-"
                    : numeral(params.cabin_altitude_ceiling_meters).format(
                        "0,0"
                      )}
                </span>
              </div>
              <div className={cn(global.row)}>
                <span className={cn(global.key, global.key_realign)}>
                  Sea Level Cabin{" "}
                  {unit === "Imperial Units" ? "(Feet)" : "(Meters)"}
                </span>
                <span>
                  {unit === "Imperial Units"
                    ? params.sea_level_cabin === 0
                      ? "-"
                      : numeral(params.sea_level_cabin).format("0,0")
                    : params.altitude_sea_level_meters === 0
                    ? "-"
                    : numeral(params.altitude_sea_level_meters).format("0,0")}
                </span>
              </div>
              <div className={cn(global.row)}>
                <span className={cn(global.key, global.key_realign)}>
                  Pressure Differential{" "}
                  {unit === "Imperial Units" ? "(PSI)" : "(kPa)"}
                </span>
                <span>
                  {unit === "Imperial Units"
                    ? params.pressure_differential_psi === 0
                      ? "-"
                      : numeral(params.pressure_differential_psi).format("0,0")
                    : params.cabin_pressure === 0
                    ? "-"
                    : numeral(params.cabin_pressure).format("0,0")}
                </span>
              </div>
              <div className={cn(global.row)}>
                <span className={cn(global.key, global.key_realign)}>
                  Cabin Volume{" "}
                  {unit === "Imperial Units"
                    ? "(Cubic Feet)"
                    : "(Cubic Meters)"}
                </span>
                <span>
                  {unit === "Imperial Units"
                    ? params.cabin_volume_CF === 0
                      ? "-"
                      : numeral(params.cabin_volume_CF).format("0,0")
                    : params.cabin_volume_cubicmeters === 0
                    ? "-"
                    : numeral(params.cabin_volume_cubicmeters).format("0,0")}
                </span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </section>
  );
};

export default Interior;
