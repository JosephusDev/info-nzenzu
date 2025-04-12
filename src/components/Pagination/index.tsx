import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from '@/components/ui/pagination'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface IPaginationProps {
  currentPage: number
  totalPages: number
  itemsPerPage: number
  setItemsPerPage: (value: number) => void
  handlePageChange: (page: number) => void
}

export default function MyPagination({
  currentPage,
  totalPages,
  itemsPerPage,
  setItemsPerPage,
  handlePageChange,
}: IPaginationProps) {
  return (
    <Pagination className='flex flex-col sm:flex-row my-5 gap-x-5 gap-y-3 items-center'>
      <div className='flex items-center gap-x-2'>
        <Label>Itens</Label>
        <Select
          value={String(itemsPerPage)}
          onValueChange={v => setItemsPerPage(Number(v))}
        >
          <SelectTrigger className='w-3/4'>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='5'>5</SelectItem>
            <SelectItem value='10'>10</SelectItem>
            <SelectItem value='20'>20</SelectItem>
            <SelectItem value='50'>50</SelectItem>
            <SelectItem value='100'>100</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <PaginationContent>
        <PaginationItem>
          <Button
            size={'icon'}
            variant={'outline'}
            onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
            disabled={currentPage === 1}
          >
            <ChevronLeft size={20} />
          </Button>
        </PaginationItem>
        {Array.from({ length: totalPages }, (_, i) => (
          <PaginationItem key={i}>
            <PaginationLink
              href='#'
              onClick={() => handlePageChange(i + 1)}
              isActive={currentPage === i + 1}
            >
              {i + 1}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem>
          <Button
            size={'icon'}
            variant={'outline'}
            onClick={() =>
              handlePageChange(Math.min(currentPage + 1, totalPages))
            }
            disabled={currentPage === totalPages}
          >
            <ChevronRight size={20} />
          </Button>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
