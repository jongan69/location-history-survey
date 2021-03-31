import React from 'react';
import TableRow from "./TableRow";
import TableHeadItem from "./TableHead";

const Table = ({ theadData, tbodyData }) => {
    return (
        <table >
            <thead>
                <tr>
                    {theadData.map((h) => {
                        return <TableHeadItem key={h} item={h} />;
                    })}
                </tr>
            </thead>

            <tbody>
                {tbodyData.map((item) => {
                    return <TableRow key={item.index} data={item.data} />;
                })}
            </tbody>
        </table>
    );
};

export default Table;