import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const NameEditor = ({
  isEditing,
  displayName,
  startEditingCallback,
  nameChangeCallback,
  submitCallback,
}) => {
  return isEditing ? (
    <div className="my-4">
      <h1>名前</h1>
      <input
        value={displayName}
        onChange={(e) => nameChangeCallback(e.target.value)}
      />
      <button type="button" onClick={submitCallback}>
        <FontAwesomeIcon icon="check" />
      </button>
    </div>
  ) : (
    <div className="my-4">
      <h1>名前</h1>
      <p>
        {displayName}
        <button type="button" onClick={startEditingCallback}>
          <FontAwesomeIcon icon="edit" />
        </button>
      </p>
    </div>
  );
};

export default NameEditor;
