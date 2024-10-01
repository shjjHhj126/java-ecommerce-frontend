const propertiesHasImg = (properties) => {
  if (properties.length === 0) {
    return false;
  }

  return properties[0].values.every((valObj) => valObj.file != null);
};

export default propertiesHasImg;
