import PromoCarousel from "../components/carousels/PromoCarousel";
import DayProductCarousel from "../components/carousels/DayProductCarousel";
import NewArrivals from "../components/home/NewArrivals";
import BestSellers from "../components/home/BestSellers";
import CategoryList from "../components/category/CategoryList";
import SubList from "../components/sub/SubList";


const Home = () => {
	return (
		<>
			{/* <div className="SlidersWrap">
				<PromoCarousel/>
				<DayProductCarousel/>
			</div> */}
			
			<h4 className="title">
				New Arrivals
			</h4>
			<NewArrivals />

			<h4 className="title">
				Best Sellers
			</h4>
			<BestSellers />

			<h4 className="title">
				Categories
			</h4>
			<CategoryList />

			<h4 className="title">
				Sub Categories
			</h4>
			<SubList />
		</>
	)
}

export default Home;