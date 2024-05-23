const {
  createBot,
  createProvider,
  createFlow,
  addKeyword,
  EVENTS,
} = require("@bot-whatsapp/bot");

const QRPortalWeb = require("@bot-whatsapp/portal");
const BaileysProvider = require("@bot-whatsapp/provider/baileys");
const MockAdapter = require("@bot-whatsapp/database/mock");

const initialOptions = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "0"];
const initialOptionsValues = {
  1: "Liquidación de multas",
  2: "Renovación de licencia",
  3: "Escuela de conducción",
  4: "Traspasos",
  5: "Levantamiento de prenda",
  6: "SOAT",
  7: "Liquidación de impuestos",
  8: "Salida vehículos de patios",
  9: "Revisión tecnico mecanica",
  10: "Duplicados",
};

const documentOptions = ["1", "2", "3", "4", "5", "6", "7"];
const documentOptionsValues = {
  1: "Cédula",
  2: "Nit",
  3: "Cédula extrangeria",
  4: "Tarjeta de identidad",
  5: "Pasaporte",
  6: "Número unido de identificacion personal",
  7: "Otro",
};

const licenseCategoriesValues = {
  1: "Categoría A2",
  2: "Categoría B1",
  3: "Categoría C1",
  4: "Categoría C2",
};

const transferCategoriesValues = {
  1: "Traspaso de propietario",
  2: "Traspaso persona indeterminada",
  3: "Traspaso de vehículo de servicio publico",
  4: "Traspaso a compañía de seguros",
  5: "Traspaso vehículo blindado",
  6: "Traspaso por sucesión",
  7: "Traspaso a un menor de edad",
  8: "Traspaso a persona interesada",
};

const duplicatedDocumentValues = {
  1: "Licencia",
  2: "Tarjeta de propiedad",
};

const cityZonesValue = {
  1: "Norte",
  2: "Sur",
  3: "Centro",
  4: "Oriente",
};

const serviceTypesVehicleValue = {
  1: "Particular.",
  2: "Público.",
};

