import React, { JSX, useEffect, useState } from "react";
import { FaExclamationTriangle, FaEye, FaPencilAlt, FaTrash, FaUserShield } from "react-icons/fa";

interface Column<T> {
    header: string;
    accessor: keyof T;
}

interface TableProps<T> {
    columns: Column<T>[];
    data: T[];
    onEdit?: (item: T) => void;
    onDelete?: (item: T) => void;
    onView?: (item: T) => void;
    onSearch?: (value: string) => void;
    onManagePermissions?: (item: T) => void;  // ➕ New prop for managing role/permissions
}

const Table = <T,>({
    columns,
    data,
    onEdit,
    onDelete,
    onSearch,
    onView,
    onManagePermissions, // ➕ Receive new prop
}: TableProps<T>): JSX.Element => {
    const [confirmDelete, setConfirmDelete] = useState<T | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [, setSearch] = useState<string>("");
    const [isMobile, setIsMobile] = useState<boolean>(false);
    const [selectedColumns, setSelectedColumns] = useState<(keyof T)[]>(columns.map((col) => col.accessor));

    useEffect(() => {
        const checkMobileView = () => setIsMobile(window.innerWidth <= 768);
        checkMobileView();
        window.addEventListener("resize", checkMobileView);
        return () => window.removeEventListener("resize", checkMobileView);
    }, []);

    useEffect(() => {
        if (isMobile) {
            setSelectedColumns(columns.slice(0, 2).map((col) => col.accessor));
        }
    }, [isMobile, columns]);

    const handleDelete = () => {
        if (confirmDelete && onDelete) {
            onDelete(confirmDelete);
            setConfirmDelete(null);
        }
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
        onSearch?.(e.target.value);
    };

    const paginatedData = data.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);
    const totalPages = Math.ceil(data.length / rowsPerPage);

    return (
        <div className="border overflow-x-auto shadow rounded-lg divide-y divide-gray-200 w-full">
            {/* Controls */}
            <div className="p-4 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
                {/* Search */}
                <input
                    type="text"
                    placeholder="Search..."
                    className="py-2 px-3 w-full sm:w-auto border rounded-md"
                    onChange={handleSearchChange}
                />

                {/* Rows per page */}
                <select
                    value={rowsPerPage}
                    onChange={(e) => setRowsPerPage(Number(e.target.value))}
                    className="py-1 px-2 border rounded-md"
                >
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={25}>25</option>
                    <option value={100}>100</option>
                </select>
            </div>

            {/* Table */}
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-100">
                    <tr>
                        {columns.filter((col) => selectedColumns.includes(col.accessor)).map((column) => (
                            <th key={String(column.accessor)} className="px-4 py-2 text-left">
                                {column.header}
                            </th>
                        ))}
                        {(onEdit || onDelete || onView || onManagePermissions) && (
                            <th className="px-4 py-2">Actions</th>
                        )}
                    </tr>
                </thead>
                <tbody>
                    {paginatedData.map((row, index) => (
                        <tr key={index} className="border-t">
                            {columns
                                .filter((col) => selectedColumns.includes(col.accessor))
                                .map((column) => (
                                    <td key={String(column.accessor)} className="px-4 py-2">
                                        {String(row[column.accessor])}
                                    </td>
                                ))}
                            {(onEdit || onDelete || onView || onManagePermissions) && (
                                <td className="px-4 py-2 flex space-x-2">
                                    {onEdit && (
                                        <button onClick={() => onEdit(row)} className="text-blue-500 hover:underline">
                                            <FaPencilAlt className="h-5 w-5 mr-1" />
                                            Edit
                                        </button>
                                    )}
                                    {onDelete && (
                                        <button onClick={() => setConfirmDelete(row)} className="text-red-500 hover:underline">
                                            <FaTrash className="h-5 w-5 mr-1" />
                                            Delete
                                        </button>
                                    )}
                                    {onView && (
                                        <button onClick={() => onView(row)} className="text-green-500 hover:underline">
                                            <FaEye className="h-5 w-5 mr-1" />
                                            View
                                        </button>
                                    )}
                                    {onManagePermissions && (
                                        <button
                                            onClick={() => onManagePermissions(row)}
                                            className="text-purple-500 hover:underline"
                                        >
                                            <FaUserShield className="h-5 w-5 mr-1" />
                                            Manage Permissions
                                        </button>
                                    )}
                                </td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Pagination */}
            <div className="border py-1 px-4 flex justify-between items-center">
                <button
                    className="p-2 text-sm text-gray-800 hover:bg-gray-100"
                    onClick={() => setCurrentPage(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    « Previous
                </button>

                <span className="text-sm">
                    Page {currentPage} of {totalPages}
                </span>

                <button
                    className="p-2 text-sm text-gray-800 hover:bg-gray-100"
                    onClick={() => setCurrentPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                >
                    Next »
                </button>
            </div>

            {/* Confirm Delete Modal */}
            {confirmDelete && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white rounded-lg p-6 shadow-lg max-w-sm w-full">
                        <div className="flex items-center justify-center mb-4">
                            <FaExclamationTriangle className="h-6 w-6 text-yellow-500 mr-2" />
                            <h3 className="text-lg font-semibold text-gray-900">Confirm Deletion</h3>
                        </div>
                        <p className="text-gray-600 text-center mb-4">
                            Are you sure you want to delete this item? This action cannot be undone.
                        </p>
                        <div className="flex justify-end space-x-2">
                            <button className="bg-gray-500 text-white px-4 py-2 rounded" onClick={() => setConfirmDelete(null)}>
                                Cancel
                            </button>
                            <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={handleDelete}>
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Table;
