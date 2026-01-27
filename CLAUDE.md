# Reader App - Claude AI Development Guide

## 项目概览

Reader 是一个优雅的阅读器应用，采用单色调设计语言，专注于提供沉浸式的阅读体验。项目完全支持移动端响应式设计，使用现代化的技术栈构建。

### 核心特性

- 📱 **完全响应式设计** - 移动优先，完美适配桌面和移动设备
- 🎨 **优雅的视觉设计** - 单色调配色、斜体衬线字体、简洁排版
- 🏃 **高性能** - Astro SSR + React 19 + Tailwind CSS 4
- 🔒 **类型安全** - 全面的 TypeScript 支持
- 📐 **设计系统** - 统一的组件和样式规范

---

## 技术栈

### 核心框架
- **Astro 5.0** - 现代化 Web 框架，支持 SSR/SSG
- **React 19** - 最新版本的用户界面库
- **TypeScript 5.7** - 类型安全开发

### 样式系统
- **Tailwind CSS 4.0** - 实用优先的 CSS 框架
- **Radix UI Themes** - 高质量 UI 组件库
- **tw-animate-css** - CSS 动画增强

### 后端服务
- **Convex** - 实时数据库和后端服务

### 开发工具
- **Bun** - 快速的 JavaScript 运行时
- **Lucide React** - 图标库
- **Concurrently** - 并发运行多个开发命令

---

## 项目架构

### 目录结构

```
reader/
├── src/
│   ├── components/
│   │   ├── reader/              # 阅读器核心组件
│   │   │   ├── Header.tsx       # 桌面顶部导航 + 移动端Logo
│   │   │   ├── MobileBottomNav.tsx  # 移动端底部导航栏
│   │   │   ├── HomePage.tsx     # 首页（欢迎+阅读进度）
│   │   │   ├── LibraryPage.tsx  # 文章库页
│   │   │   ├── BookmarksPage.tsx # 书签管理页
│   │   │   └── ArticleDetailPage.tsx # 文章阅读页
│   │   ├── ui/                  # UI 基础组件
│   │   │   ├── button.tsx       # 按钮组件（shadcn/ui）
│   │   │   └── badge.tsx        # 徽章组件（shadcn/ui）
│   │   └── ReaderApp.tsx        # 主应用组件（路由+状态管理）
│   ├── layouts/
│   │   └── Layout.astro         # Astro 页面布局
│   ├── pages/
│   │   └── index.astro          # 应用入口页
│   └── styles/
│       └── global.css           # 全局样式+CSS变量
├── public/                      # 静态资源
├── astro.config.mjs            # Astro 配置
├── tailwind.config.mjs         # Tailwind 配置
├── tsconfig.json               # TypeScript 配置
└── package.json                # 项目依赖
```

### 应用架构

#### 路由系统

项目采用**客户端状态路由**（非 URL 路由），通过 `ReaderApp.tsx` 管理视图状态：

```typescript
type Tab = 'home' | 'library' | 'bookmarks';
type View = Tab | 'article-detail';

// 状态管理
const [currentView, setCurrentView] = useState<View>('home');
const [previousTab, setPreviousTab] = useState<Tab>('home');
```

#### 组件层次

```
Layout.astro
└── ReaderApp
    ├── Header (桌面导航)
    ├── MobileBottomNav (移动导航)
    └── Main Content
        ├── HomePage
        ├── LibraryPage
        ├── BookmarksPage
        └── ArticleDetailPage
```

---

## 移动端适配策略

### 响应式断点

项目使用 Tailwind CSS 默认断点：

- **移动端**: 默认（< 768px）
- **桌面端**: `md:` 断点（≥ 768px）

### 设计模式

#### 1. 双导航系统

- **桌面端**: 顶部 Header 导航（`Header.tsx`）
- **移动端**: 底部 Tab 栏导航（`MobileBottomNav.tsx`）

```typescript
{/* 桌面导航 - md: 以上显示 */}
<Header className="hidden md:flex" />

{/* 移动导航 - md 以下显示 */}
<MobileBottomNav className="md:hidden" />
```

#### 2. 内容宽度管理

