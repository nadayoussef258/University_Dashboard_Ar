# Angular v20 - الميزات الجديدة 🚀

## الإصدار الحالي في المشروع
- **Angular**: `^20.3.9` ✅

---

## الميزات الجديدة في Angular v20

### 1. **Signal Queries** (ViewChild, ContentChild, etc.)

بدلاً من استخدام decorators، يمكنك استخدام signal-based queries:

#### ❌ الطريقة القديمة:
```typescript
@ViewChild('myElement') element!: ElementRef;
@ContentChild(MyComponent) child!: MyComponent;
```

#### ✅ الطريقة الجديدة (v20):
```typescript
import { viewChild, contentChild } from '@angular/core';

// Signal-based queries
element = viewChild<ElementRef>('myElement');
child = contentChild(MyComponent);

// استخدامها في template
// element()?.nativeElement
```

**مثال عملي:**
```typescript
import { Component, viewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-example',
  template: `
    <div #myDiv>Content</div>
    <button (click)="scrollToTop()">Scroll</button>
  `
})
export class ExampleComponent {
  // ✅ Signal query
  myDiv = viewChild<ElementRef>('myDiv');

  scrollToTop() {
    this.myDiv()?.nativeElement.scrollIntoView();
  }
}
```

---

### 2. **input() و output() Functions**

بدلاً من `@Input()` و `@Output()` decorators:

#### ❌ الطريقة القديمة:
```typescript
@Input() title: string = '';
@Input({ required: true }) name!: string;
@Output() clicked = new EventEmitter<string>();
```

#### ✅ الطريقة الجديدة (v20):
```typescript
import { input, output } from '@angular/core';

// Inputs
title = input<string>(''); // optional with default
name = input.required<string>(); // required
age = input<number>(0);

// Outputs
clicked = output<string>();
```

**مثال عملي:**
```typescript
import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-card',
  template: `
    <div (click)="onClick()">
      <h3>{{ title() }}</h3>
      <p>{{ subtitle() }}</p>
    </div>
  `
})
export class CardComponent {
  // ✅ Signal inputs
  title = input.required<string>();
  subtitle = input<string>('No subtitle');
  
  // ✅ Signal output
  cardClicked = output<string>();

  onClick() {
    this.cardClicked.emit(this.title());
  }
}
```

---

### 3. **model() Function (Two-way Binding)**

لـ two-way binding مع signals:

#### ❌ الطريقة القديمة:
```typescript
@Input() value: string = '';
@Output() valueChange = new EventEmitter<string>();
```

#### ✅ الطريقة الجديدة (v20):
```typescript
import { model } from '@angular/core';

value = model<string>('');

// في template:
// <input [(ngModel)]="value" />
// أو
// <child [(value)]="value" />
```

**مثال عملي:**
```typescript
import { Component, model } from '@angular/core';

@Component({
  selector: 'app-counter',
  template: `
    <button (click)="increment()">+</button>
    <span>{{ count() }}</span>
    <button (click)="decrement()">-</button>
  `
})
export class CounterComponent {
  count = model<number>(0);

  increment() {
    this.count.update(v => v + 1);
  }

  decrement() {
    this.count.update(v => v - 1);
  }
}
```

---

### 4. **Zoneless Angular (Developer Preview)**

يمكنك تشغيل Angular بدون Zone.js:

```typescript
// main.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { provideExperimentalZonelessChangeDetection } from '@angular/core';

bootstrapApplication(AppComponent, {
  providers: [
    provideExperimentalZonelessChangeDetection(),
    // ... other providers
  ]
});
```

**ملاحظة:** هذه الميزة في Developer Preview - استخدمها بحذر!

---

### 5. **Signal-based Computed & Effects**

تحسينات على signals:

```typescript
import { signal, computed, effect } from '@angular/core';

// Signal
count = signal(0);

// Computed (يُحسب تلقائياً عند تغيير count)
doubleCount = computed(() => this.count() * 2);

// Effect (يعمل تلقائياً عند تغيير count)
countEffect = effect(() => {
  console.log('Count changed:', this.count());
});
```

---

## مثال شامل: Card Component مع Angular v20

```typescript
import { Component, input, output, viewChild, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-p-card',
  standalone: true,
  imports: [CommonModule, CardModule],
  template: `
    <p-card [styleClass]="cardClasses()">
      <ng-template #header>
        <div class="card-header">
          <h3>{{ title() }}</h3>
          <p *ngIf="subtitle()">{{ subtitle() }}</p>
        </div>
      </ng-template>

      <ng-content></ng-content>

      <ng-template #footer>
        <div *ngIf="showFooter()">
          <button (click)="onAction()">Action</button>
        </div>
      </ng-template>
    </p-card>
  `
})
export class PCardComponent {
  // ✅ Signal inputs
  title = input.required<string>();
  subtitle = input<string>('');
  showFooter = input<boolean>(false);
  hoverable = input<boolean>(true);
  shadow = input<'none' | 'sm' | 'md' | 'lg' | 'xl'>('md');
  
  // ✅ Signal output
  actionClicked = output<void>();
  
  // ✅ Computed property
  cardClasses = computed(() => {
    const classes = ['card-animated'];
    if (this.hoverable()) classes.push('hoverable');
    classes.push(`shadow-${this.shadow()}`);
    return classes.join(' ');
  });
  
  // ✅ ViewChild as signal
  header = viewChild('header');
  
  onAction() {
    this.actionClicked.emit();
  }
}
```

---

## Migration Guide: من v19 إلى v20

### 1. تحديث Inputs:
```typescript
// قبل
@Input() name: string = '';
@Input({ required: true }) title!: string;

// بعد
name = input<string>('');
title = input.required<string>();
```

### 2. تحديث Outputs:
```typescript
// قبل
@Output() clicked = new EventEmitter<string>();

// بعد
clicked = output<string>();
```

### 3. تحديث ViewChild:
```typescript
// قبل
@ViewChild('element') element!: ElementRef;

// بعد
element = viewChild<ElementRef>('element');
```

---

## الفوائد

✅ **Type Safety أفضل**: Signal inputs/outputs أكثر أماناً في النوع  
✅ **Performance**: Signals أسرع من decorators  
✅ **Reactivity**: تكامل أفضل مع signals  
✅ **Cleaner Code**: كود أنظف وأسهل في القراءة  
✅ **Future-proof**: جاهز للمستقبل (Zoneless Angular)

---

## ملاحظات مهمة

⚠️ **Backward Compatibility**: الطرق القديمة (`@Input`, `@Output`) لا تزال تعمل  
⚠️ **Gradual Migration**: يمكنك التحديث تدريجياً  
⚠️ **Zoneless**: في Developer Preview - استخدم بحذر في Production

---

## Resources

- [Angular v20 Release Notes](https://angular.dev/reference/releases)
- [Signal Queries Documentation](https://angular.dev/reference/api/core/viewChild)
- [input() API Documentation](https://angular.dev/reference/api/core/input)

