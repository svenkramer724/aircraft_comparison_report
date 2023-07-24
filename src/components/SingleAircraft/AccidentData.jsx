import cn from "classnames";
import global from "../styles/global.module.scss";
import styles from "./styles/styles.module.scss";
import SectionHeader from "../shared/SectionHeader";
import { useEffect, useState } from "react";

const AccidentData = ({ params, nbAccidents, aircraftName }) => {
  const [accidents, setAccidents] = useState([]);
  const [nbSingleAccidents, setnbSingleAccidents] = useState(0);

  useEffect(() => {
    if (params !== undefined) {
      for (var i = 0; i < params.length; i++) {
        if (params[i].aircraft_incident === aircraftName) {
          accidents.push(params[i]);
          setnbSingleAccidents(nbSingleAccidents + 1);
        }
      }
    }
  }, [params]);

  return (
    <section className={cn(global.section)}>
      <SectionHeader title="Accident Database" />
      <main className={cn(styles.main_accidentData)}>
        <table className={cn(global.table)}>
          <thead>
            <tr className={cn(global.tr)}>
              <th className={cn(global._padding)}>Country</th>
              <th>Reg</th>
              <th>Date</th>
              <th>Occurrence</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {accidents.length !== 0 ? (
              accidents.map((accident) => {
                return (
                  <tr className={cn(global.tr)} key={accident.reg}>
                    <td className={cn(global._padding)}>{accident.country}</td>
                    <td>{accident.reg}</td>
                    <td>{accident.date}</td>
                    <td>{accident.occurrence}</td>
                    <td>{accident.details}</td>
                  </tr>
                );
              })
            ) : (
              <p>No Known Accident History</p>
            )}
          </tbody>
        </table>
        {/* <div className={cn(global.pagination_container, global.pdf_hidden)}>
          <span> Prev </span>
          <span>1</span>
          <span>2</span>
          <span>...</span>
          <span>Next</span>
        </div> */}
        <p className={cn(styles.total_aircraft, global.pdf_hidden)}>
          Total Accidents: {accidents.length}
        </p>
        <p className={cn(global.pdf_only, global.pdf_accidentData_text)}>
          For a full list of assumptions and how data is collected, please visit
          compareprivateplanes.com
        </p>
      </main>
    </section>
  );
};

export default AccidentData;
