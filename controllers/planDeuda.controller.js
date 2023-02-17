const { ReasonPhrases, StatusCodes } = require("http-status-codes");
const PlanDeuda = require("../models/planDeuda.model");

const createPlanDeuda = async (req, res, next) => {
    let { user, emisor, saldoActual, tasaActual, plazoActual, descripcion, ponderado_tasa, ponderado_plazo } = req.body;

    const createdPlanDeuda = new PlanDeuda({
      user, emisor, saldoActual, tasaActual, plazoActual, descripcion, ponderado_tasa, ponderado_plazo
    });
    try {
      createdPlanDeuda.save();
    } catch (error) {
      return next(new HttpError("Signing up failed, please try again", 500));
    }
    res.status(StatusCodes.CREATED).json({
      message: ReasonPhrases.CREATED,
      data: createdPlanDeuda.toObject({ getters: true }),
    });
  };
  
 
  const getPlanDeudasFromUser = async (req, res, next) => {
    try {

      const userId = req.params.id;

      const PlanDeudas = await PlanDeuda.find({ user: userId });
      if (!PlanDeudas) {
        return res.status(StatusCodes.NOT_FOUND).json({
          message: ReasonPhrases.NOT_FOUND,
          data: "No PlanDeudas for this user"
        });
      }
      if (PlanDeudas) {

        // user
        return res.status(StatusCodes.OK).json({
          message: ReasonPhrases.OK,
          data: {PlanDeudas}
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
  createPlanDeuda,
  getPlanDeudasFromUser,
/*     updateUserProfile,
    updateUserCasillaFeliz,
    deleteUser, */
    // resetPassword,
}