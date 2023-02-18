import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { updateAnnouncement } from "../api";
import { uploadImage } from "../api";

function EditAnnouncement() {
  const { announcementId } = useParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [color, setColor] = useState("");
  const [year, setYear] = useState("");
  const [kms, setKms] = useState(0);
  const [image, setImage] = useState(null);
  const [price, setPrice] = useState(0);
  const [localization, setLocalization] = useState("");
  const [hp, setHp] = useState(0);
  const [engineDisplacement, setEngineDisplacement] = useState(0);
  const [fuel, setFuel] = useState("");

  const navigate = useNavigate();

  function handleTitleChange(event) {
    setTitle(event.target.value);
  }

  function handleDescriptionChange(event) {
    setDescription(event.target.value);
  }

  function handleMakeChange(event) {
    setMake(event.target.value);
  }

  function handleModelChange(event) {
    setModel(event.target.value);
  }

  function handleColorChange(event) {
    setColor(event.target.value);
  }

  function handleYearChange(event) {
    setYear(event.target.value);
  }

  function handleKmsChange(event) {
    setKms(event.target.value);
  }
  /* 
  function handleImageSelect(event) {
    setImage(event.target.files[0]);
  } */

  function handlePriceChange(event) {
    setPrice(event.target.value);
  }

  function handleLocalizationChange(event) {
    setLocalization(event.target.value);
  }

  function handleHpChange(event) {
    setHp(event.target.value);
  }

  function handleEngineDisplacementChange(event) {
    setEngineDisplacement(event.target.value);
  }

  function handleFuelChange(event) {
    setFuel(event.target.value);
  }

  async function handleSubmitForm(event) {
    event.preventDefault();
    //1. Upload the image through the backend
    /*     const uploadData = new FormData();
    uploadData.append("fileName", image);
    const response = await uploadImage(uploadData); */

    //2. Once we get the imageUrl -> create a project
    //with title, description and imageUrl
    await updateAnnouncement(announcementId, {
      title,
      description,
      make,
      model,
      color,
      year,
      kms,
      price,
      localization,
      hp,
      engineDisplacement,
      fuel,
    });

    navigate("/");
  }

  return (
    <form
      onSubmit={handleSubmitForm}
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <label htmlFor="title">Title</label>
      <input
        id="title"
        type="text"
        value={title}
        onChange={handleTitleChange}
      />
      <label htmlFor="description">Description</label>
      <input
        id="description"
        type="text"
        value={description}
        onChange={handleDescriptionChange}
      />

      <label htmlFor="make">Make</label>
      <input id="make" type="text" value={make} onChange={handleMakeChange} />

      <label htmlFor="model">Model</label>
      <input
        id="model"
        type="text"
        value={model}
        onChange={handleModelChange}
      />

      <label htmlFor="color">Color</label>
      <input
        id="color"
        type="text"
        value={color}
        onChange={handleColorChange}
      />

      <label htmlFor="year">Year</label>
      <input id="year" type="number" value={year} onChange={handleYearChange} />

      <label htmlFor="kms">Kms</label>
      <input id="kms" type="number" value={kms} onChange={handleKmsChange} />
      {/* 
      <label htmlFor="image">Image</label>
      <input id="image" type="file" multiple onChange={handleImageSelect} /> */}

      <label htmlFor="price">Price</label>
      <input
        id="price"
        type="number"
        value={price}
        onChange={handlePriceChange}
      />

      <label htmlFor="localization">Localization</label>
      <input
        id="localization"
        type="text"
        value={localization}
        onChange={handleLocalizationChange}
      />

      <label htmlFor="hp">Horse Power</label>
      <input id="hp" type="number" value={hp} onChange={handleHpChange} />

      <label htmlFor="engineDisplacement">Engine Displacement</label>
      <input
        id="engineDisplacement"
        value={engineDisplacement}
        type="number"
        onChange={handleEngineDisplacementChange}
      />

      <label htmlFor="fuel">Fuel</label>
      <input id="fuel" value={fuel} type="text" onChange={handleFuelChange} />

      <button type="submit">Edit announcement</button>
    </form>
  );
}
export default EditAnnouncement;
