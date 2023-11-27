import { useState, useEffect, useContext } from "react";

import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";

import { editItemInDocument, getCategoriesAndDocuments } from "../../utils/firebase/firebase.utils";
import { CategoriesContext } from "../../contexts/categories.context";

import "./form-input-edit.styles.scss";
import "../../components/button/button.styles.scss"
import { useNavigate } from "react-router-dom";

const InputFormEditItem = ({ product, documentId, closeForm }) => {

    const { setCategoriesMap } = useContext(CategoriesContext);
    const [updatedItem, setUpdatedItem] = useState(product);

    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => {
            window.scroll(0, 0);
        };

        handleScroll();
    }, []);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setUpdatedItem({ ...updatedItem, [name]: value });
    };


    const handleSubmit = async (event) => {
        event.preventDefault();
        await editItemInDocument('collections', documentId, product.id, updatedItem);
        navigate(`/admin/${documentId}`);
        const updatedCategories = await getCategoriesAndDocuments('collections');
        setCategoriesMap(updatedCategories);
        closeForm();
    };


    return (
        <div className="overlay" >
            <div className="backdrop" onClick={closeForm}></div>
            <div className="modal">
                <form onSubmit={handleSubmit}>
                    <h1>Edit : {product.name}</h1>
                    <FormInput
                        label="Description"
                        type="text"
                        name="description"
                        value={updatedItem.description}
                        onChange={handleChange}
                    />
                    <FormInput
                        label="Image URL"
                        type="url"
                        name="imageUrl"
                        value={updatedItem.imageUrl}
                        onChange={handleChange}
                    />
                    <FormInput
                        label="Name"
                        type="text"
                        name="name"
                        value={updatedItem.name}
                        onChange={handleChange}
                    />
                    <FormInput
                        label="Price"
                        type="number"
                        name="price"
                        value={updatedItem.price}
                        onChange={handleChange}
                    />
                    <div className="btn-container">
                        <Button type="submit" buttonType="neon">Update Item</Button>
                        <Button type="button" buttonType="neon" onClick={closeForm}>Close</Button>
                    </div>
                </form>
            </div>
        </div>
    );

}

export default InputFormEditItem;