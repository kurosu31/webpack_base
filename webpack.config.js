// [定数] webpack の出力オプションを指定します
// 'production' か 'development' を指定
const MODE = "development";
// ソースマップの利用有無(productionのときはソースマップを利用しない)
const enabledSourceMap = MODE === "development";
// CSSファイルを外出しにするプラグイン
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// html生成プラグイン
const HtmlWebpackPlugin = require('html-webpack-plugin');
// html監視プラグイン
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');

// CSSをバンドルするための機能
const CSSLoader = {    
      loader: "css-loader",
      options: {
        // オプションでCSS内のurl()メソッドの取り込みを指定
        url: true,
        // ソースマップを有効にする
        sourceMap: enabledSourceMap,
        // 0 => no loaders (default);
        // 1 => postcss-loader;
        // 2 => postcss-loader, sass-loader
        importLoaders: 2
      },
};

// Sassの読み込み
const SassLoader = {
  loader: "sass-loader",
  options: {
    sourceMap: enabledSourceMap,
  },
};

// PostCSS Autoprefixerの設定
const PostCSS = {
  loader: "postcss-loader",
  options: {
    // PostCSSがわでもソースマップを有効にする
    // sourceMap: true,
    postcssOptions: {
      plugins: [
        // Autoprefixerを有効化
        // ベンダープレフィックスを自動付与する
        ["autoprefixer", {grid: true}],
      ],
    },
  },
};




module.exports ={
  // モードの設定 開発時: "development", 本番環境: "production"
  // development に設定するとソースマップ有効でJSファイルが出力される
  mode: MODE,
  // エントリーポイント
  entry: `./src/index.js`,

  output: {
    // ファイル出力設定
    path: `${__dirname}/dist`,
    // 出力ファイル名
    filename: "main.js",
  },

    // ローカル開発用環境を立ち上げる
    // 実行時にブラウザが自動的に localhost を開く
    devServer: {
      static: "dist",
      open: true
    },
    // 
    module: {
      rules: [
        // cssファイル読み込み
        {
          // 対象となる拡張子
          test: /\.scss/,
          // ローダー名
          use: [
            // linkタグに出力する機能
            // "style-loader",
            // CSSファイルを書き出すオプションを有効
            MiniCssExtractPlugin.loader,
            // CSSをバンドルするための機能
            CSSLoader,
            // Sassの読み込み
            SassLoader, 
            // PostCSS Autoprefixerの有効
            PostCSS,
          ],
        },
        {
          // image取り込み
          // 対象となる拡張子
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          // 画像を埋め込まず任意のフォルダに保存する asset/resource を指定して画像をコピーして出力
          generator: {
            //出力先を指定（images フォルダにファイル名と拡張子で出力）
            filename: 'images/[name][ext][query]',
          },
          // 出力条件指定
          type: 'asset/resource',
        },
      ],
    },

    plugins: [
      // CSSファイルを外出しにするプラグイン
      new MiniCssExtractPlugin({
        // ファイル名を指定
        filename: "style.css",
      }),
      //HtmlWebpackPlugin プラグイン（インスタンスを生成）
      new HtmlWebpackPlugin({
        template: "./src/html/index.html",
        filename: 'index.html',
        alwaysWriteToDisk: true,
        //meta オプションを指定
        meta: [
          {'http-equiv': 'X-UA-Compatible', content: 'IE=edge'},
          {'name': 'description', content: 'My First HtmlWebpackPlugin'} 
    ]
      }),
      // html監視プラグイン
      new HtmlWebpackHarddiskPlugin(),
    ],

    // ES5(IE11等)向けの指定
    target: ["web", "es5"],
    // jsファイルを圧縮
    optimization: {
      minimize: true
    }
}