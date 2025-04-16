import { Carousel } from "../../components/carousel/Carousel";
import { useStore } from "../../hooks/useStore";
import "./HomePage.css";

export const HomePage = () => {
  const { store } = useStore();

  return (
    <div className="homePage">
      <div className="wrapper">
        <div className="about">
          <h1>{store.name}</h1>
          <p className="description">{store.description}</p>
        </div>
      </div>
      <div className="images">
        <Carousel
          images={[
            "src/assets/store.jpg",
            "src/assets/violin.jpg",
            "src/assets/guitar.jpg",
          ]}
        />
      </div>
    </div>
  );
};
