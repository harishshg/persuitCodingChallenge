import { useEffect, useState } from 'react';
import styles from './styles.module.css'
import Card from '../components/Card'
import Pagination from '../components/Pagination';

export const Requests = () => {

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
  const [isError, setError]= useState<boolean>(false)
  useEffect(() => {
    fetch('http://localhost:3001/requests?pageNumber=' + currentPage)
      .then((res) => res.json())
      .then((data) => {
        setData(data)
      }).catch((err) => {
        setError(true);
      }).finally(() => {
        setLoading(false)
      })
  }, [currentPage])
 
  
  if (isLoading) return   <div className={styles.loader}></div>
  if (isError) return   <div className={styles.container}><p>Error!</p></div>
  if (!data?.length) return   <div className={styles.container}><p>No requests</p></div>
  return  <>
  <div className={styles.container}>

    <div>
      <h1 className={styles.title}>Requests List</h1>
      {data.map(card=>
        <Card title={card.title} author={card.author} createdAt={card.createdAt}  key={card.id}/>)}
    </div>
  </div>
    <Pagination currentPage={currentPage} totalPages={10} handlePagination={(page) => setCurrentPage(page)}/>
  </>
};
