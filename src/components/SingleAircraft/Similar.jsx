import cn from "classnames";
import global from "..//styles/global.module.scss";
import styles from "./styles/styles.module.scss";
import SectionHeader from "../shared/SectionHeader";
import { Link } from "react-router-dom";

const Similar = ({ params }) => {
  return (
    <section className={cn(global.section, global.pdf_hidden)}>
      <SectionHeader title="Similar Aircraft" />
      <main className={cn(styles.similar)}>
        {params?.length ? (
          params?.map((aircraft) => (
            <Link
              to={`/${aircraft.aircraft_name.replace(/\s/g, "-")}`}
              state={{
                aircraftData: aircraft,
              }}
            >
              <div key={aircraft.aircraft_id} className={cn(styles.suggestion)}>
                <div className={cn(styles.image_container)}>
                  <img src={`${aircraft?.image_name}`} alt="" />
                </div>
                <h5>{aircraft.aircraft_name}</h5>
              </div>
            </Link>
          ))
        ) : (
          <p>No Similar Aircraft</p>
        )}
      </main>
    </section>
  );
};

export default Similar;
