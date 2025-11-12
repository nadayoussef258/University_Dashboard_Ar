# Tailwind CSS v4 - الميزات الجديدة 🎨

## الإصدار الحالي في المشروع
- **Tailwind CSS**: `^4.1.16` ✅
- **@tailwindcss/postcss**: `^4.1.16` ✅

---

## الميزات الجديدة في Tailwind v4

### 1. **@theme Directive** - تخصيص Theme جديد

بدلاً من `tailwind.config.js`، يمكنك استخدام `@theme` في CSS:

#### ❌ الطريقة القديمة (v3):
```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: '#1f2a44',
      },
      breakpoints: {
        sm: '640px',
      }
    }
  }
}
```

#### ✅ الطريقة الجديدة (v4):
```css
@theme {
  --color-primary: #1f2a44;
  --color-accent: #ffd700;
  
  --breakpoint-sm: 640px;
  --breakpoint-md: 850px;
  --breakpoint-lg: 1024px;
  
  --font-rubic: Rubik, serif;
  --font-lato: "Lato", sans-serif;
}
```

**مثال من مشروعك:**
```css
@theme {
  --breakpoint-*: initial;
  --breakpoint-sm: 640px;
  --breakpoint-md: 850px;
  --breakpoint-lg: 1024px;
  --breakpoint-xl: 1280px;
  --breakpoint-2xl: 1536px;

  --font-rubic: Rubik, serif;
  --font-lato: "Lato", sans-serif;
}
```

---

### 2. **@utility Directive** - إنشاء Utilities مخصصة

يمكنك إنشاء utilities مخصصة مباشرة في CSS:

#### ❌ الطريقة القديمة:
```js
// tailwind.config.js
module.exports = {
  plugins: [
    function({ addUtilities }) {
      addUtilities({
        '.form-col': {
          '@apply col-span-12 lg:col-span-6': {},
        }
      })
    }
  ]
}
```

#### ✅ الطريقة الجديدة (v4):
```css
@utility form-col {
  @apply col-span-12 lg:col-span-6;
}

@utility card-hover {
  @apply transition-all duration-300;
  @apply hover:scale-105 hover:shadow-lg;
}
```

**مثال من مشروعك:**
```css
@layer utilities {
  .form-col {
    @apply col-span-12 lg:col-span-6;
  }
}
```

---

### 3. **@source Directive** - تحديد الملفات للمسح

يحدد Tailwind أي الملفات يجب مسحها للـ classes:

```css
@source './**/*.{html,ts,scss,css}';
```

**مثال من مشروعك:**
```css
@source './**/*.{html,ts,scss,css}';
```

---

### 4. **@custom-variant** - Custom Variants

إنشاء variants مخصصة:

#### ❌ الطريقة القديمة:
```js
// tailwind.config.js
module.exports = {
  plugins: [
    function({ addVariant }) {
      addVariant('dark', '.dark &')
    }
  ]
}
```

#### ✅ الطريقة الجديدة (v4):
```css
@custom-variant dark (&:where([class="app-dark"], [class="app-dark"] *));
```

**مثال من مشروعك:**
```css
@custom-variant dark (&:where([class="app-dark"], [class="app-dark"] *));
```

---

### 5. **CSS Variables في @theme**

يمكنك استخدام CSS variables مباشرة:

```css
@theme {
  --color-primary-500: #1f2a44;
  --color-primary-600: #2c3e50;
  --spacing-sm: 0.5rem;
  --spacing-md: 1rem;
  --radius-lg: 12px;
}

/* استخدامها */
.card {
  background-color: var(--color-primary-500);
  padding: var(--spacing-md);
  border-radius: var(--radius-lg);
}
```

**مثال من مشروعك:**
```css
:root {
  --primary-color: #1f2a44;
  --accent-gold: #ffd700;
  --spacing-sm: 0.5rem;
  --spacing-md: 1rem;
  --radius-lg: 12px;
}
```

---

### 6. **@import "tailwindcss"** - Import مباشر

لا حاجة لـ `@tailwind` directives:

#### ❌ الطريقة القديمة:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

#### ✅ الطريقة الجديدة (v4):
```css
@import "tailwindcss";
```

**مثال من مشروعك:**
```css
@import "tailwindcss";
@import "tailwindcss-primeui";
```

---

### 7. **Wildcard Values في @theme**

استخدام wildcards للقيم:

```css
@theme {
  --breakpoint-*: initial;
  --breakpoint-sm: 640px;
  --breakpoint-md: 850px;
}
```

**مثال من مشروعك:**
```css
@theme {
  --breakpoint-*: initial;
  --breakpoint-sm: 640px;
  --breakpoint-md: 850px;
  --breakpoint-lg: 1024px;
  --breakpoint-xl: 1280px;
  --breakpoint-2xl: 1536px;
}
```

