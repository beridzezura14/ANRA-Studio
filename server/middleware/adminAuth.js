export const checkAdminPassword = (req, res, next) => {
  const { password } = req.body;

  if (!password) {
    return res.status(400).json({ message: "Password is required" });
  }

  if (password === process.env.ADMIN_PASSWORD) {
    // პაროლი სწორია → წინ წაწევა
    next();
  } else {
    res.status(401).json({ message: "Invalid admin password" });
  }
};
