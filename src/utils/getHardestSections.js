const getHardestSections = function (questions, students) {
  const hardestSections = {
    vocabulary: 0,
    expression: 0,
    segment: 0,
    grammer: 0,
    translation: 0,
  };

  for (let i = 0; i < questions.length; i++) {
    if (questions[i].questionType === "segment") {
      for (let j = 0; j < questions[i].questionContent.questions.length; j++) {
        console.log(
          students - questions[i].questionContent.questions[j].stats.correctNo
        );
        hardestSections.segment +=
          students - questions[i].questionContent.questions[j].stats.correctNo;
      }
    } else {
      hardestSections[questions[i].questionType] +=
        students - questions[i].questionContent.stats.correctNo;
    }
  }
  return Object.entries(hardestSections).map((item) => ({
    section: item[0],
    amount: item[1],
  }));
};

export default getHardestSections;
