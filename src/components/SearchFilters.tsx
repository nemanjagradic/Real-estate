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
  Wrap,
  WrapItem,
  Checkbox,
} from "@chakra-ui/react";
import { MdCancel } from "react-icons/md";
import { filterData } from "../utils/filterData";
import { useNavigate, useLocation, useSearchParams } from "react-router-dom";
import noResults from "../svg/noresult.svg";
import { fetchApi, baseUrl } from "../utils/fetchApi";
import { useQuery } from "@tanstack/react-query";
import {
  LocationSuggestResponseSchema,
  TLocationSuggest,
  TLocationSuggestResponse,
} from "../schemas/autoCompleteLocationSchema";

type SearchFiltersProps = {
  setActive: React.Dispatch<React.SetStateAction<number>>;
};

const SearchFilters = ({ setActive }: SearchFiltersProps) => {
  const [filters] = useState(filterData);
  const [searchTerm, setSearchTerm] = useState("");
  const [showLocations, setShowLocations] = useState(false);

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [selectFilters, setSelectFilters] = useState<Record<string, string>>(
    () => {
      const params: Record<string, string> = {};
      searchParams.forEach((value, key) => {
        params[key] = value;
      });
      return params;
    },
  );

  const [checkboxFilters, setCheckboxFilters] = useState<
    Record<string, boolean>
  >({});

  const currentPurpose = selectFilters["purpose"] || "for-rent";

  const clearFilters = () => {
    setSelectFilters({});
    setCheckboxFilters({});
    setActive(1);
    navigate(`${location.pathname}`);
  };

  useEffect(() => {
    const params = new URLSearchParams();

    Object.entries(selectFilters).forEach(([key, value]) => {
      if (value) params.set(key, value);
    });

    Object.entries(checkboxFilters).forEach(([key, value]) => {
      if (value) params.set(key, "true");
    });

    navigate(`${location.pathname}?${params.toString()}`);
  }, [selectFilters, checkboxFilters, navigate, location.pathname]);

  const { data, isLoading } = useQuery<TLocationSuggestResponse>({
    queryKey: ["location-suggest", searchTerm],
    queryFn: async () =>
      fetchApi(
        `${baseUrl}/location/suggest?input=${searchTerm}`,
        LocationSuggestResponseSchema,
      ),
    enabled: searchTerm !== "",
    staleTime: 1000 * 60 * 10,
  });

  const locations = data?.data ?? [];

  const navigateWithFreshLocation = (city: string, state_code: string) => {
    const params = new URLSearchParams();

    params.set("purpose", currentPurpose);

    params.set("city", city);
    params.set("state_code", state_code);

    setSelectFilters({
      purpose: currentPurpose,
      city,
      state_code,
    });

    setCheckboxFilters({});
    setActive(1);

    navigate(`${location.pathname}?${params.toString()}`);
  };

  return (
    <>
      <Flex
        bg="beige"
        pt="20px"
        justify="center"
        flexWrap="wrap"
        alignItems="center"
      >
        {filters
          .filter((f) => !f.purpose || f.purpose === currentPurpose)
          .map((filter) => (
            <Box p="2" key={filter.queryName}>
              {filter.type === "checkbox" ? (
                <Wrap key={filter.queryName} align="center">
                  <WrapItem>
                    <Checkbox
                      colorScheme="blue"
                      isChecked={!!checkboxFilters[filter.queryName]}
                      onChange={(e) =>
                        setCheckboxFilters((prev) => ({
                          ...prev,
                          [filter.queryName]: e.target.checked,
                        }))
                      }
                    >
                      {filter.label}
                    </Checkbox>
                  </WrapItem>
                </Wrap>
              ) : (
                <Select
                  placeholder={filter.placeholder}
                  value={selectFilters[filter.queryName] || ""}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (filter.queryName === "purpose") {
                      setSelectFilters({ purpose: value });
                      setCheckboxFilters({});
                      setActive(1);
                    } else {
                      setSelectFilters((prev) => ({
                        ...prev,
                        [filter.queryName]: value,
                      }));
                    }
                  }}
                >
                  {filter.items.map((item) => (
                    <option key={item.value} value={item.value}>
                      {item.name}
                    </option>
                  ))}
                </Select>
              )}
            </Box>
          ))}

        <Button
          bg="beige"
          _hover={{ bg: "darkerBeige" }}
          onClick={clearFilters}
        >
          Clear Filters
        </Button>
      </Flex>

      <Flex bg="beige" flexDir="column" alignItems="center" pb={5}>
        <Button
          onClick={() => setShowLocations((p) => !p)}
          border="1px"
          borderColor="gray.200"
          bg="beige"
          w="300px"
          mt="25px"
          _hover={{ bg: "darkerBeige" }}
        >
          Search Location
        </Button>

        {showLocations && (
          <Flex flexDir="column" pos="relative" mt={3}>
            <Input
              placeholder="Type city or state"
              value={searchTerm}
              w="300px"
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            {searchTerm && (
              <Icon
                as={MdCancel}
                pos="absolute"
                right="3"
                top="3"
                cursor="pointer"
                onClick={() => setSearchTerm("")}
              />
            )}

            {isLoading && <Spinner mt={3} mx="auto" />}

            <Box height="220px" overflow="auto" mt={3}>
              {locations.map((loc: TLocationSuggest) => (
                <Box
                  key={loc.geo_id}
                  cursor="pointer"
                  p="2"
                  borderBottom="1px"
                  borderColor="gray.100"
                  bg="darkerBeige"
                  onClick={() => {
                    navigateWithFreshLocation(loc.city, loc.state_code);

                    setSearchTerm(
                      loc.city && loc.state_code
                        ? `${loc.city}, ${loc.state_code}`
                        : loc.slug_id,
                    );

                    setShowLocations(false);
                  }}
                >
                  <Text>
                    {loc.city}, {loc.state_code}
                  </Text>
                </Box>
              ))}

              {!isLoading && !locations.length && searchTerm && (
                <Flex align="center" justify="center" flexDir="column" mt={4}>
                  <img src={noResults} alt="" />
                  <Text mt={2}>No results</Text>
                </Flex>
              )}
            </Box>
          </Flex>
        )}
      </Flex>
    </>
  );
};

export default SearchFilters;
