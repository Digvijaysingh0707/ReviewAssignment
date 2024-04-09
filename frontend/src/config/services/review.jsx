import { endPoint } from "../settings/urls";
import axios from "axios";

export function listRivews(params) {
  let _url = `${endPoint.url.Apiurl}${endPoint.review.getData}`
  return axios.get(_url, {params});
}

export function addReview(params) {
  let _url = `${endPoint.url.Apiurl}${endPoint.review.postData}`;
  return axios.post(_url, params);
}

export function deleteReview(params) {
  let id = params._id;
  let _url = `${endPoint.url.Apiurl}/review/${id}`;
  return axios.delete(_url);
}

export function updateReview(params) {
  let id = params._id;
  let _url = `${endPoint.url.Apiurl}/review/${id}`;
  return axios.put(_url, params);
}