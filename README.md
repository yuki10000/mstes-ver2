# 段階的和文英訳演習システム Ver2 (Multi-Step Translation Exercise System Ver 2)

<div align="center">
    <img src="./docs/assets/mstes-ver2-logo.png" alt="mstes-ver2 logo" width="170" height="170" />
</div>

## 使用技術

[![Vue.js](https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vue.js&logoColor=4FC08D)](https://vuejs.org/) [![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=FFD62E)](https://vitejs.dev/) [![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/) [![ESLint](https://img.shields.io/badge/ESLint-4B32C3?style=for-the-badge&logo=eslint&logoColor=white)](https://eslint.org/) [![Vitest](https://img.shields.io/badge/Vitest-6E9F18?style=for-the-badge&logo=vitest&logoColor=white)](https://vitest.dev/)

## 環境構築

> [!NOTE]
> コマンドは全てlinuxコマンドなので、VS Codeのターミナルなどのlinux系コマンドが実行できるターミナルで実行するようにしてください。Git(gitコマンドで使用)やNode(npmコマンドで使用)のインストールを事前に実施しておいてください。

1. リポジトリのクローン

    自分のPCの任意のフォルダで以下のコマンドを実行

    ```bash
    git clone https://github.com/yuki10000/mstes-ver2.git
    ```

1. mstes-ver2のフォルダが作成されるので、移動

    ```bash
    cd multi-step-translation-exercise-system
    ```

1. パッケージのインストール

    ```bash
    npm install
    ```

1. サーバーを立ち上げ

    ```bash
    npm run dev
    ```

1. <http://localhost:5173/> を開いて、システムのページが表示されていればOK！

1. サーバーを止めるときはターミナルで `Ctrl + C`

## 毎回の開発の際のサーバー立ち上げ

1. package.jsonに変更がある際は以下のコマンドを実行してパッケージをインストール（ないときはスキップしてOK）

    ```bash
    npm install
    ```

1. サーバーを立ち上げ

    ```bash
    npm run dev
    ```

1. <http://localhost:5173/> を開いて、システムのページが表示されていればOK！

1. サーバーを止めるときはターミナルで `Ctrl + C`

## テストの実行方法

ユニットテストはVitestで実行

```bash
npm run test:unit
```

テストファイルは `src/__tests__/` ディレクトリ内に配置されている

## コードフォーマット・Lintの実行方法

ESLintによるコードチェック・自動修正や、Prettierによるコードフォーマット

### ESLint

コードチェックのみ:

```bash
npm run lint
```

自動修正付き:

```bash
npm run lint -- --fix
```

### Prettier

コードの自動整形（src/配下のファイルを対象）:

```bash
npm run format
```
