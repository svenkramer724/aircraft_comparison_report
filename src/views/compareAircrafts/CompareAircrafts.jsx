import global from "../../components/styles/global.module.scss";
import pdf from "../../components/styles/pdf.module.scss";
import cn from "classnames";

import logo from "../../assets/logo.png";
import scopedStyles from "./styles.module.scss";

import Header from "../../components/common/header";
import AquisitionCost from "../../components/CompareAircrafts/AquisitionCost";
import BascInfo from "../../components/CompareAircrafts/BasicInfo";
import Dimensions from "../../components/CompareAircrafts/Dimensions";
import Features from "../../components/CompareAircrafts/Features";
import HistoricalMarket from "../../components/CompareAircrafts/HistoricalMarket";
import Interior from "../../components/CompareAircrafts/Interior";
import KeyFacts from "../../components/CompareAircrafts/KeyFacts";
import OwnershipCost from "../../components/CompareAircrafts/OwnershipCost";
import Performance from "../../components/CompareAircrafts/Performance";
import Powerplant from "../../components/CompareAircrafts/Powerplant";
import Range from "../../components/CompareAircrafts/Range";
import Weights from "../../components/CompareAircrafts/Weight";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { searchService } from "../../utils/hooks/utils";

import styles from "./styles.module.scss";
import Dropdown from "../../components/common/Dropdown";
import {
  COUNTRY_OPTIONS,
  CURRENCY_OPTIONS,
  UNIT_OPTIONS,
} from "../../utils/constants/app-constants";
import Modal from "../../components/common/modal/Modal";
import aircraftService from "../../services/aircraft-service";
import Footer from "../../components/common/footer";

