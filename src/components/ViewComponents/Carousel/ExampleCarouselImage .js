import React from "react";

const ExampleCarouselImage = ({src , alt}) => {
  return (
    <div>
        <img src={src} alt={alt} style={{ width: "100%", height: "auto" }} />
    </div>
  );
};

export default ExampleCarouselImage;
