import cn from "classnames";
import global from "../styles/global.module.scss";
import styles from "./styles/styles.module.scss";
import SectionHeader from "../shared/SectionHeader";
import numeral from "numeral";

const Maintenance = ({ params }) => {
  return (
    <section className={cn(global.section) + " " + global.page_break}>
      <SectionHeader title="Maintenance" />
      <main>
        <div className={cn(styles.timeline)}>
          <div className={cn(styles.container, styles.left)}>
            <div className={cn(styles.content)}>
              <h2>A Check</h2>
              <p> {params.a_check === "0" ? "-" : params.a_check}</p>
            </div>
          </div>
          <div className={cn(styles.container, styles.right)}>
            <div className={cn(styles.content)}>
              <h2>B Check</h2>
              <p> {params.b_check === "0" ? "-" : params.b_check}</p>
            </div>
          </div>
          <div className={cn(styles.container, styles.left)}>
            <div className={cn(styles.content)}>
              <h2>C Check</h2>
              <p> {params.c_check === "0" ? "-" : params.c_check}</p>
            </div>
          </div>
          {params.d_check !== "" ? (
            <div className={cn(styles.container, styles.right)}>
              <div className={cn(styles.content)}>
                <h2>D Check</h2>
                <p> {params.d_check === "0" ? "-" : params.d_check}</p>
              </div>
            </div>
          ) : (
            <div></div>
          )}
        </div>
      </main>
    </section>
  );
};

export default Maintenance;
