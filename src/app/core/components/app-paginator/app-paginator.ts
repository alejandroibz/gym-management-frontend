import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

export interface AppPageEvent {
  pageNumber: number;
  pageSize: number;
}

type PageItem = number | 'ellipsis';

@Component({
  selector: 'app-paginator',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app-paginator.html',
  styleUrl: './app-paginator.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppPaginatorComponent {
  @Input({ required: true }) length = 0;
  @Input({ required: true }) pageNumber = 1;
  @Input({ required: true }) pageSize = 10;
  @Input() pageSizeOptions: number[] = [5, 10, 15, 20, 40];

  @Output() pageChange = new EventEmitter<AppPageEvent>();

  get totalPages(): number {
    return Math.max(1, Math.ceil(this.length / Math.max(1, this.pageSize)));
  }

  get rangeLabel(): string {
    if (this.length === 0) {
      return 'Sin resultados';
    }

    const start = (this.currentPage - 1) * this.pageSize + 1;
    const end = Math.min(start + this.pageSize - 1, this.length);

    return `${start}-${end} de ${this.length}`;
  }

  get currentPage(): number {
    return Math.min(Math.max(1, this.pageNumber), this.totalPages);
  }

  get pages(): PageItem[] {
    const totalPages = this.totalPages;
    const currentPage = this.currentPage;
    const visiblePages = new Set<number>([1, totalPages]);

    for (let page = currentPage - 2; page <= currentPage + 2; page += 1) {
      if (page >= 1 && page <= totalPages) {
        visiblePages.add(page);
      }
    }

    const orderedPages = Array.from(visiblePages).sort((left, right) => left - right);
    const items: PageItem[] = [];

    orderedPages.forEach((page, index) => {
      const previousPage = orderedPages[index - 1];
      if (previousPage && page - previousPage > 1) {
        items.push('ellipsis');
      }
      items.push(page);
    });

    return items;
  }

  goToPage(page: number): void {
    const nextPage = Math.min(Math.max(1, page), this.totalPages);
    if (nextPage === this.currentPage) {
      return;
    }

    this.pageChange.emit({ pageNumber: nextPage, pageSize: this.pageSize });
  }

  updatePageSize(value: string): void {
    const nextPageSize = Number(value);
    if (!Number.isFinite(nextPageSize) || nextPageSize <= 0 || nextPageSize === this.pageSize) {
      return;
    }

    this.pageChange.emit({ pageNumber: 1, pageSize: nextPageSize });
  }
}
