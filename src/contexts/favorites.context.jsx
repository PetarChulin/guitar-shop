import { createContext, useState, useEffect } from 'react';


const addFavoritesItem = (favoriteItems, productToAdd) => {
    const existingFavorite = favoriteItems.find(
        (favoriteItem) => favoriteItem.id === productToAdd.id
    );

    if (existingFavorite) {
        return favoriteItems.map((favoriteItem) =>
            favoriteItems.id === productToAdd.id
                ? { ...favoriteItem, isFavorite: true }
                : favoriteItem
        );
    }

    return [...favoriteItems, { ...productToAdd, isFavorite: true }]
};

const removeFavoriteItem = (favoriteItems, favoriteToRemove) => {

    const existingFavorite = favoriteItems.find(
        (favoriteItem) => favoriteItem.id === favoriteToRemove.id
    );

    if (existingFavorite) {
        return favoriteItems.filter((favoriteItem) => favoriteItem.id !== existingFavorite.id);
    }
};

export const FavoriteContext = createContext({
    favoriteItems: [],
    setFavoriteItems: () => {},
    addItemToFavorites: () => {},
    removeItemFromFavorites: () => {},
});

export const FavoriteProvider = ({ children }) => {

    const savedFavorites = localStorage.getItem('userFavorites')
        ? JSON.parse(localStorage.getItem('userFavorites'))
        : [];

    const [favoriteItems, setFavoriteItems] = useState(savedFavorites);

    useEffect(() => {
        localStorage.setItem('userFavorites', []);

    }, []);

    useEffect(() => {
        localStorage.setItem('userFavorites', JSON.stringify(favoriteItems));
    }, [favoriteItems]);

    const addItemToFavorites = (productToAdd) => {
        setFavoriteItems(addFavoritesItem(favoriteItems, productToAdd));
    };

    const removeItemFromFavorites = (favoriteToRemove) => {
        setFavoriteItems(removeFavoriteItem(favoriteItems, favoriteToRemove));
    };

    const value = {
        favoriteItems,
        setFavoriteItems,
        addItemToFavorites,
        removeItemFromFavorites
    };

    return <FavoriteContext.Provider value={value}>{children}</FavoriteContext.Provider>
};