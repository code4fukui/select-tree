Here is the translated markdown chunk in Japanese:

# select-tree
The README in Japanese is here: [README.ja.md](README.ja.md)

CSVデータから多階層ドロップダウンツリーを作成するためのカスタムHTML要素。

## 機能
- CSVデータから動的に多階層ドロップダウンツリーを作成する
- ラベルの表示や必須フィールドなどのオプションパラメーターをサポートする
- プログラムによる選択値の設定と取得が可能

## 使い方
`select-tree`要素を使用するには、以下の手順に従ってください:

1. HTMLに`select-tree.js`ファイルを含めます:

   ```html
   <script type="module" src="./select-tree.js"></script>
   ```

2. HTMLに`select-tree`要素を追加し、CSVデータソースを指定します:

   ```html
   <select-tree id="sel" src="./sample.csv"></select-tree>
   ```

3. 必要に応じて、`select-tree`要素に追加の属性を設定できます。例えば、`required="required"`を設定すると必須フィールドになります。

4. JavaScriptを使って`select-tree`要素と対話します:

   ```javascript
   const selectTree = document.getElementById('sel');

   // 選択された値を取得する
   console.log(selectTree.value);

   // 選択された値を設定する
   selectTree.value = 'A2';

   // 変更時のイベントを監視する
   selectTree.onchange = () => {
     console.log('値が変更されました:', selectTree.value);
   };
   ```

## データ / API
`select-tree`要素は、CSVデータを使用して、多層階構造のドロップダウンを入力します。 CSVデータは次の構造を持っている必要があります:

- 最初の行がヘッダーで、列名を定義します。
- その後の各行は、ドロップダウンツリーの単一のオプションを表しています。
- 列は階層を表しており、最初の列が最上位レベル、最後の列がリーフレベルのオプションラベルになります。

リポジトリには、サンプルCSVファイル(`sample.csv`)が用意されています。

## ライセンス
このプロジェクトは [MIT License](LICENSE) のもとで公開されています。
