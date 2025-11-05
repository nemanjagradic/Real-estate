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
import { useNavigate, useLocation, useSearchParams } from "react-router-dom";
import noResults from "../svg/noresult.svg";
import { fetchApi, baseUrl } from "../utils/fetchApi";
import {
  AutoCompleteLocationResponseSchema,
  TAutoCompleteLocation,
  TAutoCompleteLocationResponse,
} from "../schemas/autoCompleteLocationSchema";
import { useQuery } from "@tanstack/react-query";

type SearchFiltersProps = {
  setActive: React.Dispatch<React.SetStateAction<number>>;
};

const SearchFilters = ({ setActive }: SearchFiltersProps) => {
  const [filters] = useState(filterData);
  const [searchTerm, setSearchTerm] = useState("");
  const [showLocations, setShowLocations] = useState(false);
  const [selectFilters, setSelectFilters] = useState<
    Record<string, string | undefined>
  >({});
  const [checkboxFilters, setCheckboxFilters] = useState<
    Record<string, boolean>
  >({});

  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();

  const clearFilters = () => {
    setSelectFilters({});
    setCheckboxFilters({});
    setActive(1);
    navigate(location.pathname);
  };

  useEffect(() => {
    const path = location.pathname;

    Object.entries(selectFilters).forEach(([name, value]) => {
      if (value !== undefined) searchParams.set(name, value);
      else searchParams.delete(name);
    });

    Object.entries(checkboxFilters).forEach(([name, value]) => {
      searchParams.set(name, value.toString());
    });

    navigate(`${path}?${searchParams}`);
  }, [
    selectFilters,
    checkboxFilters,
    navigate,
    location.pathname,
    searchParams,
  ]);

  const { data, isLoading } = useQuery<TAutoCompleteLocationResponse>({
    queryKey: ["autocomplete", searchTerm],
    queryFn: async () =>
      await fetchApi(
        `${baseUrl}/auto-complete?query=${searchTerm}`,
        AutoCompleteLocationResponseSchema
      ),
    staleTime: 1000 * 60 * 5,
    enabled: searchTerm !== "",
  });

  const locations = data?.hits ?? [];

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
                  checked={!!checkboxFilters[filter.queryName]}
                  onChange={(e) =>
                    setCheckboxFilters({
                      ...checkboxFilters,
                      [filter.queryName]: e.target.checked,
                    })
                  }
                />
              </Box>
            ) : (
              <Select
                onChange={(e) =>
                  setSelectFilters({
                    ...selectFilters,
                    [filter.queryName]: e.target.value,
                  })
                }
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
        pb={5}
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
            {searchTerm && (
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
            {isLoading && <Spinner margin="auto" marginTop="3" />}
            {showLocations && (
              <Box height="220px" overflow="auto" my="3" width="300px">
                {locations.map((location: TAutoCompleteLocation) => (
                  <Box
                    key={location.id}
                    onClick={() => {
                      setSelectFilters({
                        ...selectFilters,
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
                {!isLoading && !locations.length && (
                  <Flex
                    justifyContent="center"
                    alignItems="center"
                    flexDir="column"
                    mt="5"
                    mb="5"
                  >
                    <img src={noResults} alt="" />
                    <Text fontSize="xl" mt="3">
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
