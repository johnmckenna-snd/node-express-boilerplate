function normalizeResponseHandleErrors () {
  return (req, res, next) => {
    const defaultSend = res.send;

    res.send = (data, errors) => {
      const newData = {
        context: req.context,
        data,
        errors: errors ? [...errors] : [],
      };

      // https://stackoverflow.com/questions/33732509/express-js-how-to-intercept-response-send-response-json
      res.send = defaultSend;
      return res.send(newData);
    };

    next();
  };
}

export default normalizeResponseHandleErrors;
