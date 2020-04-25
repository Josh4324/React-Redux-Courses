import {
  handleResponse,
  handleError
} from "./apiUtils";
const baseUrl = "http://" + process.env.API_URL + "/authors/";

export function getAuthors() {
  return fetch(baseUrl)
    .then(handleResponse)
    .catch(handleError);
}