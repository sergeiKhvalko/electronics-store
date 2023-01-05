import React from "react";
import {
  MDBCarousel,
  MDBCarouselInner,
  MDBCarouselItem,
  MDBView,
  MDBContainer
} from "mdbreact";
import phantom from "../../images/phantom.webp"
import huawei from "../../images/huawei.webp"
import xiaomi from "../../images/xiaomi.webp"
import bosch from "../../images/bosch.webp"
import credit from "../../images/credit.webp"
import pc from "../../images/pc.webp"

const PromoCarousel = () => {
  return (
		<div className="PromoCarousel">
			
		</div>













    // <div className="PromoCarousel">
    //   <MDBCarousel
    //     activeItem={1}
    //     length={6}
    //     showControls={true}
    //     showIndicators={true}
    //     className="z-depth-1"
		// 		style={{height: "330px"}}
    //   >
    //     <MDBCarouselInner>
    //       <MDBCarouselItem itemId="1">
    //         <MDBView className="h-100">
    //           <img
    //             className="d-block w-100 h-100"
    //             src={phantom}
    //             alt="First slide"
    //           />
    //         </MDBView>
    //       </MDBCarouselItem>
    //       <MDBCarouselItem itemId="2">
    //         <MDBView className="h-100">
    //           <img
    //             className="d-block w-100 h-100"
    //             src={huawei}
    //             alt="Second slide"
    //           />
    //         </MDBView>
    //       </MDBCarouselItem>
    //       <MDBCarouselItem itemId="3">
    //         <MDBView className="h-100">
    //           <img
    //             className="d-block w-100 h-100"
    //             src={xiaomi}
    //             alt="Third slide"
    //           />
    //         </MDBView>
    //       </MDBCarouselItem>
    //       <MDBCarouselItem itemId="4">
    //         <MDBView className="h-100">
    //           <img
    //             className="d-block w-100 h-100"
    //             src={bosch}
    //             alt="Third slide"
    //           />
    //         </MDBView>
    //       </MDBCarouselItem>
    //       <MDBCarouselItem itemId="5">
    //         <MDBView className="h-100">
    //           <img
    //             className="d-block w-100 h-100"
    //             src={credit}
    //             alt="Third slide"
    //           />
    //         </MDBView>
    //       </MDBCarouselItem>
    //       <MDBCarouselItem itemId="6">
    //         <MDBView className="h-100">
    //           <img
    //             className="d-block w-100 h-100"
    //             src={pc}
    //             alt="Third slide"
    //           />
    //         </MDBView>
    //       </MDBCarouselItem>
    //     </MDBCarouselInner>
    //   </MDBCarousel>
    // </div>
  );
}

export default PromoCarousel;