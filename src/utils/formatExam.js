const formatExam = (serializedExam) => {
  const formattedQuestions = serializedExam.Questions.map((question) => {
    if (question.questionType !== "segment") {
      const newAnswers = question.questionContent.answers.map((answer) => {
        answer.correct = null;
        answer.stats = null;
        return answer;
      });
      return {
        ...question,
        questionContent: {
          ...question.questionContent,
          answers: newAnswers,
          explaination: "",
        },
      };
    } else {
      const newSegment = question.questionContent.questions.map((question) => {
        const newAnswers = question.answers.map((answer) => {
          answer.correct = null;
          answer.stats = null;
          return answer;
        });
        return { ...question, answers: newAnswers, stats: null };
      });
      return {
        ...question,
        questionContent: { ...question.questionContent, questions: newSegment },
      };
    }
  });
  return formattedQuestions;
};

export default formatExam;
