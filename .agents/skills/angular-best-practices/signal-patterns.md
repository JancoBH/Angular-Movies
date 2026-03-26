# Signal Patterns

## Layered Derivation Pattern

This pattern demonstrates building a dependency graph of computed signals where each layer derives from the previous.

```typescript
@Component({
  selector: 'app-cost-dashboard',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="stats-grid">
      @if (isLoading()) {
        <app-loading-spinner />
      } @else {
        <app-stat-card label="Total Cost" [value]="totalCost() | currency" />
        <app-stat-card label="Avg Cost/Request" [value]="averageCostPerRequest() | currency" />
        <app-stat-card label="Cache Savings" [value]="cacheSavingsPercentage() | percent" />
      }
    </div>
  `,
})
export class CostDashboardComponent {
  // Layer 1: Source signals
  readonly selectedPeriodType = signal<'current' | 'custom'>('current');
  readonly costSummary = resource({ /* ... */ });
  readonly customReportData = signal<CostData | null>(null);

  // Layer 2: Data source switching
  // Elegantly handles switching between data sources based on user selection
  readonly activeData = computed(() => {
    const periodType = this.selectedPeriodType();
    if (periodType === 'current') {
      return this.costSummary.value();
    } else {
      return this.customReportData();
    }
  });

  // Layer 3: Direct derivations from active data
  // Safe null handling with nullish coalescing
  readonly totalCost = computed(() => this.activeData()?.totalCost ?? 0);
  readonly totalRequests = computed(() => this.activeData()?.totalRequests ?? 0);
  readonly totalInputTokens = computed(() => this.activeData()?.totalInputTokens ?? 0);
  readonly totalOutputTokens = computed(() => this.activeData()?.totalOutputTokens ?? 0);
  readonly totalCacheSavings = computed(() => this.activeData()?.cacheSavings ?? 0);

  // Layer 4: Business logic computed from Layer 3
  // Calculations encapsulated in computed signals keep templates simple
  readonly averageCostPerRequest = computed(() => {
    const total = this.totalCost();
    const requests = this.totalRequests();
    return requests > 0 ? total / requests : 0;
  });

  readonly totalTokens = computed(() => this.totalInputTokens() + this.totalOutputTokens());

  readonly cacheSavingsPercentage = computed(() => {
    const savings = this.totalCacheSavings();
    const cost = this.totalCost();
    const totalWithoutSavings = cost + savings;
    return totalWithoutSavings > 0 ? (savings / totalWithoutSavings) * 100 : 0;
  });
}
```

### Why This Pattern Works

1. **Layered derivation** — Each layer builds on the previous, creating a clean dependency graph
2. **Data source switching** — `activeData` abstracts the source, keeping downstream signals agnostic
3. **Safe null handling** — Nullish coalescing (`?? 0`) provides sensible defaults
4. **Business logic isolation** — Calculations live in computed signals, not templates
5. **Automatic memoization** — Angular only recalculates when dependencies change

## Form State with Signals

```typescript
@Component({
  selector: 'app-user-form',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserFormComponent {
  private readonly fb = inject(FormBuilder);

  readonly form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    name: ['', Validators.required],
  });

  // Derive submission state
  readonly isSubmitting = signal(false);
  readonly submitError = signal<string | null>(null);

  readonly canSubmit = computed(() => 
    this.form.valid && !this.isSubmitting()
  );

  async onSubmit() {
    if (!this.canSubmit()) return;
    
    this.isSubmitting.set(true);
    this.submitError.set(null);
    
    try {
      await this.userService.save(this.form.getRawValue());
    } catch (e) {
      this.submitError.set(e instanceof Error ? e.message : 'Unknown error');
    } finally {
      this.isSubmitting.set(false);
    }
  }
}
```

## Parent-Child Communication

```typescript
// child.component.ts
@Component({
  selector: 'app-counter',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <button (click)="decrement()">-</button>
    <span>{{ value() }}</span>
    <button (click)="increment()">+</button>
  `,
})
export class CounterComponent {
  readonly value = input.required<number>();
  readonly valueChange = output<number>();

  increment() {
    this.valueChange.emit(this.value() + 1);
  }

  decrement() {
    this.valueChange.emit(this.value() - 1);
  }
}

// parent.component.ts
@Component({
  selector: 'app-parent',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CounterComponent],
  template: `
    <app-counter [value]="count()" (valueChange)="count.set($event)" />
    <p>Double: {{ doubled() }}</p>
  `,
})
export class ParentComponent {
  readonly count = signal(0);
  readonly doubled = computed(() => this.count() * 2);
}
```

## List with Derived Selection State

```typescript
@Component({
  selector: 'app-item-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ItemListComponent {
  readonly items = input.required<Item[]>();
  readonly selectedIds = signal<Set<string>>(new Set());

  readonly selectedItems = computed(() => 
    this.items().filter(item => this.selectedIds().has(item.id))
  );

  readonly allSelected = computed(() => 
    this.items().length > 0 && this.selectedIds().size === this.items().length
  );

  readonly someSelected = computed(() => 
    this.selectedIds().size > 0 && !this.allSelected()
  );

  toggleItem(id: string) {
    this.selectedIds.update(ids => {
      const next = new Set(ids);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }

  toggleAll() {
    if (this.allSelected()) {
      this.selectedIds.set(new Set());
    } else {
      this.selectedIds.set(new Set(this.items().map(i => i.id)));
    }
  }
}
```
