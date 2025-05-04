import React from "react";
import styles from './styles.module.scss';
import { useStore } from "zustand";
import { useStocksStore } from "@/app/home/store/store";

export default function ToggleTheme() {
    const {toggleTheme, theme} = useStocksStore();
  return (
    <div className={styles.toggleThemeComponent}>
      <button onClick={toggleTheme}>
        Current theme: {theme.toString()}
      </button>
    </div>
  );
}
