import React, { useEffect, useRef } from "react";
import io from "socket.io-client";

export const useWebSocket = ({ url }) => {
  const manager = useRef();

  const connect = () => {
    manager.current = io(url, {
      transports: ["websocket", "polling", "flashsocket"],
      reconnection: false,
    });
  };

  const pingPong = async (event, data) => {
    try {
      if (manager.current) {
        await manager.current.emit("auth", {
          token: localStorage.getItem("access_token"),
        });

        const authentication = await new Promise((res) => {
          manager.current.on("auth", (response) => {
            manager.current.removeAllListeners("auth");
            if (response.error) {
              res({ error: "refused" });
            } else {
              res({ success: true });
            }
          });
        });

        if (authentication.error) {
          await manager.current.emit("refresh", {
            refresh: localStorage.getItem("refresh_token"),
          });

          const refresher = await new Promise((res) => {
            manager.current.on("refresh", (resp) => {
              manager.current.removeAllListeners("refresh");

              if (!resp || resp.error) {
                res({ error: true });
              } else if (resp.access) {
                localStorage.setItem("access_token", resp.access);
                res({ success: true });
              }
            });
          });

          if (refresher.error) {
            throw Error("session_ended");
          }
        }

        await manager.current.emit(event, data);
        return;
      }
      throw Error("No Client connected");
    } catch (error) {
      console.log(error.message);
      return { error: error.message };
    }
  };

  const ping = async (event, data, replyHandler) => {
    try {
      if (manager.current) {
        await manager.current.on(event, (data) => {
          replyHandler(data);
          manager.current.removeAllListeners(event);
        });

        await manager.current.emit("auth", {
          token: localStorage.getItem("access_token"),
        });

        const authentication = await new Promise((res) => {
          manager.current.on("auth", (response) => {
            manager.current.removeAllListeners("auth");
            if (response.error) {
              res({ error: "refused" });
            } else {
              res({ success: true });
            }
          });
        });

        if (authentication.error) {
          await manager.current.emit("refresh", {
            refresh: localStorage.getItem("refresh_token"),
          });

          const refresher = await new Promise((res) => {
            manager.current.on("refresh", (resp) => {
              manager.current.removeAllListeners("refresh");

              if (!resp || resp.error) {
                res({ error: true });
              } else if (resp.access) {
                localStorage.setItem("access_token", resp.access);
                res({ success: true });
              }
            });
          });

          if (refresher.error) {
            throw Error("session_ended");
          }
        }

        await manager.current.emit(event, data);
        return;
      }
      throw Error("No Client connected");
    } catch (error) {
      console.log(error.message);
      return { error: error.message };
    }
  };

  const listen = (event, dataHandler) => {
    manager.current &&
      manager.current.on(event, (data) => {
        dataHandler(data);
      });
  };

  useEffect(() => {
    connect();
  }, []);

  useEffect(() => {
    if (!manager.current) {
      return;
    }

    manager.current.on("connect_error", (error) => {
      console.log(error);
      new Promise((res) => {
        setTimeout(() => {
          connect();
          res();
        }, 5000);
      });
    });

    manager.current.on("disconnect", (data) => {
      console.log("WS disconnected !");
      new Promise((res) => {
        setTimeout(() => {
          connect();
          res();
        }, 5000);
      });
    });

    manager.current.on("access", (data) => {
      localStorage.setItem("access_token", data.access);
      localStorage.setItem("refresh_token", data.refresh);
    });

    manager.current.on("connect", (data) => {
      manager.current.emit("access", "I want a token !");
    });
  }, [manager.current]);

  return {
    ping,
    pingPong,
    listen,
  };
};
