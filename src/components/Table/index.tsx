import {
  Checkbox,
  Table,
  TableContainer,
  TableContainerProps,
  Tbody,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";

interface BaseTableProps extends TableContainerProps {
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
  ...rest
}: BaseTableProps) {
  return (
    <TableContainer {...rest} mt="40px">
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
