import styles from './AppTitle.module.scss';

const AppTitle = () => {
  return (
    <div className={styles.container}>
      <span className={styles.title}>
        Career Path example app
      </span>
      <span className={styles.description}>
        ReactApp + Express + Docker
      </span>
    </div>
  )
}

export default AppTitle;
