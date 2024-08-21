import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../app/userSlice";
import io from "socket.io-client";
import "./ChatComponent.css";

const socket = io("https://academixaid-app-backend-one.onrender.com");

function ChatComponent() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const { currentUser } = useSelector(selectUser);
  const firstname = currentUser?.user?.firstName;

  useEffect(() => {
    socket.on("message", (message) => {
      setMessages((messages) => [...messages, message]);
    });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (firstname && message) {
      socket.emit("sendMessage", { firstname, message });
      setMessage("");
    }
  };

  return (
    <div className="container">
      <div className="panel" id="chat">
        <div className="panel-heading">
          <h3 className="panel-title">
            <i className="icon wb-chat-text" aria-hidden="true"></i>
            Chat Room
          </h3>
        </div>
        <div className="panel-body">
          <div className="chats">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`chat ${
                  msg.firstname === firstname ? "" : "chat-left"
                }`}
              >
                <div className="chat-avatar">
                  <a
                    className="avatar avatar-online"
                    href="#"
                    data-toggle="tooltip"
                    data-placement="right"
                    title=""
                    // data-original-title={msg.firstname}
                  >
                    <img
                      src="https://bootdey.com/img/Content/avatar/avatar1.png"
                      alt="..."
                    />
                    <i></i>
                  </a>
                </div>
                <div className="chat-body">
                  <div className="chat-content">
                    <p>
                      <strong>{msg.firstname}</strong> : {msg.message}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="panel-footer">
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Say something"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <span className="input-group-btn">
                <button type="submit" className="btn btn-primary">
                  Send
                </button>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ChatComponent;
