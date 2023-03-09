import { useState, useEffect } from "react";
import * as Scroll from "react-scroll";

import arrowUp from "../../images/arrowUp.png";

import styles from "./ScrollToTop.module.scss";

const ScrollToTop: React.FC = () => {
  const [scrollTop, setScrollTop] = useState(0);
  const scroll = Scroll.animateScroll;

  const handleScroll = () => {
    setScrollTop(window.scrollY);
  };

  const onScrollTop = () => {
    scroll.scrollToTop({ duration: 50, delay: 50 });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div>
      <button
        className={styles.button + " " + (scrollTop < 300 ? "" : styles.show)}
        onClick={onScrollTop}
      >
        <img className={styles.img} src={arrowUp} alt="arrowUp" />
      </button>
    </div>
  );
};

export default ScrollToTop;
