const express =require("express");
require("dotenv").config();
const dbConnect=require("./config/dbConnect");
const authRoutes=require("./routes/authRoutes");
const userRoutes=require("./routes/userRoutes");

const app = express();
dbConnect();
//middleware
app.use(express.json());



app.get("/", (req, res) => {
    res.send("RBAC API is running...");
});



//routes
app.use("/api/auth",authRoutes);
app.use("/api/users",userRoutes);
//start the server
const PORT=process.env.PORT || 7002; //PROCESS IS USED TO GET THE VALUE FROM ENV FILE AND IF 7001 is not avilable the 7002 





app.get("/", (req, res) => {
  res.send(`
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>RBAC API Docs</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: 'Segoe UI', sans-serif; background: #0a0f1a; color: #e2e8f0; min-height: 100vh; padding: 40px 20px; }
    .container { max-width: 800px; margin: 0 auto; }
    .header { text-align: center; margin-bottom: 48px; }
    .badge { display: inline-block; background: rgba(74,222,128,0.15); border: 1px solid rgba(74,222,128,0.3); color: #4ade80; padding: 4px 14px; border-radius: 100px; font-size: 0.75rem; margin-bottom: 16px; }
    h1 { font-size: 2.5rem; font-weight: 700; color: #f1f5f9; margin-bottom: 8px; }
    h1 span { color: #f59e0b; }
    .subtitle { color: #64748b; font-size: 1rem; }
    .section { margin-bottom: 32px; }
    .section-title { font-size: 0.7rem; text-transform: uppercase; letter-spacing: 0.15em; color: #f59e0b; margin-bottom: 16px; }
    .endpoint { background: #111827; border: 1px solid #1e293b; border-radius: 10px; padding: 18px 22px; margin-bottom: 12px; display: flex; align-items: flex-start; gap: 16px; transition: border-color 0.2s; }
    .endpoint:hover { border-color: #334155; }
    .method { padding: 4px 10px; border-radius: 6px; font-size: 0.72rem; font-weight: 700; font-family: monospace; min-width: 52px; text-align: center; }
    .post { background: rgba(59,130,246,0.15); color: #60a5fa; border: 1px solid rgba(59,130,246,0.25); }
    .get  { background: rgba(74,222,128,0.12); color: #4ade80; border: 1px solid rgba(74,222,128,0.25); }
    .path { font-family: monospace; font-size: 0.92rem; color: #e2e8f0; margin-bottom: 4px; }
    .desc { font-size: 0.82rem; color: #64748b; }
    .auth-tag { font-size: 0.7rem; padding: 2px 8px; border-radius: 4px; margin-left: 8px; }
    .auth-required { background: rgba(245,158,11,0.1); color: #f59e0b; border: 1px solid rgba(245,158,11,0.2); }
    .role-admin { background: rgba(239,68,68,0.1); color: #f87171; border: 1px solid rgba(239,68,68,0.2); font-size: 0.7rem; padding: 2px 8px; border-radius: 4px; margin-left: 4px; }
    .role-manager { background: rgba(168,85,247,0.1); color: #c084fc; border: 1px solid rgba(168,85,247,0.2); font-size: 0.7rem; padding: 2px 8px; border-radius: 4px; margin-left: 4px; }
    .role-user { background: rgba(56,189,248,0.1); color: #38bdf8; border: 1px solid rgba(56,189,248,0.2); font-size: 0.7rem; padding: 2px 8px; border-radius: 4px; margin-left: 4px; }
    .endpoint-info { flex: 1; }
    .tags { margin-top: 6px; display: flex; flex-wrap: wrap; gap: 4px; }
    .stack { display: flex; gap: 10px; justify-content: center; flex-wrap: wrap; margin-top: 16px; }
    .stack span { background: #1e293b; border: 1px solid #334155; padding: 4px 14px; border-radius: 100px; font-size: 0.78rem; color: #94a3b8; }
    .footer { text-align: center; margin-top: 48px; color: #334155; font-size: 0.8rem; }
    .footer a { color: #f59e0b; text-decoration: none; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="badge">● API Running</div>
      <h1>RBAC <span>API</span></h1>
      <p class="subtitle">Role-Based Access Control — REST API Documentation</p>
      <div class="stack">
        <span>Node.js</span><span>Express</span><span>MongoDB</span><span>JWT</span><span>bcrypt</span>
      </div>
    </div>

    <div class="section">
      <div class="section-title">Authentication</div>
      <div class="endpoint">
        <span class="method post">POST</span>
        <div class="endpoint-info">
          <div class="path">/api/auth/register</div>
          <div class="desc">Register a new user with username, password and role</div>
          <div class="tags"><span class="auth-tag role-admin">admin</span><span class="auth-tag role-manager">manager</span><span class="auth-tag role-user">user</span></div>
        </div>
      </div>
      <div class="endpoint">
        <span class="method post">POST</span>
        <div class="endpoint-info">
          <div class="path">/api/auth/login</div>
          <div class="desc">Login and receive a JWT token for authorization</div>
        </div>
      </div>
    </div>

    <div class="section">
      <div class="section-title">Protected Routes</div>
      <div class="endpoint">
        <span class="method get">GET</span>
        <div class="endpoint-info">
          <div class="path">/api/users/admin <span class="auth-tag auth-required">🔒 JWT Required</span></div>
          <div class="desc">Accessible only by admin role</div>
          <div class="tags"><span class="auth-tag role-admin">admin only</span></div>
        </div>
      </div>
      <div class="endpoint">
        <span class="method get">GET</span>
        <div class="endpoint-info">
          <div class="path">/api/users/manager <span class="auth-tag auth-required">🔒 JWT Required</span></div>
          <div class="desc">Accessible by admin and manager roles</div>
          <div class="tags"><span class="auth-tag role-admin">admin</span><span class="auth-tag role-manager">manager</span></div>
        </div>
      </div>
      <div class="endpoint">
        <span class="method get">GET</span>
        <div class="endpoint-info">
          <div class="path">/api/users/user <span class="auth-tag auth-required">🔒 JWT Required</span></div>
          <div class="desc">Accessible by all authenticated roles</div>
          <div class="tags"><span class="auth-tag role-admin">admin</span><span class="auth-tag role-manager">manager</span><span class="auth-tag role-user">user</span></div>
        </div>
      </div>
    </div>

    <div class="footer">
      Built by <a href="https://github.com/archipriya03" target="_blank">Archi Priya</a> · 
      <a href="https://github.com/archipriya03/RBAC-nodejs" target="_blank">GitHub Repo</a>
    </div>
  </div>
</body>
</html>
  `);
});



app.listen(PORT,()=>
{ 
    console.log(`server is running at port ${PORT}`);
});