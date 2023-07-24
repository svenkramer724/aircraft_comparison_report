export const AUTHENTICATION_COOKIE_KEY = "wc_loggedin_user";

const CATEGORY_OPTIONS = ["", "Large", "Medium", "Light", "VLJ", "Prop"];
const AIRFRAME_OPTIONS = [
  "500 hours",
  "1000 hours",
  "1500 hours",
  "2000 hours",
  "2500 hours",
  "3000 hours",
];

const FUTURE_OPTIONS = ["1 year", "2 years", "3 years", "5 years", "10 years"];

const CATEGORY_OPTIONS_DIC = {
  "": "Show all",
  Large: "Large",
  Medium: "Medium",
  Light: "Light",
  VLJ: "VLJ",
  Prop: "Prop",
};

const MANUFACTURER_OPTIONS = [
  "",
  "Beechcraft",
  "Bombardier",
  "Cessna",
  "Cirrus",
  "Dassault",
  "Eclipse",
  "Embraer",
  "Gulfstream",
  "Hawker",
  "Honda",
  "IAI",
  "Mitsubishi",
  "Nextant",
  "Pilatus",
];

const COUNTRY_OPTIONS = ["North America", "Europe", "South America", "Asia"];
const CURRENCY_OPTIONS = ["USD", "EUR", "GBP"];
const UNIT_OPTIONS = ["Imperial Units", "Metric Units"];

const MANUFACTURER_OPTIONS_DIC = {
  "": "Show all",
  Beechcraft: "Beechcraft",
  Bombardier: "Bombardier",
  Cessna: "Cessna",
  Cirrus: "Cirrus",
  Dassault: "Dassault",
  Eclipse: "Eclipse",
  Embraer: "Embraer",
  Gulfstream: "Gulfstream",
  Hawker: "Hawker",
  Honda: "Honda",
  IAI: "IAI",
  Mitsubishi: "Mitsubishi",
  Nextant: "Nextant",
  Pilatus: "Pilatus",
};

const PRODUCTION_OPTIONS = ["", "Yes", "No"];
const PRODUCTION_OPTIONS_DIC = {
  "": "Show all",
  Yes: "Yes",
  No: "No",
};

export {
  CATEGORY_OPTIONS,
  MANUFACTURER_OPTIONS,
  PRODUCTION_OPTIONS,
  CATEGORY_OPTIONS_DIC,
  MANUFACTURER_OPTIONS_DIC,
  PRODUCTION_OPTIONS_DIC,
  COUNTRY_OPTIONS,
  CURRENCY_OPTIONS,
  AIRFRAME_OPTIONS,
  FUTURE_OPTIONS,
  UNIT_OPTIONS,
};
