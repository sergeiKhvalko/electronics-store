import StarRating from "react-star-ratings";

export const showAverage = (p) => {
	if(p && p.ratings) {
		let total = [];

		p.ratings.map((r) => total.push(r.star));
		const totalReduced = total.reduce((p, n) => p + n, 0);
	
		return (
			<div className="text-center pt-1 pb-3">
				<span>
					<StarRating
						starDimension="20px"
            starSpacing="2px"
            starRatedColor="red"
            rating={totalReduced}
            editing={false}
					/>{" "}
					({p.ratings.length})
				</span>
			</div>
		)
	}
}


/**
 const getAvgProductRating = (product) =>
  product?.ratings?.length
    ? product.ratings.reduce((result, rating) => result + rating.star, 0) /
      product.ratings.length
    : 0;
 
export default getAvgProductRating;
 */