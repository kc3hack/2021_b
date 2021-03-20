import Link from "next/link";

const UserProfileButton = (props) => {
  return props.isLoggedIn ? (
    <Link href={"/mypage"} as={"mypage"}>
      <div className="flex">
        <img src={props.avatarImageUrl} className="w-32 h-32"></img>
        <p className="ml-20 py-4 text-xs">{props.userDisplayName}</p>
      </div>
    </Link>
  ) : (
    <Link href={"/login"} as={"/login"}>
      <button className="ml-20 py-4 text-xs">ログイン</button>
    </Link>
  );
};

export default UserProfileButton;
