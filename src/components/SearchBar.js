import { Divider, Input } from "antd";
import { useState } from "react";

function SearchBar(props) {
  const [keyword, setKeyword] = useState("");

  function handleKeywordInput(event) {
    //event.preventDefault();
    setKeyword(event.target.value);
    props.handleSearch(event.target.value);
  }

  return (
    <>
      <Divider>
        <label htmlFor="search">Search</label>
        <Input
          value={keyword}
          type="text"
          onChange={handleKeywordInput}
          id="search"
        />
      </Divider>
    </>
  );
}

export default SearchBar;
