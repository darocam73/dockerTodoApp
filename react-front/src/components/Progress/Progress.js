import { useMemo } from 'react';
import styles from './Progress.module.scss';
import { useTodo } from '../../hooks/useTodo';

const Progress = () => {
  const { todoList } = useTodo();

  const circleStyle = useMemo(() => {
    const total = todoList.length;
    const done = todoList.filter(({ status }) => status === 1).length;
    const angle = done * 360 / total;

    return {
      background: `conic-gradient(orange 0 ${angle}deg, lightblue 0)`,
    }
  }, [todoList]);

  if (!todoList?.length) return null;

  return (
    <>
      <span className={styles.title}>Progress</span>
      <div className={styles.container}>
        <div
          className={styles.circle}
          style={circleStyle}
        >
          <div className={styles['inner-circle']}>
            <span className={styles.counter}>
              <span className={styles['done-task']}>
                {`${todoList.filter(({ status }) => status === 1).length}/`}
              </span>
              <span>{todoList.length}</span>
            </span>
          </div>
        </div>
      </div>
    </>
  )
}

export default Progress;
