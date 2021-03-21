import Link from "next/link";

const UserProfileButton = (props) => {
  return props.isLoggedIn ? (
    <Link href={"/mypage"} as={"mypage"}>
      <div className="flex flex-row cursor-pointer">
        <img
          src={props.avatarImageUrl}
          className="place-self-center mr-2 w-8 h-8"
        ></img>
        <p className="mr-20 self-center text-white text-xs">
          {props.userDisplayName}
        </p>
      </div>
    </Link>
  ) : (
    <Link href={"/login"} as={"/login"}>
      <button className="mr-20 self-center text-white text-xs cursor-pointer">
        ログイン
      </button>
    </Link>
  );
};

export default UserProfileButton;
