import { Button, HStack, Icon, StackProps } from "@chakra-ui/react";
import { ChevronLeft, ChevronRight, Ellipsis } from "lucide-react";
import { useRouter } from "next/router";

import { PaginationItem } from "./pagination-item";

interface PaginationProps extends StackProps {
  withState?: boolean;
  currentPage: number;
  lastPage: number;
}

export function Pagination({
  withState,
  lastPage,
  currentPage,
  ...rest
}: PaginationProps) {
  const router = useRouter();

  function handlePageChange(page: number) {
    if (router.query.sort) {
      return router.push(`?page=${page}&sort=${router.query.sort}`);
    }

    router.push(`?page=${page}`);
  }

  function handlePageChangeWithState(page: number) {
    if (router.query.sort) {
      if (router.query.page) {
        return router.push(
          `?prodPage=${page}&sort=${router.query.sort}&page=${router.query.page}`
        );
      }
      return router.push(`?prodPage=${page}&sort=${router.query.sort}`);
    }

    router.push(`?prodPage=${page}`);
  }

  function handlePreviousPage() {
    if (withState) {
      return handlePageChangeWithState(currentPage - 1);
    }

    handlePageChange(currentPage - 1);
  }

  function handleNextPage() {
    if (withState) {
      return handlePageChangeWithState(currentPage + 1);
    }

    handlePageChange(currentPage + 1);
  }

  return (
    <HStack w="328px" {...rest} spacing="2">
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
