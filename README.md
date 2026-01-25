# Reader App

一个优雅的阅读器应用，使用 **Astro + React + Tailwind CSS 4** 构建。

## 技术栈

- **Astro** - 现代化的 Web 框架
- **React 19** - 用户界面库
- **Tailwind CSS 4** - 实用优先的 CSS 框架
- **TypeScript** - 类型安全
- **Playfair Display & Inter** - 优雅的排版字体

## 功能特性

- 📚 **三个主要页面**
  - **Home** - 欢迎页面，显示阅读进度
  - **Library** - 文章库，支持分类筛选和排序
  - **Bookmarks** - 书签管理，保存喜欢的文章

- 🎨 **优雅的设计**
  - 单色调配色方案
  - 斜体衬线标题字体
  - 简洁的排版布局

## 开始使用

### 安装依赖

```bash
pnpm install
```

### 开发模式

```bash
pnpm dev
```

访问 [http://localhost:4321](http://localhost:4321) 查看应用。

### 构建生产版本

```bash
pnpm build
```

### 预览生产构建

```bash
pnpm preview
```

## 项目结构

```
reader/
├── src/
│   ├── components/
│   │   ├── reader/          # 阅读器核心组件
│   │   │   ├── Header.tsx   # 顶部导航栏
│   │   │   ├── HomePage.tsx # 首页组件
│   │   │   ├── LibraryPage.tsx # 文章库页
│   │   │   └── BookmarksPage.tsx # 书签页
│   │   ├── ui/              # UI 基础组件
│   │   │   ├── button.tsx   # 按钮组件
│   │   │   └── badge.tsx    # 徽章组件
│   │   └── ReaderApp.tsx    # 主应用组件
│   ├── layouts/
│   │   └── Layout.astro     # 页面布局
│   ├── pages/
│   │   └── index.astro      # 主页
│   └── styles/
│       └── global.css       # 全局样式
├── public/                  # 静态资源
├── astro.config.mjs         # Astro 配置
├── tailwind.config.mjs      # Tailwind 配置
├── tsconfig.json            # TypeScript 配置
└── package.json             # 项目依赖
```

## 设计规范

### 颜色

- **主色**: 黑色 (#000000)
- **灰色系**:
  - gray-400: #CCCCCC
  - gray-500: #888888
  - gray-600: #666666
- **边框**: #E0E0E0

### 字体

- **标题**: Playfair Display (斜体)
- **正文**: Inter

### 间距

- 页面内边距: 56px (14 * 4)
- 章节间距: 48-64px
- 组件间距: 12-24px

## 开发说明

### 添加新页面

1. 在 `src/components/reader/` 创建新组件
2. 在 `ReaderApp.tsx` 中添加路由逻辑
3. 在 `Header.tsx` 中添加导航项

### 自定义样式

项目使用 Tailwind CSS，可以在 `tailwind.config.mjs` 中自定义主题配置。

## License

MIT
