import { Badge, Box, Td, Text, Tr } from "@chakra-ui/react";

import { EstablishmentAddressPopover } from "@/components/establishment-address-popover";
import { StockItem } from "@/shared/types/stockItem";
import { formatPriceIntoBRL } from "@/utils/format";

interface StocksTableItemProps {
  stockItem: StockItem;
}

export function StocksTableItem({ stockItem }: StocksTableItemProps) {
  return (
    <Tr>
      <Td borderRight="1px" py="0px" borderRightColor="gray.200">
        <Badge>{stockItem.book.identifier}</Badge>
      </Td>
      <Td
        w="40%"
        maxH="40px"
        py="0px"
        borderRight="1px"
        borderRightColor="gray.200"
      >
        <Box maxH="40px">
          <Text>{stockItem.book.title}</Text>
          {stockItem.book.author && (
            <Text fontSize="xs" fontWeight="medium" color="gray_600">
              {stockItem.book.author}
            </Text>
          )}
        </Box>
      </Td>
      <Td
        w="30%"
        maxH="40px"
        py="0px"
        borderRight="1px"
        borderRightColor="gray.200"
      >
        {stockItem.stock.establishment.name}
        <EstablishmentAddressPopover
          establishment={stockItem.stock.establishment}
        />
      </Td>
      <Td borderRight="1px" borderRightColor="gray.200">
        {formatPriceIntoBRL(stockItem.book.price)}
      </Td>
      <Td isNumeric>{stockItem.quantity}</Td>
    </Tr>
  );
}
