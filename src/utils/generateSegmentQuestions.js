function generateSegmentQuestions(segment, segmentQuestions) {
  const QUESTIONSPATTERN = /\d+[\-\)\.]/gi;
  const noNewLines = segmentQuestions.replace(/\n/g, " ");
  const questions = Array.from(noNewLines.matchAll(QUESTIONSPATTERN));
  console.log(questions);
  const formattedQuestion = questions.map((question, questionIndex) => {
    if (questionIndex < questions.length - 1) {
      return question.input.substring(
        question.index,
        questions[questionIndex + 1].index
      );
    } else {
      return question.input.substring(question.index);
    }
  });

  // check for dots with spaces after or newlines

  // Check for answers patterns
  // const ANSWERSPATTERN = /[\w\p{sc=Arabic}][\-\)\.]/giu;
  const ANSWERSPATTERN = /([\w\p{sc=Arabic}][\-\)\.]|[ⒶⒷⒸⒹⓐⓑⓒⓓ])/giu;
  const segmentQuestion = {
    questionType: "segment",
    questionContent: {
      segment: segment,
      questions: [],
    },
  };
  const finalQuestionArr = formattedQuestion.map((currentQuestion) => {
    const currentQuestionParts = Array.from(
      currentQuestion.matchAll(ANSWERSPATTERN)
    );
    const preFinalQuestionFormat = currentQuestionParts.filter((part) => {
      const prevChar = currentQuestion[part.index - 1];
      if (prevChar && prevChar.match(/(\d+)?\s/i)) {
        part.input = currentQuestion;
        return part;
      }
    });
    console.log(preFinalQuestionFormat);

    return preFinalQuestionFormat;
  });
  const finalQuestionArray = finalQuestionArr.map((question) => {
    console.log(question);
    const questionTempelate = {
      questionHead: question[0].input.substring(0, question[0].index - 1),
      answers: question.map((answ, index) => {
        if (question[index + 1]) {
          return {
            value: answ.input.substring(answ.index, question[index + 1].index),
            correct: null,
            stats: { choosen: 0 },
          };
        } else {
          return {
            value: answ.input.substring(answ.index),
            correct: null,
            stats: { choosen: 0 },
          };
        }
      }),
      stats: { correctNo: 0 },
    };
    return questionTempelate;
  });
  segmentQuestion.questionContent.questions = finalQuestionArray;
  console.log(segmentQuestion);
  return segmentQuestion;
}
export default generateSegmentQuestions;
