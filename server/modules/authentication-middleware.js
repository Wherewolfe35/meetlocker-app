const rejectUnauthenticated = (req, res, next) => {
  // check if logged in
  if (req.isAuthenticated()) {
    // They were authenticated! User may do the next thing
    // Note! They may not be Authorized to do all things
    next();
  } else {
    // failure best handled on the server. do redirect here.
    res.sendStatus(403);
  }
};

const rejectUnapproved  = (req, res, next) => {
  //check if user has been approved
  if (req.user.is_approved){
    next();
  } else {
    res.sendStatus(423);
  }
}

module.exports = { rejectUnauthenticated, rejectUnapproved };
