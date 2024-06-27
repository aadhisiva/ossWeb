import { FC, SetStateAction } from "react";
import { Pagination as  BPagination} from "react-bootstrap";
interface IPagination {
  activePage?: number;
  count?: number;
  rowsPerPage?: number;
  totalPages?: number;
  setActivePage?: any;
}

export const Pagination: FC<IPagination> = ({
  activePage = 0,
  count,
  rowsPerPage = 0,
  totalPages = 0,
  setActivePage,
}) => {
  const beginning = activePage === 1 ? 1 : rowsPerPage * (activePage - 1) + 1;
  const end = activePage === totalPages ? count : beginning + rowsPerPage - 1;

  return (
    <>
      <div className="pagination rounded-2xl">
      <div className="flex flex-col text-[#13678C]">
                <span>
                    Page {activePage} of {totalPages}
                </span>
                <span>
                    Rows: {beginning === end ? end : `${beginning} - ${end}`} of {count}
                </span>
            </div>
            <BPagination style={{ border: 'none', columnGap: 15 }}>
                <BPagination.First onClick={() => setActivePage(1)} disabled={activePage === 1}>First</BPagination.First>
                <BPagination.Prev onClick={() =>setActivePage(activePage - 1)} disabled={activePage === 1}>Prev</BPagination.Prev>
                <BPagination.Next onClick={() => setActivePage(activePage + 1)} disabled={activePage === totalPages}>Next</BPagination.Next>
                <BPagination.Last onClick={() => setActivePage(totalPages)} disabled={activePage === totalPages}>Last</BPagination.Last>
            </BPagination>
      </div>
    </>
  );
};
