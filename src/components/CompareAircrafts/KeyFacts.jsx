import React from "react";
import cn from "classnames";
import global from "../styles/global.module.scss";
import styles from "./styles/styles.module.scss";
import SectionHeader from "../shared/SectionHeader";
import { useState, useEffect } from "react";
const KeyFacts = ({ data, onRemoveAircraft }) => {
  const [aircraftsData, setAircraftsData] = useState(data);
  const [keyFacts0, setKeyFacts0] = useState([]);
  const [keyFacts1, setKeyFacts1] = useState([]);
  const [keyFacts2, setKeyFacts2] = useState([]);

  const removeAircraft = (aircraft) => {
    if (aircraftsData.length === 1)
      return alert("You must have at least one aircraft to compare");
    const data = aircraftsData.filter((value) => value !== aircraft);
    setAircraftsData(data);
    onRemoveAircraft(data);
  };

  useEffect(() => {
    if (aircraftsData[0] !== undefined) {
      setKeyFacts0(aircraftsData[0].key_facts.split("\n"));
      setKeyFacts1(aircraftsData[1].key_facts.split("\n"));
      if (aircraftsData[2] !== undefined) {
        setKeyFacts2(aircraftsData[2].key_facts.split("\n"));
      }
    } else {
    }
  }, [data[2]]);

  return (
    <>
      <section className={cn(global.section, global.page_break)}>
        <SectionHeader title="Key Facts" />
        <main className={cn(styles.key_facts_container)}>
          <div className={cn(styles.facts)}>
            {aircraftsData.map((aircraft, index) => {
              return (
                <div className={cn(styles.fact)} key={aircraft.aircraft_id}>
                  <h2>{aircraft.aircraft_name}</h2>
                  {/* at least two aircrafts, this is just for testing */}
                  {aircraftsData.length > 2 ? (
                    <button
                      className={cn(styles.btn)}
                      onClick={() => removeAircraft(aircraft)}
                    >
                      Remove Aircraft
                    </button>
                  ) : (
                    ""
                  )}
                  <div className={cn(styles.image_container)}>
                    <img src={aircraft.image_name} alt="" />
                  </div>
                  <ul>
                    {index === 0
                      ? keyFacts0.map((fact, index) => {
                          return <li key={index}>{fact}</li>;
                        })
                      : index === 1
                      ? keyFacts1.map((fact, index) => {
                          return <li key={index}>{fact}</li>;
                        })
                      : keyFacts2.map((fact, index) => {
                          return <li key={index}>{fact}</li>;
                        })}
                  </ul>
                </div>
              );
            })}
          </div>
        </main>
      </section>
    </>
  );
};
export default KeyFacts;
