export class PageModel<T> {
    constructor(
      public size: number = 5,
      public number: number = 0,
      public content: T[] = [],
      public totalPages: number = 0,
      public last: boolean = null,
      public totalElements: number = 0,
      public sort: SortPageModel = new SortPageModel(),
      public numberOfElements: number = 0,
      public first: boolean = null,
      public empty: boolean = null
    ) {}
  }
  
  export class SortPageModel {
    constructor(public sorted: boolean = null, public unsorted: boolean = null, public empty: boolean = null) {}
  }