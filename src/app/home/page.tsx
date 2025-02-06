import { useQuery } from "@tanstack/react-query";
import StockCardGrid from "./components/stock-card-grid/StockCardGrid";
import StockCard from "./components/stock-card/StockCard";
import styles from "./styles.module.scss";
import axios from "axios";
import StockCardSection from "./components/stock-card-section/StockCardSection";

export default function Home() {
  return (
    <div className={styles.homePageScreen}>
      <StockCardSection />
    </div>
  );
}
