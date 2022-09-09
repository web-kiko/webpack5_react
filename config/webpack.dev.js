//开发环境
const path = require("path");
const ESLintWebpackPlugin = require("eslint-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
// const CopyPlugin = require("copy-webpack-plugin");

//提取公共部分style-loader和css-loader并做了postcss兼容
const getStyleLoaders = (preProcessor) => {
  return [
    "style-loader",
    "css-loader",
    {
      loader: "postcss-loader",
      options: {
        postcssOptions: {
          plugins: [
            // 在package.json里配置browserslist能解决大多数样式兼容性问题
            "postcss-preset-env", 
          ],
        },
      },
    },
    preProcessor,
  ].filter(Boolean);
};
module.exports = {
    entry: "./src/main.js",
    output: {
      path: undefined,
      //入口文件目录
      filename: "static/js/[name].js",
      //打包chunk目录动态导入的语法
      chunkFilename: "static/js/[name].chunk.js",
      //图片的目录
      assetModuleFilename: "static/js/[hash:10][ext][query]",

    },
    module: {
        rules: [
          {
            oneOf: [
              {
                // 用来匹配 .css 结尾的文件
                test: /\.css$/,
                // use 数组里面 Loader 执行顺序是从右到左
                use: getStyleLoaders(),
              },
              //less
              {
                test: /\.less$/,
                use: getStyleLoaders("less-loader"),
              },
              //sacc
              {
                test: /\.s[ac]ss$/,
                use: getStyleLoaders("sass-loader"),
              },
              //stylus
              {
                test: /\.styl$/,
                use: getStyleLoaders("stylus-loader"),
              },
              //图片
              {
                test: /\.(png|jpe?g|gif|svg)$/,
                type: "asset",
                //对图片优化
                parser: {
                  dataUrlCondition: {
                    maxSize: 10 * 1024, // 小于10kb的图片会被base64处理
                  },
                },
              },
              //其他资源
              {
                test: /\.(ttf|woff2?)$/,
                type: "asset/resource",
              },
              //babel-loader处理js
              {
                test: /\.(jsx|js)$/,
                include: path.resolve(__dirname, "../src"),
                loader: "babel-loader",
                options: {
                  //开启缓存
                  cacheDirectory: true,
                  //不压缩
                  cacheCompression: false,
                  plugins: [
                    // "@babel/plugin-transform-runtime", // presets中包含了
                    "react-refresh/babel", // 开启js的HMR功能
                  ],
                },
              },
            ],
          },
        ],
      },
      plugins: [
        //eslint插件
        new ESLintWebpackPlugin({
          context: path.resolve(__dirname, "../src"),
          //排除node_module
          exclude: "node_modules",
          //开启缓存让第二次打包更好
          cache: true,
          cacheLocation: path.resolve(
            __dirname,
            "../node_modules/.cache/.eslintcache"
          ),
        }),
        //html插件
        new HtmlWebpackPlugin({
          template: path.resolve(__dirname, "../public/index.html"),
        }),
        new ReactRefreshWebpackPlugin(), // 解决js的HMR功能运行时全局变量的问题
        // // 将public下面的资源复制到dist目录去（除了index.html）
        // new CopyPlugin({
        //   patterns: [
        //     {
        //       from: path.resolve(__dirname, "../public"),
        //       to: path.resolve(__dirname, "../dist"),
        //       toType: "dir",
        //       noErrorOnMissing: true, // 不生成错误
        //       globOptions: {
        //         // 忽略文件
        //         ignore: ["**/index.html"],
        //       },
        //       info: {
        //         // 跳过terser压缩js
        //         minimized: true,
        //       },
        //     },
        //   ],
        // }),
      ],
      //分包
      optimization: {
        splitChunks: {
          chunks: "all",
        },
        //为了防止拆包失效
        runtimeChunk: {
          name: (entrypoint) => `runtime~${entrypoint.name}`,
        },
      },
      //webpack解析模块加载选项
      resolve: {
        extensions: [".jsx", ".js", ".json"], // 自动补全文件扩展名，让jsx可以使用
      },
      //热更新
      devServer: {
        open: true,
        host: "localhost",
        port: 3000,
        hot: true,
        compress: true,
        historyApiFallback: true, // 解决react-router刷新404问题
      },
      mode: "development",
      devtool: "cheap-module-source-map",
}