# @axflow/design-tokens

axflow 브랜드 디자인 시스템 토큰 패키지입니다.

## 설치

```bash
npm install @axflow/design-tokens
```

## 사용법

### CSS Variables

```css
@import '@axflow/design-tokens/css/variables.css';

.my-element {
  color: var(--color-n900);
  font-size: var(--font-h700-48px-size);
}
```

### CSS Utility Classes

```css
@import '@axflow/design-tokens/css/classes.css';
```

```html
<h1 class="text-h700-48px color-n900">Heading</h1>
<div class="bg-n50">Background</div>
```

### JavaScript / TypeScript

```ts
import { colors, typography, icons } from '@axflow/design-tokens';

// Colors
console.log(colors.n900); // "#1D1D1F"
console.log(colors.e600); // "#E64848"

// Typography
console.log(typography['h700-48px'].fontSize); // "48px"
console.log(typography['b400-16px'].fontWeight); // "400"

// Icons
console.log(icons.home.variants); // ["line", "fill"]
console.log(icons.bell.size); // "24px"
```

### Tailwind CSS Preset

```js
// tailwind.config.js
module.exports = {
  presets: [require('@axflow/design-tokens/dist/tailwind-preset')],
};
```

```html
<div class="text-n900 bg-n50">Tailwind with axflow tokens</div>
```

## 포함된 토큰

- **Colors**: 14개 (Neutral 12 + Error 2)
- **Typography**: 23개 (Headline, Title, Label, Body)
- **Icons**: 117개 (General, Action, File, Data, User, Social)
