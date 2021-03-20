# KC3Hack 2021 Template

[![KC3Hack](https://kc3.me/hack/wp-content/uploads/2021/01/kc3hack2021ogp@2x.png)](https://kc3.me/hack)

## プロダクト名

<img src="https://firebasestorage.googleapis.com/v0/b/kc3hack-b.appspot.com/o/tirokatsu%2FTiroKatsu_logo.svg?alt=media&token=da33505c-3c89-4cf7-9677-5bfd75c1f3f1" width="400px" style="display: block; margin: auto;">

## プロダクト説明

&emsp;チロカツはチロルチョコに特化した交流用 Web アプリです．チロルチョコのある日常をより便利で豊かにすることを目的としています．
チロルチョコのファンで既に SNS などで情報の発信や交流を行ってる方だけでなく，チロルチョコをなんとなく食べている方にも楽しんでもらえるように開発しました．

### 機能紹介

&emsp;チロカツには会員登録制度(無料)があります．基本的には会員登録は不要ですが，していただくことで後述するチロレポ投稿やマイページといったサービスがご利用になれます．

#### チロコレ

<img src="https://firebasestorage.googleapis.com/v0/b/kc3hack-b.appspot.com/o/tirokatsu%2Ftitocolle.png?alt=media&token=e49304c7-fd02-4bab-a770-6fe438fee52d" width="600px" style="display: block; margin: auto;">
&emsp;チロカツのトップページです．今まで発売された様々なチロルチョコの一覧が表示されます．気になるチロルチョコの画像をクリックしますと，そのチロルチョコの情報がご覧になれます．

#### チロレポ

<img src="https://firebasestorage.googleapis.com/v0/b/kc3hack-b.appspot.com/o/tirokatsu%2Ftirorepo.png?alt=media&token=22018eb2-d338-42c6-8a30-b91c27b785a0" width="600px" style="display: block; margin: auto;">
&emsp;チロコレの画像をクリックするとこのページが表示されます．このページではチロルチョコの商品情報だけでなく，自分や他のユーザーのチロレポを見ることができます，チロレポは各ユーザーから寄せられたチロルチョコに対する感想や意見で，星評価やコメントといった形式で投稿することができます．なお投稿は会員限定です．

#### マイページ

<img src="https://firebasestorage.googleapis.com/v0/b/kc3hack-b.appspot.com/o/tirokatsu%2Fmypage.png?alt=media&token=622b0894-14ed-412d-b66b-4a2e1e900976" width="600px" style="display: block; margin: auto;">
&emsp;会員限定のページです．今までの自分のチロレポ一覧表示機能やプロフィール機能(ニックネーム，アイコン，自己紹介)があります．

## 使用技術

#### フロントエンド

- React
  - Next.js
- tailwind CSS

#### バックエンド

- Firebase
  - 認証：Authentication
  - DB：Cloud Firestore
