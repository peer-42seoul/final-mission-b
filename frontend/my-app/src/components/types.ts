export interface Question {
  questionId: number;
  title: string;
  answerCount: number;
  category: string;
  recommend: number;
  view: number;
  nickname: string;
  createAt: string;
  content: string;
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

export interface Data {
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