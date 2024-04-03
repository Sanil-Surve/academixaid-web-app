import SearchList from "../components/SearchList";
import Navbar from "../components/Navbar";
import "../styles/View.css";

const View = () => {
  return (
    <div className="container__view">
      <Navbar />
      <SearchList />
    </div>
  );
};

export default View;
