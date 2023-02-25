import { Search2Icon } from "@chakra-ui/icons";
import {
  Flex,
  Stack,
  Card,
  CardBody,
  CardFooter,
  Button,
  NumberInput,
  NumberInputField,
  FormLabel,
  FormControl,
  Select,
  InputGroup,
  InputLeftAddon,
  Input,
} from "@chakra-ui/react";
import { useState } from "react";

function SearchBar({
  handleSearch,
  handleMinKmsSearch,
  handleMaxKmsSearch,
  handleMinYearsSearch,
  handleMaxYearsSearch,
  handleMinPriceSearch,
  handleMaxPriceSearch,
  handleFuelSearch,
}) {
  const [keyword, setKeyword] = useState("");
  const [minKms, setMinKms] = useState("");
  const [maxKms, setMaxKms] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [minYear, setMinYear] = useState("");
  const [maxYear, setMaxYear] = useState("");
  const [fuel, setFuel] = useState("");

  function handleKeywordInput(event) {
    setKeyword(event.target.value);
    handleSearch(event.target.value);
  }

  function handleMinKms(event) {
    setMinKms(event.target.value);
    handleMinKmsSearch(event.target.value);
  }

  function handleMaxKms(event) {
    setMaxKms(event.target.value);
    handleMaxKmsSearch(event.target.value);
  }
  function handleMinYears(event) {
    setMinYear(event.target.value);
    handleMinYearsSearch(event.target.value);
  }
  function handleMaxYears(event) {
    setMaxYear(event.target.value);
    handleMaxYearsSearch(event.target.value);
  }
  function handleMinPrice(event) {
    setMinPrice(event.target.value);
    handleMinPriceSearch(event.target.value);
  }
  function handleMaxPrice(event) {
    setMaxPrice(event.target.value);
    handleMaxPriceSearch(event.target.value);
  }

  function handleFuel(event) {
    setFuel(event.target.value);
    handleFuelSearch(event.target.value);
  }

  return (
    <Card
      direction={{ base: "column", sm: "row" }}
      overflow="hidden"
      variant="outline"
      style={{ justifyContent: "center", alignItems: "center" }}
    >
      <Stack>
        <CardBody>
          <Flex>
            <InputGroup>
              <InputLeftAddon
                style={{ backgroundColor: "white", border: "0" }}
                children={<Search2Icon style={{ backgroundColor: "white" }} />}
              />
              <Input
                value={keyword}
                type="text"
                onChange={handleKeywordInput}
                id="search"
                style={{ width: "250px" }}
              />
            </InputGroup>
          </Flex>
          <br />
          <br />
          <Stack direction={{ base: "column", sm: "row" }}>
            <FormControl display="flex">
              <FormLabel>Price:</FormLabel>
              <NumberInput size="md" maxW={24} min={1}>
                <NumberInputField
                  placeholder="€ Min"
                  value={minPrice}
                  type="number"
                  onChange={handleMinPrice}
                />
              </NumberInput>
              <NumberInput size="md" maxW={24} min={1}>
                <NumberInputField
                  value={maxPrice}
                  type="number"
                  onChange={handleMaxPrice}
                  placeholder="€ Max"
                />
              </NumberInput>
            </FormControl>

            <FormControl display="flex">
              <FormLabel>Km</FormLabel>
              <NumberInput size="md" maxW={24} min={1}>
                <NumberInputField
                  value={minKms}
                  type="number"
                  onChange={handleMinKms}
                  placeholder="Km Min"
                />
              </NumberInput>
              <NumberInput size="md" maxW={24} min={1}>
                <NumberInputField
                  value={maxKms}
                  type="number"
                  onChange={handleMaxKms}
                  placeholder="Km Max"
                />
              </NumberInput>
            </FormControl>

            <FormControl display="flex">
              <FormLabel>Year</FormLabel>
              <NumberInput size="md" maxW={24} min={1}>
                <NumberInputField
                  value={minYear}
                  type="number"
                  onChange={handleMinYears}
                  placeholder="Year Max"
                />
              </NumberInput>
            </FormControl>

            <FormControl display="flex">
              <NumberInput size="md" maxW={24} min={1}>
                <NumberInputField
                  value={maxYear}
                  type="number"
                  onChange={handleMaxYears}
                  placeholder="Year Max"
                />
              </NumberInput>
            </FormControl>

            <FormControl display="flex">
              <FormLabel htmlFor="fuel" mb="8px">
                Fuel:
              </FormLabel>

              <Select
                variant="outline"
                id="fuel"
                size="md"
                style={{ backgroundColor: "white" }}
                onChange={handleFuel}
              >
                <option selected disabled hidden>
                  {" "}
                </option>
                <option selected disabled hidden></option>
                <option value="diesel">Diesel</option>
                <option value="gasoline">Gasoline</option>
                <option value="eletric">Eletric</option>
                <option value="hybrid">Hybrid</option>
              </Select>
            </FormControl>
          </Stack>
        </CardBody>

        <CardFooter>
          <Button>Update Search</Button>
        </CardFooter>
      </Stack>
    </Card>
  );
}

export default SearchBar;
