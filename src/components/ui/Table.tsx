import { TableHTMLAttributes } from "react";

interface IProps extends TableHTMLAttributes<HTMLTableElement> {}

const Table = ({ children, ...rest }: IProps) => {
  return (
    <table
      className="border-collapse border-[1px] border-gray-300 shadow-md focus:outline-none focus:ring-1 focus:ring-indigo-600 rounded-lg px-3 py-3 text-md w-full bg-transparent"
      {...rest}
    >
      {children}
    </table>
  );
};

export default Table;