**移动端**（< 768px）:
- 文本内容限制宽度: `max-w-[335px]`
- 防止水平溢出
- 保持可读性

**桌面端**（≥ 768px）:
- 全宽显示: `md:max-w-none`
- 最大宽度约束: `md:max-w-2xl`
- 居中对齐

#### 3. 列表项设计

**移动端**:
- 卡片样式: `rounded-lg border bg-gray-50 p-4`
- 完整内边距: 所有边都有 padding

**桌面端**:
- 分隔线样式: `md:border-b md:rounded-none md:bg-transparent md:px-0`
- 仅水平内边距: `md:px-4`（在 button 内部）
- 悬停效果: `hover:bg-gray-50`

#### 4. Safe Area 支持

为 iPhone 刘海屏和底部指示器预留空间：

```css
/* global.css */
@supports (padding-bottom: env(safe-area-inset-bottom)) {
  .safe-area-inset-bottom {
    padding-bottom: calc(env(safe-area-inset-bottom));
  }
}
```

应用在 `MobileBottomNav`:

```typescript
<nav className="... safe-area-inset-bottom">
```

#### 5. 底部内边距策略

**Tab 页面**（Home/Library/Bookmarks）:
- 移动端: `pb-20`（80px）- 防止内容被底部导航遮挡
- 桌面端: `md:pb-16`（64px）

**文章详情页**:
- 不显示底部导航，无需额外底部内边距
- 移动端: `pb-20` 仅用于视觉平衡

---

## 设计系统

### 颜色规范

#### 主色调
```css
--color-black: #000000;
--color-gray-400: #CCCCCC;
--color-gray-500: #888888;
--color-gray-600: #666666;
--color-gray-200: #E0E0E0;
```

#### 语义化颜色（Shadcn UI）
```css
--color-background: oklch(1 0 0);           /* 背景色 */
--color-foreground: oklch(0.129 0.042 264.695);  /* 前景色 */
--color-border: oklch(0.929 0.013 255.508); /* 边框色 */
--color-primary: oklch(0.208 0.042 265.755); /* 主色 */
```

### 字体系统

#### 字体家族
```css
--font-playfair: 'Playfair Display', serif;  /* 标题字体 */
--font-inter: 'Inter', sans-serif;           /* 正文字体 */
```

#### 排版规范

**标题**（Playfair Display）:
- H1（桌面）: `text-6xl font-normal italic tracking-tighter`
- H1（移动）: `text-[44px] font-normal italic leading-tight`
- H2（桌面）: `text-3xl font-normal italic`
- H2（移动）: `text-[28px] font-normal italic`

**正文**（Inter）:
- 桌面: `text-base leading-[1.8]` 或 `text-sm`
- 移动: `text-base leading-[1.8]`

**元数据**:
- 桌面: `text-sm` 或 `text-xs`
- 移动: `text-xs`

### 间距系统

基于 4px 基础单位的间距：

| 用途 | 移动端 | 桌面端 |
|------|--------|--------|
| 页面水平内边距 | `px-5` (20px) | `md:px-14` (56px) |
| 页面垂直内边距 | `py-6` ~ `py-8` | `md:py-16` |
| 组件间距 | `gap-2` ~ `gap-4` | `md:gap-8` |
| 列表项间距 | `gap-4` | `md:gap-8` |

### 圆角系统

```css
--radius: 0.625rem; /* 10px */
--radius-sm: calc(var(--radius) - 4px);
--radius-md: calc(var(--radius) - 2px);
--radius-lg: var(--radius);
--radius-xl: calc(var(--radius) + 4px);
```

---

## 组件详解

### ReaderApp.tsx

**职责**: 主应用容器，管理路由和导航状态

**Props**: 无

**状态**:
- `currentView: View` - 当前激活的视图
- `previousTab: Tab` - 进入文章页前的标签页

**核心方法**:
```typescript
handleTabChange(tab: Tab)      // 切换标签页
handleViewArticle()            // 进入文章详情
handleBackFromArticle()        // 返回之前的标签页
```

**导航规则**:
- Tab 视图显示 Header + MobileBottomNav
- ArticleDetail 视图仅显示返回按钮

