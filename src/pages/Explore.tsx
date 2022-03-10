import { Link } from "react-router-dom";
import rentCategory from "../assets/jpg/rentCategoryImage.jpg";
import sellCategory from "../assets/jpg/sellCategoryImage.jpg";

export const Explore = () => {
  return (
    <div className="explore">
      <header>
        <p className="pageHeader">Explore</p>
      </header>
      <main>
        {/* slider */}
        <p className="exploreCategoryHeading">Categories</p>
        <div className="exploreCategories">
          <Link to="/category/rent">
            <img src={rentCategory} alt="rent" className="exploreCategoryImg" />
            <p className="exploreCategoryName">Places for Rent</p>
          </Link>

          <Link to="/category/sell">
            <img src={sellCategory} alt="rent" className="exploreCategoryImg" />
            <p className="exploreCategoryName">Places for Sell</p>
          </Link>
        </div>
      </main>
    </div>
  );
};
