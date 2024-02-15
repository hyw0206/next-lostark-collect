import axios from "axios";
import { url, API_KEY } from "../data/axios";
export async function getData(dataRef, nickname) {
  console.log("Hello?")
  return await axios
  .get(url + `/armories/characters/${nickname}`, {
    headers: {
      Authorization: API_KEY,
    },
  })
  .then((response) => {
    dataRef.current = response.data
    console.log("api 요청 완료");
    return response.data == null ? false : true;
  })
  .catch((error) => {
    console.log(error);
  })
}