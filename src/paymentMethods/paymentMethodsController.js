const { PaymentMethods } = require("../data/models/index");

const Get = async (req, res) => {
  /*  
    #swagger.tags = ['PaymentMethods']  
    #swagger.description = 'Retrieve all payment methods that are available and active (not deleted)'  
    */
  try {
    const paymentMethods = await PaymentMethods.findAll({
      attibutes: [
        "ID",
        "Name",
        "CreatedAt",
        "CreatedBy",
        "UpdatedAt",
        "UpdatedBy",
      ],
      where: { DeletedAt: null },
    });
    return res.json(paymentMethods);
  } catch (error) {
    console.error("Error fetching payment methods:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const GetByID = async (req, res) => {
  /*  
    #swagger.tags = ['PaymentMethods']  
    #swagger.description = 'Retrieve a specific payment method by its ID'  
    */
  try {

    const { id } = req.params;

    const paymentMethod = await PaymentMethods.findByPk(id, {
      attibutes: [
        "ID",
        "Name",
        "CreatedAt",
        "CreatedBy",
        "UpdatedAt",
        "UpdatedBy",
      ],
      where: { DeletedAt: null },
    });

    if (!paymentMethod) {
      return res
        .status(404)
        .json({ message: "PaymentMethods Not Found not found" });
    }

    return res.status(200).json(paymentMethod);
  } catch (error) {
    console.error(`error fetching the paymentMethod number: ${req.param.ID}`);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const Create = async (req, res) => {
  /*  
    #swagger.tags = ['PaymentMethods']  
    #swagger.description = 'Create a new payment method'  
    */
  try {
    const { Name } = req.body;
    const newPaymentMethods = await PaymentMethods.create({ Name });
    return res.status(201).json(newPaymentMethods);
  } catch (error) {
    console.error("Error creating paymentMethod:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const Update = async (req, res) => {
  /*  
    #swagger.tags = ['PaymentMethods']  
    #swagger.description = 'Update an existing payment method by its ID'  
    */
  try {
    const { id } = req.params;
    const { Name } = req.body;

    const paymentMethod = await PaymentMethods.findByPk(id);

    if (!paymentMethod) {
      return res.status(400).json({ message: "PaymentMethod not found" });
    }

    paymentMethod.Name = Name || paymentMethod.Name;
    await paymentMethod.save();

    return res.status(200).json(paymentMethod);
  } catch (error) {
    console.error("Error updating paymentMethod:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const Delete = async (req, res) => {
  /*  
    #swagger.tags = ['PaymentMethods']  
    #swagger.description = 'Soft delete a payment method by its ID (marks it as deleted but does not remove it from the database)'  
    */

  try {
    const { id } = req.params;
    const { deletedBy } = req.body; // El usuario que realiza el borrado

    const paymentMethod = await PaymentMethods.findByPk(id);
    if (!paymentMethod) {
      return res.status(404).json({ message: "Payment Method not found" });
    }

    // Marcar la categoría como eliminada
    paymentMethod.DeletedAt = new Date();
    paymentMethod.DeletedBy = deletedBy || "Unknown"; // Puedes manejar la obtención del usuario de otra manera
    await paymentMethod.save();

    return res.json({ message: "Payment Method deleted (soft delete)" });
  } catch (error) {
    console.error("Error deleting payment Method:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  Get,
  GetByID,
  Create,
  Update,
  Delete,
};
