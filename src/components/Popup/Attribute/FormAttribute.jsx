import { useState } from "react";
import styles from "./FormAttribute.module.css";
import { addNewAttribute, updateAttribute } from "../../../services/AttributeService";
import { useConfigUpload} from "../../../utils/ApiUtils.jsx";

// eslint-disable-next-line react/prop-types
function FormAttribute({ categoryId, attribute }) {
  const [name, setName] = useState(attribute ? attribute.name : "");
  const configUpload=useConfigUpload();

  const handleAttributeAction = async () => {
    if (attribute) {

      await updateAttribute(attribute.id, attribute.categoryId, name,configUpload);
    } else {
      await addNewAttribute(categoryId, name,configUpload);
    }
  };

  return (
    <div className={styles.container}>
      <h2>{attribute ? "Update Attribute" : "Add Attribute"}</h2>
      <form className={styles.form} onSubmit={handleAttributeAction}>
        <div>
          <label htmlFor="attributeName">Name:</label>
          <input
            id="attributeName"
            value={name}
            type="text"
            onChange={e => {
              setName(e.target.value);
            }}
          />
        </div>

        <div className={styles.buttonContainer}>
          <button type="submit">{attribute ? "Update Attribute" : "Add Attribute"}</button>
        </div>
      </form>
    </div>
  );
}

export default FormAttribute;
