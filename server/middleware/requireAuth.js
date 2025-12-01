import { requireAuth as clerkRequireAuth } from "@clerk/clerk-sdk-node";

const requireAuth = (req, res, next) => {
  try {
    return clerkRequireAuth()(req, res, next);
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
  }
};

export default requireAuth;
