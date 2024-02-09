const confirmEmailControll = async (req, res) => {
    const { token } = req.params;
  
    const user = await User.findOne({ where: { confirmationToken: token } });
  
    if (!user) {
      return res
        .status(404)
        .json({ message: "Token de confirmación no válido." });
    }
  
    user.isVerify = true; 
  
    try {
      await user.save();
      return res
        .status(200)
        .json({ success: true, message: "Usuario registrado con éxito" });
    } catch (error) {
      console.error(error);
    }
  };