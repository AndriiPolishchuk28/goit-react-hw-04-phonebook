export const Filter = ({ onChange }) => {
  return (
    <>
      <p>Find contacts by name</p>
      <input type="text" onChange={onChange} />
    </>
  );
};
