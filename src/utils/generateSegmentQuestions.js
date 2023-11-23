function generateSegmentQuestions(segment, segmentQuestions) {
  const QUESTIONSPATTERN = /\d[\-\)\.]?/gi;
  const noNewLines = segmentQuestions.replace(/\n/g, " ");
  const questions = Array.from(noNewLines.matchAll(QUESTIONSPATTERN));
  console.log(questions);
  const formattedQuestion = questions.map((question, questionIndex) => {
    if (questionIndex < questions.length - 1) {
      console.log({
        currentQuestionIndex: question.index,
        nexQuestionIndex: questions[questionIndex + 1].index,
      });
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
  const ANSWERSPATTERN = /[\w\p{sc=Arabic}][\-\)\.]/giu;
  const DOTSPATTERN = /\.[\s{2,}\n]/gi;
  console.log(formattedQuestion);
  const finalQuestionArr = [];
  const segmentQuestion = {
    questionType: "segment",
    questionContent: {
      segment: segment,
      questions: [],
    },
  };
  for (let i = 0; i < formattedQuestion.length; i++) {
    //added spaces at the end of the text to avoid problems with end of sentence dot recogintion
    const currQuestion = `${formattedQuestion[i]}    `;
    const dotsPlaces = Array.from(currQuestion.matchAll(DOTSPATTERN));

    const questionWithAnswer = Array.from(
      currQuestion.matchAll(ANSWERSPATTERN)
    );
    console.log({ dotsPlaces, questionWithAnswer });
    // console.log({ questionWithAnswer, dotsPlaces });
    const question = {
      questionHead: "",
      answers: [],
      stats: { correctNo: 0 },
    };
    const realQuestions = questionWithAnswer.filter((character) => {
      const isDot = dotsPlaces.find(
        (d) => d.index - 1 == character.index && character.index != 0
      );
      if (!isDot) {
        return character;
      }
    });
    // console.log({ realQuestions });
    const answersIndex = realQuestions.splice(-4);
    const questionHead = realQuestions;
    console.log({ questionHead, answersIndex });

    question.answers = answersIndex.map((answer, index) => {
      if (index == 3) {
        return {
          value: currQuestion.substring(answer.index),
          correct: null,
          stats: { choosen: 0 },
        };
      } else {
        return {
          value: currQuestion.substring(
            answer.index,
            answersIndex[index + 1].index
          ),
          correct: null,
          stats: { choosen: 0 },
        };
      }
    });

    question.questionHead = currQuestion.substring(3, answersIndex[0].index);
    console.log(question);
    finalQuestionArr.push(question);
  }
  segmentQuestion.questionContent.questions = finalQuestionArr;
  return segmentQuestion;
}
export default generateSegmentQuestions;