const CompareAircrafts = () => {
  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  const [unit, setUnit] = useState(UNIT_OPTIONS[0]);
  const [currency, setCurrency] = useState(CURRENCY_OPTIONS[0]);
  const [country, setCountry] = useState(COUNTRY_OPTIONS[0]);
  const [openModal, setOpenModal] = useState(false);
  const location = useLocation();
  const aircrafts = location.state;
  const [aircraftsData, setAircraftsData] = useState(aircrafts);
  const [allaircraftsData, setAllAircraftsData] = useState([]);
  const [filteredAircrafts, setFilteredAircrafts] = useState([]);
  const [searchText, setsearchText] = useState("");
  const [name, setName] = useState('')
  const [company, setCompany] = useState('')
  const [companyLogo, setCompanyLogo] = useState('')
  const [nbHours,setNbHours] = useState(0)
  const [selectedImage, setSelectedImage] = useState(null);
  const [showExport, setShowExport] = useState(false)
  const [prepared, setPrepared] = useState('')

  const onCurrencyChanged = (val) => {
    setCurrency(val);
  };

  useEffect(() => {
    const tmp = allaircraftsData.filter(
      (aircraft) =>
        aircraft.aircraft_id !== aircraftsData[0].aircraft_id &&
        aircraft.aircraft_id !== aircraftsData[1].aircraft_id
    );
    setFilteredAircrafts(tmp);
  }, []);

  useEffect(() => {
    aircraftService.getAircrafts().then((data) => setAllAircraftsData(data));
  }, []);

  const onUnitChanged = (val) => {
    setUnit(val);
  };

  const onCountryChanged = (val) => {
    setCountry(val);
  };

  const onRemoveAircraft = (data) => {
    setAircraftsData(data);
  };
  let selectedAircafts = aircraftsData;

  const onSelect = (e, aircraft) => {
    if (selectedAircafts.includes(aircraft)) {
      e.target.checked = false;
      selectedAircafts.pop(aircraft);
      return;
    }
    if (selectedAircafts.length >= 3) {
      alert("Max 3");
      e.target.checked = false;
      return;
    }

    selectedAircafts.push(aircraft);
  };

  const onCompare = () => {
    if (selectedAircafts.length > 3) {
      alert("You can add only one aircraft");
      return;
    }
    setAircraftsData(selectedAircafts);
    setOpenModal(!openModal);
  };

  const handleSearchChanged = async (value) => {
    setsearchText(value);
    const res = await searchService(
      `/api/search?aircraft_name=${value}&category=&in_production=&aircraft_manufacturer=&max_pax=120&max_pax_min=0&range_NM_min=0&range_NM=8000&high_cruise_knots_min=0&high_cruise_knots=12312&max_altitude_feet_min=0&max_altitude_feet=60000&hourly_fuel_burn_GPH_min=0&hourly_fuel_burn_GPH=50000&baggage_capacity_CF_min=0&baggage_capacity_CF=10000&TO_distance_feet_min=0&TO_distance_feet=10000&landing_distance_feet_min=0&landing_distance_feet=10000&annual_cost_min=0&annual_cost=9000000&estimated_hourly_charter_min=0&estimated_hourly_charter=1000000&new_purchase_min=0&new_purchase=100000000&average_pre_owned_min=0&average_pre_owned=100000000`
    );
    setFilteredAircrafts(res);
  };

  return (
    <>
      <Header />
      {showExport && <div className={cn(pdf.pdf_window)}>
        <div >
          <div className={cn(pdf.export_names)}>
            <div className={cn(pdf.export_inside)}>
              <input type="text" placeholder="Report Prepared For" value={prepared} onChange={(e) => setPrepared(e.target.value)} className={pdf.export_button} />
              <input type="text" placeholder="Your Name" value={name} onChange={(e) => setName(e.target.value)} className={pdf.export_button} />
            </div>
            <div className={cn(pdf.export_inside)}>
              <input type="text" placeholder="Your Company Name" value={company} onChange={(e) => setCompany(e.target.value)} className={pdf.export_button} />
              {/* <input type="text" placeholder="Company logo url" value={companyLogo} onChange={(e) => setCompanyLogo(e.target.value)} className={pdf.export_button} /> */}
              <input
                className={pdf.pdf_export_button}
                type="file"
                name="myImage"
                accept="image/*"
                // name="myImage"
                onChange={(event) => {
                  console.log(event.target.files[0]);
                  setSelectedImage(event.target.files[0]);
                }}
              />
            </div>
            <div className={cn(pdf.export_inside)}>
            <input
                type="button"
                className={styles.header_btn}
                style={{ color: 'red' }}
                value="Cancel"
                onClick={() => { setShowExport(false); setSelectedImage(null) }}
              />{" "}
              <input
                type="button"
                className={styles.header_btn}
                value="Export Report"
                onClick={() => { window.print(); setShowExport(false) }}
              />{" "}
            </div>
          </div>
        </div>

      </div>}
      <div className={cn(pdf.for_pdf)}>
        <div className={pdf.first_page}>
          <div className={pdf.logo_container}>
            <img src={logo} alt="logo" />
          </div>
          {/* <h3>Compare Private Planes</h3> */}
          <h1>Aircraft Comparison Report</h1>
          {name && <h3 style={{ marginTop: '-1.5rem' }}>{`Prepared for ${name}`}</h3>}
          <div className={cn(pdf.sample_aircrafts)}>
            {aircraftsData.map((aircraft, index) => {
              return (
                <div className={cn(pdf.sample_aircraft)} key={index}>
                  <div className={cn(pdf.image_container)}>
                    <img src={aircraft.image_name} alt="aircraft" />
                  </div>
                  <div className={cn(pdf.sample_aircraft_info)}>
                    <h4>{aircraft.aircraft_name}</h4>
                    <p>{aircraft.manufacturer}</p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
        <div style={{ display: 'flex', gap: '150px', alignItems: 'center' }}>
        {selectedImage && <img src={URL.createObjectURL(selectedImage)} width={200} />}
          {company && <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '0.5rem' }}>
            <h3>{name}</h3>
            <h3>{company}</h3>
          </div>}
        </div>
        <footer className={cn(pdf.page_footer)}>
          <center>
            <p>&#169; Magic Lagoon Limited</p>
            <p>{new Date().getFullYear()}</p>
          </center>
        </footer>
      </div>
      <div className={pdf.details_page}>
          <p>This report has been generated using Compare Private Planes premium service. Data is to be used for comparison purposes only and should not be used for flight planning.  Costs are estimates only.</p>
          <p>For a full list of assumptions and the methodology of data collection, please visit compareprivateplanes.com
            Compare Private Planes is wholly owned and operated by Magic Lagoon Limited.
          </p>



          <p>Options selected for this report are:</p>
          <p><span style={{ fontWeight: 'bold' }}>Region: </span>{country}</p>
          <p><span style={{ fontWeight: 'bold' }}>Currency: </span>{currency}</p>
          <p><span style={{ fontWeight: 'bold' }}>Units: </span>{unit}</p>
          <p><span style={{ fontWeight: 'bold' }}>Estimated Annual Flight Hours: </span>{nbHours}</p>
        </div>

      <main className={cn(global.wrapper)}>
        <div className={styles.sorting + " " + global.pdf_hidden}>
          <div className={styles.dropdown}>
            <Dropdown
              className={styles.dropdown}
              headerDropdown={true}
              value={unit}
              setValue={(value) => onUnitChanged(value)}
              options={UNIT_OPTIONS}
            />
            <Dropdown
              className={styles.dropdown}
              headerDropdown={true}
              value={country}
              setValue={(value) => onCountryChanged(value)}
              options={COUNTRY_OPTIONS}
            />
            <Dropdown
              className={styles.dropdown}
              headerDropdown={true}
              value={currency}
              setValue={(value) => onCurrencyChanged(value)}
              options={CURRENCY_OPTIONS}
            />
            {aircraftsData.length === 2 ? (
              <input
                type="button"
                className={styles.header_btn}
                value="Add Aircraft to Compare"
                onClick={() => setOpenModal(!openModal)}
              />
            ) : (
              <div></div>
            )}
            <input
              type="button"
              className={styles.header_btn}
              value="Export Report"
              onClick={() => setShowExport(true)}
            />{" "}
          </div>
        </div>
        <KeyFacts data={aircraftsData} onRemoveAircraft={onRemoveAircraft} />
        <BascInfo data={aircraftsData} />
        <Performance
          data={aircraftsData}
          currency={currency}
          country={country}
          unit={unit}
        />
        <OwnershipCost
          data={aircraftsData}
          currency={currency}
          country={country}
          unit={unit}
          setNbHoursProp={setNbHours}
        />
        <AquisitionCost
          data={aircraftsData}
          currency={currency}
          country={country}
          unit={unit}
        />
        {/* <HistoricalMarket params={aircraftsData} /> */}
        <Range params={aircraftsData} />
        <Interior
          data={aircraftsData}
          currency={currency}
          country={country}
          unit={unit}
        />
        <Features
          data={aircraftsData}
          currency={currency}
          country={country}
          unit={unit}
        />
        <Powerplant
          data={aircraftsData}
          currency={currency}
          country={country}
          unit={unit}
        />
        <Weights
          data={aircraftsData}
          currency={currency}
          country={country}
          unit={unit}
        />
        <Dimensions
          data={aircraftsData}
          currency={currency}
          country={country}
          unit={unit}
        />
        <div className={cn(global.footer)}>
          <div>
            <div className={cn(global.btns_container)}>
            <button
                className={cn(global.action_btn)}
                onClick={() => {window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
                setShowExport(true)
              }}
              >
                Export Report as PDF
              </button>
            </div>
          </div>
        </div>
        <Modal title={`Add another aircraft to compare`} toggler={openModal}>
          <div className={cn(global.pdf_hidden)}>
            <div className={styles.form}>
              <form className={styles.search} action="">
                <input
                  type="text"
                  className={styles.input}
                  value={searchText}
                  placeholder="Search aircraft"
                  onChange={(e) => handleSearchChanged(e.target.value)}
                />
              </form>
            </div>
            <div className={cn(scopedStyles.options)}>
              {searchText === "" ? (
                allaircraftsData.map((aircraft) => {
                  return (
                    <label
                      className={cn(scopedStyles.option)}
                      key={aircraft.aircraft_id}
                    >
                      <span>{aircraft.aircraft_name}</span>
                      <input
                        type="checkbox"
                        value={aircraft.aircraft_id}
                        name="aircraft"
                        // pass aircraft_id as param to onSelect
                        onClick={(e) => onSelect(e, aircraft)}
                      />
                      <i
                        className={
                          "fa-solid fa-check " + cn(scopedStyles.checkmark)
                        }
                      ></i>
                      <img src={aircraft.image_name} alt="" />
                    </label>
                  );
                })
              ) : filteredAircrafts?.length ? (
                filteredAircrafts.map((aircraft) => {
                  return (
                    <label
                      className={cn(scopedStyles.option)}
                      key={aircraft.aircraft_id}
                    >
                      <span>{aircraft.aircraft_name}</span>
                      <input
                        type="checkbox"
                        value={aircraft.aircraft_id}
                        name="aircraft"
                        // pass aircraft_id as param to onSelect
                        onClick={(e) => onSelect(e, aircraft)}
                      />
                      <i
                        className={
                          "fa-solid fa-check " + cn(scopedStyles.checkmark)
                        }
                      ></i>
                      <img src={aircraft.image_name} alt="" />
                    </label>
                  );
                })
              ) : (
                <p>loading</p>
              )}
            </div>
            <button
              onClick={() => onCompare()}
              className={scopedStyles.compare_btn}
            >
              Add Aircraft
            </button>
          </div>
        </Modal>
      </main>
      <Footer />
    </>
  );
};

export default CompareAircrafts;
