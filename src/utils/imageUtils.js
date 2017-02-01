export const imageToBase64 = (src, callback) => {
  let reader  = new FileReader();
  reader.readAsDataURL(src);

  reader.onloadend = () => {
    callback(reader.result);
  }
};