---

### Header.tsx

**职责**: 桌面端顶部导航栏

**Props**:
```typescript
interface HeaderProps {
  activeTab: 'home' | 'library' | 'bookmarks';
  onTabChange: (tab: Tab) => void;
}
```

**响应式行为**:
- 移动端: 仅显示 Logo + 用户头像
- 桌面端: 完整导航链接 + 用户信息

**激活状态样式**:
- 激活: `font-playfair text-base font-semibold italic text-black`
- 非激活: `font-inter text-sm font-normal text-gray-500`

---

### MobileBottomNav.tsx

**职责**: 移动端底部 Tab 导航栏

**Props**:
```typescript
interface MobileBottomNavProps {
  currentView: Tab;
  onViewChange: (view: Tab) => void;
}
```

**特性**:
- 固定定位: `fixed bottom-0 left-0 right-0`
- 高度: `h-[50px]`
- 图标: 使用语义化 emoji（🏠 📚 🔖）
- Safe Area 支持

**激活状态**:
- 无视觉差异（根据设计要求）
- 点击触发 `onViewChange`

---

### HomePage.tsx

**职责**: 欢迎页面，展示阅读进度

**结构**:
1. Hero Section - "Welcome back"
2. Continue Reading - 进度卡片
3. Footer（桌面仅）

**响应式特点**:
- 进度卡片: 移动端 `bg-gray-50`，桌面端 `md:bg-white`
- 底部内边距: `pb-20` (移动) / `md:pb-16` (桌面)

---

### LibraryPage.tsx

**职责**: 文章库页面

**Props**:
```typescript
interface LibraryPageProps {
  onViewArticle: () => void;
}
```

**结构**:
1. Hero Section - 标题 + 按钮组（桌面） + 筛选标签
2. Recent Articles - 文章列表
3. Footer（桌面仅）

**数据结构**:
```typescript
{
  id: number;
  tag: string;        // 分类标签
  time: string;       // 阅读时长
  title: string;
  excerpt: string;    // 摘要
  author: string;
  date: string;
}
```

---

### BookmarksPage.tsx

**职责**: 书签管理页面

**Props**:
```typescript
interface BookmarksPageProps {
  onViewArticle: () => void;
}
```

**结构**:
1. Hero Section - 标题 + 统计
2. Bookmarks List - 书签列表
3. Footer（桌面仅）

**与 LibraryPage 的差异**:
- 显示"保存日期"而非"作者"
- 每项右侧有"Remove"按钮
- 无筛选标签

---

### ArticleDetailPage.tsx

**职责**: 文章阅读页面

**Props**:
```typescript
interface ArticleDetailPageProps {
  onBack: () => void;
}
```

**结构**:
1. Back Navigation - 返回按钮
2. Article Header - 面包屑（移动）+ 元数据 + 标题 + 作者
3. Progress Bar - 阅读进度条
4. Article Content - 正文内容
5. Article Actions（桌面仅）
6. Footer（桌面仅）

**特殊处理**:
- 进度条下边距: `pb-6` (移动) / `md:pb-8` (桌面)
- 文本宽度限制: `max-w-[335px]` (移动) / `md:max-w-none` (桌面)
- 无底部导航显示

---

## 开发指南

### 添加新页面

#### 1. 创建页面组件

```typescript
// src/components/reader/NewPage.tsx
interface NewPageProps {
  // 定义 props
}

export default function NewPage({ ...props }: NewPageProps) {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      {/* 页面内容 */}
      {/* 移动端底部内边距 */}
      <section className="px-5 pb-20 md:px-14 md:pb-16">
        {/* 内容 */}
      </section>
    </div>
  );
}
```

#### 2. 更新 ReaderApp.tsx

```typescript
// 1. 添加到 View 类型
type View = 'home' | 'library' | 'bookmarks' | 'new-page' | 'article-detail';

// 2. 导入组件
import NewPage from './reader/NewPage';

// 3. 添加路由渲染
{currentView === 'new-page' && <NewPage />}

// 4. 如需导航，在 Header.tsx 和 MobileBottomNav.tsx 添加导航项
```

