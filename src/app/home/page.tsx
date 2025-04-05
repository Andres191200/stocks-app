import styles from "./styles.module.scss";
import StockCardSection from "./components/stock-card-section/StockCardSection";

export default function Home() {
  return (
    <div className={styles.homePageScreen}>
      <StockCardSection />
    </div>
  );
}
