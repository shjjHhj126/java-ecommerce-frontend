const generateProperties = (propertyList) => {
  let propertiesMap = new Map(); //maintain order by insertion order!

  propertyList.forEach((item) => {
    const { name, value, url } = item;

    if (!propertiesMap.has(name)) {
      propertiesMap.set(name, []);
    }

    propertiesMap.get(name).push({ value, url });
  });

  return propertiesMap;
};

export default generateProperties;
