import cn from "classnames";
import styles from "./notFound.module.scss";

const NotFound = () => {
  return (
    <section className={cn(styles.notFound_section)}>
      <div className={cn(styles.contain_image)}>
        <img src="https://compareprivateplanes.com/images/site/cropped-logo-blue.png" alt="" />
      </div>
      <h1>Page Not Found</h1>
      <h2>404</h2>
      <a href="https://compareprivateplanes.com/">
        Go to compareprivateplanes.com
      </a>
    </section>
  );
};

export default NotFound;
