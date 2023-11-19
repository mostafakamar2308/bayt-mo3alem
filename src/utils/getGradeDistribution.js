const getGradeDistribution = function (scores, totalScore) {
  const data = [
    { gradeRange: "0-15%", amount: 0 },
    { gradeRange: "16-30%", amount: 0 },
    { gradeRange: "31-45%", amount: 0 },
    { gradeRange: "46-60%", amount: 0 },
    { gradeRange: "61-75%", amount: 0 },
    { gradeRange: "76-85%", amount: 0 },
    { gradeRange: "86-100%", amount: 0 },
  ];
  scores.forEach((score) => {
    const scorePercentage = (score / totalScore) * 100;
    if (scorePercentage < 16) {
      data[0].amount++;
    } else if (scorePercentage < 31) {
      data[1].amount++;
    } else if (scorePercentage < 46) {
      data[2].amount++;
    } else if (scorePercentage < 61) {
      data[3].amount++;
    } else if (scorePercentage < 76) {
      data[4].amount++;
    } else if (scorePercentage < 86) {
      data[5].amount++;
    } else {
      data[6].amount++;
    }
  });
  return data;
};
export default getGradeDistribution;
