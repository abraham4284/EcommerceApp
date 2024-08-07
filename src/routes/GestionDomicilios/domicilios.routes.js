import {  Router  } from "express";
import { getDomicilios, createDomicilios, updateDomicilios, getIdDomicilios, deleteDomicilios } from '../../controllers/GestionDomicilios/domicilios.controllers.js';
import { validarToken } from "../../middlewares/validarToken.js";

const router = Router();

router.get("/domicilios", getDomicilios);
router.get("/domicilios/:id", getIdDomicilios);
router.post("/domicilios",validarToken(["cliente","admin","superAdmin"]), createDomicilios);
router.put("/domicilios/:id",validarToken(["cliente","admin","superAdmin"]), updateDomicilios);
router.delete("/domicilios/:id",validarToken(["cliente","admin","superAdmin"]), deleteDomicilios);

export default router;