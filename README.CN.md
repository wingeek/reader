# Reader App

一个优雅的阅读器应用，使用 **Astro + React + Tailwind CSS 4 + Convex** 构建。

## 技术栈

- **Astro 5.0** - 现代化 Web 框架，支持 SSR/SSG
- **React 19** - 最新 UI 库
- **TypeScript 5.7** - 类型安全开发
- **Tailwind CSS 4.0** - 实用优先的 CSS 框架
- **Convex** - 实时数据库和后端服务
- **Bun** - 快速的 JavaScript 运行时
- **Playfair Display & Inter** - 优雅的排版字体

## 功能特性

### 核心页面

- 🏠 **首页** - 欢迎页面，显示阅读进度
- 📡 **订阅** - 管理内容源（GitHub 仓库，更多即将推出）
- 📰 **动态** - 查看来自订阅的收藏文章
- 🔖 **书签** - 保存和管理喜欢的文章

### 订阅管理（第一阶段）

- **GitHub 集成** - 订阅仓库以跟踪 releases 和 issues
- **自动收集** - 定时任务每小时收集新内容
- **动态视图** - 所有订阅的实时更新
- **内容组织** - 对收藏文章进行分类和筛选

### 设计理念

- 📱 **移动优先** - 完全响应式设计，支持触控友好界面
- 🎨 **优雅排版** - 斜体衬线标题 + 干净的无衬线正文
- 🎭 **单色调** - 单色配色方案，专注阅读体验
- ⚡ **高性能** - Astro SSR 快速加载，优化渲染

## 快速开始

### 前置要求

- Node.js 18+ 或 Bun
- Convex 账户（免费版即可）

### 安装

```bash
# 安装依赖
bun install

# 启动 Convex 开发服务器（在单独的终端）
bun dev:convex

# 启动 Web 应用
bun dev
```

访问 [http://localhost:4321](http://localhost:4321) 查看应用。

### 环境变量

创建 `.env.local`:

```bash
# Deployment used by `npx convex dev`
CONVEX_DEPLOYMENT=anonymous:anonymous-web

CONVEX_URL=http://127.0.0.1:3210
PUBLIC_CONVEX_URL=http://127.0.0.1:3210

CONVEX_SITE_URL=http://127.0.0.1:3211
```

### 生产构建

```bash
bun build
```

### 预览生产构建

```bash
bun preview
```

## 项目结构

```
reader/
├── src/
│   ├── components/
│   │   ├── reader/              # 核心阅读器组件
│   │   │   ├── Header.tsx       # 桌面端顶部导航
│   │   │   ├── MobileBottomNav.tsx  # 移动端底部导航
│   │   │   ├── HomePage.tsx     # 首页
│   │   │   ├── SubscriptionsPage.tsx  # 订阅管理
│   │   │   ├── FeedPage.tsx      # 文章动态
│   │   │   ├── BookmarksPage.tsx     # 书签管理
│   │   │   ├── ArticleDetailPage.tsx # 文章阅读
│   │   │   └── AddSubscriptionModal.tsx # 添加订阅弹窗
│   │   ├── ui/                  # UI 基础组件
│   │   │   ├── button.tsx       # 按钮组件
│   │   │   └── badge.tsx        # 徽章组件
│   │   └── ReaderApp.tsx        # 主应用（路由管理）
│   ├── layouts/
│   │   └── Layout.astro         # 页面布局
│   ├── lib/
│   │   └── convex.tsx           # Convex 客户端设置
│   ├── pages/
│   │   └── index.astro          # 应用入口
│   └── styles/
│       └── global.css           # 全局样式
├── convex/                     # 后端 (Convex)
│   ├── schema.ts               # 数据库模式
│   ├── subscriptions/
│   │   ├── queries.ts          # 订阅查询
│   │   └── mutations.ts        # 订阅变更
│   ├── articles/
│   │   ├── queries.ts          # 文章查询
│   │   └── mutations.ts        # 文章变更
│   ├── collections/
│   │   └── github.ts           # GitHub 收集器
│   ├── crons.ts                # Cron 任务配置
│   └── crons.ts                # Cron 逻辑
├── public/                     # 静态资源
├── astro.config.mjs            # Astro 配置
├── tailwind.config.mjs         # Tailwind 配置
├── tsconfig.json               # TypeScript 配置
└── package.json                # 项目依赖
```

## 设计系统

### 颜色

- **主色**: 黑色 (#000000)
- **灰色**: #CCCCCC, #888888, #666666, #E0E0E0
- **边框**: 用于分隔的微妙灰色

### 字体

- **标题**: Playfair Display（斜体）
- **正文**: Inter（干净易读）

### 响应式断点

- **移动端**: 默认（< 768px）
- **桌面端**: `md:` 断点（≥ 768px）

## 开发指南

### 可用脚本

```bash
bun dev          # 启动所有服务（Web + Convex）
bun dev:web      # 仅启动 Web 服务器
bun dev:convex   # 仅启动 Convex 开发服务器
bun build        # 生产构建
bun preview      # 预览生产构建
```

### 类型检查

```bash
astro check      # Astro 类型检查
tsc --noEmit     # TypeScript 类型检查
```

## 架构

### 客户端路由

应用使用基于状态的路由（非 URL 路由），由 `ReaderApp.tsx` 管理：
- `Tab`: 'home' | 'subscriptions' | 'feed' | 'bookmarks'
- `View`: Tab | 'article-detail'

### 后端 (Convex)

**数据库表**:
- `subscriptions` - 内容源订阅
- `articles` - 来自源的文章收藏
- `collectionJobs` - 收集任务历史

**API 结构**: 函数遵循文件系统路径
- `api.subscriptions.queries.listAll`
- `api.subscriptions.mutations.create`
- `api.articles.queries.listRecent`

## 路线图

### 第一阶段: 基础 ✅
- [x] GitHub 订阅支持
- [x] 基础动态视图
- [x] 自动内容收集
- [x] 书签管理

### 第二阶段: 更多源（计划中）
- [ ] HackerNews 集成
- [ ] Product Hunt 集成
- [ ] 微信文章收集
- [ ] 高级筛选

### 第三阶段: AI 智能体（计划中）
- [ ] 自然语言订阅管理
- [ ] 内容控制聊天界面
- [ ] AI 内容摘要

### 第四阶段: 摘要（计划中）
- [ ] 每日/每周精选摘要
- [ ] AI 生成摘要
- [ ] 个性化推荐

## 贡献指南

详细开发文档请参阅 [CLAUDE.md](./CLAUDE.md)。

## 许可证

MIT
