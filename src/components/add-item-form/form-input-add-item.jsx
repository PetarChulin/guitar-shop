import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";
import { addItemToDocument, getCategoriesAndDocuments } from "../../utils/firebase/firebase.utils";
import { TypeContext } from "../../contexts/type.context";
import './add-item.styles.scss'

const defaultFormFields = {
  id: Math.ceil(Math.random() * 100),
  description: "",
  imageUrl: "",
  name: "",
  price: ""
};

const InputFormAddItem = () => {

  const { type } = useContext(TypeContext);
  const navigate = useNavigate();

  const [formFields, setFormFields] = useState(defaultFormFields);
  const { id, description, imageUrl, name, price } = formFields;



  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const addItem = async (event) => {

    event.preventDefault();

    const collectionName = "collections";
    const documentId = type;
    await addItemToDocument(collectionName, documentId, formFields);
    await getCategoriesAndDocuments('collections');
    navigate(`/admin/${documentId}`);
  };


  return (
    <div className="add-item-container">
      <span>Add new product</span>
      <form onSubmit={addItem}>
        <FormInput
          label="description"
          type="text"
          required
          onChange={handleChange}
          name="description"
          value={description}
        />
        <FormInput
          label="image"
          type="url"
          required
          onChange={handleChange}
          name="imageUrl"
          value={imageUrl}
        />
        <FormInput
          label="name"
          type="text"
          required
          onChange={handleChange}
          name="name"
          value={name}
        />
        <FormInput
          label="price"
          type="number"
          required
          onChange={handleChange}
          name="price"
          value={price}
          min="0"
          step="1"
        />
        <div className="buttons-container">
          <Button type="submit">Add product</Button>
        </div>

      </form>
    </div>

  )

};

export default InputFormAddItem;