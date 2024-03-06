
type PaginationButtonsProps = {
    currentPage: number;
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>
}

function PaginationButtons({currentPage, setCurrentPage}: PaginationButtonsProps): React.JSX.Element {

    const handlePageChange = (evt: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        evt.preventDefault();
        if (evt.currentTarget.classList.contains('prev')) {
            setCurrentPage(currentPage - 1);
        }
        if (evt.currentTarget.classList.contains('next')) {
            setCurrentPage(currentPage + 1);
        }
    }

    return (
        <div className="pagination__wrapper">
            <button className="pagination__button prev"
                onClick={(evt) => handlePageChange(evt)}>
                    Previous page
            </button>
            <span className="pagination__page">страница {currentPage}</span>
            <button className="pagination__button next"
                onClick={(evt) => handlePageChange(evt)}>
                    Next page
            </button>
        </div>
    )
}

export default PaginationButtons;
