const Utils = {
  /**
   * --------------------------------------------------
   * Checks if the given field is empty or not.
   * --------------------------------------------------
   * @return boolean
   * --------------------------------------------------
   */
  isEmpty(value) {
    switch (typeof value) {
    case 'object':
      if (value === null) {
        return true;
      } if (Array.isArray(value)) {
        return !value.length;
      }
      return !Object.keys(value).length;
    case 'number':
      return false;
    default:
      return value === null || value === undefined || value === '';
    }
  },
};

export default Utils;