const flujoDespedidaExitosa = addKeyword(EVENTS.ACTION).addAnswer(
  ["En un momento uno de nuestros asesores atenderá tu solicitud"],
  null,
  async (ctx, { flowDynamic, state }) => {
    const serviceType = state.get("serviceType");
    const documentType = state.get("documentType");
    const documentNumber = state.get("documentNumber");
    const categoryQty = state.get("categoryQty");
    const categoryLicense = state.get("categoryLicense");
    const vehicleRegistration = state.get("vehicleRegistration");
    const vehiclePlate = state.get("vehiclePlate");
    const transfer = state.get("transfer");
    const duplicatedDocument = state.get("duplicatedDocument");
    const userEmail = state.get("userEmail");
    const userPhone = state.get("userPhone");
    const tecnoMechanicalZone = state.get("tecnoMechanicalZone");
    const vehicleservice = state.get("vehicleservice");

    switch (serviceType) {
      case "1":
        await flowDynamic([
          "_*Resumen*_",
          `*Tipo de Servicio:* _${
            initialOptionsValues[parseInt(serviceType)]
          }_`,
          `*Tipo de documento:* _${
            documentOptionsValues[parseInt(documentType)]
          }_`,
          `*Número de documento:* _${documentNumber}_`,
        ]);
        break;
      case "2":
        await flowDynamic([
          "_*Resumen*_",
          `*Tipo de Servicio:* _${
            initialOptionsValues[parseInt(serviceType)]
          }_`,

          `*Número de categorias:* _${categoryQty}_`,
          `*Tipo de documento:* _${
            documentOptionsValues[parseInt(documentType)]
          }_`,
          `*Número de documento:* _${documentNumber}_`,
        ]);
        break;
      case "3":
        await flowDynamic([
          "_*Resumen*_",
          `*Tipo de Servicio:* _${
            initialOptionsValues[parseInt(serviceType)]
          }_`,
          `*Categoría de licencia:* _${
            licenseCategoriesValues[parseInt(categoryLicense)]
          }_`,
          `*Tipo de documento:* _${
            documentOptionsValues[parseInt(documentType)]
          }_`,
          `*Número de documento:* _${documentNumber}_`,
        ]);
        break;
      case "4":
        await flowDynamic([
          "_*Resumen*_",
          `*Tipo de Servicio:* _${
            initialOptionsValues[parseInt(serviceType)]
          }_`,
          `*Tipo de traspaso:* _${
            transferCategoriesValues[parseInt(transfer)]
          }_`,
          `*Ciudad de matricula del vehículo:* _${vehicleRegistration}_`,
          `*Número de matricula del vehículo:* _${vehiclePlate}_`,
        ]);
        break;
      case "5":
        await flowDynamic([
          "_*Resumen*_",
          `*Tipo de Servicio:* _${
            initialOptionsValues[parseInt(serviceType)]
          }_`,
          `*Ciudad de matricula del vehículo:* _${vehicleRegistration}_`,
          `*Número de matricula del vehículo:* _${vehiclePlate}_`,
        ]);
        break;
      case "7":
        await flowDynamic([
          "_*Resumen*_",
          `*Tipo de servicio:* _${
            initialOptionsValues[parseInt(serviceType)]
          }_`,
          `*Tipo de servicio del vehículo:* _${
            serviceTypesVehicleValue[parseInt(vehicleservice)]
          }_`,
          `*Ciudad de matricula del vehículo:* _${vehicleRegistration}_`,
          `*Número de matricula del vehículo:* _${vehiclePlate}_`,
        ]);
        break;
      case "10":
        if (duplicatedDocument === "1") {
          await flowDynamic([
            "_*Resumen*_",
            `*Tipo de Servicio:* _${
              initialOptionsValues[parseInt(serviceType)]
            }_`,
            `*Duplicado:* ${
              duplicatedDocumentValues[parseInt(duplicatedDocument)]
            }`,
            `*Tipo de documento:* _${
              documentOptionsValues[parseInt(documentType)]
            }_`,
            `*Número de documento:* _${documentNumber}_`,
          ]);
        }
        if (duplicatedDocument === "2") {
          await flowDynamic([
            "_*Resumen*_",
            `*Tipo de Servicio:* _${
              initialOptionsValues[parseInt(serviceType)]
            }_`,
            `*Duplicado:* ${
              duplicatedDocumentValues[parseInt(duplicatedDocument)]
            }`,
            `*Número de matricula del vehículo:* _${vehiclePlate}_`,
          ]);
        }
        break;

      case "6":
        await flowDynamic([
          "_*Resumen*_",
          `*Tipo de Servicio:* _${
            initialOptionsValues[parseInt(serviceType)]
          }_`,
          `*Correo Electronico:* _${userEmail}_`,
          `*Numero celular:* _${userPhone}_`,
        ]);
        break;

      case "8":
        await flowDynamic([
          "_*Resumen*_",
          `*Tipo de Servicio:* _${
            initialOptionsValues[parseInt(serviceType)]
          }_`,
        ]);
        break;

      case "9":
        await flowDynamic([
          "_*Resumen*_",
          `*Tipo de Servicio:* _${
            initialOptionsValues[parseInt(serviceType)]
          }_`,
          `*Zona:* _${cityZonesValue[parseInt(tecnoMechanicalZone)]}_`,
        ]);
        break;
    }
  }
);

const flujoDatosPersonales = addKeyword(EVENTS.ACTION)
  .addAnswer(
    "Por favor digita correo electronico",
    { capture: true },
    async (ctx, { gotoFlow, state }) => {
      await state.update({ userEmail: ctx.body });
    }
  )
  .addAnswer(
    "Por favor digita numero celular",
    { capture: true },
    async (ctx, { gotoFlow, state }) => {
      await state.update({ userPhone: ctx.body });
      return gotoFlow(flujoDespedidaExitosa);
    }
  );

const flujoTecno = addKeyword(EVENTS.ACTION).addAnswer(
  [
    "¿En que zona de la ciudad desea realizar la revision tecnico mecanica?",
    "1. Norte",
    "2. Sur",
    "3. Centro",
    "4. Oriente",
  ],
  { capture: true },
  async (ctx, { state, gotoFlow, fallBack }) => {
    if (parseInt(ctx.body) > 4 || parseInt(ctx.body) < 1) {
      return fallBack();
    }

    await state.update({ tecnoMechanicalZone: ctx.body });

    return gotoFlow(flujoDespedidaExitosa);
  }
);

