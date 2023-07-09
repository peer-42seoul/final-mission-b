import QuestionList from "@/components/QusetionList";

export default function Home() {
  const data = {
    content: [
      {
        questionId: 5,
        recommend: 0,
        view: 0,
        answerCount: 0,
        title: "this is test",
        content: "this is test",
        category: "MINISHELL",
        createAt: "2023-07-06T13:18:32.167038",
        nickname: "test123",
      },
      {
        questionId: 1,
        recommend: 0,
        view: 0,
        answerCount: 0,
        title: "Grand Theft Auto: San Andreas",
        content: "All we had to do, was follow the damn train, CJ!",
        category: "MINISHELL",
        createAt: "2023-07-06T00:48:01.132413",
        nickname: "Big Smoke",
      },
    ],
    pageable: {
      sort: {
        empty: false,
        sorted: true,
        unsorted: false,
      },
      offset: 0,
      pageNumber: 0,
      pageSize: 10,
      unpaged: false,
      paged: true,
    },
    last: true,
    totalPages: 1,
    totalElements: 2,
    size: 10,
    number: 0,
    sort: {
      empty: false,
      sorted: true,
      unsorted: false,
    },
    first: true,
    numberOfElements: 2,
    empty: false,
  };

  return (
    <div>
      <QuestionList items={data.content}/>
    </div>
  );
}
