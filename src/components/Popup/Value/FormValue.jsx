import { useState } from "react";
import styles from "./FormValue.module.css";
import { addNewValue, updateValue } from "../../../services/ValueService";
import {useConfigUpload} from "../../../utils/ApiUtils.jsx";


function FormValue({ attributeId, value }) {
  // eslint-disable-next-line react/prop-types
  const [valueCurrent, setValueCurrent] = useState(value ? value.value : "");
  const configUpload=useConfigUpload();

  const handleValueAction = async () => {
    if (value) {
      await updateValue(value.id, valueCurrent,configUpload);
    } else {
      await addNewValue(attributeId, valueCurrent,configUpload);
    }
  };

  return (
    <div className={styles.container}>
      <h2>{value ? "Update Value" : "Add Value"}</h2>
      <form className={styles.form} onSubmit={handleValueAction}>
        <div>
          <label htmlFor="value">Value:</label>
          <input
            id="value"
            value={valueCurrent}
            type="text"
            onChange={e => {
              setValueCurrent(e.target.value);
            }}
          />
        </div>

        <div className={styles.buttonContainer}>
          <button type="submit">{value ? "Update Value" : "Add Value"}</button>
        </div>
      </form>
    </div>
  );
}

export default FormValue;
