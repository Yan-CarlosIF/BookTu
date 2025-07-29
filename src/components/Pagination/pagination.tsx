import { Button, HStack, Icon } from "@chakra-ui/react";
import { ChevronLeft, ChevronRight, Ellipsis } from "lucide-react";
import { useRouter } from "next/router";
import { PaginationItem } from "./pagination-item";

interface PaginationProps {
  currentPage: number;
  lastPage: number;
}

export function Pagination({ lastPage, currentPage }: PaginationProps) {
  const router = useRouter();

  function handlePageChange(page: number) {
    if (router.query.sort) {
      return router.push(`?page=${page}&sort=${router.query.sort}`);
    }

    router.push(`?page=${page}`);
  }

  function handlePreviousPage() {
    handlePageChange(currentPage - 1);
  }

  function handleNextPage() {
    handlePageChange(currentPage + 1);
  }

  return (
    <HStack spacing="2">
      {currentPage > 1 && (
        <>
          <Button
            onClick={handlePreviousPage}
            variant="ghost"
            size="sm"
            p="0px"
          >
            <Icon as={ChevronLeft} />
          </Button>
          {currentPage > 2 && (
            <>
              <PaginationItem onPageChange={handlePageChange}>1</PaginationItem>
              <Icon
                alignSelf="end"
                as={Ellipsis}
                color="gray_800"
                fontSize={20}
              />
            </>
          )}
          <PaginationItem onPageChange={handlePageChange}>
            {currentPage - 1}
          </PaginationItem>
        </>
      )}
      <PaginationItem onPageChange={handlePageChange} isCurrent>
        {currentPage}
      </PaginationItem>

      {currentPage < lastPage && (
        <>
          <PaginationItem onPageChange={handlePageChange}>
            {currentPage + 1}
          </PaginationItem>
          {currentPage < lastPage - 1 && (
            <>
              <Icon
                alignSelf="end"
                as={Ellipsis}
                color="gray_800"
                fontSize={20}
              />
              <PaginationItem onPageChange={handlePageChange}>
                {lastPage}
              </PaginationItem>
            </>
          )}
          <Button onClick={handleNextPage} variant="ghost" size="sm" p="0px">
            <Icon as={ChevronRight} />
          </Button>
        </>
      )}
    </HStack>
  );
}
