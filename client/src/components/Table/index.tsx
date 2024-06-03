import { ReactNode } from "react";
import styles from "./index.module.css";

interface Props {
  children: ReactNode;
}

function Table({ children }: Props) {
  return <table className={styles.container}>{children}</table>;
}

Table.Head = ({ children }: Props) => (
  <thead>
    <tr>{children}</tr>
  </thead>
);

Table.Col = ({ children }: Props) => <th scope="col">{children}</th>;

Table.Body = ({ children }: Props) => <tbody>{children}</tbody>;

Table.Row = ({ children }: Props) => <tr>{children}</tr>;

interface ItemProps extends Props {
  label: string;
}
Table.Item = ({ children, label }: ItemProps) => (
  <td data-label={label}>{children}</td>
);

export default Table;
