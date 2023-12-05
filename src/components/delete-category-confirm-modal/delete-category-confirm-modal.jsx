import { useContext, useState } from "react";
import Button from "../button/button.component";
import FormInput from "../form-input/form-input.component";
import './delete-category-confirm.styles.scss';
import { useNavigate } from "react-router-dom";

const DeleteCategoryConfirmModal = ({ category, deleteCategory, closeModal }) => {

    const navigate = useNavigate();
    const [updatedItem, setUpdatedItem] = useState('');
    const [confirmActive, setConfirmActive] = useState(false);
    // const confirmActive = updatedItem === category;
    console.log(confirmActive);
    const handleChange = (event) => {
        const { name, value } = event.target;
        setUpdatedItem({ ...updatedItem, [name]: value });
        setConfirmActive(value === category);
    };

    return (
        <div className="overlay">
            <div className="backdrop" onClick={closeModal}></div>
            <div className="delete-modal">
                <div>
                    <h2 className="message">This is an irreversible operation <br />
                        and will delete whole section {category} from DataBase!
                        <br /> Please type {category} to confirm</h2>
                    <FormInput
                        type="text"
                        name="category"
                        onChange={handleChange}
                    />
                    <div className="btn-container">
                        {confirmActive && <Button type="button" buttonType="remove" onClick={deleteCategory}>Delete</Button>}
                        <Button type="button" buttonType="neon" onClick={closeModal}>Close</Button>
                    </div>
                </div>
            </div>
        </div>
    );

};
export default DeleteCategoryConfirmModal;