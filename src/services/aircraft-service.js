import axios from "axios";

const API_URL = "/api/";

class AircraftService {
  async getAircrafts() {
    const response = await axios.get(API_URL + "aircraft-items/");
    if (response.data == null) return;
    return response.data.aircrafts;
  }

  async getAccidents() {
    const response = await axios.get(API_URL + "accident-items/");
    if (response.data == null) return;
    return response.data;
  }

  async getAircraftById(aircraft_id) {
    console.log(aircraft_id);
    const response = await axios.get(
      API_URL + "aircrafts/" + aircraft_id + "/"
    );
    console.log(API_URL + "aircrafts/" + aircraft_id + "/");

    if (response.data == null) return;
    console.log(response.data.aircraft);
    return response.data.aircraft;
  }
}

export default new AircraftService();
