## 基本思想

Sassは採用せずにPostCSS + CSSでFLOCSSベースのディレクトリ構成にしつつBEM的な命名規則を採用してCSSを書く。(ただ厳密なプレフィクスとかをレビューでコメントし合うのは生産的ではない気がしているので、そのあたりはゆるふわで運用する感じ)

> FLOCSS（フロックス） は、OOCSSやSMACSS、BEM、SuitCSSのコンセプトを取り入れた、モジュラーなアプローチのためのCSS構成案です。
> https://github.com/hiloki/flocss

> BEM — is a methodology that helps you to create reusable components and code sharing in front‑end development
> https://getbem.com/

具体的には以下のようなディレクトリ構成を採用し、`block__element--modifier`の形式で記述する。

また以下のようなCSSのモダンな機能を積極的に利用して保守性を高める。

* `@import`によるCSSの分割
* `@scope`によるCSSのスコープ化
* `@layer`によるCSSのレイヤー化
* `@container`によるコンテナクエリの利用
* `@custom-media`によるメディアクエリのカスタム化
* `@property`によるカスタムプロパティの定義
* `css nesting`によるネスト記法の利用
* `:has`による親要素の状態に応じたスタイルの適用

## 各ディレクトリの役割と基本ルール

### main.css

FLOCSSと同じ、プロジェクト全体のスタイルを定義するメインのCSSファイル。
カスケーディングレイヤーの概念を利用して、CSSのレイヤーを定義し、各レイヤーごとにスタイルをインポートする。

```css
@layer base, layout, components, utils;

/* ベースレイヤー: リセットCSSやデフォルトスタイル */
@import "./foundation/reset.css" layer(base);
@import "./foundation/base.css" layer(base);

/* レイアウトレイヤー: グリッドやコンテナなどのレイアウト要素 */
@import "./layout/grid.css" layer(layout);
@import "./layout/container.css" layer(layout);

/* コンポーネントレイヤー: UIコンポーネント固有のスタイル */
@import "./components/button.css" layer(components);
@import "./components/heading.css" layer(components);
@import "./components/link.css" layer(components);
@import "./components/paragraph.css" layer(components);

/* ユーティリティレイヤー: ヘルパークラスなど */
@import "./utils/visibility.css" layer(utils);
```

### Foundation

FLOCSSと同じ、デフォルトスタイルや変数管理等を行うディレクトリ。

> Foundation
> Reset.cssやNormalize.cssなどを用いたブラウザのデフォルトスタイルの初期化や、プロジェクトにおける基本的なスタイルを定義します。 ページの下地としての全体の背景や、基本的なタイポグラフィなどが該当します。
> https://github.com/hiloki/flocss?tab=readme-ov-file#foundation

Foundationで定義したスタイルは`main.css`にインポートされグローバルに適用する。

```css
/* application.css */

@import "./reset.css"
@import "./font.css"
@import "./color.css"
@import "./variable.css"
@import "./base.css"
```

### Layout

基本はFLOCSSと同じ、ヘッダーやフッター、コンテンツエリアのような具体の要素を埋め込むテンプレート的な要素のスタイルを定義するディレクトリ。

> ページを構成するヘッダーやメインのコンテンツエリア、サイドバーやフッターといったプロジェクト共通のコンテナーブロックのスタイルを定義します。
> https://github.com/hiloki/flocss?tab=readme-ov-file#layout

あくまでグローバルに現れるテンプレート的な要素となるため、具体なコンテンツを持つ要素や特定の機能のためものは後述のObjectに定義する。

FLOCSSではプレフィクスとして`l-`をつけるルールになっているがLayout - Object間の移動を想定して、そこまで厳密にプレフィクスはつけずサービス固有のプレフィクス`servicename-`を付ける程度にする。

また`@scope`を利用してCSSのスコープ化を行う。

```css
@scope .service-header {
  ...
}
```

### Component

基本はFLOCSSと同じ、グローバルに再利用される要素を管理するディレクトリ。必要な箇所で`@import`で読み込み利用します。

> Component
> 再利用できるパターンとして、小さな単位のモジュールを定義します。
> 一般的によく使われるパターンであり、例えばBootstrapのComponentカテゴリなどに見られるbuttonなどが該当します。
> https://github.com/hiloki/flocss?tab=readme-ov-file#1-component

Componentに配置するかどうかの目安として異なる2つ以上の機能で3回以上再利用が発生した、またはデザインシステム等で明確にグローバルな要素として定義されている場合にはComponentに配置する。

FLOCSSではプレフィクスとして`c-`をつけるルールになっているがLayout - Object間の移動を想定して、そこまで厳密にプレフィクスはつけずサービス固有のプレフィクス`servicename-`を付ける程度にする。

