import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createAnnouncement, getMakes, uploadImage } from "../api";

function NewAnnouncement() {
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

  const [carMakes, setCarMakes] = useState([]);

  useEffect(() => {
    async function getAllMakes() {
      const response = await getMakes();
      setCarMakes(
        response.data.Results.sort((a, b) => {
          if (a.MakeName < b.MakeName) {
            return -1;
          } else if (a.MakeName > b.MakeName) {
            return 1;
          }
          return 0;
        })
      );
    }
    getAllMakes();
  }, []);
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

  function handleImageSelect(event) {
    setImage(event.target.files[0]);
  }

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
    const uploadData = new FormData();
    uploadData.append("fileName", image);
    const response = await uploadImage(uploadData);

    //2. Once we get the imageUrl -> create a project
    //with title, description and imageUrl
    await createAnnouncement({
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
      image: response.data.fileUrl,
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
      <select id="make" onChange={handleMakeChange}>
        <option selected disabled hidden></option>

        {carMakes &&
          carMakes.map((make) => {
            return (
              <option key={make.MakeId} value={make.MakeName}>
                {make.MakeName}
              </option>
            );
          })}
      </select>

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

      <label htmlFor="image">Image</label>
      <input id="image" type="file" multiple onChange={handleImageSelect} />

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
        type="number"
        value={engineDisplacement}
        onChange={handleEngineDisplacementChange}
      />

      <label htmlFor="fuel">Fuel</label>
      <select id="fuel" onChange={handleFuelChange}>
        <option selected disabled hidden></option>
        <option value="diesel">Diesel</option>
        <option value="gasoline">Gasoline</option>
        <option value="eletric">Eletric</option>
        <option value="hybrid">Hybrid</option>
      </select>

      <button type="submit">Create</button>
    </form>
  );
}
export default NewAnnouncement;
