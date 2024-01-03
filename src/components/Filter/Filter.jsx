import css from './Filter.module.css';
export const Filter = ({ filter, handleChange }) => {
  return (
    <div className={css.filterList}>
      <label htmlFor="name">Find contact by name</label>
      <input
        type="text"
        name="filter"
        className={css.filterInput}
        onChange={event => handleChange(event)}
        value={filter}
        required
      />
    </div>
  );
};
