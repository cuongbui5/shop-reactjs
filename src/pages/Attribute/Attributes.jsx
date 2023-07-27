import { useEffect, useState } from "react";
import { getAttributes ,deleteAttributeById} from "../../services/AttributeService";
import Overlay from "../../components/Popup/Overlay";
import styles from './Attributes.module.css'
import FormValue from "../../components/Popup/Value/FormValue";
import FormAttribute from "../../components/Popup/Attribute/FormAttribute";
import { deleteValueById } from "../../services/ValueService";
import {useConfigFetch} from "../../utils/ApiUtils.jsx";

function Attributes() {
  
  const [attributes, setAttributes] = useState([]);
  const [value, setValue] = useState(null);
    const [attribute, setAttribute] = useState(null);
    const [update, setUpdate] = useState(false);
    const [clickDelete, setClickDelete] = useState(false);
  const [addValue, setAddValue] = useState(false);
   const [updateValue, setUpdateValue] = useState(false);
    const configFetch=useConfigFetch();

    const fetchAttributes = async() => {
        const res = await getAttributes(configFetch);
        console.log(res.data);
        setAttributes(res.data);
    }

    useEffect(() => {
        fetchAttributes();
    },[update,clickDelete])

    const handleUpdatePopup = (attribute) => {
        setAttribute(attribute)
        setUpdate(!update)
    }

    const deleteAttribute =async (id) => {
        const res = await deleteAttributeById(id)
        if (res.message === "success") {
            setClickDelete(!clickDelete)
        }
        
    }

    const handleValuePopup = (attribute) => {
        setAddValue(!addValue);
      setAttribute(attribute);
  }
  
  const handleUpdateValue = (value,attribute) => {
    setValue(value);
    setAttribute(attribute)
    setUpdateValue(!updateValue);
  }

  const handleDeleteValue =async (id) => {
    const res = await deleteValueById(id);
    if (res.message === "success")
      fetchAttributes();
  }



    return (
      <div className={styles.container}>
        <h1>Attribute Management</h1>
        <div className={styles.buttonContainer}></div>
        {update && (
          <>
            <Overlay onClick={handleUpdatePopup}></Overlay>
            <FormAttribute attribute={attribute}></FormAttribute>
          </>
        )}

        {addValue && (
          <>
            <Overlay onClick={handleValuePopup}></Overlay>
            <FormValue attributeId={attribute.id}></FormValue>
          </>
        )}

        {updateValue && (
          <>
            <Overlay onClick={handleUpdateValue}></Overlay>
            <FormValue attributeId={attribute.id} value={value}></FormValue>
          </>
        )}

        <div>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Attribute name</th>
                <th>Caterory ID</th>
                <th>Category name</th>
                <th>Values</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {attributes.map((a, index) => (
                <tr key={index}>
                  <td>{a.id}</td>
                  <td>{a.name}</td>
                  <td>{a.category.id}</td>
                  <td>{a.category.name}</td>
                  <td>
                    {a.values &&
                      a.values.length > 0 &&
                      a.values.map(v => {
                        return (
                          <span key={v.id}>
                            <button onClick={() => handleUpdateValue(v, a)}>{v.value}</button>
                            <button onClick={() => handleDeleteValue(v.id)}>
                              <ion-icon name="close-outline"></ion-icon>
                            </button>
                          </span>
                        );
                      })}
                  </td>
                  <td>
                    <div>
                      <button className={styles.button} onClick={() => handleUpdatePopup(a)}>
                        Update
                      </button>
                      <button className={styles.button} onClick={() => deleteAttribute(a.id)}>
                        Delete
                      </button>
                      <button className={styles.button} onClick={() => handleValuePopup(a)}>
                        Add Value
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
}

export default Attributes;