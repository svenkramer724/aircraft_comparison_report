import { Link, useLocation } from "react-router-dom";

import cn from "classnames";
import styles from "./Footer.module.scss";

const Footer = () => {
  return (
    <footer className={cn(styles.footer)}>
      <div className={cn(styles.footerDiv)}>
        <p className={cn(styles.footerContent)}>Magic Lagoon Limited</p>
        <p className={cn(styles.footerContent)}>
          71–75 Shelton Street, London, WC2H 9JQ, UK
        </p>
        <p className={cn(styles.footerLinks)}>
          <a target="_blank" href="https://compareprivateplanes.com/privacy">
            Privacy Policy{" "}
          </a>
          |{" "}
          <a target="_blank" href="https://compareprivateplanes.com/cookies">
            Cookies Policy{" "}
          </a>
          |{" "}
          <a
            target="_blank"
            href="https://compareprivateplanes.com/terms-of-service"
          >
            Terms of Service
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
