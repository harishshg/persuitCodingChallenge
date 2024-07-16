import { useEffect, useState } from 'react';
import styles from './styles.module.css'
import Card from '../components/Card'
import Pagination from '../components/Pagination';
import axios from 'axios';

const Requests = () => {
  const [data, setData] = useState<Array<{
    id: string;
    title: string;
    author: string;
    createdAt: number;
    published: boolean;
    auction: boolean;
  }>>([]);
  const [isLoading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [isError, setError] = useState<boolean>(false)

  useEffect(() => {
    axios('http://localhost:3001/requests?pageNumber=' + currentPage)
      .then((data) => {
        setData(data.data)
      }).catch((err) => {
        setError(true);
      }).finally(() => {
        setLoading(false)
      })
  }, [currentPage])
 
  if (isLoading) return <div className={styles.loader} data-testid="loader"></div>
  if (isError) return <div className={styles.container} ><p data-testid="error">Error!</p></div>
  if (!data?.length) return <div className={styles.container} ><p>No requests</p></div>

  return (
    <main className={styles.container} role="main">
      <section >
        <h1  className={styles.title} data-testid="title">Requests List</h1>
        <ul className={styles.cardList} >
          {data.map(card => (
            <li key={card.id}>
              <Card title={card.title} author={card.author} createdAt={card.createdAt} />
            </li>
          ))}
        </ul>
      </section>
      <nav aria-label="Pagination">
        <Pagination 
          currentPage={currentPage} 
          totalPages={10} 
          handlePagination={(page) => setCurrentPage(page)}
        />
      </nav>
    </main>
  );
};

export default Requests;