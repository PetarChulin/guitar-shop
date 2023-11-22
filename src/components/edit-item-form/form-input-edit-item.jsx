import { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";

import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";

import { editItemInDocument, fetchItemData } from "../../utils/firebase/firebase.utils";

import "./form-input-edit.styles.scss";
import "../../components/button/button.styles.scss"


const InputFormEditItem = ({ product, documentId, closeForm }) => {

    const [updatedItem, setUpdatedItem] = useState(product);

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


    const handleSubmit = (event) => {
        event.preventDefault();
        editItemInDocument('collections', documentId, product.id, updatedItem);
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
                        <Button type="submit"  buttonType="neon">Update Item</Button>
                        <Button type="button" buttonType="neon"onClick={closeForm}>Close</Button>
                    </div>
                </form>
            </div>
        </div>
    );

}

export default InputFormEditItem;