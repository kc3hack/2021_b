import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ProfileEditor = ({
  isEditing,
  profileText,
  startEditingCallback,
  profileChangeCallback,
  submitCallback,
}) => {
  return isEditing ? (
    <div className="my-4">
      <h1>プロフィール</h1>
      <input
        value={profileText}
        onChange={(e) => profileChangeCallback(e.target.value)}
      />
      <button type="button" onClick={submitCallback}>
        <FontAwesomeIcon icon="check" />
      </button>
    </div>
  ) : (
    <div className="my-4">
      <h1>プロフィール</h1>
      <p>
        {profileText}
        <button type="button" onClick={startEditingCallback} className="ml-2">
          <FontAwesomeIcon icon="edit" />
        </button>
      </p>
    </div>
  );
};

export default ProfileEditor;
