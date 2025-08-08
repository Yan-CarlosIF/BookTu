import { createContext, Dispatch, SetStateAction, useState } from "react";

interface SelectableItem {
  id: string;
}

interface ITableCheckboxContext {
  selectedData: SelectableItem[];
  setSelectedData: Dispatch<SetStateAction<SelectableItem[]>>;
  clearSelectedData: () => void;
  toggleSelectAll: (data: SelectableItem[]) => void;
  toggleSelectData: (item: SelectableItem) => void;
}

export const TableCheckboxContext = createContext({} as ITableCheckboxContext);

export function TableCheckboxProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [selectedData, setSelectedData] = useState<SelectableItem[]>([]);

  function toggleSelect(item: SelectableItem) {
    if (selectedData.some((i) => i.id === item.id)) {
      setSelectedData(selectedData.filter((i) => i.id !== item.id));
    } else {
      setSelectedData([...selectedData, item]);
    }
  }

  function toggleSelectAll(data: SelectableItem[]) {
    if (selectedData.length === data.length) {
      setSelectedData([]);
    } else {
      setSelectedData(data);
    }
  }

  function clearSelectedData() {
    setSelectedData([]);
  }

  return (
    <TableCheckboxContext.Provider
      value={{
        selectedData,
        setSelectedData,
        clearSelectedData,
        toggleSelectAll,
        toggleSelectData: toggleSelect,
      }}
    >
      {children}
    </TableCheckboxContext.Provider>
  );
}
