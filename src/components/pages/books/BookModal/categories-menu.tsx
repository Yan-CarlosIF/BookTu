import {
  Button,
  Checkbox,
  FormControl,
  FormLabel,
  Grid,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Tag,
  TagCloseButton,
  Text,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "lucide-react";

import { Category } from "@/shared/types/category";

interface CategoriesCheckboxListProps {
  categories: Category[];
  selectedData: string[];
  setSelectedData: (data: string[]) => void;
}

export function CategoriesCheckboxList({
  categories,
  selectedData,
  setSelectedData,
}: CategoriesCheckboxListProps) {
  const getDisplayText = () => {
    if (selectedData.length === 0) return "Selecione as categorias";
    if (selectedData.length === 1) {
      const category = categories.find((cat) => selectedData.includes(cat.id));
      return category?.name;
    }
    return `${selectedData.length} categorias selecionadas`;
  };

  const selectedCategories = categories.filter((category) =>
    selectedData.includes(category.id)
  );

  return (
    <FormControl>
      <FormLabel htmlFor="categories">Categorias</FormLabel>
      <Menu closeOnSelect={false} id="categories">
        <MenuButton
          as={Button}
          rightIcon={<ChevronDownIcon />}
          bg="gray_300"
          color="gray_600"
          border="1px"
          borderColor="gray_500"
          textAlign="left"
          w="100%"
          justifyContent="space-between"
          _hover={{}}
          _focus={{ outline: "none" }}
          _active={{ outline: "none" }}
        >
          <Text fontWeight="medium" isTruncated>
            {getDisplayText()}
          </Text>
        </MenuButton>
        <MenuList maxH="200px" overflow="scroll">
          {categories.map((category) => (
            <MenuItem
              _hover={{ bg: "gray_300" }}
              key={category.id}
              onClick={(e) => e.stopPropagation()}
            >
              <Checkbox
                colorScheme="teal"
                isChecked={selectedData.some((id) => id === category.id)}
                onChange={() => {
                  if (selectedData.includes(category.id)) {
                    setSelectedData(
                      selectedData.filter((id) => id !== category.id)
                    );
                  } else {
                    setSelectedData([...selectedData, category.id]);
                  }
                }}
              >
                {category.name}
              </Checkbox>
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
      {selectedCategories.length > 0 && (
        <Grid
          maxH="100px"
          p="8px"
          overflow="scroll"
          gap="8px"
          mt="10px"
          as="ul"
          display="grid"
          gridTemplateColumns="1fr 1fr"
        >
          {selectedCategories.map((category) => {
            return (
              <Tag
                display="flex"
                alignItems="center"
                justifyContent="center"
                rounded="lg"
                bg="highlight_blue"
                color="white"
                fontSize="xs"
                gap="2px"
                maxW="150px"
                key={category.id}
              >
                <Text
                  overflow="hidden"
                  textOverflow="ellipsis"
                  whiteSpace="nowrap"
                  flex="1"
                >
                  {category.name}
                </Text>
                <TagCloseButton
                  onClick={() =>
                    setSelectedData(
                      selectedData.filter((id) => id !== category.id)
                    )
                  }
                />
              </Tag>
            );
          })}
        </Grid>
      )}
    </FormControl>
  );
}
