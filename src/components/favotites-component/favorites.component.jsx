import { useContext } from "react";
import { FavoriteContext } from "../../contexts/favorites.context";
import { UserContext } from "../../contexts/user.context";

import ProductCard from "../product-card/product-card.component";

import { Navigation, Pagination } from "swiper";
import { nameExtract } from "../../utils/nameExtract";
import { Swiper, SwiperSlide } from "swiper/react";

import "./swiper-bundle.min.css"
import "./favorites.styles.scss";
import "swiper/css/pagination";
import "./swiper.scss";


const Favorites = () => {

    const { favoriteItems } = useContext(FavoriteContext);
    const { username } = useContext(UserContext);

    const extractedName = nameExtract(username);
    const favorites = favoriteItems.length > 0;

    const pagination = {
        clickable: true,
        renderBullet: function (index, className) {
            return '<span class="' + className + '">' + (index + 1) + "</span>";
        },
    };

    return (
        <section className="product-container">
            {favorites ? <h2 className="category-title">{`${extractedName}'S FAVORITES`}</h2>
                : <h2 className="no-items">There are no favorites</h2>}
            <Swiper
                pagination={pagination}
                modules={[Pagination, Navigation]}
                slidesPerView={4}
                spaceBetween={5}
                centeredSlides={true}
                slideToClickedSlide={true}
            >
                {favorites && (
                    favoriteItems.map((favoriteItem) => {
                        return (
                            <SwiperSlide >
                                <div className="product-container">
                                    <div className="product-card-container">
                                        <ProductCard
                                            key={favoriteItem.id}
                                            product={favoriteItem}
                                        />
                                    </div>
                                </div>
                            </SwiperSlide>
                        )
                    }))
                }
            </Swiper>
        </section>
    );

    // return (
    //     <>
    //         {favorites && <h2 className="category-title">{`${extractedName}'S FAVORITES`}</h2>}
    // {favorites ? (
    //             favoriteItems.map((favoriteItem) => (
    // <div className="products-container">
    //     <div className="product-card-container">
    //         <ProductCard
    //             key={favoriteItem.id}
    //             product={favoriteItem}
    //         />
    //     </div>
    // </div>
    //             ))
    //         ) : (
    //             <h2 className="no-items">There are no favorites</h2>
    //         )}
    //     </>
    // );

};
export default Favorites;