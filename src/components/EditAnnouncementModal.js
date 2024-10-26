import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getMakes, updateAnnouncement, uploadImage } from "../api";
import { EditIcon } from "@chakra-ui/icons";
import data from "../portugal.json";
import { toast } from "react-toastify";

function EditAnnouncementModal({ announcement }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = useRef(null);
  const finalRef = useRef(null);

  const [title, setTitle] = useState(announcement.title);
  const [description, setDescription] = useState(announcement.description);
  const [make, setMake] = useState(announcement.make);
  const [model, setModel] = useState(announcement.model);
  const [color, setColor] = useState(announcement.color);
  const [year, setYear] = useState(announcement.year);
  const [kms, setKms] = useState(announcement.kms);
  const [images, setImages] = useState(null);
  const [price, setPrice] = useState(announcement.price);
  const [localization, setLocalization] = useState("");
  const [hp, setHp] = useState(announcement.hp);
  const [engineDisplacement, setEngineDisplacement] = useState(
    announcement.engineDisplacement
  );
  const [fuel, setFuel] = useState("");
  const [doors, setDoors] = useState(announcement.doors);
  const [traction, setTraction] = useState("");
  const [gearBox, setGearBox] = useState("");

  const [carMakes, setCarMakes] = useState([]);
  const navigate = useNavigate();

  const cities = data.map((city) => {
    return city;
  });

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
    Object.keys(images).forEach((img) => {
      const uploadData = new FormData();
      uploadData.append("fileName", images[img]);
      uploadImagePromises.push(uploadImage(uploadData));
    });

    const responses = await Promise.all(uploadImagePromises);
    const imagesURLs = responses.map((response) => response.data.fileUrl);

    //2. Once we get he imageUrl -> create a project
    const editedAnnouncement = await updateAnnouncement(announcement._id, {
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
      images: imagesURLs,
      doors,
      traction,
      gearBox,
    });
    if (editedAnnouncement.data.message) {
      toast.error(editedAnnouncement.data.message);
    } else {
      toast.success("Your announcement has been updated.");
      setTimeout(() => {
        navigate(0);
      }, 3000);
    }
    }

  return (
    <>
      <Button border="1px solid #DCDCDC" onClick={onOpen}>
        Edit Announcement
        <EditIcon marginLeft="8px" />
      </Button>

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit your Announcement</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl isRequired>
              <FormLabel htmlFor="title">Title</FormLabel>
              <Input
                id="title"
                type="text"
                value={title}
                placeholder={title}
                onChange={handleTitleChange}
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
                placeholder={description}
                size="sm"
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
                placeholder={model}
                onChange={handleModelChange}
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel htmlFor="color">Color</FormLabel>
              <Input
                id="color"
                type="text"
                value={color}
                onChange={handleColorChange}
                placeholder={color}
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel htmlFor="year">Year</FormLabel>
              <Input
                id="year"
                type="number"
                value={year}
                placeholder={year}
                onChange={handleYearChange}
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel htmlFor="kms">Kms</FormLabel>
              <Input
                id="kms"
                type="number"
                placeholder={kms}
                value={kms}
                onChange={handleKmsChange}
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel htmlFor="images">Images</FormLabel>
              <Input
                id="images"
                type="file"
                multiple
                onChange={handleImagesSelect}
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel htmlFor="price">Price</FormLabel>
              <Input
                id="price"
                type="number"
                value={price}
                onChange={handlePriceChange}
              />
            </FormControl>

            <FormLabel htmlFor="localization">Localization</FormLabel>
            <Select
              variant="outline"
              id="localization"
              onChange={handleLocalizationChange}
              size="md"
            >
              <option selected disabled hidden>
                {" "}
              </option>
              {cities &&
                cities.map((city) => {
                  return (
                    <option key={city.name} value={JSON.stringify(city)}>
                      {city.name}
                    </option>
                  );
                })}
            </Select>

            <FormControl isRequired>
              <FormLabel htmlFor="hp">Horse Power</FormLabel>
              <Input
                id="hp"
                type="number"
                value={hp}
                onChange={handleHpChange}
                placeholder={hp}
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel htmlFor="engineDisplacement">
                Engine Displacement
              </FormLabel>
              <Input
                id="engineDisplacement"
                type="number"
                value={engineDisplacement}
                placeholder={engineDisplacement}
                onChange={handleEngineDisplacementChange}
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel htmlFor="doors">Doors</FormLabel>
              <Input
                value={doors}
                id="doors"
                type="number"
                onChange={handleDoorsChange}
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
              >
                <option selected disabled hidden>
                  {" "}
                </option>
                <option selected disabled hidden></option>
                <option value="automatic">Automatic</option>
                <option value="manual">Manual</option>
              </Select>
            </FormControl>

            <ModalFooter>
              <Button
                colorScheme="blue"
                onClick={handleSubmitForm}
                type="submit"
                mr={3}
              >
                Edit
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default EditAnnouncementModal;
