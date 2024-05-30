import {
  FormControl,
  FormLabel,
  Heading,
  useColorModeValue,
  Textarea,
  Input,
  Select,
  Button,
  Flex,
  Progress,
  Box,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createAnnouncement, getMakes, uploadImage } from "../api";
import {
  MdOutlineKeyboardDoubleArrowLeft,
  MdOutlineKeyboardDoubleArrowRight,
} from "react-icons/md";

import data from "../portugal.json";
import "./styles/newAnnouncement.css";

function NewAnnouncement() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    make: "",
    model: "",
    color: "",
    year: "",
    kms: null,
    images: null,
    price: null,
    localization: "",
    hp: null,
    engineDisplacement: null,
    fuel: "",
    doors: null,
    traction: "",
    gearBox: "",
  });
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImagesSelect = (e) => {
    setFormData({
      ...formData,
      images: e.target.files,
    });
  };

  const handleSubmitForm = async (e) => {
    try {
      e.preventDefault();
      //1. Upload the image through the backend
      const uploadImagePromises = [];
      Object.keys(formData.images).forEach((img) => {
        const uploadData = new FormData();
        uploadData.append("fileName", formData.images[img]);
        uploadImagePromises.push(uploadImage(uploadData));
      });

      const responses = await Promise.all(uploadImagePromises);
      const imagesURLs = responses.map((response) => response.data.fileUrl);

      //2. Once we get he imageUrl -> create a announcement
      await createAnnouncement({
        ...formData,
        images: imagesURLs,
      });
      navigate("/");
    } catch (e) {
      toast.error(`${e.response.data.message}`);
    }
  };

  const handleNextStep = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const handlePrevStep = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  return (
    <>
      <Heading mb={"5%"}>Sell your car</Heading>
      <Flex justifyContent="center" alignItems="center">
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
          maxWidth={"85vw"}
          minWidth={"55%"}
          className="login-container"
        >
          {" "}
          <Progress value={(currentStep / 4) * 100} mb={4} size="md" />
          <form
            className="create"
            onSubmit={handleSubmitForm}
            style={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            {currentStep === 1 && (
              <>
                <FormControl isRequired>
                  <FormLabel htmlFor="title">Title</FormLabel>
                  <Input
                    id="title"
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="Honda Civic Type-R"
                  />
                </FormControl>

                <FormControl isRequired>
                  <FormLabel htmlFor="description" mb="8px">
                    Description:
                  </FormLabel>
                  <Textarea
                    id="description"
                    name="description"
                    type="text"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Adaptative cruise control, driving modes, sunroof..."
                    size="sm"
                  />
                </FormControl>

                <FormControl isRequired>
                  <FormLabel htmlFor="images">Images</FormLabel>
                  <Input
                    id="images"
                    name="images"
                    type="file"
                    multiple
                    onChange={handleImagesSelect}
                  />
                </FormControl>
              </>
            )}

            {currentStep === 2 && (
              <>
                <FormControl isRequired>
                  <FormLabel htmlFor="make" mb="8px">
                    Make:
                  </FormLabel>

                  <Select
                    variant="outline"
                    id="make"
                    name="make"
                    onChange={handleInputChange}
                    value={formData.make}
                    size="md"
                  >
                    <option value="">Select Make</option>{" "}
                    {carMakes.map((make) => (
                      <option key={make.MakeId} value={make.MakeName}>
                        {make.MakeName}
                      </option>
                    ))}
                  </Select>
                </FormControl>

                <FormControl isRequired>
                  <FormLabel htmlFor="model">Model</FormLabel>
                  <Input
                    id="model"
                    name="model"
                    type="text"
                    value={formData.model}
                    onChange={handleInputChange}
                    placeholder="Civic"
                  />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel htmlFor="color">Color</FormLabel>
                  <Input
                    id="color"
                    name="color"
                    type="text"
                    value={formData.color}
                    onChange={handleInputChange}
                    placeholder="Black"
                  />
                </FormControl>

                <FormControl isRequired>
                  <FormLabel htmlFor="year">Year</FormLabel>
                  <Input
                    id="year"
                    name="year"
                    type="number"
                    value={formData.year}
                    onChange={handleInputChange}
                    placeholder="2020"
                    max={new Date().getFullYear()}
                  />
                </FormControl>

                <FormControl isRequired>
                  <FormLabel htmlFor="fuel" mb="8px">
                    Fuel:
                  </FormLabel>

                  <Select
                    variant="outline"
                    id="fuel"
                    name="fuel"
                    onChange={handleInputChange}
                    value={formData.fuel}
                    size="md"
                  >
                    <option value="">Select Fuel</option>
                    <option value="diesel">Diesel</option>
                    <option value="gasoline">Gasoline</option>
                    <option value="eletric">Eletric</option>
                    <option value="hybrid">Hybrid</option>
                  </Select>
                </FormControl>
              </>
            )}

            {currentStep === 3 && (
              <>
                <FormControl isRequired>
                  <FormLabel htmlFor="kms">Kms</FormLabel>
                  <Input
                    id="kms"
                    name="kms"
                    type="number"
                    value={formData.kms}
                    onChange={handleInputChange}
                    placeholder="15000"
                  />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel htmlFor="price">Price</FormLabel>
                  <Input
                    id="price"
                    name="price"
                    type="number"
                    value={formData.price}
                    onChange={handleInputChange}
                    placeholder="20000"
                  />
                </FormControl>

                <FormControl isRequired>
                  <FormLabel htmlFor="localization">Localization</FormLabel>
                  <Select
                    variant="outline"
                    id="localization"
                    name="localization"
                    onChange={handleInputChange}
                    value={formData.localization}
                    size="md"
                  >
                    <option value="">Select Localization</option>
                    {cities.map((city) => (
                      <option key={city.name} value={JSON.stringify(city)}>
                        {city.name}
                      </option>
                    ))}
                  </Select>
                </FormControl>
              </>
            )}

            {currentStep === 4 && (
              <>
                <FormControl isRequired>
                  <FormLabel htmlFor="doors">Doors</FormLabel>
                  <Input
                    id="doors"
                    name="doors"
                    type="number"
                    value={formData.doors}
                    onChange={handleInputChange}
                    placeholder="5"
                  />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel htmlFor="traction" mb="8px">
                    Traction:
                  </FormLabel>

                  <Select
                    variant="outline"
                    id="traction"
                    name="traction"
                    onChange={handleInputChange}
                    value={formData.traction}
                    size="md"
                  >
                    <option value="">Select Traction</option>
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
                    name="gearBox"
                    onChange={handleInputChange}
                    value={formData.gearBox}
                    size="md"
                  >
                    <option value="">Select Gear Box</option>
                    <option value="automatic">Automatic</option>
                    <option value="manual">Manual</option>
                  </Select>
                </FormControl>

                <FormControl isRequired>
                  <FormLabel htmlFor="hp">Horse Power</FormLabel>
                  <Input
                    id="hp"
                    name="hp"
                    type="number"
                    value={formData.hp}
                    onChange={handleInputChange}
                    placeholder="184"
                  />
                </FormControl>

                <FormControl isRequired>
                  <FormLabel htmlFor="engineDisplacement">
                    Engine Displacement
                  </FormLabel>
                  <Input
                    id="engineDisplacement"
                    name="engineDisplacement"
                    type="number"
                    value={formData.engineDisplacement}
                    onChange={handleInputChange}
                    placeholder="2485"
                  />
                </FormControl>
              </>
            )}

            <Flex justifyContent={"center"} alignItems={"center"}>
              {currentStep > 1 && (
                <Button
                  type="button"
                  onClick={handlePrevStep}
                  disabled={currentStep === 1}
                  mt={5}
                  mr={5}
                >
                  <MdOutlineKeyboardDoubleArrowLeft fontSize="16px" />
                </Button>
              )}
              {currentStep < 4 ? (
                <Button
                  type="button"
                  onClick={handleNextStep}
                  disabled={currentStep === 4}
                  mt={5}
                >
                  <MdOutlineKeyboardDoubleArrowRight fontSize="16px" />
                </Button>
              ) : (
                <Button mt={5} type="submit">
                  Sell
                </Button>
              )}
            </Flex>
          </form>
        </Box>
      </Flex>{" "}
    </>
  );
}
export default NewAnnouncement;
