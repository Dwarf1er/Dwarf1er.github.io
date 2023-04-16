import { RefObject } from 'react';

function calculateRowHeight(navHeight: number, rowsRef: RefObject<HTMLDivElement>): string {
  let numRows = 0;
  let rowHeight = `calc((100vh - ${navHeight}px) / ${numRows})`;

  if (rowsRef.current) {
    numRows = rowsRef.current.querySelectorAll(".row").length;
    rowHeight = `calc((100vh - ${navHeight}px) / ${numRows})`;
  }

  return rowHeight;
}

export default calculateRowHeight;