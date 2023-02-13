import SearchBar from "../components/SearchBar";
import { getAllAnnouncements } from "../api";
import { useEffect, useState } from "react";

function Main() {
  const [announcements, setAnnouncements] = useState([]);
  const [filteredAnnouncements, setFilteredAnnouncements] = useState([]);

  useEffect(() => {
    async function handleGetAllAnnouncements() {
      const response = await getAllAnnouncements();
      setAnnouncements(response.data);
    }
    handleGetAllAnnouncements();
  }, []);

  function handleSearch(keyword) {
    const filtered = announcements.filter((announcement) => {
      return announcement.title.toLowerCase().includes(keyword.toLowerCase());
    });
    setFilteredAnnouncements(filtered);
  }

  return (
    <div>
      Main
      <SearchBar handleSearch={handleSearch} />
    </div>
  );
}

export default Main;
