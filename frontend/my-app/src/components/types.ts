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

export interface MainData {
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

export interface Answer {
  nickname: string,
  content: string,
  createdAt: string,
  updatedAt: string,
  type: string,
  recommend: number,
  questionId: number,
  answerId: number,
  adopted: boolean
}

export interface DetailData {
  nickname: string,
  content: string,
  createdAt: string,
  updatedAt: string | null,
  answerList: Answer[],
  type: string,
  title: string,
  category: string,
  recommend: number,
  view: number
}