import classnames from 'classnames';
import styles from './Item.module.scss';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import DescriptionIcon from '@material-ui/icons/Description';
import Tooltip from '@material-ui/core/Tooltip';

const Item = ({ id, title, description, status, onCheck, onRemove, onClick }) => (
  <div
    className={classnames(
      styles['item-container'],
      { [styles.checked]: status === 1 },
    )}
  >
    <FormControlLabel
      control={
        <Checkbox
          checked={status === 1}
          onChange={({ target }) => onCheck({ id, status: target.checked })}
          name="checkedB"
          color="primary"
        />
      }
    />
    <span onClick={() => onClick(id)} className="w-100">
      <span className={styles.title}>
        {title}
      </span>
      {description && (
        <span className={styles.description}>
          <DescriptionIcon fontSize='small'/>
          {description}
        </span>
      )}
    </span>
    <span className={styles['button-container']}>
      <Tooltip
        title="Delete"
        className={classnames(
          styles['delete-button'],
          styles.icon,
          'd-inline-block d-lg-none'
        )}
      >
        <IconButton aria-label="delete" className={styles.icon}>
          <DeleteIcon onClick={() => onRemove(id)} />
        </IconButton>
      </Tooltip>
    </span>
  </div>
);

export default Item;
