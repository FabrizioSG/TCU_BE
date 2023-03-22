const { ReasonPhrases, StatusCodes } = require("http-status-codes");
const Razones = require("../models/razones.model");

const createRazones = async (req, res, next) => {
    let { user, nombre, descripcion, calculo, observacion } = req.body;

    const createdRazones = new Razones({
        user, nombre, descripcion, calculo, observacion
    });
    try {
        createdRazones.save();
    } catch (error) {
        return next(new HttpError("Create razones failed", 500));
    }
    res.status(StatusCodes.CREATED).json({
        message: ReasonPhrases.CREATED,
        data: createdRazones.toObject({ getters: true }),
    });
};


const getRazonessFromUser = async (req, res, next) => {
    try {

        const userId = req.params.id;

        const Razoness = await Razones.find({ user: userId });
        if (!Razoness) {
            return res.status(StatusCodes.NOT_FOUND).json({
                message: ReasonPhrases.NOT_FOUND,
                data: "No Razoness for this user"
            });
        }
        if (Razoness) {

            // user
            return res.status(StatusCodes.OK).json({
                message: ReasonPhrases.OK,
                data: { Razoness }
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
    createRazones,
    getRazonessFromUser,
    /*     updateUserProfile,
        updateUserCasillaFeliz,
        deleteUser, */
    // resetPassword,
}