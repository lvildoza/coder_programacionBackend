import { Router } from 'express';
import userModel from '../models/user.model.js';
import passport from 'passport';
// import { createHash, isValidPassword } from '../utils.js';

const router = Router();

router.post("/register", passport.authenticate('register', {failureRedirect: '/api/sessions/fail-regiter'}), async (req, res) => {
    console.log("Registrando nuevo usuario.");
    res.status(201).send({ status: "success", message: "Usuario creado con exito." });  
});

router.post("/login", passport.authenticate("login", {failureRedirect: '/api/sessions/fail-login'}), async (req, res) => {
    console.log("User found to login:");
    const user = req.user;
    console.log(user);

    if (!user) return res.status(401).send({ status: "error", error: "Credenciales incorrectas" })
    // damos de alta la session del usaurio
    req.session.user = {
        name: `${user.first_name} ${user.last_name}`,
        email: user.email,
        age: user.age
    }
    res.send({ status: "success", payload: req.session.user, message: "¡Primer logueo realizado! :)" });
});

router.get("/fail-resiter", (req, res) => {
    res.status(401).send({ error: "Failed to process register!" });
});

router.get("/fail-login", (req, res) => {
    res.status(401).send({ error: "Failed to process login!" });
});


export default router;