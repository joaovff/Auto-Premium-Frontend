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
  RadioGroup,
  Drawer,
  Radio,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  useDisclosure,
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
  handleFilter,
  setFilteredAnnouncements,
  announcements,
}) {
  const [keyword, setKeyword] = useState("");
  const [minKms, setMinKms] = useState(0);
  const [maxKms, setMaxKms] = useState(1000000);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(99999999);
  const [minYear, setMinYear] = useState(1900);
  const [maxYear, setMaxYear] = useState(2023);
  const [fuel, setFuel] = useState("gasoline");

  const [show, setShow] = useState(false);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [placement, setPlacement] = useState("left");
  const handlePlacementChange = (event) => setPlacement(event.target.value);
  function handleKeywordInput(event) {
    setKeyword(event.target.value);
    handleSearch(event.target.value);
  }

  function resetFilters() {
    const filtered = [...announcements];
    setFilteredAnnouncements(filtered);
  }

  function handleMinKms(event) {
    setMinKms(event.target.value);
  }

  function handleMaxKms(event) {
    setMaxKms(event.target.value);
  }
  function handleMinYears(event) {
    setMinYear(event.target.value);
  }
  function handleMaxYears(event) {
    setMaxYear(event.target.value);
  }
  function handleMinPrice(event) {
    setMinPrice(event.target.value);
  }
  function handleMaxPrice(event) {
    setMaxPrice(event.target.value);
  }

  function handleFuel(event) {
    setFuel(event.target.value);
  }

  return (
    <Card
      direction={{ base: "column", sm: "row" }}
      overflow="hidden"
      style={{
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
      }}
    >
      <Stack
        style={{
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
        }}
      >
        <CardBody>
          <Flex>
            <InputGroup>
              <InputLeftAddon children={<Search2Icon />} />
              <Input
                value={keyword}
                type="text"
                onChange={handleKeywordInput}
                id="search"
                style={{ width: "250px" }}
              />
            </InputGroup>
          </Flex>
        </CardBody>

        <CardFooter>
          {" "}
          <Button variantColor="blue" onClick={onOpen}>
            Filters
          </Button>
          <Drawer placement={placement} onClose={onClose} isOpen={isOpen}>
            <DrawerOverlay />
            <DrawerContent>
              <DrawerHeader borderBottomWidth="1px">Filters</DrawerHeader>
              <DrawerBody>
                <Stack
                  style={{
                    flexDirection: "column",
                  }}
                >
                  <FormControl
                    style={{
                      display: "flex",
                      justifyContent: "space-around",
                      alignItems: "center",
                    }}
                  >
                    <FormLabel>Price:</FormLabel>
                    <NumberInput size="md" maxW={24} min={1}>
                      <NumberInputField
                        placeholder="€ Min"
                        value={minPrice}
                        type="number"
                        fontSize="13px"
                        min={0}
                        onChange={handleMinPrice}
                        marginLeft="-3%"
                      />
                    </NumberInput>
                    <NumberInput size="md" maxW={24} min={1}>
                      <NumberInputField
                        value={maxPrice}
                        type="number"
                        fontSize="13px"
                        onChange={handleMaxPrice}
                        placeholder="€ Max"
                        marginLeft="-1%"
                      />
                    </NumberInput>
                  </FormControl>

                  <FormControl
                    style={{
                      display: "flex",
                      justifyContent: "space-around",
                      alignItems: "center",
                    }}
                  >
                    <FormLabel>Km:</FormLabel>
                    <NumberInput size="md" maxW={24} min={1}>
                      <NumberInputField
                        value={minKms}
                        type="number"
                        onChange={handleMinKms}
                        placeholder="Min"
                        min="1"
                        fontSize="13px"
                        marginLeft="3%"
                      />
                    </NumberInput>
                    <NumberInput size="md" maxW={24} min={1}>
                      <NumberInputField
                        value={maxKms}
                        fontSize="13px"
                        type="number"
                        onChange={handleMaxKms}
                        placeholder="Max"
                      />
                    </NumberInput>
                  </FormControl>

                  <FormControl
                    style={{
                      display: "flex",
                      justifyContent: "space-around",
                      alignItems: "center",
                    }}
                  >
                    <FormLabel>Year:</FormLabel>
                    <NumberInput size="md" maxW={24} min={1}>
                      <NumberInputField
                        value={minYear}
                        type="number"
                        onChange={handleMinYears}
                        placeholder="Min"
                        min="1900"
                        fontSize="13px"
                        marginLeft="-1%"
                      />
                    </NumberInput>

                    <NumberInput size="md" maxW={24} min={1}>
                      <NumberInputField
                        value={maxYear}
                        type="number"
                        fontSize="13px"
                        onChange={handleMaxYears}
                        placeholder="Max"
                        marginLeft="-2%"
                      />
                    </NumberInput>
                  </FormControl>

                  <FormControl
                    style={{
                      display: "flex",
                      justifyContent: "left",
                      alignItems: "center",
                    }}
                  >
                    <FormLabel marginLeft="2%" htmlFor="fuel">
                      Fuel:
                    </FormLabel>

                    <Select
                      variant="outline"
                      id="fuel"
                      size="md"
                      width="45%"
                      onChange={handleFuel}
                      marginLeft="4%"
                      fontSize="13px"
                    >
                      <option selected disabled hidden>
                        {" "}
                      </option>
                      <option selected value="i">
                        All
                      </option>
                      <option value="diesel">Diesel</option>
                      <option value="gasoline">Gasoline</option>
                      <option value="eletric">Eletric</option>
                      <option value="hybrid">Hybrid</option>
                    </Select>
                  </FormControl>
                  <br />
                  <Button
                    width={"fit-content"}
                    p={4}
                    alignSelf="center"
                    onClick={() =>
                      handleFilter(
                        minPrice,
                        maxPrice,
                        minKms,
                        maxKms,
                        minYear,
                        maxYear,
                        fuel
                      )
                    }
                  >
                    Apply filters
                  </Button>

                  <Button
                    width={"fit-content"}
                    p={4}
                    alignSelf="center"
                    onClick={() => resetFilters()}
                  >
                    Reset filters
                  </Button>
                </Stack>
              </DrawerBody>
            </DrawerContent>
          </Drawer>{" "}
        </CardFooter>
      </Stack>
    </Card>
  );
}

export default SearchBar;
