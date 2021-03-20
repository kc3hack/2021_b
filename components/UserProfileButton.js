import Link from "next/link";

const UserProfileButton = (props) => {
  return props.isLoggedIn ? (
    <Link href={"/mypage"} as={"mypage"}>
      <div className="flex flex-row cursor-pointer">
        <img src={props.avatarImageUrl} className="place-self-center ml-20 w-8 h-8"></img>
        <p className="ml-2 py-4 text-xs">{props.userDisplayName}</p>
      </div>
    </Link>
  ) : (
    <Link href={"/login"} as={"/login"}>
      <button className="ml-20 py-4 text-xs cursor-pointer">ログイン</button>
    </Link>
  );
};

export default UserProfileButton;
