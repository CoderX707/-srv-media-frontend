import { toast } from "react-toastify";
import axios from "axios";
import { base_url } from "./Constant";

export function toastMessage(message) {
  toast(`${message}`, {
    position: "top-right",
    autoClose: 1500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
}

export async function ApiHelperPost(endPoint, body) {
  try {
    let res = await axios({
      url: `${base_url}${endPoint}`,
      method: "POST",
      data: body,
      headers: {
        "Content-Type": "application/json",
      },
      validateStatus:false
    });
    return res;
  } catch (err) {
    return err.message
  }
}

export function authChecker() {
  const auth = localStorage.getItem("user-data");
  const userData = JSON.parse(auth);
  return userData;
}