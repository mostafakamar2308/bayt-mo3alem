const getGradeDistribution = function (scores, totalScore) {
  const data = [
    { gradeRange: "0-25%", amount: 0 },
    { gradeRange: "26-50%", amount: 0 },
    { gradeRange: "51-75%", amount: 0 },
    { gradeRange: "76-100%", amount: 0 },
  ];
  scores.forEach((score) => {
    const scorePercentage = (score / totalScore) * 100;
    if (scorePercentage < 26) {
      data[0].amount++;
    } else if (scorePercentage < 51) {
      data[1].amount++;
    } else if (scorePercentage < 76) {
      data[2].amount++;
    } else {
      data[3].amount++;
    }
  });
  return data;
};
export default getGradeDistribution;
