const getPrdVarProperties = (prdVar, properties) => {
  let prdProperties = []; //name, value, url
  for (let i = 0; i < properties.length; ++i) {
    const name = properties[i].name;
    const value = prdVar.combination[i];
    const keyVal = {
      name,
      value,
    };

    if (i == 0) {
      const valObj = properties[0].values.find(
        (valObj) => valObj.value === value
      );
      if (valObj && valObj.value === value) {
        keyVal.url = valObj.url;
      }
    }
    prdProperties.push(keyVal);
  }
  return prdProperties;
};

export default getPrdVarProperties;