#### 3. 添加导航

**Header.tsx**:
```typescript
const navItems = [
  // ...
  { id: 'new-page' as const, label: 'New Page', icon: Star },
];
```

**MobileBottomNav.tsx**:
```typescript
const navItems = [
  // ...
  { id: 'new-page' as Tab, icon: '⭐', label: 'New', lucideIcon: Star },
];
```

---

### 响应式组件开发模式

#### 模式 1: 移动卡片 / 桌面分隔线

```tsx
<article className="rounded-lg border border-gray-200 bg-gray-50 p-4
                    md:border-b md:rounded-none md:bg-transparent
                    md:px-0 md:py-8">
  {/* 内容 */}
</article>
```

#### 模式 2: 桌面隐藏 / 移动显示

```tsx
<div className="md:hidden">
  {/* 仅移动端显示 */}
</div>

<div className="hidden md:block">
  {/* 仅桌面端显示 */}
</div>
```

#### 模式 3: 宽度约束

```tsx
{/* 移动端限制宽度，桌面端全宽 */}
<p className="max-w-[335px] md:max-w-none">
  {/* 内容 */}
</p>

{/* 桌面端最大宽度 */}
<div className="md:max-w-2xl">
  {/* 内容 */}
</div>
```

#### 模式 4: 按钮内边距处理

```tsx
<article className="p-4 md:px-0">
  {/* 移动端：article 有 padding，button 负 margin 抵消 */}
  {/* 桌面端：article 无 padding，button 有 padding */}
  <button className="-mx-4 px-0 md:mx-0 md:px-4">
    {/* 内容 */}
  </button>
</article>
```

---

### 样式最佳实践

#### 1. 类名排序

按以下顺序组织 Tailwind 类名：

1. 布局: `flex`, `grid`, `block`
2. 定位: `relative`, `absolute`, `fixed`
3. 盒模型: `w-`, `h-`, `m-`, `p-`
4. 排版: `text-`, `font-`
5. 颜色: `bg-`, `text-`, `border-`
6. 响应式: `md:`, `lg:`
7. 状态: `hover:`, `focus:`

```tsx
❌ <div className="text-black flex bg-white hover:bg-gray-50 md:text-lg">
✅ <div className="flex bg-white text-black hover:bg-gray-50 md:text-lg">
```

#### 2. 使用变体权威工具

```typescript
import { cva, type VariantProps } from "class-variance-authority";

const buttonVariants = cva(
  "base-classes",
  {
    variants: {
      variant: {
        default: "bg-black text-white",
        outline: "border border-gray-200",
      },
    },
  }
);
```

#### 3. 类型安全的事件处理

```typescript
interface ButtonProps {
  onClick: () => void;  // ✅ 明确的函数签名
  // onClick: any;       // ❌ 避免使用 any
}
```

---

### 数据流模式

#### 父子通信

**父组件**:
```typescript
const [currentView, setCurrentView] = useState<View>('home');

const handleTabChange = (tab: Tab) => {
  setCurrentView(tab);
};

<Header activeTab={currentView} onTabChange={handleTabChange} />
```

**子组件**:
```typescript
interface HeaderProps {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
}

export default function Header({ activeTab, onTabChange }: HeaderProps) {
  return (
    <button onClick={() => onTabChange('home')}>
      Home
    </button>
  );
}
```

#### 跨层级通信

对于深层嵌套组件，考虑使用 Context 或状态管理库（目前项目状态简单，无需引入）。

---

## 常见任务

### 修改主题颜色

编辑 `src/styles/global.css`:

```css
:root {
  --color-black: #YOUR_COLOR;
  /* 或修改 Shadcn UI 变量 */
  --primary: oklch(YOUR_VALUES);
}
```

### 调整移动端底部导航高度

编辑 `src/components/reader/MobileBottomNav.tsx`:

```typescript
<div className="flex h-[YOUR_HEIGHT] items-center...">
```

相应调整页面底部内边距:

```typescript
<section className="... pb-[YOUR_HEIGHT + ADDITIONAL_PADDING]">
```

