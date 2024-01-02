import css from './ContactList.module.css';

export const ContactList = ({ contacts, onDelete }) => {
  return (
    <ul className={css.list}>
      {contacts.map(({ name, id, number }) => {
        return (
          <li className={css.list_item} key={id}>
            <span className={css.name_text}>{name} </span>
            <span>{number}</span>
            <button
              className={css.btn}
              onClick={() => onDelete(id)}
              type="button"
            >
              Delete
            </button>
          </li>
        );
      })}
    </ul>
  );
};
