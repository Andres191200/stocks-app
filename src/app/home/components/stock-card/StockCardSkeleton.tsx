import { useEffect, useRef } from "react";
import styles from "./styles.module.scss";
import gsap from "gsap";
import { pulsingSkeleton } from "./utils/animations";

export default function StockCardSkeleton() {
  const cardRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const targetElements =
      cardRef.current?.querySelectorAll(".pulsing-animation");
    const ctx = gsap.context(() => {
      targetElements?.forEach((element) => {
        gsap.to(element, pulsingSkeleton());
      });
    }, cardRef);

    return () => ctx.revert();
  }, []);
  return (
    <div className={styles.stockCardSkeletonComponent} ref={cardRef}>
      <div className={styles.stockCardHeader}>
        <div className={styles.stockSymbolContainer}>
          <h5 className={`${styles.stockSymbol} pulsing-animation`} />
        </div>
      </div>
      <div className={styles.stockNameContainer}>
        <span className={`${styles.stockName} pulsing-animation`} />
      </div>
      <div className={styles.stockValueContainer}>
        <h4 className={`${styles.stockValue} pulsing-animation`} />
      </div>
      <div className={`${styles.valueHistoryChart} pulsing-animation`} />
    </div>
  );
}