const flujoImagenPosterior = addKeyword(EVENTS.ACTION).addAnswer(
  "Por favor envía foto posterior de la tarjeta de propiedad",
  { capture: true },
  (ctx, { gotoFlow, state }) => {
    const serviceType = state.get("serviceType");

    switch (serviceType) {
      case "6":
        return gotoFlow(flujoDatosPersonales);
        break;
      case "8":
        return gotoFlow(flujoDespedidaExitosa);
        break;

      case "9":
        return gotoFlow(flujoTecno);
        break;
    }
  }
);

const flujoImagenFrontal = addKeyword(EVENTS.ACTION).addAnswer(
  "Por favor envía foto frontal de la tarjeta de propiedad",
  { capture: true },
  async (ctx, { gotoFlow, fallBack, state }) => {
    await state.update({ frontalImage: ctx.body });
    return gotoFlow(flujoImagenPosterior);
  }
);

const flujoPlacaVehiculo = addKeyword(EVENTS.ACTION).addAnswer(
  ["Por favor digita número de placa en mayúscula y sin espacios"],
  { capture: true },
  async (ctx, { state, gotoFlow }) => {
    await state.update({ vehiclePlate: ctx.body });
    return gotoFlow(flujoDespedidaExitosa);
  }
);

const flujoTipoServicioVehiculo = addKeyword(EVENTS.ACTION).addAnswer(
  [
    "Por favor indica el tipo de servicio del vehículo.",
    "1. Particular.",
    "2. Público.",
  ],
  { capture: true },
  async (ctx, { state, gotoFlow, fallBack }) => {
    if (parseInt(ctx.body) > 2 || parseInt(ctx.body) < 1) {
      return fallBack();
    }

    await state.update({ vehicleservice: ctx.body });
    return gotoFlow(flujoPlacaVehiculo);
  }
);

const flujoMatriculaVehiculo = addKeyword(EVENTS.ACTION).addAnswer(
  ["Por favor digita en que ciudad se encuentra matriculado el vehículo"],
  { capture: true },
  async (ctx, { state, gotoFlow }) => {
    await state.update({ vehicleRegistration: ctx.body });
    return gotoFlow(flujoTipoServicioVehiculo);
  }
);

const flujoLiquidacion = addKeyword(EVENTS.ACTION)
  .addAnswer(
    [
      "Selecciona el tipo de documento 🪪",
      "1. Cédula",
      "2. Nit",
      "3. Cédula extrangeria",
      "4. Tarjeta de identidad",
      "5. Pasaporte",
      "6. Número unido de identificacion personal",
      "7. Otro",
    ],
    { capture: true },
    async (ctx, { fallBack, state }) => {
      if (!documentOptions.includes(ctx.body)) {
        return fallBack();
      }
      await state.update({ documentType: ctx.body });
    }
  )
  .addAnswer(
    "Escribe el número de documento sin puntos, comas ni espacios",
    { capture: true },
    async (ctx, { gotoFlow, fallBack, state }) => {
      //TODO  realizar validacion que solo sean numericos

      await state.update({ documentNumber: ctx.body });
      return gotoFlow(flujoDespedidaExitosa);
    }
  );

const flujoRenovacion = addKeyword(EVENTS.ACTION).addAnswer(
  [
    "Indica el número de categorias que deseas renovar",
    "1 Categoría",
    "2 Categorías",
  ],
  { capture: true },
  async (ctx, { gotoFlow, fallBack, state }) => {
    if (parseInt(ctx.body) > 2 || parseInt(ctx.body) < 1) {
      return fallBack();
    }

    await state.update({ categoryQty: ctx.body });
    return gotoFlow(flujoLiquidacion);
  }
);

const flujoEscuela = addKeyword(EVENTS.ACTION).addAnswer(
  [
    "Selecciona categoria de licencia?",
    "1. Categoría A2 (Moto)",
    "2. Categoría B1 (Automóviles, camperos, camionetas y microbuses de servicio particular)",
    "3. Categoría C1 (Automóviles, camperos, camionetas y microbuses de servicio público)",
    "4. Categoría C2 (Camiones, rígidos, busetas y buses para el servicio público)",
  ],
  { capture: true },
  async (ctx, { gotoFlow, fallBack, state }) => {
    if (parseInt(ctx.body) > 4 || parseInt(ctx.body) < 1) {
      return fallBack();
    }

    await state.update({ categoryLicense: ctx.body });
    return gotoFlow(flujoLiquidacion);
  }
);

