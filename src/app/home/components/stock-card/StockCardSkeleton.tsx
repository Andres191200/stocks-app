import { useEffect, useRef } from "react";
import styles from "./styles.module.scss";
import gsap from "gsap";

export default function StockCardSkeleton() {
  const cardRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
        var tl = gsap.timeline({ repeat: 2, repeatDelay: 3 });

        gsap.to(cardRef.current, {
            opacity: 0,
            repeat: -1,
            duration: 1,
            yoyo: true,
            ease: "power1.inOut"
        })
    }, cardRef)
    
    return () => ctx.revert();
  }, []);
  return (
    <div className={styles.stockCardSkeletonComponent} ref={cardRef}>
      <div className={styles.stockCardHeader}>
        <div className={styles.stockSymbolContainer}>
          <h5 className={styles.stockSymbol} />
        </div>
      </div>
      <div className={styles.stockNameContainer}>
        <span className={styles.stockName} />
      </div>
      <div className={styles.stockValueContainer}>
        <h4 className={styles.stockValue} />
      </div>
      <div className={styles.valueHistoryChart}></div>
    </div>
  );
}
