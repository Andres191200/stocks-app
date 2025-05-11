import React, { use, useEffect, useRef, useState } from "react";
import styles from './styles.module.scss';
import { useStocksStore } from "@/app/home/store/store";

export default function ToggleTheme() {
    const {toggleTheme, theme} = useStocksStore();
    const [disabled, setDisabled] = useState<boolean>(false);
    const debounceTimerRef = useRef<NodeJS.Timeout>(setTimeout(() => {}));

    function onToggleTheme() {
      setDisabled(true);
      toggleTheme();
      debounceTimerRef.current = setTimeout(() => {
        setDisabled(false);
      }, 1000);
    }

    useEffect(() => {
      return () => clearTimeout(debounceTimerRef.current);
    }, [])

  return (
    <div className={styles.toggleThemeComponent}>
      <button onClick={() => onToggleTheme()} disabled={disabled}>
        Current theme: {theme.toString()}
      </button>
    </div>
  );
}
