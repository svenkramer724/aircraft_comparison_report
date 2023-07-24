import cn from "classnames";
import global from "../styles/global.module.scss";
import SectionHeader from "../shared/SectionHeader";
import numeral from "numeral";
import { useEffect, useState } from "react";
import axios from "axios";

const BasicInfo = ({ params, currency }) => {
  const [info, setInfo] = useState([]);
  const [from, setFrom] = useState("usd");
  const [to, setTo] = useState("usd");
  const [conversionRate, setConversionRate] = useState(0);

  useEffect(() => {
    axios
      .get(
        `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${from}.json`
      )
      .then((res) => {
        setInfo(res.data[from]);
      });
  }, [from]);

  useEffect(() => {
    currency === "USD"
      ? setTo("usd")
      : currency === "GBP"
      ? setTo("gbp")
      : setTo("eur");
    setFrom("usd");
    setConversionRate(info[to]);
  }, [info, currency, to]);

  return (
    <section className={cn(global.section,global.new_page)}>
      <SectionHeader title="Basic Info" />
      <main>
        <div className={cn(global.details_table)}>
          <div className={cn(global.column)}>
            <div className={cn(global.rows)}>
              <div className={cn(global.row)}>
                <span
                  className={cn(
                    global.key,
                    global.key_realign,
                    global.key,
                    global.key_realign_realign
                  )}
                >
                  Production Start
                </span>
                <span>
                  {params.production_start === ""
                    ? "-"
                    : params.production_start}
                </span>
              </div>
              <div className={cn(global.row)}>
                <span
                  className={cn(
                    global.key,
                    global.key_realign,
                    global.key,
                    global.key_realign_realign
                  )}
                >
                  Production End
                </span>
                <span>
                  {params.production_end === "" ? "-" : params.production_end}
                </span>
              </div>
              <div className={cn(global.row)}>
                <span
                  className={cn(
                    global.key,
                    global.key_realign,
                    global.key,
                    global.key_realign_realign
                  )}
                >
                  In Production?
                </span>
                <span>{params.in_production ? "Yes" : "No"}</span>
              </div>
            </div>
          </div>
          <span className={cn(global.seperator)}></span>
          <div className={cn(global.column)}>
            <div className={cn(global.rows)}>
              <div className={cn(global.row)}>
                <span
                  className={cn(
                    global.key,
                    global.key_realign,
                    global.key,
                    global.key_realign_realign
                  )}
                >
                  Number Made
                </span>
                <span>
                  {params.number_made === 0
                    ? "-"
                    : numeral(params.number_made).format("0,0")}
                </span>
              </div>
              <div className={cn(global.row)}>
                <span
                  className={cn(
                    global.key,
                    global.key_realign,
                    global.key,
                    global.key_realign_realign
                  )}
                >
                  Number in Service
                </span>
                <span>
                  {params.number_in_service === 0
                    ? "-"
                    : numeral(params.number_in_service).format("0,0")}
                </span>
              </div>
              <div className={cn(global.row)}>
                <span className={cn(global.key, global.key_realign)}>
                  Average Preowned
                </span>
                <span>
                  {params.average_pre_owned === 0
                    ? "-"
                    : currency === "USD"
                    ? "$" + numeral(params.average_pre_owned).format("0,0")
                    : currency === "EUR"
                    ? "€" +
                      numeral(params.average_pre_owned * conversionRate).format(
                        "0,0"
                      )
                    : "£" +
                      numeral(params.average_pre_owned * conversionRate).format(
                        "0,0"
                      )}
                </span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </section>
  );
};

export default BasicInfo;
