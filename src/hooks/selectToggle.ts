import { useState } from "react";

import { Book } from "@/shared/types/book";
import { Category } from "@/shared/types/category";
import { User } from "@/shared/types/users";

interface CheckboxToggleProps<T> {
  data: T[];
}

export function useSelectToggle<T extends Book | Category | User>({
  data,
}: CheckboxToggleProps<T>) {
  const [selectedData, setSelectedData] = useState<string[]>([]);

  function toggleSelectAll() {
    if (selectedData.length === data.length) {
      setSelectedData([]);
    } else {
      setSelectedData(data.map((data) => data.id));
    }
  }

  function toggleSelect(id: string) {
    if (selectedData.includes(id)) {
      setSelectedData(selectedData.filter((dataId) => dataId !== id));
    } else {
      setSelectedData([...selectedData, id]);
    }
  }

  return {
    selectedData,
    toggleSelectAll,
    toggleSelect,
    setSelectedData,
  };
}
