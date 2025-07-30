import { Book } from "@/shared/types/book";
import { Category } from "@/shared/types/category";
import { useState } from "react";

interface CheckboxToggleProps<T> {
  data: T[];
}

export function useCheckboxToggle<T extends Book | Category>({
  data,
}: CheckboxToggleProps<T>) {
  const [selectedData, setSelectedData] = useState<string[]>([]);

  const toggleSelectAll = () => {
    if (selectedData.length === data.length) {
      setSelectedData([]);
    } else {
      setSelectedData(data.map((data) => data.id));
    }
  };

  const toggleSelect = (id: string) => {
    if (selectedData.includes(id)) {
      setSelectedData(selectedData.filter((dataId) => dataId !== id));
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
