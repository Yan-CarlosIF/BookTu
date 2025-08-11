import {
  Box,
  IconButton,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Td,
  Text,
  Tr,
} from "@chakra-ui/react";
import { Ellipsis } from "lucide-react";

import { StockItem } from "@/shared/types/stockItem";
import { formatPriceIntoBRL } from "@/utils/format";

interface StocksTableItemProps {
  stockItem: StockItem;
}

export function StocksTableItem({ stockItem }: StocksTableItemProps) {
  return (
    <Tr>
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
        <Popover>
          <PopoverTrigger>
            <IconButton
              _focus={{ ringColor: "transparent" }}
              ml="4px"
              aria-label="Mais detalhes"
              size="xs"
              variant="ghost"
              icon={<Ellipsis size={16} />}
            />
          </PopoverTrigger>
          <PopoverContent _focus={{ ringColor: "transparent" }}>
            <PopoverArrow />
            <PopoverCloseButton />
            <PopoverHeader>Endereço</PopoverHeader>
            <PopoverBody>
              <Text>CEP: {stockItem.stock.establishment.cep}</Text>
              <Text>Estado: {stockItem.stock.establishment.state}</Text>
              <Text>Cidade: {stockItem.stock.establishment.city}</Text>
              <Text>Bairro: {stockItem.stock.establishment.district}</Text>
            </PopoverBody>
          </PopoverContent>
        </Popover>
      </Td>
      <Td borderRight="1px" borderRightColor="gray.200">
        {formatPriceIntoBRL(stockItem.book.price)}
      </Td>
      <Td isNumeric>{stockItem.quantity}</Td>
    </Tr>
  );
}
