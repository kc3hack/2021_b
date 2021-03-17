import React from "react";
import Link from "next/link";

//css(未完成)
function Header() {
  return (
    <header>
      <div class="flex flex-row bg-red">
        <img src="/TiroKatsu_logo.svg" class="ml-20 w-20 h-15" />
        <p class="ml-5 py-4 text-xs">
          チロルチョコファンのためのポータルサイト
        </p>
        <p class="ml-20 py-4 text-xs">チロルレシピ</p>
        <Link href={"/login"} as={"/login"}>
          <button class="ml-20 py-4 text-xs">ログイン</button>
        </Link>
      </div>
    </header>
  );
}

export default Header;
