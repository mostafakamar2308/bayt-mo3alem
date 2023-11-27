const generateMCQQuestionsFromText = (text) => {
  const QUESTIONSPATTERN = /\d+[\-\)\.]/gi;
  const noNewLines = text.replace(/\n/g, " ");
  const questions = Array.from(noNewLines.matchAll(QUESTIONSPATTERN));
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

  console.log(formattedQuestion);

  const ANSWERSPATTERN = /[\w\p{sc=Arabic}][\-\)\.]/giu;
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

    return preFinalQuestionFormat;
  });

  const finalQuestionArray = finalQuestionArr.map((question) => {
    console.log(question);
    const questionTempelate = {
      questionType: "general",
      questionContent: {
        questionHead: question[0].input.substring(0, question[0].index - 1),
        answers: question.map((answ, index) => {
          if (question[index + 1]) {
            return {
              value: answ.input.substring(
                answ.index,
                question[index + 1].index
              ),
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
        explaination: "",
        stats: { correctNo: 0 },
      },
    };
    return questionTempelate;
  });
  console.log(finalQuestionArray);
  return finalQuestionArray;
};
export default generateMCQQuestionsFromText;

/*
  const DOTSPATTERN = /\.[\s{2,}\n]/gi;
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
      questionType: "general",
      questionContent: {
        questionHead: "",
        answers: [],
        explaination: "",
        stats: { correctNo: 0 },
      },
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

    question.questionContent.answers = answersIndex.map((answer, index) => {
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

    question.questionContent.questionHead = currQuestion.substring(
      3,
      answersIndex[0].index
    );
    console.log(question);
    finalQuestionArr.push(question);
  }

*/
