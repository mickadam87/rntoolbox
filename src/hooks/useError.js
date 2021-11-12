import React, { useEffect, useState } from "react";

export const useError = () => {
  const [error, setErr] = useState(null);
  let chrono;

  const types = {
    success: "green",
    info: "rgb(15, 113, 241)",
    warn: "red",
  };

  useEffect(() => {
    if (error) {
      chrono = setTimeout(() => {
        setErr(null);
      }, 8000);
    }

    return () => clearTimeout(chrono);
  }, [error]);

  const manageErrors = ({ data, resolver }) => {
    let errors = [];

    const pushError = (message) =>
      errors.push(<p className="error-message">{message}</p>);

    Object.keys(data).forEach((key) => {
      const inputValue = data[key];

      if (resolver[key]) {
        Object.keys(resolver[key]).forEach((validation) => {
          const inputTitle = resolver[key].name;
          switch (validation) {
            case "required":
              inputValue === "" &&
                pushError(`Le champs ${inputTitle} est obligatoire.`);
              break;
            case "maxLength":
              inputValue.length > resolver[key][validation] &&
                pushError(
                  `${inputTitle} : ${resolver[key][validation]} caratères maximum.`
                );
              break;
            case "minLength":
              inputValue.length < resolver[key][validation] &&
                pushError(
                  `${inputTitle} : ${resolver[key][validation]} caratères minimum.`
                );
              break;
            case "sameAs":
              inputValue !== data[resolver[key][validation]] &&
                pushError(
                  `${inputTitle} et ${
                    resolver[resolver[key][validation]]["name"]
                  } sont différents.`
                );
              break;
          }
        });
      }
    });

    if (errors.length > 0) {
      setError({
        message: errors,
        type: "warn",
      });
      return true;
    }

    return false;
  };

  const Error = () => {
    return (
      <div
        id="error-popup"
        style={{
          display: error !== null && error ? "block" : "none",
          borderBottom: error ? "5px solid " + types[error.type] : null,
        }}
      >
        {error !== null && error.message}
      </div>
    );
  };

  const setError = ({ type, message }) => {
    setErr((error) => {
      return { type, message };
    });
  };

  const resetError = () => setErr(null);

  return { setError, Error, resetError };
};
