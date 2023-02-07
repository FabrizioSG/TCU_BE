const bcrypt = require("bcryptjs");
const { ReasonPhrases, StatusCodes } = require("http-status-codes");
const User = require("../models/user.model");
const jwt = require("jsonwebtoken");

const signUp = async (req, res, next) => {
    let { name, first_last_name, second_last_name, email, password, gender, birthday } = req.body;
  
    let existingUser;
  
    try {
      existingUser = await User.findOne({ email: email });
    } catch (err) {
      return next(new HttpError(err, 500));
    }
  
    if (existingUser) {
      res.status(StatusCodes.CONFLICT).json({
        message: 'El correo ingresado ha sido registrado previamente.',
      });
    }
    password = await bcrypt.hash(password, 10);
  
    const createdUser = new User({
      name, first_last_name, second_last_name, email, password, gender, birthday
    });
    try {
      createdUser.save();
    } catch (error) {
      return next(new HttpError("Signing up failed, please try again", 500));
    }
    res.status(StatusCodes.CREATED).json({
      message: ReasonPhrases.CREATED,
      data: createdUser.toObject({ getters: true }),
    });
  };
  
  const login = async (req, res, next) => {
    try {
      // Get user input
      const { email, password } = req.body;
      // Validate user input
      if (!(email && password)) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          message: ReasonPhrases.BAD_REQUEST,
          data: "Missing username or password"
        });
      }
      // Validate if user exist in our database
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(StatusCodes.NOT_FOUND).json({
          message: ReasonPhrases.NOT_FOUND,
          data: "User does not exist in database"
        });
      }
  
      if (user && (await bcrypt.compare(password, user.password))) {
        // Create token
        const token = jwt.sign(
          { user },
          "my_secret_key",
          {
            expiresIn: "2h",
          }
        );
  
        res.cookie('token', token, { httpOnly: true });
  
        // user
        return res.status(StatusCodes.OK).json({
          message: ReasonPhrases.OK,
          data: { token: token, expiresIn: "2 hours" }
        });
      }
      return res.status(StatusCodes.UNAUTHORIZED).json({
        message: ReasonPhrases.UNAUTHORIZED,
        data: "Wrong username or password"
      });
    } catch (err) {
      console.log(err);
    }
  };
  const getUsers = async (req, res, next) => {
    try {

      const { email } = req.body;

      // Validate if user exist in our database
      const users = await User.find().sort({ date: -1 });
      if (!users) {
        return res.status(StatusCodes.NOT_FOUND).json({
          message: ReasonPhrases.NOT_FOUND,
          data: "No users in DB"
        });
      }
  
      if (users) {

        // user
        return res.status(StatusCodes.OK).json({
          message: ReasonPhrases.OK,
          data: {users}
        });
      }
    } catch (err) {
      console.log(err);
    }
  };
  const updateUser = async (req, res, next) => {
  
    const userId = req.params.id;

    let { name, first_last_name, second_last_name, cedula, email, birthday,  gender, 
      rol, estado_civil, nacionalidad, condicion_laboral, grado_academico, familia, patrimonio, 
      casilla_feliz, objetivos, plan_deuda, salud} = req.body;
    let user;
    let token;
    try {
      user = await User.findByIdAndUpdate(
        userId,
        { name, first_last_name, second_last_name, email, birthday, cedula, gender, 
          rol, estado_civil, nacionalidad, condicion_laboral, grado_academico, familia, patrimonio,
          casilla_feliz, objetivos, plan_deuda, salud},
        {
          new: true,
        }
      ).exec();
      token = jwt.sign(
        { user },
        "my_secret_key",
        {
          expiresIn: "2h",
        }
      );
      res.cookie('token', token, { httpOnly: true });
  
    } catch (err) {
      res.status(StatusCodes.NOT_FOUND).json({
        message: err,
      });
    }
    if (user) {
      res.status(StatusCodes.OK).json({
        message: ReasonPhrases.OK,
        data: { user: user.toObject({ getters: true }), token: token }
      });
    } else {
      res.status(StatusCodes.NOT_FOUND).json({
        message: ReasonPhrases.NOT_FOUND,
      });
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
  

 /*  const resetPassword = async (req, res, next) => {
    let user;
  
    let password = generator.generate({
      length: 10,
      numbers: true
    });
  
    try {
      user = await User.findOne({ email: req.body.email });
    } catch (err) {
      return next(new HttpError("not found", 400));
    }
  
    if (user) {
      await emailSender.sendEmail(user.email, password);
      password = await bcrypt.hash(password, 10);
      user.password = password;
      user.save();
      res.status(StatusCodes.OK).json({
        message: ReasonPhrases.OK,
        data: "Email sent to: " + user.email,
      });
    } else {
      res.status(StatusCodes.NOT_FOUND).json({
        message: ReasonPhrases.NOT_FOUND,
        data: "User not found"
      });
    }
  }; */

module.exports = {
    signUp,
    login,
    updateUser,
    deleteUser,
    // resetPassword,
    getUsers
}