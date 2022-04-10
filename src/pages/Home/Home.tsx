import { useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import "./Home.styles.css";

const Home = () => {
  const navigate = useNavigate();

  const navigateToPlayground = () => {
    navigate("/playground");
  };

  return (
    <div className="home-page-container">
      <div className="home-page-header">
        <h1>Naive Bayes Algorithm</h1>
      </div>
      <div className="home-page-content">
        <p className="defination">
          A naive Bayes classifier is an algorithm that uses Bayes' theorem to
          classify objects. Naive Bayes classifiers assume strong, or naive,
          independence between attributes of data points. Popular uses of naive
          Bayes classifiers include spam filters, text analysis and medical
          diagnosis. These classifiers are widely used for machine learning
          because they are simple to implement.
        </p>
        <Button variant="secondary" onClick={navigateToPlayground}>
          Go to Playground
        </Button>
      </div>
    </div>
  );
};

export default Home;
