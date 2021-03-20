module.exports.postCreate = (req, res, next) => {
    var errors = [];

    if (!req.body.name) {
      errors.push("Name is required"); // push an array into errors arrays
    }

    if (!req.body.phone) {
      errors.push("Phone is required");
    }

    if (!req.body.country) {
      errors.push("Country is required");
    }

    if (errors.length > 0) {
      res.render('users/create', {
        errors: errors, // put in one object errors to /create with the value of errors
        value: req.body 
      }) 
      return;
    }

    next(); // move to next middleware(function)
}