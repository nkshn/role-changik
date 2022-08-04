/**
 * foramting express-validator errors array
 *
 * @param {array} errorsArray - it's express-validator errors array
 * @returns array of pbjects { "param", "msg", "type" }
 */
function formatingErrorsArray(errorsArray) {
  const formatedArray = errorsArray.map((item) => {
    return item.msg.msg;
  });

  return formatedArray;
}

module.exports = {
  formatingErrorsArray,
};
