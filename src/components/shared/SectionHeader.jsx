import cn from "classnames";
import global from "../styles/global.module.scss";

const SectionHeader = ({ title }) => {
  return (
    <header className={cn(global.section_header)}>
      <h3>{title}</h3>
      <span className={cn(global.line)}></span>
    </header>
  );
};

export default SectionHeader;
  