const flujoTraspasos = addKeyword(EVENTS.ACTION).addAnswer(
  [
    "Selecciona el tipo de traspaso que deseas realizar",
    "1. Traspaso de propietario",
    "2. Traspaso persona indeterminada",
    "3. Traspaso vehículo de servicio público",
    "4. Traspaso a compañía de seguros",
    "5. Traspaso vehículo blindado",
    "6. Traspaso por sucesión",
    "7. Traspaso a menor de edad",
    "8. Traspaso a persona interesada",
  ],
  { capture: true },
  async (ctx, { gotoFlow, fallBack, state }) => {
    if (parseInt(ctx.body) > 8 || parseInt(ctx.body) < 1) {
      return fallBack();
    }

    await state.update({ transfer: ctx.body });
    return gotoFlow(flujoMatriculaVehiculo);
  }
);

const flujoDuplicados = addKeyword(EVENTS.ACTION).addAnswer(
  [
    "Digita el duplicado que deseas obtener",
    "1. Licencia",
    "2. Tarjeta de propiedad",
  ],
  { capture: true },
  async (ctx, { state, gotoFlow, fallBack }) => {
    if (parseInt(ctx.body) > 2 || parseInt(ctx.body) < 1) {
      return fallBack();
    }
    await state.update({ duplicatedDocument: ctx.body });
    switch (ctx.body) {
      case "1":
        return gotoFlow(flujoLiquidacion);
      case "2":
        return gotoFlow(flujoPlacaVehiculo);
    }
  }
);

const flujoSaludo = addKeyword(["Hola", "Buenas"])
  .addAnswer([
    "🚙🛵¡Bienvenido a *Tramite Ya*!🛵🚙",
    "Gracias por contactarnos ",
  ])
  .addAnswer(
    [
      "¿En que servicio podemos asesorarte?",
      "1. Liquidación de multas",
      "2. Renovación de licencia",
      "3. Escuela de conducción",
      "4. Traspasos",
      "5. Levantamiento de prenda",
      "6. SOAT",
      "7. Liquidación de impuestos",
      "8. Salida vehículos en patios",
      "9. Revisión técnico mecánica",
      "10. Duplicados",
    ],
    { capture: true },
    async (ctx, { gotoFlow, fallBack, state }) => {
      if (!initialOptions.includes(ctx.body)) {
        return fallBack();
      }
      await state.update({ serviceType: ctx.body });
      switch (ctx.body) {
        case "1":
          return gotoFlow(flujoLiquidacion);
        case "2":
          return gotoFlow(flujoRenovacion);
        case "3":
          return gotoFlow(flujoEscuela);
        case "4":
          return gotoFlow(flujoTraspasos);
        case "5":
          return gotoFlow(flujoMatriculaVehiculo);
        case "6":
          return gotoFlow(flujoImagenFrontal);
        case "7":
          return gotoFlow(flujoMatriculaVehiculo);
        case "8":
          return gotoFlow(flujoImagenFrontal);
        case "9":
          return gotoFlow(flujoImagenFrontal);
        case "10":
          return gotoFlow(flujoDuplicados);
      }
    }
  );

const main = async () => {
  const adapterDB = new MockAdapter();
  const adapterFlow = createFlow([
    flujoSaludo,
    flujoLiquidacion,
    flujoDespedidaExitosa,
    flujoRenovacion,
    flujoEscuela,
    flujoMatriculaVehiculo,
    flujoPlacaVehiculo,
    flujoTraspasos,
    flujoDuplicados,
    flujoImagenFrontal,
    flujoImagenPosterior,
    flujoDatosPersonales,
    flujoTecno,
    flujoTipoServicioVehiculo,
  ]);
  const adapterProvider = createProvider(BaileysProvider);

  createBot({
    flow: adapterFlow,
    provider: adapterProvider,
    database: adapterDB,
  });

  QRPortalWeb();
};

main();
