export const imageToBase64 = (src, callback) => {
  let reader  = new FileReader();
  reader.readAsDataURL(src);
  reader.addEventListener('load', function () {
    callback(reader.result);
  }, false);
};
