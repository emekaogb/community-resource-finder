export async function requireAuth(req, res, next) {
  try {
    const session = await req.auth.getSession();

    if (!session) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    req.user = session.user;
    next();
  } catch (err) {
    res.status(500).json({ error: "Auth error" });
  }
}