# IN ONE CUBIC FOOT - 网页交互式 PPT 项目

这是一个基于 **Next.js**、**Tailwind CSS** 和 **Framer Motion** 开发的高级交互式网页 PPT 项目。该 PPT 针对文章《IN ONE CUBIC FOOT》（一立方英尺的世界）设计，旨在为 B1-B2 难度的英语教学提供沉浸式的微观生态探索体验。

## 🌟 核心特性

- **微观镜头风格设计**：采用深色背景（#0a0a0c）与荧光绿（#32CD32）线框元素，模拟科学探索和微距摄影的视觉感。
- **AI 赋能视觉**：所有背景图片均由 **Flux.2 Klein (4B)** 模型生成，确保 16:9 原生比例及高质量视觉效果。
- **全交互逻辑**：
  - **分步展示 (Step-by-step)**：每张幻灯片内部支持多步动画揭示内容。
  - **超链接跳转**：支持页面间的逻辑链接（如 Warming-up 问题跳转至背景详情页）。
  - **隐藏页逻辑**：特定详情页在正常线性播放中隐藏，仅通过点击链接触发。
  - **动态主题色**：支持根据内容自动切换配色方案（Emerald, Amber, Blue, Rose 等）。
- **翻译笔优化**：文字排版遵循高对比度原则，适配 OCR 扫描设备。

## 🛠 技术栈

- **框架**: Next.js 15+ (App Router)
- **样式**: Tailwind CSS
- **动画**: Framer Motion
- **图标**: Lucide React
- **部署**: 静态导出 (Static Export)

## 📂 项目结构

```text
IN_ONE_CUBIC_FOOT/
├── src/app/
│   ├── page.tsx        # 核心逻辑 file：包含所有 PPT 数据、布局组件和交互逻辑
│   ├── layout.tsx      # 页面基础布局
│   └── globals.css     # 全局样式及动画定义
├── public/images/      # 存放由 Flux 生成的幻灯片背景图片 (slide1.png - slide24.png)
├── package.json        # 依赖管理
└── tsconfig.json       # TypeScript 配置
```

## 🚀 快速开始

### 1. 安装依赖
在项目根目录下执行：
```bash
npm install
```

### 2. 启动开发服务器
```bash
npm run dev
```
打开浏览器访问 [http://localhost:3000](http://localhost:3000) 查看。

### 3. 操作快捷键
- **下一页/下一步**：`Space` / `ArrowRight` / `ArrowDown` / `PageDown` / `鼠标点击页面任意处`
- **上一页/上一步**：`ArrowLeft` / `ArrowUp` / `PageUp` / `Backspace`

## 📝 幻灯片设计概览 (共 24 页)

1. **Part 1: Pre-reading (Slide 1-5)**
   - 封面、Warming-up 互动、背景知识（隐藏链接页）、内容预测。
2. **Part 2: While-reading (Slide 6-16)**
   - 8 个理解性 Q&A（含高亮词汇与定义）、3 个 Fun Fact 趣味科普页。
3. **Part 3: Post-reading (Slide 17-24)**
   - 词汇复习、选词填空练习、生活情景模拟、拓展讨论、总结页。

## ⚙️ 后期维护说明

### 如何添加新页面
1. 在 `public/images/` 放入新背景图。
2. 在 `src/app/page.tsx` 的 `slides` 数组中添加一个新对象。

### 如何修改超链接
- 在第 2 页的 `questions` 数组中设置 `link: index`（index 为 slides 数组的下标）。
- 在对应详情页设置 `returnTo: 1` 即可实现返回。

## 📦 导出与发布
如需生成静态 HTML 文件：
```bash
npm run build
```
静态文件将生成在 `out/` 文件夹中。
