import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import cn from "classnames";
import OutsideClickHandler from "react-outside-click-handler";

import styles from "./Dropdown.module.scss";

const Dropdown = ({ className, value, setValue, options, headerDropdown }) => {
  const [visible, setVisible] = useState(false);

  const handleClick = (value) => {
    setValue(value);
    setVisible(false);
  };

  return (
    <OutsideClickHandler onOutsideClick={() => setVisible(false)}>
      <div
        className={cn(styles.dropdown, className, { [styles.active]: visible })}
      >
        <div className={headerDropdown ? cn(styles.header_dropdown) : cn(styles.head)} onClick={() => setVisible(!visible)}>
          <div className={styles.selection}>{value}</div>
          <div className={styles.arrow}>
            <IoIosArrowDown name="arrow-bottom" size="10" />
          </div>
        </div>
        <div className={styles.body}>
          {options.map((x, index) => (
            <div
              className={cn(styles.option, {
                [styles.selectioned]: x === value,
              })}
              onClick={() => handleClick(x, index)}
              key={index}
            >
              {x}
            </div>
          ))}
        </div>
      </div>
    </OutsideClickHandler>
  );
};

export default Dropdown;
