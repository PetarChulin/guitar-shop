import { useContext } from "react";
import { FavoriteContext } from "../../contexts/favorites.context";
import { UserContext } from "../../contexts/user.context";

import ProductCard from "../product-card/product-card.component";

import "../../components/product-card/product-card.styles.scss";
import "../../routes/category/category.styles.scss";
import "../../routes/shop/shop.styles.scss";

const Favorites = () => {

    const { favoriteItems } = useContext(FavoriteContext);
    const { username } = useContext(UserContext);

    const user = username.split('@')[0].toUpperCase();
    const favorites = favoriteItems.length > 0;

    return (
        <>
            {favorites && <h2 className="category-title">{`${user}'S FAVORITES`}</h2>}
            {favorites ? (
                favoriteItems.map((favoriteItem) => (
                    <div className="products-container">
                        <div className="product-card-container">
                            <ProductCard
                                key={favoriteItem.id}
                                product={favoriteItem}
                            />
                        </div>
                    </div>
                ))
            ) : (
                <h2 className="no-items">There are no favorites</h2>
            )}
        </>
    );

};
export default Favorites;