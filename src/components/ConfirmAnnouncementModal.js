import { DeleteIcon } from "@chakra-ui/icons";
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
} from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { deleteAnnouncement } from "../api";
function ConfirmAnnouncementModal({ announcementId }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [size, setSize] = useState("sm");

  const navigate = useNavigate();
  const handleSizeClick = (newSize) => {
    setSize(newSize);
    onOpen();
  };

  async function handleDeletedAnnouncement() {
    try {
      const response = await deleteAnnouncement(announcementId);
      if (response.data.error) {
        toast.error(response.data.error);
      } else {
        toast.success("The announcement has been deleted.");
        setTimeout(() => {
          navigate(0);
        }, 2000);
      }
    } catch (e) {
      toast.error(e);
    }
  }

  return (
    <>
      <Button
        border="1px solid #DCDCDC"
        onClick={() => handleSizeClick(size)}
        key={"sm"}
        m={4}
        ml={8}
        mr={-1}
      >
        <DeleteIcon color="red.600" />
      </Button>

      <Modal onClose={onClose} size={size} isCentered isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Delete announcement</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Are you sure you want to delete this announcement?</Text>
          </ModalBody>
          <ModalFooter>
            <Button mr={5} bg="red.700" onClick={handleDeletedAnnouncement}>
              Delete announcement
            </Button>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default ConfirmAnnouncementModal;
