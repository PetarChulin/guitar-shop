import { useContext } from "react";
import { FavoriteContext } from "../../contexts/favorites.context";
import { UserContext } from "../../contexts/user.context";

import ProductCard from "../product-card/product-card.component";

import { nameExtract } from "../../utils/nameExtract";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { EffectCoverflow, Navigation, Pagination } from "swiper";

import "./swiper-bundle.min.css"
import "./favorites.styles.scss";

SwiperCore.use([EffectCoverflow, Pagination]);

const Favorites = () => {

    const { favoriteItems } = useContext(FavoriteContext);
    const { username } = useContext(UserContext);

    const extractedName = nameExtract(username);
    const favorites = favoriteItems.length > 0;

    return (
        <section >
            {favorites && <h2 className="category-title">{`${extractedName}'S FAVORITES`}</h2>}
            <Swiper
                navigation={true} modules={[Navigation]}
                spaceBetween={30}
                slidesPerView={3}
                coverflowEffect={{
                    rotate: 40,
                    stretch: 0,
                    depth: 10,
                    modifier: 1,
                    slideShadows: true,
                }}
                effect={"coverflow"}
                grabCursor={true}
                centeredSlides={true}
                pagination={true}
                className="swiper"
            >
                {favorites ? (
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
                    : (
                        <h2 className="no-items">There are no favorites</h2>
                    )}
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