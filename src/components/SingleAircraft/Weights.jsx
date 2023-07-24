import cn from "classnames";
import global from "../styles/global.module.scss";
import SectionHeader from "../shared/SectionHeader";
import numeral from "numeral";

const Weights = ({ params, unit }) => {
  return (
    <section className={cn(global.section,global.new_page)}>
      <SectionHeader title="Weights" />
      <main>
        <div className={cn(global.details_table)}>
          <div className={cn(global.column)}>
            <div className={cn(global.rows)}>
              <div className={cn(global.row)}>
                <span className={cn(global.key, global.key_realign)}>
                  Max Take-Off Weight{" "}
                  {unit === "Imperial Units" ? "(lbs)" : "(KG)"}
                </span>
                <span>
                  {unit === "Imperial Units"
                    ? params.MTOW_lbs === 0
                      ? "-"
                      : numeral(params.MTOW_lbs).format("0,0")
                    : params.MTOW_kgs === 0
                    ? "-"
                    : numeral(params.MTOW_kgs).format("0,0")}
                </span>
              </div>
              <div className={cn(global.row)}>
                <span className={cn(global.key, global.key_realign)}>
                  Max Landing Weight{" "}
                  {unit === "Imperial Units" ? "(lbs)" : "(KG)"}
                </span>
                <span>
                  {unit === "Imperial Units"
                    ? params.max_landing_weight_lbs === 0
                      ? "-"
                      : numeral(params.max_landing_weight_lbs).format("0,0")
                    : params.max_landing_weight_kgs === 0
                    ? "-"
                    : numeral(params.max_landing_weight_kgs).format("0,0")}
                </span>
              </div>
              <div className={cn(global.row)}>
                <span className={cn(global.key, global.key_realign)}>
                  Max Payload {unit === "Imperial Units" ? "(lbs)" : "(KG)"}
                </span>
                <span>
                  {unit === "Imperial Units"
                    ? params.max_payload_lbs === 0
                      ? "-"
                      : numeral(params.max_payload_lbs).format("0,0")
                    : params.max_payload_kgs === 0
                    ? "-"
                    : numeral(params.max_payload_kgs).format("0,0")}
                </span>
              </div>
              <div className={cn(global.row)}>
                <span className={cn(global.key, global.key_realign)}>
                  Basic Operating Weight{" "}
                  {unit === "Imperial Units" ? "(lbs)" : "(KG)"}
                </span>
                <span>
                  {unit === "Imperial Units"
                    ? params.basic_operating_weight_lbs === 0
                      ? "-"
                      : numeral(params.basic_operating_weight_lbs).format("0,0")
                    : params.basic_operating_weight_kgs === 0
                    ? "-"
                    : numeral(params.basic_operating_weight_kgs).format("0,0")}
                </span>
              </div>
            </div>
          </div>
          <span className={cn(global.seperator)}></span>
          <div className={cn(global.column)}>
            <div className={cn(global.rows)}>
              <div className={cn(global.row)}>
                <span className={cn(global.key, global.key_realign)}>
                  Max Ramp Weight {unit === "Imperial Units" ? "(lbs)" : "(KG)"}
                </span>
                <span>
                  {unit === "Imperial Units"
                    ? params.max_ramp_weight_lbs === 0
                      ? "-"
                      : numeral(params.max_ramp_weight_lbs).format("0,0")
                    : params.max_ramp_weight_kgs === 0
                    ? "-"
                    : numeral(params.max_ramp_weight_kgs).format("0,0")}
                </span>
              </div>
              <div className={cn(global.row)}>
                <span className={cn(global.key, global.key_realign)}>
                  Available Fuel {unit === "Imperial Units" ? "(lbs)" : "(KG)"}
                </span>
                <span>
                  {unit === "Imperial Units"
                    ? params.available_fuel_lbs === 0
                      ? "-"
                      : numeral(params.available_fuel_lbs).format("0,0")
                    : params.available_fuel_kgs === 0
                    ? "-"
                    : numeral(params.available_fuel_kgs).format("0,0")}
                </span>
              </div>
              <div className={cn(global.row)}>
                <span className={cn(global.key, global.key_realign)}>
                  Useful Payload {unit === "Imperial Units" ? "(lbs)" : "(KG)"}
                </span>
                <span>
                  {unit === "Imperial Units"
                    ? params.useful_load_lbs === 0
                      ? "-"
                      : numeral(params.useful_load_lbs).format("0,0")
                    : params.useful_payloads_kgs === 0
                    ? "-"
                    : numeral(params.useful_payloads_kgs).format("0,0")}
                </span>
              </div>
              <div className={cn(global.row)}>
                <span className={cn(global.key, global.key_realign)}>
                  Baggage Weight {unit === "Imperial Units" ? "(lbs)" : "(KG)"}
                </span>
                <span>
                  {unit === "Imperial Units"
                    ? params.baggage_weight_lbs === 0
                      ? "-"
                      : numeral(params.baggage_weight_lbs).format("0,0")
                    : params.baggage_weight_kgs === 0
                    ? "-"
                    : numeral(params.baggage_weight_kgs).format("0,0")}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ----------------- */}
        <div className={cn(global.table_container)}>
          <div className={cn(global.details_table)}>
            <div className={cn(global.column)}>
              <span className={cn(global.column_header)}>
                Baggage Capacity{" "}
                {unit === "Imperial Units" ? "(Cubic Feet)" : "(Cubic Meters)"}
              </span>
              <div className={cn(global.rows)}>
                <div className={cn(global.row)}>
                  <span className={cn(global.key)}>Total</span>
                  <span className={cn(global.key)}>Internal</span>
                  <span className={cn(global.key)}>External</span>
                </div>
                <div className={cn(global.row)}>
                  <span className={cn(global.value)}>
                    {unit === "Imperial Units"
                      ? params.baggage_capacity_CF === 0
                        ? "-"
                        : params.baggage_capacity_CF
                      : params.baggage_capacity_cubicmeters === 0
                      ? "-"
                      : params.baggage_capacity_cubicmeters}
                  </span>
                  <span className={cn(global.value)}>
                    {unit === "Imperial Units"
                      ? params.internal_baggage_CF === 0
                        ? "-"
                        : params.internal_baggage_CF
                      : params.internal_baggage_cubicmeters === 0
                      ? "-"
                      : params.internal_baggage_cubicmeters}{" "}
                  </span>
                  <span className={cn(global.value)}>
                    {unit === "Imperial Units"
                      ? params.external_baggage_CF === 0
                        ? "-"
                        : params.external_baggage_CF
                      : params.external_baggage_cubicmeters === 0
                      ? "-"
                      : params.external_baggage_cubicmeters}
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

export default Weights;