また`@scope`を利用してCSSのスコープ化を行う。

```css
@scope .service-button {
  ...
}
```

特定な機能内で再利用されるものはComponentではなく後述のProjectに定義する。

### Project

基本はFLOCSSと同じ、特定の機能で利用することを想定した要素に対するスタイルを管理するディレクトリ。

> Project
> プロジェクト固有のパターンであり、いくつかのComponentと、それに該当しない要素によって構成されるものを定義します。
> https://github.com/hiloki/flocss?tab=readme-ov-file#2-project

基本的には、まず愚直にページ単位でCSSを作成しページ間で再利用が発生するものは別ファイルに切り出していく。

目安として3回以上の再利用が発生した場合に別ファイルに切り出すことを検討する。

FLOCSSではプレフィクスとして`p-`をつけるルールになっているが、`namespace class`を採用しページ単位で作成したCSSは一意となるようにサービス名を表すプレフィクス+ディレクトリ構成のようなclassをトップレベルに記述することでページ内でCSSをスコーピングし、それにネストする形でスタイルを記述する。

> 「namespace class」は、1つViewに対して一意のルートクラスを設定する手法です、愚直ですね。Wordpressで似たような仕組みを見た方もいるかと思います。
> Viewがapp/views/users/show.htmlのように配置されていますので、ここから.view-users-showのようなクラス名にすることで、1つのViewに一意なクラス名を付与することが出来ます。
> https://qiita.com/hanakla/items/b96cdfabd93a762c3ec0#namespace-class

グローバルに影響しないスコープ内のCSSに関してはBEMライクの記法で記述するぐらいのゆるいルールで管理する。

また`@scope`を利用してCSSのスコープ化を行う。

```css
/* project/books/index.css */
@scope .service-books-index {
  .books-title { ... }
  .books-card { ... }
}
```

```css
/* project/books/show.css */
@scope .service-books-show {
  .books-card { ... }
}
```

機能内での再利用のために別ファイルに切り出す場合にはサービス名を表すプレフィクス+機能のトップレベルのディレクトリ構成+コンポーネント名のようなclassをトップレベルに記述し、それにネストする形でスタイルを記述してスコーピングを行う。

```css
/* project/books/card.css */
@scope .service-books-card {
  ...
}
```

### Util

基本はFLOCSSと同じ、グローバルに利用する便利系クラスを配置するディレクトリ。必要な箇所で`@import`で読み込み利用します。

> Utility
> ComponentとProjectレイヤーのObjectのモディファイアで解決することが難しい・適切では無い、わずかなスタイルの調整のための便利クラスなどを定義します。
> https://github.com/hiloki/flocss?tab=readme-ov-file#3-utility

FLOCSSではプレフィクスとして`u-`をつけるルールになっているがUtility - Project等の移動を想定して、そこまで厳密にプレフィクスはつけずサービス固有のプレフィクス`servicename-`を付ける程度にする。

基本的にはCSSの単一のプロパティを操作するようなcssとなるため、操作するプロパティや意図に合わせて命名する。

```css
.service-text-center { ... }
.sercice-is-hidden-mobile { ... }
```

## 命名規則・クラス設計

厳密性は求めないがFLOCSSと同様にBEM・MindBEMding的な`block__element--modifier`の形式で書く。

> BEMシステムのシンタックスである、Block、Element、Modifierに分類して構成される規則を採用します。
> FLOCSSでは、オリジナルのBEMのシンタックスではなく、MindBEMding のアイデアを基本的にそのまま取り入れています。
> https://github.com/hiloki/flocss?tab=readme-ov-file#mindbemding

> BEM — is a methodology that helps you to create reusable components and code sharing in front‑end development
> https://getbem.com/

Blockは単体で意味のある要素のため、Block同士はネストさせない。

> Block
> Encapsulates a standalone entity that is meaningful on its own.
> https://getbem.com/naming/#block

Element, ModifierはBlockを構成する要素のためBlockにネストするように記述する。

> Element
> Parts of a block and have no standalone meaning. Any element is semantically tied to its block.
> https://getbem.com/naming/#element

> Modifier
> Flags on blocks or elements. Use them to change appearance, behavior or state.
> https://getbem.com/naming/#modifier

例えばヘッダー(Element)・メイン(Element)・フッター(Element)を持つカード(Block)的な要素をCSSで表現する場合は以下のような書き方になる。

```css
.service-card {
  .service-card__header { ... }
  .service-card__main { ... }
  .service-card__footer { ... }
  &.service-card--dark { ... }
}
```

