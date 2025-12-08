"use client"

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
} from "@/components/ui/pagination"

interface PaginationWrapperProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  className?: string
}

export function PaginationWrapper({
  currentPage,
  totalPages,
  onPageChange,
  className
}: PaginationWrapperProps) {
  if (totalPages <= 1) return null

  const renderPaginationItems = () => {
    const items = []
    const showPages = 5

    // 计算显示的页码范围
    let startPage = Math.max(1, currentPage - Math.floor(showPages / 2))
    let endPage = startPage + showPages - 1

    if (endPage > totalPages) {
      endPage = totalPages
      startPage = Math.max(1, endPage - showPages + 1)
    }

    // 上一页
    items.push(
      <PaginationItem key="prev">
        <PaginationPrevious
          onClick={() => onPageChange(currentPage - 1)}
          className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
        />
      </PaginationItem>
    )

    // 第一页
    if (startPage > 1) {
      items.push(
        <PaginationItem key="first">
          <PaginationLink
            onClick={() => onPageChange(1)}
            isActive={currentPage === 1}
            className="cursor-pointer"
          >
            1
          </PaginationLink>
        </PaginationItem>
      )
      if (startPage > 2) {
        items.push(
          <PaginationItem key="ellipsis-start">
            <PaginationEllipsis />
          </PaginationItem>
        )
      }
    }

    // 页码
    for (let i = startPage; i <= endPage; i++) {
      items.push(
        <PaginationItem key={i}>
          <PaginationLink
            onClick={() => onPageChange(i)}
            isActive={currentPage === i}
            className="cursor-pointer"
          >
            {i}
          </PaginationLink>
        </PaginationItem>
      )
    }

    // 最后一页
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        items.push(
          <PaginationItem key="ellipsis-end">
            <PaginationEllipsis />
          </PaginationItem>
        )
      }
      items.push(
        <PaginationItem key="last">
          <PaginationLink
            onClick={() => onPageChange(totalPages)}
            isActive={currentPage === totalPages}
            className="cursor-pointer"
          >
            {totalPages}
          </PaginationLink>
        </PaginationItem>
      )
    }

    // 下一页
    items.push(
      <PaginationItem key="next">
        <PaginationNext
          onClick={() => onPageChange(currentPage + 1)}
          className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
        />
      </PaginationItem>
    )

    return items
  }

  return (
    <div className={className}>
      <Pagination>
        <PaginationContent>
          {renderPaginationItems()}
        </PaginationContent>
      </Pagination>
    </div>
  )
}