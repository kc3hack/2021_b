import React from "react";
import Link from "next/link";

//css(未完成)
function Header() {
  return (
    <header>
      <div className="flex flex-row bg-red">
        <Link href={"/"} as={"/"}>
          <img src="/TiroKatsu_logo.svg" className="ml-20 w-20 h-15" />
        </Link>
        <p className="ml-5 py-4 text-xs">
          チロルチョコファンのためのポータルサイト
        </p>
        <p className="ml-20 py-4 text-xs">チロルレシピ</p>
        <Link href={"/login"} as={"/login"}>
          <button className="ml-20 py-4 text-xs">ログイン</button>
        </Link>
        <Link href={"/mypage"} as={"/mypage"}>
          <button className="ml-20 py-4 text-xs">マイページ</button>
        </Link>
        <Link href={"/uplpad"} as={"/upload"}>
          <button className="ml-20 py-4 text-xs">アイコン</button>
        </Link>
      </div>
    </header>
  );
}

export default Header;
