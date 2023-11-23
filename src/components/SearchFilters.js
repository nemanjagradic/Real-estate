import { useEffect, useState } from "react";
import {
  Flex,
  Select,
  Box,
  Text,
  Input,
  Spinner,
  Icon,
  Button,
} from "@chakra-ui/react";
import { MdCancel } from "react-icons/md";
import { filterData } from "../utils/filterData";
import { useNavigate, useLocation } from "react-router-dom";
import noResults from "../svg/noresult.svg";
import { fetchApi, baseUrl } from "../utils/fetchApi";

const SearchFilters = () => {
  const [filters] = useState(filterData);
  const [searchTerm, setSearchTerm] = useState("");
  const [locationData, setLocationData] = useState();
  const [showLocations, setShowLocations] = useState(false);
  const [updatedFilterValues, setUpdatedFilterValues] = useState({});
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const clearFilters = () => {
    setUpdatedFilterValues({});
    const newUrl = `${location.pathname}`;
    navigate(newUrl);
  };

  useEffect(() => {
    const path = location.pathname;
    const search = new URLSearchParams(location.search);

    Object.entries(updatedFilterValues).forEach(([name, value]) => {
      if (value) {
        search.set(name, value);
      }
    });

    navigate(`${path}?${search}`);
  }, [updatedFilterValues, navigate, location.pathname, location.search]);

  useEffect(() => {
    if (searchTerm !== "") {
      const fetchData = async () => {
        setLoading(true);
        const data = await fetchApi(
          `${baseUrl}/auto-complete?query=${searchTerm}`
        );
        setLoading(false);
        setLocationData(data?.hits);
      };

      fetchData();
    }
  }, [searchTerm]);

  return (
    <>
      <Flex bg="beige" pt="20px" px="40px" flexWrap="wrap">
        {filters.map((filter) => (
          <Box p="2" key={filter.queryName}>
            {filter.type === "checkbox" ? (
              <Box display="flex" alignItems="center">
                <label style={{ marginRight: "10px" }}>{filter.label}</label>
                <input
                  style={{ width: "15px", height: "15px" }}
                  type="checkbox"
                  checked={updatedFilterValues[filter.queryName] === "true"}
                  onChange={(e) =>
                    setUpdatedFilterValues({
                      ...updatedFilterValues,
                      [filter.queryName]: e.target.checked ? "true" : "false",
                    })
                  }
                />
              </Box>
            ) : (
              <Select
                onChange={(e) => {
                  setUpdatedFilterValues({
                    ...updatedFilterValues,
                    [filter.queryName]: e.target.value,
                  });
                }}
                placeholder={filter.placeholder}
                w="fit-content"
              >
                {filter?.items?.map((item) => (
                  <option value={item.value} key={item.value}>
                    {item.name}
                  </option>
                ))}
              </Select>
            )}
          </Box>
        ))}
        <Box flex="1">
          <Button
            bg="beige"
            float="right"
            marginRight="34px"
            _hover={{ bg: "darkerBeige" }}
            type="button"
            onClick={clearFilters}
          >
            Clear Filters
          </Button>
        </Box>
      </Flex>
      <Flex
        bg="beige"
        flexDir="column"
        justifyContent="center"
        alignItems="center"
        width="100%"
      >
        <Button
          onClick={() => setShowLocations(!showLocations)}
          border="1px"
          borderColor="gray.200"
          bg="beige"
          w="300px"
          _hover={{ bg: "darkerBeige" }}
        >
          Search Location
        </Button>
        {showLocations && (
          <Flex flexDir="column" pos="relative" paddingTop="2">
            <Input
              placeholder="Type Here"
              value={searchTerm}
              w="300px"
              focusBorderColor="gray.300"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm !== "" && (
              <Icon
                as={MdCancel}
                pos="absolute"
                cursor="pointer"
                right="5"
                top="5"
                zIndex="100"
                onClick={() => setSearchTerm("")}
              />
            )}
            {loading && <Spinner margin="auto" marginTop="3" />}
            {showLocations && (
              <Box height="220px" overflow="auto" my="3" width="300px">
                {locationData?.map((location) => (
                  <Box
                    key={location.id}
                    onClick={() => {
                      setUpdatedFilterValues({
                        ...updatedFilterValues,
                        locationExternalIDs: location.externalID,
                      });
                      setShowLocations(false);
                      setSearchTerm(location.name);
                    }}
                  >
                    <Text
                      cursor="pointer"
                      bg="darkerBeige"
                      p="2"
                      borderBottom="1px"
                      borderColor="gray.100"
                    >
                      {location.name}
                    </Text>
                  </Box>
                ))}
                {!loading && !locationData?.length && (
                  <Flex
                    justifyContent="center"
                    alignItems="center"
                    flexDir="column"
                    marginTop="5"
                    marginBottom="5"
                  >
                    <img src={noResults} alt="" />
                    <Text fontSize="xl" marginTop="3">
                      Waiting to search!
                    </Text>
                  </Flex>
                )}
              </Box>
            )}
          </Flex>
        )}
      </Flex>
    </>
  );
};

export default SearchFilters;
