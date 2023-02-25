import {
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Stack,
  Text,
  Textarea,
  Input,
  Select,
  Button,
} from "@chakra-ui/react";
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
  const [images, setImages] = useState(null);
  const [price, setPrice] = useState(null);
  const [localization, setLocalization] = useState("");
  const [hp, setHp] = useState(null);
  const [engineDisplacement, setEngineDisplacement] = useState(null);
  const [fuel, setFuel] = useState("");
  const [doors, setDoors] = useState(0);
  const [traction, setTraction] = useState("");
  const [gearBox, setGearBox] = useState("");

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

  function handleImagesSelect(event) {
    setImages(event.target.files);
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

  function handleDoorsChange(event) {
    setDoors(event.target.value);
  }

  function handleTractionChange(event) {
    setTraction(event.target.value);
  }

  function handleGearBoxChange(event) {
    setGearBox(event.target.value);
  }

  async function handleSubmitForm(event) {
    event.preventDefault();
    //1. Upload the image through the backend
    const uploadImagePromises = [];
    Object.keys(images).forEach((img)=> {
      const uploadData = new FormData();
      uploadData.append("fileName", images[img]);
      uploadImagePromises.push(uploadImage(uploadData))
    });

    const responses = await Promise.all(uploadImagePromises)
    const imagesURLs = responses.map((response) => response.data.fileUrl);
    
    //2. Once we get he imageUrl -> create a project
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
      images: imagesURLs
      doors,
      traction,
      gearBox,
    });

    navigate("/");
  }

  return (
    <form
      className="create"
      onSubmit={handleSubmitForm}
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <Heading>Sell your car:</Heading>

      <FormControl isRequired>
        <FormLabel htmlFor="title">Title</FormLabel>
        <Input
          id="title"
          type="text"
          value={title}
          onChange={handleTitleChange}
          style={{ backgroundColor: "white" }}
        />
      </FormControl>

      <FormControl isRequired>
        <FormLabel htmlFor="description" mb="8px">
          Description:
        </FormLabel>
        <Textarea
          id="description"
          type="text"
          value={description}
          onChange={handleDescriptionChange}
          placeholder="Talk about the extras and a short description of the them or about the car."
          size="sm"
          style={{ backgroundColor: "white" }}
        />
      </FormControl>

      <FormControl isRequired>
        <FormLabel htmlFor="make" mb="8px">
          Make:
        </FormLabel>

        <Select
          variant="outline"
          id="make"
          onChange={handleMakeChange}
          size="md"
          style={{ backgroundColor: "white" }}
        >
          <option selected disabled hidden>
            {" "}
          </option>

          {carMakes &&
            carMakes.map((make) => {
              return (
                <option key={make.MakeId} value={make.MakeName}>
                  {make.MakeName}
                </option>
              );
            })}
        </Select>
      </FormControl>

      <FormControl isRequired>
        <FormLabel htmlFor="model">Model</FormLabel>
        <Input
          id="model"
          type="text"
          value={model}
          onChange={handleModelChange}
          style={{ backgroundColor: "white" }}
        />
      </FormControl>

      <FormControl isRequired>
        <FormLabel htmlFor="color">Color</FormLabel>
        <Input
          id="color"
          type="text"
          value={color}
          onChange={handleColorChange}
          style={{ backgroundColor: "white" }}
          placeholder="Black"
        />
      </FormControl>

      <FormControl isRequired>
        <FormLabel htmlFor="year">Year</FormLabel>
        <Input
          id="year"
          type="number"
          value={year}
          onChange={handleYearChange}
          style={{ backgroundColor: "white" }}
          placeholder="2020"
        />
      </FormControl>

      <FormControl isRequired>
        <FormLabel htmlFor="kms">Kms</FormLabel>
        <Input
          id="kms"
          type="number"
          value={kms}
          onChange={handleKmsChange}
          style={{ backgroundColor: "white" }}
          placeholder="15000"
        />
      </FormControl>

      <FormControl isRequired>
        <FormLabel htmlFor="images">Images</FormLabel>
        <Input
          id="images"
          type="file"
          multiple
          onChange={handleImagesSelect}
          style={{ backgroundColor: "white" }}
        />
      </FormControl>

      <FormControl isRequired>
        <FormLabel htmlFor="price">Price</FormLabel>
        <Input
          id="price"
          type="number"
          /* multiple */
          onChange={handlePriceChange}
          style={{ backgroundColor: "white" }}
        />
      </FormControl>

      <FormControl isRequired>
        <FormLabel htmlFor="localization">Localization</FormLabel>
        <Input
          id="localization"
          type="text"
          value={localization}
          onChange={handleLocalizationChange}
          style={{ backgroundColor: "white" }}
        />
      </FormControl>

      <FormControl isRequired>
        <FormLabel htmlFor="hp">Horse Power</FormLabel>
        <Input
          id="hp"
          type="number"
          value={hp}
          onChange={handleHpChange}
          style={{ backgroundColor: "white" }}
        />
      </FormControl>

      <FormControl isRequired>
        <FormLabel htmlFor="engineDisplacement">Engine Displacement</FormLabel>
        <Input
          id="engineDisplacement"
          type="number"
          value={engineDisplacement}
          onChange={handleEngineDisplacementChange}
          style={{ backgroundColor: "white" }}
        />
      </FormControl>

      <FormControl isRequired>
        <FormLabel htmlFor="doors">Doors</FormLabel>
        <Input
          id="doors"
          type="number"
          onChange={handleDoorsChange}
          style={{ backgroundColor: "white" }}
        />
      </FormControl>

      <FormControl isRequired>
        <FormLabel htmlFor="fuel" mb="8px">
          Fuel:
        </FormLabel>

        <Select
          variant="outline"
          id="fuel"
          onChange={handleFuelChange}
          size="md"
          style={{ backgroundColor: "white" }}
        >
          <option selected disabled hidden>
            {" "}
          </option>
          <option selected disabled hidden></option>
          <option value="diesel">Diesel</option>
          <option value="gasoline">Gasoline</option>
          <option value="eletric">Eletric</option>
          <option value="hybrid">Hybrid</option>
        </Select>
      </FormControl>

      <FormControl isRequired>
        <FormLabel htmlFor="traction" mb="8px">
          Traction:
        </FormLabel>

        <Select
          variant="outline"
          id="traction"
          onChange={handleTractionChange}
          size="md"
          style={{ backgroundColor: "white" }}
        >
          <option selected disabled hidden>
            {" "}
          </option>
          <option selected disabled hidden></option>
          <option value="rwd">Rear wheel drive</option>
          <option value="fwd">Front wheel drive</option>
          <option value="awd">All wheel drive</option>
        </Select>
      </FormControl>

      <FormControl isRequired>
        <FormLabel htmlFor="gearBox" mb="8px">
          Gear Box:
        </FormLabel>

        <Select
          variant="outline"
          id="gearBox"
          onChange={handleGearBoxChange}
          size="md"
          style={{ backgroundColor: "white" }}
        >
          <option selected disabled hidden>
            {" "}
          </option>
          <option selected disabled hidden></option>
          <option value="automatic">Automatic</option>
          <option value="manual">Manual</option>
        </Select>
      </FormControl>

      <Button type="submit">Create</Button>
    </form>
  );
}
export default NewAnnouncement;
