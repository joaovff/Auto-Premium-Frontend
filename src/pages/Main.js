import { Link } from "react-router-dom";
import { getAnnouncement } from "../api";
import SearchBar from "../components/SearchBar";

function Main({ setFilteredAnnouncements, filteredAnnouncements }) {
  function handleSearch(keyword) {
    const filtered = filteredAnnouncements.filter((announcement) => {
      return announcement.title.toLowerCase().includes(keyword.toLowerCase());
    });
    setFilteredAnnouncements(filtered);
  }

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
