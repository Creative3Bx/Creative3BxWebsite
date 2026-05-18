import config from "@config/config.json";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import styles from "../../styles/switchThemeBtn.module.css";
const ThemeSwitcher = () => {
  const { theme_switcher } = config.settings;
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme, resolvedTheme } = useTheme();
  useEffect(() => setMounted(true), []);

  // Determine if the theme is dark.
  // We use mounted check to prevent hydration flickering.
  const isDark = mounted && (theme === "dark" || resolvedTheme === "dark");

  return (
    <>
      {/* <label className={styles.switch}>
      <input  type="checkbox" checked={isChecked} // Set checked attribute to state
      onClick={() =>
        setTheme(
          theme === "dark" || resolvedTheme === "dark" ? "light" : "dark"
        )
      }
      onChange={toggleChecked} // Toggle state when checkbox is clicked
      />
      <div className={styles.button}>
        <div className={styles.light}></div>
        <div className={styles.dots}></div>
        <div className={styles.characters}></div>
        <div className={styles.shine}></div>
        <div className={styles.shadow}></div>
      </div>
    </label>  */}

      <label>
        <input
          type="checkbox"
          className={styles.slider}
          checked={isDark}
          onChange={() => setTheme(isDark ? "light" : "dark")}
        />
        <div className={styles.switch}>
          <div className={styles.suns}></div>
          <div className={styles.moons}>
            <div className={styles.star + " " + styles["star-1"]}></div>
            <div className={styles.star + " " + styles["star-2"]}></div>
            <div className={styles.star + " " + styles["star-3"]}></div>
            <div className={styles.star + " " + styles["star-4"]}></div>
            <div className={styles.star + " " + styles["star-5"]}></div>
            <div className={styles["first-moon"]}></div>
          </div>
          <div className={styles.sand}></div>
          <div className={styles.bb8}>
            <div className={styles.antennas}>
              <div className={styles.antenna + " " + styles.short}></div>
              <div className={styles.antenna + " " + styles.long}></div>
            </div>
            <div className={styles.head}>
              <div className={styles.stripe + " " + styles.one}></div>
              <div className={styles.stripe + " " + styles.two}></div>
              <div className={styles.eyes}>
                <div className={styles.eye + " " + styles.one}></div>
                <div className={styles.eye + " " + styles.two}></div>
              </div>
              <div className={styles.stripe + " " + styles.detail}>
                <div className={styles.detail + " " + styles.zero}></div>
                <div className={styles.detail + " " + styles.zero}></div>
                <div className={styles.detail + " " + styles.one}></div>
                <div className={styles.detail + " " + styles.two}></div>
                <div className={styles.detail + " " + styles.three}></div>
                <div className={styles.detail + " " + styles.four}></div>
                <div className={styles.detail + " " + styles.five}></div>
                <div className={styles.detail + " " + styles.five}></div>
              </div>
              <div className={styles.stripe + " " + styles.three}></div>
            </div>
            <div className={styles.ball}>
              <div className={styles.lines + " " + styles.one}></div>
              <div className={styles.lines + " " + styles.two}></div>
              <div className={styles.ring + " " + styles.one}></div>
              <div className={styles.ring + " " + styles.two}></div>
              <div className={styles.ring + " " + styles.three}></div>
            </div>
            <div className={styles.shadow}></div>
          </div>
        </div>
      </label>
    </>
  );
};

export default ThemeSwitcher;
