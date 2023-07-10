export interface Question {
  questionId: number;
  recommend: number;
  view: number;
  answerCount: number;
  title: string;
  content: string;
  category: string;
  createAt: string;
  nickname: string;
}

export interface Pageable {
  sort: {
    unsorted: boolean,
    sorted: boolean,
    empty: boolean
  },
  pageSize: number,
  pageNumber: number,
  offset: number,
  paged: boolean,
  unpaged: boolean
}

export interface Result {
  content: Question[],
  pageable: Pageable,
  totalPages: number,
  totalElements: number,
  last: boolean,
  numberOfElements: number,
  size: number,
  number: number,
  first: boolean,
  sort: {
    unsorted: boolean,
    sorted: boolean,
    empty: boolean
  },
  empty: boolean
}