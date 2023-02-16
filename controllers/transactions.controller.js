const { ReasonPhrases, StatusCodes } = require("http-status-codes");
const Transaction = require("../models/transactions.model");

const createTransaction = async (req, res, next) => {
    let { user, description, tab, amount, category } = req.body;
    if (!description){
      description = "Salario Neto"
    }
    console.log(category);
    if(category === "Salario Neto" || category === "Otros ingresos"){
        category = "Ingresos Netos"
    }
    const createdTransaction = new Transaction({
      user, description, tab, amount, category
    });
    try {
      createdTransaction.save();
    } catch (error) {
      return next(new HttpError("Signing up failed, please try again", 500));
    }
    res.status(StatusCodes.CREATED).json({
      message: ReasonPhrases.CREATED,
      data: createdTransaction.toObject({ getters: true }),
    });
  };
  
 
  const getTransactionsFromUser = async (req, res, next) => {
    try {

      const userId = req.params.id;

      
      const transactions = await Transaction.find({ user: userId });
      if (!transactions) {
        return res.status(StatusCodes.NOT_FOUND).json({
          message: ReasonPhrases.NOT_FOUND,
          data: "No transactions for this user"
        });
      }
      if (transactions) {

        // user
        return res.status(StatusCodes.OK).json({
          message: ReasonPhrases.OK,
          data: {transactions}
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const deleteUser = async (req, res, next) => {
    const userId = req.user.user._id;
    let user;
    try {
      user = await User.findById(userId).exec();
    } catch (err) {
      return next(new HttpError("not found", 400));
    }
    if (user) {
      await user.remove();
      res.status(StatusCodes.OK).json({
        message: ReasonPhrases.OK,
        data: "Deleted!!",
      });
    } else {
      res.status(StatusCodes.NOT_FOUND).json({
        message: ReasonPhrases.NOT_FOUND,
      });
    }
  };

module.exports = {
  createTransaction,
  getTransactionsFromUser,
/*     updateUserProfile,
    updateUserCasillaFeliz,
    deleteUser, */
    // resetPassword,
}