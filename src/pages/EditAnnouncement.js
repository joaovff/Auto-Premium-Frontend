import { useState } from "react";
import { useNavigate } from "react-router";
import { updateAnnouncement } from "../api";
import { uploadImage } from "../api";


function EditAnnouncement() {
 
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState(null);
    const [make, setMake] = useState("");
    const [model, setModel] = useState("");
    const [year, setYear] = useState("");
    const [kms, setKms] = useState(0);
    const [price, setPrice] = useState(0);
  
    const navigate = useNavigate();
  
    function handleTitleChange(event) {
      setTitle(event.target.value);
    }
  
    function handleDescriptionChange(event) {
      setDescription(event.target.value);
    }
  
    function handleKmsChange(event) {
      setKms(event.target.value);
    }
    function handleYearChange(event) {
      setYear(event.target.value);
    }
    function handleMakeChange(event) {
      setMake(event.target.value);
    }
    function handleModelChange(event) {
      setModel(event.target.value);
    }
  
    function handleImageSelect(event) {
      setImage(event.target.files[0]);
    }
    function handlePriceChange(event) {
      setPrice(event.target.value);
    }
    async function handleSubmitForm(event) {
      event.preventDefault();
      //1. Upload the image through the backend
      const uploadData = new FormData();
      uploadData.append("fileName", image);
      const response = await uploadImage(uploadData);
  
      //2. Once we get the imageUrl -> create a project
      //with title, description and imageUrl
      await updateAnnouncement({
        title,
        description,
        image: response.data.fileUrl,
        make,
        model,
        year,
        kms,
        price,
      });
  
      console.log("Created!");
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
        <label htmlFor="image">Image</label>
        <input id="image" type="file" multiple onChange={handleImageSelect} />
  
        <label htmlFor="make">Make</label>
        <input id="make" type="text" value={make} onChange={handleMakeChange} />
  
        <label htmlFor="model">Model</label>
        <input
          id="model"
          type="text"
          value={model}
          onChange={handleModelChange}
        />
  
        <label htmlFor="year">Year</label>
        <input id="year" type="number" value={year} onChange={handleYearChange} />
  
        <label htmlFor="kms">Kms</label>
        <input id="kms" type="number" value={kms} onChange={handleKmsChange} />
  
        <label htmlFor="price">Price</label>
        <input
          id="price"
          type="number"
          value={price}
          onChange={handlePriceChange}
        />
  
        <button type="submit">Edit announcement</button>
      </form>
    );
  }
  export default EditAnnouncement;