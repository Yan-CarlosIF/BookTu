import {
  Badge,
  Button,
  Checkbox,
  Flex,
  IconButton,
  Td,
  Text,
  Tr,
} from "@chakra-ui/react";
import { LibraryBig } from "lucide-react";
import { useContext, useState } from "react";

import { EstablishmentAddressPopover } from "@/components/establishment-address-popover";
import { TableCheckboxContext } from "@/context/checkboxContext";
import { Inventory } from "@/shared/types/inventory";

interface InventoriesTableItemProps {
  inventory: Inventory;
  handleProcessInventory: (
    id: string,
    setIsProcessing: React.Dispatch<React.SetStateAction<boolean>>
  ) => Promise<void>;
  isFetching: boolean;
}

export function InventoriesTableItem({
  inventory,
  handleProcessInventory,
  isFetching,
}: InventoriesTableItemProps) {
  const { selectedData, toggleSelectData } = useContext(TableCheckboxContext);
  const [isProcessing, setIsProcessing] = useState(false);

  return (
    <Tr key={inventory.id}>
      <Td w="3%">
        <Checkbox
          colorScheme="teal"
          isChecked={selectedData?.some((item) => item.id === inventory.id)}
          onChange={() => toggleSelectData(inventory)}
        />
      </Td>
      <Td w="8%" borderRight="1px" borderRightColor="gray.200">
        {inventory.identifier}
      </Td>
      <Td w="20%" borderRight="1px" borderRightColor="gray.200">
        {inventory.establishment.name}
        <EstablishmentAddressPopover establishment={inventory.establishment} />
      </Td>
      <Td
        textAlign="center"
        w="10%"
        borderRight="1px"
        borderRightColor="gray.200"
      >
        <Flex align="center" justify="center" gap="12px">
          <Text width="100px" textAlign="center">
            {inventory?.total_quantity} produto
            {inventory?.total_quantity === 1 ? "" : "s"}
          </Text>
          <IconButton
            aria-label="Produtos"
            icon={<LibraryBig size={16} />}
            size="xs"
            variant={"ghost"}
          />
        </Flex>
      </Td>
      <Td
        py="0px"
        textAlign="center"
        verticalAlign="middle"
        w="10%"
        borderRight="1px"
        borderRightColor="gray.200"
      >
        <Badge
          w="130px"
          variant="subtle"
          colorScheme={
            isProcessing
              ? "orange"
              : inventory.status === "processed"
              ? "teal"
              : "gray"
          }
          borderRadius="4px"
          textAlign="center"
          py="3px"
        >
          {isProcessing
            ? "PROCESSANDO..."
            : inventory.status === "unprocessed"
            ? "NÃO PROCESSADO"
            : "PROCESSADO"}
        </Badge>
      </Td>
      <Td w="10%" textAlign="center" py="0px">
        <Button
          disabled={
            inventory.status === "processed" || isProcessing || isFetching
          }
          isLoading={isProcessing}
          size="sm"
          colorScheme="teal"
          onClick={() => handleProcessInventory(inventory.id, setIsProcessing)}
        >
          Processar
        </Button>
      </Td>
    </Tr>
  );
}
