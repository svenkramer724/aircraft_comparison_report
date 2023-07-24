import React from "react";
import cn from "classnames";
import styles from "./not-authroized.module.scss";

const NotAuthroized = () => {
  return (
    <section className={cn(styles.not_authorized_section)}>
      <div className={cn(styles.contain_image)}>
        <img src="https://compareprivateplanes.com/images/site/cropped-logo-blue.png" alt="" />
      </div>
      <h1>Unauthorized Access</h1>
      <h3>Please <a href="https://compareprivateplanes.com/sign-in">Log In</a> or <a href="https://compareprivateplanes.com/premium/suite">Join Premium</a> to Access Premium Features</h3>
    </section>
  );
};

export default NotAuthroized;
