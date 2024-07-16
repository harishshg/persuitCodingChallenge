import styles from './styles.module.css'
const Pagination = ({ currentPage, totalPages, handlePagination }: { currentPage: number, totalPages: number, handlePagination: (page: number) => void}) => {

    return (<div className={styles.pagination} data-testid="pagination">
        <button disabled={currentPage === 1} onClick={() => handlePagination(currentPage - 1)}>
          Previous
        </button>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            className={currentPage === i + 1 ? styles.active: ''}
            onClick={() => handlePagination(i + 1)}
          >
            {i + 1}
          </button>
        ))}
        <button disabled={currentPage === totalPages} onClick={() => handlePagination(currentPage + 1)}>
          Next
        </button>
      </div>)
}

export default Pagination;