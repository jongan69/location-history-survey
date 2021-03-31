import React from "react";

const TableRow = ({ data }) => {
    return (
        <tr>
            {data.map((item) => {
                return <td key={item.timeEnd}> {item.address}</td>;
            })}
        </tr>
    );
};

export default TableRow;