---

### 8. **@layer مع @apply محسّن**

تحسينات على `@layer` و `@apply`:

```css
@layer utilities {
  .form-col {
    @apply col-span-12 lg:col-span-6;
  }
}

@layer components {
  .container {
    margin-inline: auto;
    padding-inline: 2rem;
  }
}
```

---

### 9. **CSS-first Configuration**

كل شيء في CSS الآن - لا حاجة لـ JavaScript config:

```css
/* styles.css */
@import "tailwindcss";

@theme {
  /* Theme configuration */
}

@layer utilities {
  /* Custom utilities */
}

@layer components {
  /* Custom components */
}
```

---

### 10. **Improved Performance**

- **Faster builds**: بناء أسرع
- **Better tree-shaking**: إزالة أفضل للكود غير المستخدم
- **Smaller bundle size**: حجم أصغر للـ bundle

---

## Migration من v3 إلى v4

### الخطوة 1: تحديث package.json
```json
{
  "dependencies": {
    "tailwindcss": "^4.1.16",
    "@tailwindcss/postcss": "^4.1.16"
  }
}
```

### الخطوة 2: تحديث CSS
```css
/* قبل */
@tailwind base;
@tailwind components;
@tailwind utilities;

/* بعد */
@import "tailwindcss";
```

### الخطوة 3: نقل config إلى CSS
```css
/* tailwind.config.js → styles.css */
@theme {
  --color-primary: #1f2a44;
  --breakpoint-sm: 640px;
}
```

### الخطوة 4: تحديث utilities
```css
/* قبل: في config.js */
/* بعد: في CSS */
@layer utilities {
  .form-col {
    @apply col-span-12 lg:col-span-6;
  }
}
```

---

## أمثلة عملية

### مثال 1: Theme مخصص
```css
@import "tailwindcss";

@theme {
  /* Colors */
  --color-brand: #1f2a44;
  --color-accent: #ffd700;
  
  /* Spacing */
  --spacing-xs: 0.25rem;
  --spacing-sm: 0.5rem;
  --spacing-md: 1rem;
  --spacing-lg: 1.5rem;
  
  /* Border Radius */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  
  /* Breakpoints */
  --breakpoint-sm: 640px;
  --breakpoint-md: 850px;
  --breakpoint-lg: 1024px;
}

/* استخدامها */
.card {
  background-color: var(--color-brand);
  padding: var(--spacing-md);
  border-radius: var(--radius-lg);
}
```

### مثال 2: Custom Utilities
```css
@utility gradient-primary {
  background: linear-gradient(90deg, #1f2a44 0%, #2c3e50 100%);
}

@utility card-hover {
  @apply transition-all duration-300;
  @apply hover:scale-105 hover:shadow-xl;
  @apply hover:-translate-y-1;
}
```

### مثال 3: Custom Variants
```css
@custom-variant dark (&:where([class="app-dark"], [class="app-dark"] *));
@custom-variant rtl (&:where([dir="rtl"], [dir="rtl"] *));

/* استخدامها */
.card {
  @apply bg-white dark:bg-gray-800;
  @apply rtl:text-right ltr:text-left;
}
```

### مثال 4: Components Layer
```css
@layer components {
  .btn-primary {
    @apply px-4 py-2 rounded-lg;
    @apply bg-primary-500 text-white;
    @apply hover:bg-primary-600;
    @apply transition-colors duration-200;
  }
  
  .card {
    @apply bg-white rounded-lg shadow-md;
    @apply p-6;
    @apply dark:bg-gray-800;
  }
}
```

---

## الفوائد الرئيسية

✅ **CSS-first**: كل شيء في CSS - لا حاجة لـ JavaScript config  
✅ **أسرع**: بناء أسرع وأداء أفضل  
✅ **أبسط**: syntax أبسط وأسهل في الفهم  
✅ **أكثر مرونة**: تخصيص أسهل وأقوى  
✅ **Type-safe**: دعم أفضل للـ TypeScript  
✅ **Smaller bundle**: حجم أصغر للـ bundle النهائي

---

## Resources

- [Tailwind CSS v4 Documentation](https://tailwindcss.com/docs)
- [Migration Guide](https://tailwindcss.com/docs/upgrade-guide)
- [@theme Directive](https://tailwindcss.com/docs/theme)
- [@utility Directive](https://tailwindcss.com/docs/utility)

---

## ملاحظات مهمة

⚠️ **Breaking Changes**: بعض التغييرات قد تحتاج تحديث  
⚠️ **Config File**: `tailwind.config.js` اختياري الآن  
⚠️ **PostCSS**: تأكد من استخدام `@tailwindcss/postcss`  
⚠️ **Backward Compatibility**: معظم الكود القديم يعمل

