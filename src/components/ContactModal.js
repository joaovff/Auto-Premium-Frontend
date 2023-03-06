import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Text,
  Button,
  FormLabel,
  FormControl,
  InputGroup,
  InputLeftAddon,
  Box,
  Textarea,
  Input,
} from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getUser, sendMessage } from "../api";
import { UserContext } from "../context/user.context";

function ContactModal({ announcement }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [text, setText] = useState("");
  const [user, setUser] = useState(null);
  const { loggedUser } = useContext(UserContext);
  const navigate = useNavigate();
  useEffect(() => {
    async function handleUser() {
      if (loggedUser) {
        const response = await getUser(loggedUser._id);
        setUser(response.data);
      }
    }
    handleUser();
  }, [loggedUser]);
  function handleTextChange(event) {
    setText(event.target.value);
  }
  async function handleSubmitMessage() {
    try {
      if (text !== "") {
        const response = await sendMessage({
          to: announcement.user.phone,
          text: `Auto-Premium: ${announcement.title}.
Name: ${user.name},
Phone: ${user.phone}.
${text}`,
        });
        toast.success("Message sent successfully.");
        setTimeout(() => {
          navigate(0);
        }, 2000);
      } else {
        toast.error(`The message field cannot be empty.`);
      }
    } catch (e) {
      toast.error(`There was an error sending the message: ${e}`);
    }
  }
  if (loggedUser) {
    return (
      <>
        <Button onClick={onOpen}>Send a message</Button>

        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Contact the seller:</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Box>
                <FormControl id="text">
                  <Textarea
                    onChange={handleTextChange}
                    value={text}
                    placeholder="Your message here"
                  />
                </FormControl>
              </Box>
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="red" mr={3} onClick={onClose}>
                Close
              </Button>
              <Button onClick={handleSubmitMessage} colorScheme="green">
                Send message
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    );
  };
}

export default ContactModal;
