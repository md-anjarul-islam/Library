import axios from "axios";

export const mainUrl = "http://localhost:3001";
export const fetchAPI = function(url, options = {}) {
  return new Promise((resolve, reject) => {
    axios({ url, ...options })
      .then((data) => resolve(data))
      .catch((err) => reject(err));
  });
};
