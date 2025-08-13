import { Badge, Button, Flex, Td, Tr } from "@chakra-ui/react";
import { Edit2, Trash2 } from "lucide-react";

import { EstablishmentAddressPopover } from "@/components/establishment-address-popover";
import { Inventory } from "@/shared/types/inventory";

interface InventoriesTableItemProps {
  inventory: Inventory;
}

export function InventoriesTableItem({ inventory }: InventoriesTableItemProps) {
  return (
    <Tr key={inventory.id}>
      <Td w="15%" borderRight="1px" borderRightColor="gray.200">
        {inventory.identifier}
      </Td>
      <Td w="25%" borderRight="1px" borderRightColor="gray.200">
        {inventory.establishment.name}
        <EstablishmentAddressPopover establishment={inventory.establishment} />
      </Td>
      <Td w="15%" borderRight="1px" borderRightColor="gray.200">
        {inventory.total_quantity}
      </Td>
      <Td
        py="0px"
        textAlign="center"
        verticalAlign="middle"
        w="15%"
        borderRight="1px"
        borderRightColor="gray.200"
      >
        <Badge
          w="130px"
          variant="subtle"
          colorScheme={inventory.status === "processed" ? "teal" : "gray"}
          borderRadius="4px"
          textAlign="center"
          py="3px"
        >
          {inventory.status === "unprocessed" && "NÃO"} PROCESSADO
        </Badge>
      </Td>
      <Td py="0px">
        <Flex gap="16px" justify="center">
          <Button
            leftIcon={<Trash2 color="white" size={16} />}
            fontSize="xs"
            size="sm"
            colorScheme="red"
          >
            DELETAR
          </Button>
          <Button
            leftIcon={<Edit2 size={16} />}
            fontSize="xs"
            size="sm"
            variant="outline"
          >
            EDITAR
          </Button>
          <Button colorScheme="teal" fontSize="xs" size="sm">
            PROCESSAR
          </Button>
        </Flex>
      </Td>
    </Tr>
  );
}
