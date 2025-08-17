import {
  Badge,
  Button,
  Checkbox,
  Flex,
  IconButton,
  Td,
  Text,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import { LibraryBig } from "lucide-react";
import { useContext } from "react";

import { EstablishmentAddressPopover } from "@/components/establishment-address-popover";
import { TableCheckboxContext } from "@/context/checkboxContext";
import { userContext } from "@/context/userContext";
import { useProcessInventory } from "@/services/Inventories/useProcessInventory";
import { Inventory } from "@/shared/types/inventory";

import { InventoryProductsModal } from "./inventory-products-modal";

interface InventoriesTableItemProps {
  inventory: Inventory;
  setIsProcessing: React.Dispatch<React.SetStateAction<boolean>>;
  isProcessing: boolean;
}

export function InventoriesTableItem({
  inventory,
  setIsProcessing,
  isProcessing,
}: InventoriesTableItemProps) {
  const { isLoading, user } = useContext(userContext);
  const { selectedData, toggleSelectData } = useContext(TableCheckboxContext);
  const { mutateAsync: processInventoryFn, isPending } = useProcessInventory();
  const disclosure = useDisclosure();

  const isAdmin = !isLoading && user?.permission === "admin";

  async function handleProcessInventory(id: string) {
    setIsProcessing(true);

    await processInventoryFn(id);

    setIsProcessing(false);
  }

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
            onClick={disclosure.onOpen}
          />
          <InventoryProductsModal
            inventory={inventory}
            disclosure={disclosure}
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
            isPending
              ? "orange"
              : inventory.status === "processed"
              ? "teal"
              : "gray"
          }
          borderRadius="4px"
          textAlign="center"
          py="3px"
        >
          {isPending
            ? "PROCESSANDO..."
            : inventory.status === "unprocessed"
            ? "NÃO PROCESSADO"
            : "PROCESSADO"}
        </Badge>
      </Td>
      {isAdmin && (
        <Td w="10%" textAlign="center" py="0px">
          <Button
            disabled={
              inventory.status === "processed" || isProcessing || isPending
            }
            isLoading={isPending}
            size="sm"
            colorScheme="teal"
            onClick={() => handleProcessInventory(inventory.id)}
          >
            Processar
          </Button>
        </Td>
      )}
    </Tr>
  );
}
