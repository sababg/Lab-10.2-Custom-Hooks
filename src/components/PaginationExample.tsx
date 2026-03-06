import { useState } from "react";
import { usePagination } from "../hooks/usePagination";

export default function PaginationDemo() {
  const totalItems = 123;
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const {
    currentPage,
    totalPages,
    startIndex,
    endIndex,
    itemsOnCurrentPage,
    setPage,
    nextPage,
    prevPage,
    canNextPage,
    canPrevPage,
  } = usePagination({ totalItems, itemsPerPage });

  const items = Array.from({ length: totalItems }, (_, i) => `Item ${i + 1}`);

  const itemsToDisplay = items.slice(startIndex, endIndex + 1);

  return (
    <div
      style={{
        fontFamily: "sans-serif",
        maxWidth: "700px",
        margin: "20px auto",
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "8px",
      }}
    >
      <h3 style={{ textAlign: "center", marginBottom: "20px" }}>
        Pagination Demo
      </h3>

      <div
        style={{
          marginBottom: "15px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          <label htmlFor="itemsPerPageSelect">Items per page: </label>
          <select
            id="itemsPerPageSelect"
            value={itemsPerPage}
            onChange={(e) => setItemsPerPage(Number(e.target.value))}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={15}>15</option>
            <option value={20}>20</option>
          </select>
        </div>
        <div style={{ fontStyle: "italic" }}>Total Items: {totalItems}</div>
      </div>

      <ul
        style={{
          listStyle: "decimal",
          paddingLeft: "20px",
          minHeight: "200px",
        }}
      >
        {itemsToDisplay.map((item) => (
          <li key={item} style={{ padding: "2px 0" }}>
            {item}
          </li>
        ))}
      </ul>

      <div
        style={{
          marginTop: "20px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <button
          onClick={prevPage}
          disabled={!canPrevPage}
          style={{ padding: "8px 12px" }}
        >
          Previous
        </button>
        <span>
          Page{" "}
          <input
            type="number"
            min={1}
            max={totalPages}
            value={currentPage}
            onChange={(e) => setPage(Number(e.target.value))}
            style={{ width: "50px", textAlign: "center", margin: "0 5px" }}
          />{" "}
          of {totalPages}
        </span>
        <button
          onClick={nextPage}
          disabled={!canNextPage}
          style={{ padding: "8px 12px" }}
        >
          Next
        </button>
      </div>

      <div style={{ marginTop: "15px", textAlign: "center" }}>
        Showing items {startIndex + 1} - {endIndex + 1} (Total on this page:{" "}
        {itemsOnCurrentPage})
      </div>

      <div
        style={{
          marginTop: "10px",
          textAlign: "center",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "5px",
        }}
      >
        {Array.from({ length: totalPages }, (_, i) => {
          const page = i + 1;
          const isActive = page === currentPage;
          return (
            <button
              key={page}
              onClick={() => setPage(page)}
              disabled={isActive}
              style={{
                padding: "5px 8px",
                fontWeight: isActive ? "bold" : "normal",
                backgroundColor: isActive ? "#007bff" : "#efefef",
                color: isActive ? "white" : "black",
                border: "1px solid #ccc",
                borderRadius: "3px",
              }}
            >
              {page}
            </button>
          );
        })}
      </div>
    </div>
  );
}
