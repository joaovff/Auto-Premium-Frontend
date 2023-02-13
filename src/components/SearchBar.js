import { Divider, Input, Button } from 'antd';
import { useState } from 'react';
import { getAnnouncement } from '../api';


function SearchBar() {

const [keyword, setKeyword] = useState("");


function handleKeywordInput(event) {
    setKeyword(event.target.value);
    getAnnouncement(event.target.value);

}

  return (
    <>
      <Divider></Divider>

      <label>Search</label>
      <Input value={keyword} type="text" onChange={handleKeywordInput} />
      <Button type='submit'>Search</Button>
    </>
  );
}


export default SearchBar;