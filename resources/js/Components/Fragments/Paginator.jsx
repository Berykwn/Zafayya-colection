const Paginator = ({ link }) => {
    return (
        <nav aria-label="Page navigation">
            <ul className="inline-flex -space-x-px text-sm">
                {link.map((linkItem, index) => (
                    <li key={index}>
                        {linkItem.url ? (
                            <a
                                href={linkItem.url}
                                className={`flex items-center justify-center px-3 h-8 ${
                                    linkItem.active
                                        ? "bg-gray-500 text-white"
                                        : "text-gray-500 bg-white border border-gray-300"
                                } hover:bg-gray-100 hover:text-gray-700 `}
                            > 
                                {linkItem.label.replace(/&laquo;|&raquo;/g, "")}
                            </a>
                        ) : (
                            <span
                                className={`flex items-center justify-center px-3 h-8 ${
                                    linkItem.active
                                        ? "bg-gray-500 text-white"
                                        : "text-gray-500 bg-white border border-gray-300"
                                } hover:bg-gray-100 hover:text-gray-700 `}
                            >
                                {linkItem.label.replace(/&laquo;|&raquo;/g, "")}
                            </span>
                        )}
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default Paginator;
