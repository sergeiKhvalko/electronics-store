import { Carousel } from 'antd';
import phantom from "../../images/phantom.webp"
import huawei from "../../images/huawei.webp"
import xiaomi from "../../images/xiaomi.webp"
import bosch from "../../images/bosch.webp"
import credit from "../../images/credit.webp"
import pc from "../../images/pc.webp"

const contentStyle = {
  height: '500px',
  color: '#fff',
  lineHeight: '500px',
  textAlign: 'center',
  background: '#364d79',
};

const DayProductCarousel = () => {
	return (
		<div className="DayProductCarousel">
			<Carousel autoplay style={{height: "500px"}}>
					<div>
						<img style={{display: "block", width: "100%"}} src={phantom} alt="first slide"/>
					</div>
					<div>
						<img style={{display: "block", width: "100%"}} src={huawei} alt="second slide"/>
					</div>
					<div>
						<img style={{display: "block", width: "100%"}} src={xiaomi} alt="third slide"/>
					</div>
					<div>
						<img style={{display: "block", width: "100%"}} src={bosch} alt="first slide"/>
					</div>
					<div>
						<img style={{display: "block", width: "100%"}} src={credit} alt="first slide"/>
					</div>
					<div>
						<img style={{display: "block", width: "100%"}} src={pc} alt="first slide"/>
					</div>
					{/* <div>
						<h3 style={contentStyle}>2</h3>
					</div>
					<div>
						<h3 style={contentStyle}>3</h3>
					</div>
					<div>
						<h3 style={contentStyle}>4</h3>
					</div> */}
				</Carousel>
		</div>
		
	)
}

export default DayProductCarousel