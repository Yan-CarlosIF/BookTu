import { Flex, FlexProps, Select } from "@chakra-ui/react";
import { Search } from "lucide-react";

import { Input } from "@/components/input";

interface FilterOption {
  value: string;
  label: string;
}

interface SearchBarProps extends FlexProps {
  onSearch: (value: string) => void;
  onFilter?: (value: string) => void;
  searchValue: string;
  placeholder: string;
  filterOptions?: FilterOption[];
}

export function SearchBar({
  onSearch,
  onFilter,
  searchValue,
  placeholder,
  filterOptions,
  ...rest
}: SearchBarProps) {
  return (
    <Flex
      boxShadow="lg"
      mt="36px"
      align="center"
      bg="gray_300"
      borderRadius="lg"
      px="24px"
      py="18px"
      gap="160px"
      {...rest}
    >
      <Input
        h="42px"
        bg="background"
        placeholder={placeholder}
        value={searchValue}
        onChange={(e) => onSearch(e.target.value)}
        icon={Search}
      />
      {filterOptions && (
        <Select
          mr="20px"
          focusBorderColor="teal.300"
          placeholder="Filtros"
          bg="highlight_blue"
          color="background"
          fontWeight="medium"
          h="42px"
          w="210px"
          _hover={{ bg: "teal.400" }}
          onChange={(e) => onFilter?.(e.target.value)}
        >
          {filterOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>
      )}
    </Flex>
  );
}
