// Middleware used on each routes to try catch errors on controllers's methods
export default (controllerMethod) => {
  return async (req, res, next) => {
    try {
      await controllerMethod(req, res, next);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Unexpected server error. Please try again later." });
    }
  };
};