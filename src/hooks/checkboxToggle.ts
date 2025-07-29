import { Book } from "@/shared/types/book";
import { useState } from "react";

interface CheckboxToggleProps {
  data: Book[];
  total: number;
  page: number;
  lastPage: number;
}

export function useCheckboxToggle(data: CheckboxToggleProps) {
  const [selectedData, setSelectedData] = useState<string[]>([]);

  const toggleSelectAll = () => {
    if (selectedData.length === data?.data.length) {
      setSelectedData([]);
    } else {
      setSelectedData(data?.data.map((book) => book.id));
    }
  };

  const toggleSelect = (id: string) => {
    if (selectedData.includes(id)) {
      setSelectedData(selectedData.filter((bookId) => bookId !== id));
    } else {
      setSelectedData([...selectedData, id]);
    }
  };

  const handleDeleteSelected = () => {
    console.log("Excluir livros com ID:", selectedData);
    setSelectedData([]);
  };

  return {
    selectedData,
    toggleSelectAll,
    toggleSelect,
    handleDeleteSelected,
    setSelectedData,
  };
}
