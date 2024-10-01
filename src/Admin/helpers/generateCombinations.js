const generateCombinations = (properties) => {
  const values = properties.map((property) =>
    property.values.map((v) => v.value)
  );

  const combine = (acc, values) => {
    if (!values.length) return acc;
    const [first, ...rest] = values;
    const newAcc = [];
    acc.forEach((comb) => {
      first.forEach((value) => {
        newAcc.push([...comb, value]);
      });
    });
    return combine(newAcc, rest);
  };

  return combine([[]], values);
};

export default generateCombinations;
