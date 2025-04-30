import { useEffect, useRef } from "react";
import styles from "./styles.module.scss";
import gsap from "gsap";

export default function StockCardSkeleton() {
  const cardRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const targetElements =
      cardRef.current?.querySelectorAll(".pulsing-animation");
    const ctx = gsap.context(() => {
      targetElements?.forEach((element) => {
        gsap.to(element, {
          opacity: 0,
          repeat: -1,
          duration: 1,
          yoyo: true,
          ease: "power1.inOut",
        });
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
