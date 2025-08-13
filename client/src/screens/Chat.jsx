import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import ChatComponent from "../components/ChatComponent";
import "../styles/Chat.css";

const Chat = () => {
  return (
    <>
      <div className="chat-container">
        <Navbar />
        <ChatComponent />
        <footer>
          <nav>
            <ul>
              <li>
                <Link to="/search">Back to Search</Link>
              </li>
            </ul>
          </nav>
        </footer>
      </div>
    </>
  );
};

export default Chat;
