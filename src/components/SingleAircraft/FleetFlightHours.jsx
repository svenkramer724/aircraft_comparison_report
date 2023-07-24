import cn from "classnames";
import global from "../styles/global.module.scss";
import styles from "./styles/styles.module.scss";
import SectionHeader from "../shared/SectionHeader";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const FleetFlightHours = ({ params }) => {
  return (
    <section className={cn(global.section, global.page_break)}>
      <SectionHeader title="Fleet Flight Hour" />
      <main>
        <iframe
          src={params.fleet_flight_link}
          title="Fleet flight per hour"
          frameBorder="0"
          className={cn(styles.ffh_frame)}
          scrolling="yes"
        ></iframe>
      </main>
    </section>
  );
};

export default FleetFlightHours;
