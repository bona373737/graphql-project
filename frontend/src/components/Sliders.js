import React, { useCallback, useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from "@emotion/styled";
import { GrPrevious, GrNext } from "react-icons/gr";

const Row = styled.section`
  margin-top: 2%;
`;

const SliderContainer = styled.div`
  position: relative;
`;

const StyledSlider = styled(Slider)`
  text-align: center;
`;

const PrevButton = styled.button`
  position: absolute;
  top: 42%;
  left: 0vw;
  z-index: 9999;
  padding: 8px 12px;
  font-size: 40px;
  background-color: transparent;
  border: none;
  margin: 0;
  cursor: pointer;
`;

const NextButton = styled.button`
  position: absolute;
  top: 42%;
  right: 0vw;
  z-index: 9999;
  padding: 8px 12px;
  font-size: 40px;
  background-color: transparent;
  border: none;
  margin: 0;
  cursor: pointer;
`;

const ImageContainer = styled.div`
  background-color: ${(props) => props.backgroundColor};
`;

const Image = styled.div`
  width: 100vw;
  height: 40vh;
  background-image: url(${(props) => props.url});
  background-repeat: no-repeat;
  background-position: center;
`;

function Sliders() {
  const slickRef = useRef(null);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplayspeed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    pauseOnHover: true,
  };

  const previous = useCallback(() => slickRef.current.slickPrev(), []);
  const next = useCallback(() => slickRef.current.slickNext(), []);

  return (
    <Row>
      <SliderContainer>
        <StyledSlider ref={slickRef} {...settings}>
          <ImageContainer backgroundColor="rgb(249, 232, 154)">
            <Image url="https://cdn.011st.com/11dims/resize/1240x400/quality/99/11src/http://cdn.011st.com/ds/2022/08/17/1376/ea5f9204c4c5ba8d2e2391a90bd5d634.jpg" />
          </ImageContainer>
          <ImageContainer backgroundColor="rgb(225, 229, 254)">
            <Image url="https://cdn.011st.com/11dims/resize/1240x400/quality/99/11src/http://cdn.011st.com/ds/2022/06/09/1415/ff19bffebb0b979697b43a274fad8391.jpg" />
          </ImageContainer>
          <ImageContainer backgroundColor="rgb(211, 216, 254)">
            <Image url="https://cdn.011st.com/11dims/resize/1240x400/quality/99/11src/http://cdn.011st.com/ds/2022/08/17/1376/61ac38268a3866147701f28db298d2a3.jpg" />
          </ImageContainer>
          <ImageContainer backgroundColor="rgb(162, 227, 245)">
            <Image url="https://cdn.011st.com/11dims/resize/1240x400/quality/99/11src/browsing/banner/2022/08/26/33033/2022082617372630767_12399379_1.jpg" />
          </ImageContainer>
        </StyledSlider>
        <PrevButton onClick={previous}>
          <GrPrevious />
        </PrevButton>
        <NextButton onClick={next}>
          <GrNext />
        </NextButton>
      </SliderContainer>
    </Row>
  );
}

export default Sliders;
