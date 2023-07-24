import cn from "classnames";
import global from "../styles/global.module.scss";
import SectionHeader from "../shared/SectionHeader";
const Features = ({ params }) => {
  return (
    <section className={cn(global.section, global.new_page)}>
      <SectionHeader title="Features" />
      <main>
        <div className={cn(global.details_table)}>
          <div className={cn(global.column)}>
            <div className={cn(global.rows)}>
              <div className={cn(global.row)}>
                <span className={cn(global.key, global.key_realign)}>
                  Minimum Pilots
                </span>
                <span>
                  {params.minimum_pilots === 0 ? "-" : params.minimum_pilots}
                </span>
              </div>
              <div className={cn(global.row)}>
                <span className={cn(global.key, global.key_realign)}>
                  Toilet Available
                </span>
                <span>{params.toilet ? "Yes" : "No"}</span>
              </div>
              <div className={cn(global.row)}>
                <span className={cn(global.key, global.key_realign)}>
                  Shower Available
                </span>
                <span>{params.shower ? "Yes" : "No"}</span>
              </div>
              <div className={cn(global.row)}>
                <span className={cn(global.key, global.key_realign)}>
                  Space to Sleep
                </span>
                <span>{params.space_to_sleep ? "Yes" : "No"}</span>
              </div>
            </div>
          </div>
          <span className={cn(global.seperator)}></span>
          <div className={cn(global.column)}>
            <div className={cn(global.rows)}>
              <div className={cn(global.row)}>
                <span className={cn(global.key, global.key_realign)}>
                  Typical Avionics Suite
                </span>
                <span>{params.typical_avionic_suite}</span>
              </div>
              <div className={cn(global.row)}>
                <span className={cn(global.key, global.key_realign)}>
                  Flat Floor
                </span>
                <span>{params.flat_floor ? "Yes" : "No"}</span>
              </div>
              <div className={cn(global.row)}>
                <span className={cn(global.key, global.key_realign)}>
                  Inflight Baggage Access
                </span>
                <span>{params.baggage_access ? "Yes" : "No"}</span>
              </div>
              <div className={cn(global.row)}>
                <span className={cn(global.key, global.key_realign)}>
                  Dedicated Bedroom
                </span>
                <span>{params.dedicated_bed ? "Yes" : "No"}</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </section>
  );
};

export default Features;
