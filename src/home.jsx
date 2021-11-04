import ExchangeCard from "./component/exchangeCard";
import "./styles/home.css";

const Home = () => {
  return (
    <>
      <div className="main">
        <div className="main-menu">Currency Exchange</div>
        <div className="exchangeCard">
          <ExchangeCard />
        </div>
      </div>
    </>
  );
};

export default Home;
