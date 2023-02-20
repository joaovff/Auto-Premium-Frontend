import { Search2Icon } from "@chakra-ui/icons";
import { Flex, FormLabel, InputGroup, InputLeftAddon } from "@chakra-ui/react";
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
    <Flex>
      <InputGroup>
        <InputLeftAddon style={{ backgroundColor: "white", border: "0" }}
          children={<Search2Icon style={{ backgroundColor: "white" }} />}
        />
        <Input
          value={keyword}
          type="text"
          onChange={handleKeywordInput}
          id="search"
          style={{width: "250px"}}
        />
      </InputGroup>
    </Flex>
  );
}

export default SearchBar;
