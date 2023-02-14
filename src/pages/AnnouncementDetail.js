import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { deleteAnnouncement, getAnnouncement } from "../api";

function AnnouncementDetail() {
  const [announcement, setAnnouncement] = useState();
  const { announcementId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function handleGetAnnouncementDetail() {
      const response = await getAnnouncement(announcementId);
      setAnnouncement(response.data);
    }

    handleGetAnnouncementDetail();
  }, [announcementId]);

  async function handleDeleteAnnouncement() {
    await deleteAnnouncement(announcementId);
    navigate("/");
  }
  return announcement ? (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
      key={announcement._id}
    >
      <h3>{announcement.title}</h3>
      <img src={announcement.image} />
      <p>{announcement.description}</p>
      <p>{announcement.make}</p>
      <p>{announcement.model}</p>
      <p>{announcement.year}</p>
      <p>{announcement.kms}</p>

      <button onClick={handleDeleteAnnouncement}>Delete</button>
    </div>
  ) : (
    <p>Loading</p>
  );
}

export default AnnouncementDetail;