### 添加新的图标

1. 安装图标（如使用 Lucide）:
```bash
# Lucide React 已安装，直接使用
import { IconName } from 'lucide-react';
```

2. 使用 emoji:
```typescript
const icon = '🎨';  // 直接使用 Unicode emoji
```

### 调整断点

编辑 `tailwind.config.mjs`:

```javascript
export default {
  theme: {
    screens: {
      'md': '768px',  // 默认值
      // 添加自定义断点
      'tablet': '640px',
    },
  },
};
```

---

## 调试与测试

### 开发服务器

```bash
# 启动开发服务器（含 Convex）
bun dev

# 仅启动 Web 服务器
bun dev:web

# 预览生产构建
bun preview
```

### 类型检查

```bash
# Astro 类型检查
astro check

# TypeScript 类型检查
tsc --noEmit
```

### 构建生产版本

```bash
bun build
```

### 测试响应式设计

1. **Chrome DevTools**:
   - F12 → 切换设备工具栏
   - 测试常见设备尺寸（iPhone 14 Pro, iPad, Desktop）

2. **手动测试清单**:
   - [ ] iPhone SE (375px)
   - [ ] iPhone 14 Pro (393px)
   - [ ] iPad (768px) - 测试断点切换
   - [ ] Desktop (1920px)
   - [ ] 检查 safe-area 适配（有刘海的设备）

---

## 性能优化

### Astro 优化

- **岛屿架构**: 仅对需要交互的组件使用 React
- **部分水合**: 默认情况下，Astro 会最小化客户端 JavaScript

### React 优化

```typescript
// 使用 memo 避免不必要的重渲染
export default memo(function MyComponent({ prop }) {
  // ...
});

// 使用 useCallback 稳定函数引用
const handleClick = useCallback(() => {
  // ...
}, [dependency]);
```

### 样式优化

```css
/* 使用 CSS 变量实现主题切换 */
:root {
  --color-primary: oklch(0.208 0.042 265.755);
}

/* 而非 */
.my-class {
  color: #1a1a1a;
}
```

---

## 故障排除

### 问题: 样式不生效

**原因**: Tailwind CSS 4 使用新的编译方式

**解决**:
1. 确保使用了 `@import "tailwindcss"`
2. 检查类名拼写
3. 查看浏览器开发者工具中的实际类名

### 问题: 移动端内容被底部导航遮挡

**原因**: 缺少底部内边距

**解决**:
```typescript
<section className="px-5 py-4 pb-20 md:px-14 md:py-12 md:pb-16">
```

确保有 `pb-20` (80px) 或更大的值。

### 问题: 类型错误

**原因**: 类型定义不匹配

**解决**:
```typescript
// 确保使用导出的类型
import type { Tab, View } from '../ReaderApp';

// 或在组件内定义一致的类型
type Tab = 'home' | 'library' | 'bookmarks';
```

### 问题: Convex 连接失败

**原因**: Convex dev 服务未运行

**解决**:
```bash
# 启动 Convex 开发服务器
bun dev:convex

# 或使用完整命令（自动启动）
bun dev
```

---

## 未来扩展

### 可能的功能增强

1. **主题切换**: 实现暗色模式支持
2. **国际化**: 添加多语言支持
3. **离线支持**: 使用 Service Workers 实现 PWA
4. **状态管理**: 引入 Zustand 或 Jotai 管理复杂状态
5. **动画增强**: 添加页面过渡动画

### 性能优化方向

1. **图片优化**: 使用 Astro 的 Image 组件
2. **代码分割**: 按路由懒加载组件
3. **CDN 部署**: 部署到 Vercel/Netlify

---

## 资源链接

- [Astro 文档](https://docs.astro.build)
- [React 19 文档](https://react.dev)
- [Tailwind CSS 4 文档](https://tailwindcss.com/docs)
- [Radix UI Themes](https://www.radix-ui.com/themes)
- [Lucide Icons](https://lucide.dev)
- [Convex 文档](https://docs.convex.dev)

---

## 维护者

此文档由项目架构设计，随项目演进持续更新。

**最后更新**: 2026-01-27
