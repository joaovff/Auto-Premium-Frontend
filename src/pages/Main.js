import { Link } from "react-router-dom";
import { getAllAnnouncements, getAnnouncement } from "../api";
import SearchBar from "../components/SearchBar";
import { useEffect, useState } from "react";

function Main() {
  function handleSearch(keyword) {
    const filtered = announcements.filter((announcement) => {
      return announcement.title.toLowerCase().includes(keyword.toLowerCase());
    });
    setFilteredAnnouncements(filtered);
  }
  const [filteredAnnouncements, setFilteredAnnouncements] = useState([]);

  const [announcements, setAnnoucements] = useState([]);

  useEffect(() => {
    async function handleGetAllAnnouncements() {
      const response = await getAllAnnouncements();
      setFilteredAnnouncements(response.data);
      setAnnoucements(response.data);

    }
    handleGetAllAnnouncements();
  }, []);

  return (
    <div>
      Main
      <SearchBar handleSearch={handleSearch} />
      {filteredAnnouncements.map((item) => {
        return (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
            key={item._id}
          >
            <img src={item.image} style={{ width: "400px", height: "250px" }} />
            <p>{item.title}</p>
            <Link to={`/announcements/${item._id}`}>Details</Link>
          </div>
        );
      })}
    </div>
  );
}

export default Main;
