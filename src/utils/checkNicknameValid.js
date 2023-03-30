const checkNicknameValid = (docs, nickname) => {
  for (let doc of docs) {
    if (doc.displayName === nickname) {
      return false;
    }
  }
  return true;
};

export default checkNicknameValid;
