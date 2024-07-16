import styles from './styles.module.css'

const Card = ({ title, author, createdAt }: { title: string, author: string, createdAt: number }) => {
    return (
        <div className={styles.requestCard} data-testid="card">
      <div className={styles.cardHeader}>
        <h3>{title}</h3>
      </div>
      <div className={styles.cardBody}>
        <p className={styles.cardDate}>Submitted on: {new Date(createdAt).toLocaleString()}</p>
        <p className={styles.cardUser}>Submitted by: {author}</p>
      </div>
    </div>
    )
}


export default Card;