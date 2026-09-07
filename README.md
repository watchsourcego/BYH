# Astro Brand Starter

最小多品牌独立站模板：`brand.config.ts` + `docs/brand-brief.md` + Hero 示例。

## 快速开始

```bash
# 复制到新品牌目录（不要直接在 humpbuck-site 里跑）
cp -r templates/astro-brand-starter ../my-watch-brand
cd ../my-watch-brand

npm install
npm run dev
```

浏览器打开 `http://localhost:4321`。

## 首次定制（按顺序）

1. **`docs/brand-brief.md`** — 用自然语言写品牌气质、参考站、不要什么（给 Cursor 看）。
2. **`brand.config.ts`** — 把颜色、文案、Hero 图路径写成代码（站点实际读取这里）。
3. **`public/hero/main.webp`** — 放一张 Hero 图（或改 `brand.config.ts` 里的 `hero.image` 路径）。

## 两个配置文件怎么分工

| 文件 | 谁读 | 内容 |
|------|------|------|
| `docs/brand-brief.md` | 你 + AI | 气质、参考链接、禁忌、页面范围 |
| `brand.config.ts` | Astro 站点 | 色值、字体、文案、图片 URL |

定稿流程：先在 brief 里和 AI 对齐方向 → 再把结论同步进 `brand.config.ts`。

## 图片放 Pages 还是 R2

**默认（本模板）：** `assets.baseUrl: ""`，图片放 `public/`，随 Cloudflare Pages 部署。

适合：几百张 × 几十 KB 的 WebP，换图不频繁。

**改用 R2：** 只改一行：

```ts
assets: {
  baseUrl: "https://cdn.example.com/brand-alpha",
},
```

Hero 仍写 `hero.image: "/hero/main.webp"`，最终 URL 会自动拼成 CDN 地址。

## 部署到 Cloudflare Pages

1. GitHub 新建仓库，推入本模板内容。
2. Cloudflare Dashboard → Pages → Connect to Git。
3. Build command: `npm run build`
4. Build output directory: `dist`

## 给 Cursor 做 UI 时怎么说

```
@docs/brand-brief.md
参考我附的截图，按 brief 做产品列表页。颜色以 brand.config.ts 为准。
```

也可以单独 `@brand.config.ts` 避免色值不一致。

## 目录结构

```
brand.config.ts          # 品牌配置（代码读）
docs/brand-brief.md      # 品牌说明（人 / AI 读）
public/hero/             # 本地图片（Pages 部署）
src/
  components/Hero.astro
  layouts/BaseLayout.astro
  pages/index.astro
  styles/global.css
```
