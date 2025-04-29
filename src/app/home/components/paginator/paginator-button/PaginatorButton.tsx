import { useCallback } from "react";
import styles from "./styles.module.scss";
import { useSearchParams } from "next/navigation";
import { FILTER_TYPES } from "@/app/shared/utils/filter-types";

interface IPaginatorButton {
  onClick: (page: number) => void;
  number: number;
}

export default function PaginatorButton({ onClick, number }: IPaginatorButton) {
  const searchParams = useSearchParams();
  const handleClick = useCallback(() => {
    onClick(number);
  }, [number, onClick]);

  return (
    <div className={styles.paginatorButtonComponent}>
      <button
        type="button"
        onClick={handleClick}
        className={
          (searchParams.get(FILTER_TYPES.PAGE) || '1') === number.toString()
            ? styles.active
            : styles.inactive
        }
      >
        {number}
      </button>
    </div>
  );
}
