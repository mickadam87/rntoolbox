import React from "react";

export const useHTTP = ({ serverURL, authServerURL }) => {
  const interceptedRequest = async ({
    subUrl,
    body,
    headers,
    method,
    auth,
  }) => {
    try {
      const config = {
        headers: headers || {},
        method: method || "GET",
        mode: "cors",
      };

      if (config.method !== "GET" && config.method !== "HEAD" && body) {
        config.body = JSON.stringify(body);
        config.headers["Content-Type"] =
          config.headers["Content-Type"] || "application/json";
      }

      const token = localStorage.getItem("access_token");

      if (token) {
        config.headers["Authorization"] = "Bearer " + token;
      }

      let url = auth === true ? authServerURL : serverURL;

      if (config.method === "GET" && body) {
        url = new URL(url + subUrl);
        Object.keys(body).forEach((key) =>
          url.searchParams.append(
            key,
            key === "filter" ? JSON.stringify(body[key]) : body[key]
          )
        );
        delete config["body"];
      } else {
        url += subUrl;
      }

      const response = await fetch(url, config);

      if (response.status === 401 && !config._retry) {
        config._retry = true;

        const refreshToken = localStorage.getItem("refresh_token");

        const newTokenTry = await fetch(authServer + "/token", {
          method: "POST",
          body: JSON.stringify({ refreshToken }),
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (newTokenTry.status === 401) {
          throw Error("session_ended");
        }

        if (newTokenTry.status === 201) {
          const newToken = await newTokenTry.json();
          localStorage.setItem("access_token", newToken.newToken);
          const tokenToSend = localStorage.getItem("access_token");

          if (tokenToSend) {
            config.headers["Authorization"] = "Bearer " + tokenToSend;
          }

          const retry = await fetch(url, config);
          return await retry.json();
        }
      }

      return await response.json();
    } catch (error) {
      return { error: error.message };
    }
  };

  const get = async ({ body, headers, subUrl }) => {
    try {
      return await interceptedRequest({
        subUrl,
        headers,
        body,
      });
    } catch (error) {
      return { error: error.message };
    }
  };

  const post = async ({ body, headers, subUrl }) => {
    try {
      return await interceptedRequest({
        subUrl,
        body,
        headers,
        method: "POST",
      });
    } catch (error) {
      return { error: error.message };
    }
  };

  const put = async ({ body, headers, subUrl }) => {
    try {
      return await interceptedRequest({
        subUrl,
        body,
        headers,
        method: "PUT",
      });
    } catch (error) {
      return { error: error.message };
    }
  };

  const del = async ({ body, headers, subUrl }) => {
    try {
      return await interceptedRequest({
        subUrl,
        body,
        headers,
        method: "DELETE",
      });
    } catch (error) {
      return { error: error.message };
    }
  };

  return {
    get,
    post,
    put,
    del,
  };
};
