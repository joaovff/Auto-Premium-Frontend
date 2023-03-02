import { useContext, useState } from "react";
import { UploadPicture, editUser, uploadImage } from "../api";
import { UserContext } from "../context/user.context";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Card,
  CardBody,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftAddon,
  InputLeftElement,
  InputRightElement,
} from "@chakra-ui/react";
import { MdOutlineEmail } from "react-icons/md";

function EditProfile() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [picture, setPicture] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const { loggedUser } = useContext(UserContext);

  function handleEmailChange(event) {
    setEmail(event.target.value);
  }

  function handlePasswordChange(event) {
    setPassword(event.target.value);
  }

  function handleNameChange(event) {
    setName(event.target.value);
  }

  function handlePhoneChange(event) {
    setPhone(event.target.value);
  }

  function handlePictureSelect(event) {
    setPicture(event.target.files[0]);
  }

  async function handleSubmitForm(event) {
    event.preventDefault();
    try {
      const uploadData = new FormData();
      uploadData.append("fileName", picture);
      const responseImage = await uploadImage(uploadData);
      const response = await editUser(loggedUser._id, {
        email,
        name,
        password,
        picture: responseImage.data.fileUrl,
        phone,
      });

      if (response.status === 200) {
        console.log("User editado com sucesso");
      } else {
        console.log("User falhou");
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div>
      <Card>
        <CardBody>
          <form
            className="edit-user"
            onSubmit={handleSubmitForm}
            style={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <Box>
              <FormControl id="email" isRequired>
                <FormLabel htmlFor="email">Email</FormLabel>

                <InputGroup>
                  <InputLeftElement children={<MdOutlineEmail />} />
                  <Input
                    id="email"
                    type="text"
                    value={email}
                    onChange={handleEmailChange}
                  />
                </InputGroup>
              </FormControl>

              <br />
            </Box>

            <Box>
              <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input
                    onChange={handlePasswordChange}
                    type={showPassword ? "text" : "password"}
                  />
                  <InputRightElement h={"full"}>
                    <Button
                      variant={"ghost"}
                      onClick={() =>
                        setShowPassword((showPassword) => !showPassword)
                      }
                      onChange={handlePasswordChange}
                    >
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
            </Box>

            <Box>
              <FormControl isRequired>
                <FormLabel htmlFor="name">Name</FormLabel>
                <Input
                  id="name"
                  type="text"
                  value={name}
                  onChange={handleNameChange}
                />
              </FormControl>
            </Box>

            <Box>
              <FormControl id="phone">
                <FormLabel htmlFor="phone">Phone Number </FormLabel>
                <InputGroup>
                  <InputLeftAddon children="+351" />
                  <Input
                    id="phone"
                    type="tel"
                    value={phone}
                    onChange={handlePhoneChange}
                    style={{ width: "300px" }}
                    placeholder="Phone number"
                  />
                </InputGroup>
              </FormControl>

              <br />
            </Box>

            <FormControl id="picture">
              <FormLabel htmlFor="picture">User Picture</FormLabel>
              <Input
                id="picture"
                type="file"
                name="fileName"
                onChange={handlePictureSelect}
                style={{ width: "300px" }}
              />
            </FormControl>

            <Button type="submit">Edit</Button>
          </form>
        </CardBody>
      </Card>
    </div>
  );
}

export default EditProfile;
