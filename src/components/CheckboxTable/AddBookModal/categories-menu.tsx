import React, { useState } from "react";
import {
  FormControl,
  FormLabel,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  Checkbox,
  Box,
  Text,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "lucide-react";

export function CategoriesCheckboxList() {
  const [selectedCategories, setSelectedCategories] = useState([]);

  const categories = [
    { id: "1", label: "Categoria 1" },
    { id: "2", label: "Categoria 2" },
    { id: "3", label: "Categoria 3" },
    { id: "4", label: "Categoria 4" },
    { id: "1", label: "Categoria 1" },
    { id: "2", label: "Categoria 2" },
    { id: "3", label: "Categoria 3" },
    { id: "4", label: "Categoria 4" },
    { id: "1", label: "Categoria 1" },
    { id: "2", label: "Categoria 2" },
    { id: "3", label: "Categoria 3" },
    { id: "4", label: "Categoria 4" },
  ];

  const handleCheckboxChange = (categoryId) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const getDisplayText = () => {
    if (selectedCategories.length === 0) return "Selecione as categorias";
    if (selectedCategories.length === 1) {
      const category = categories.find(
        (cat) => cat.id === selectedCategories[0]
      );
      return category?.label;
    }
    return `${selectedCategories.length} categorias selecionadas`;
  };

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
          <Text isTruncated>{getDisplayText()}</Text>
        </MenuButton>
        <MenuList maxH="200px" overflow="scroll">
          {categories.map((category) => (
            <MenuItem
              _hover={{ bg: "gray_300" }}
              key={category.id}
              onClick={() => handleCheckboxChange(category.id)}
            >
              <Checkbox
                colorScheme="teal"
                isChecked={selectedCategories.includes(category.id)}
                onChange={() => handleCheckboxChange(category.id)}
              >
                {category.label}
              </Checkbox>
            </MenuItem>
          ))}
        </MenuList>
      </Menu>

      <Box mt={2}>
        <Text fontSize="sm" color="gray_600">
          Selecionados: {selectedCategories.join(", ") || "Nenhum"}
        </Text>
      </Box>
    </FormControl>
  );
}
