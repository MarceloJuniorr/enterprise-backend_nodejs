import { Router } from "express";
import { ensureAuthenticateUser } from "./middleweres/ensureAuthenticateUser";
import { ensureDocumentValidator } from "./middleweres/ensureDocumentValidator";
import { CreateCustomerController } from "./modules/customers/createCustomer/CreateCustomerController";
import { DeleteCustomerController } from "./modules/customers/deleteCustomer/DeleteCustomerController";
import { GetCustomersController } from "./modules/customers/getCustommers/GetCustomersController";
import { CreateEnterpriseController } from "./modules/enterprises/createEnterprise/CreateEnterpriseController";
import { GetEnterprisesController } from "./modules/enterprises/getEnterprises/GetEnterprisesController";

import { AuthenticateUserController } from "./modules/users/authenticateUser/AuthenticateUserController";
import { CreateUserController } from "./modules/users/createUser/CreateUserController";

const routes = Router();

// Users
const authenticateUserController = new AuthenticateUserController();
const createUserController = new CreateUserController();

routes.get("/users/authenticate/", authenticateUserController.handle);
routes.post("/users/", createUserController.handle);

// Enterprises
const createEnterpriseController = new CreateEnterpriseController();
const getEnterprisesController = new GetEnterprisesController();

routes.post(
  "/enterprises/",
  ensureAuthenticateUser,
  createEnterpriseController.handle
);
routes.get(
  "/enterprises/",
  ensureAuthenticateUser,
  getEnterprisesController.handle
);

// Customers
const createCustomerController = new CreateCustomerController();
const getCustomersController = new GetCustomersController();
const deleteCustomerController = new DeleteCustomerController();

routes.post(
  "/customers/",
  ensureAuthenticateUser,
  ensureDocumentValidator,
  createCustomerController.handle
);
routes.get(
  "/customers/",
  ensureAuthenticateUser,
  getCustomersController.handle
);
routes.delete(
  "/customers/",
  ensureAuthenticateUser,
  deleteCustomerController.handle
);

export { routes };
