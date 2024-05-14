import { useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import ExampleCarouselImage from "../Carousel/ExampleCarouselImage ";
import CarouselImage from "../../assets/carousel-1.png";

function ControlledCarousel() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel activeIndex={index} onSelect={handleSelect}>
      <Carousel.Item border ={{border : "2px solid green"}}>
        <ExampleCarouselImage src={CarouselImage} alt="First slide" />
        <Carousel.Caption style = {{border : "2px solid red"}}>
          <h3 className="text-blue-500">First slide label</h3>
          <p className="text-blue-500">Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <ExampleCarouselImage src={CarouselImage} text="Second slide" />
        <Carousel.Caption>
          <h3 className="text-blue-500">Second slide label</h3>
          <p className="text-blue-500">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <ExampleCarouselImage src={CarouselImage} text="Third slide" />
        <Carousel.Caption>
          <h3 className="text-blue-500">Third slide label</h3>
          <p className="text-blue-500">
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default ControlledCarousel;
