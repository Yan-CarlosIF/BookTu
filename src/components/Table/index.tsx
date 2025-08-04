import {
  Checkbox,
  Table,
  TableContainer,
  Tbody,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useContext } from "react";

import { TableCheckboxContext } from "@/context/checkboxContext";

interface BaseTableProps {
  // data: any;
  isCheckboxChecked?: boolean;
  isCheckboxIndeterminate?: boolean;
  onCheckboxChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  children: React.ReactNode;
  checkbox?: boolean;
  headers?: React.ReactNode;
}

export function BaseTable({
  children,
  checkbox = false,
  isCheckboxChecked,
  isCheckboxIndeterminate,
  headers,
  onCheckboxChange,
}: BaseTableProps) {
  const { selectedBooks, toggleSelectAllBooks } =
    useContext(TableCheckboxContext);

  return (
    <TableContainer h="575px" mt="40px">
      <Table borderWidth={1} borderColor="gray.200" colorScheme="gray">
        <Thead bg="gray_300">
          <Tr>
            {checkbox && (
              <Th>
                <Checkbox
                  colorScheme="teal"
                  isChecked={isCheckboxChecked}
                  isIndeterminate={isCheckboxIndeterminate}
                  onChange={onCheckboxChange}
                />
              </Th>
            )}
            {headers}
          </Tr>
        </Thead>
        <Tbody>{children}</Tbody>
      </Table>
    </TableContainer>
  );
}
