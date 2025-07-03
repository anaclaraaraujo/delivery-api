import request from "supertest";
import { app } from "@/app";
import { prisma } from "@/infra/database/prisma";

describe("CreateDeliveryLogController", () => {
  let user_id: string;
  let token: string;

  beforeEach(async () => {
    await prisma.deliveryLog.deleteMany();
    await prisma.delivery.deleteMany();
    await prisma.user.deleteMany();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it("should not allow log creation for a delivered delivery", async () => {
    const userResponse = await request(app).post("/users").send({
      name: "Customer User",
      email: "customer@example.com",
      password: "password123",
      role: "customer",
    });

    const sessionResponse = await request(app).post("/sessions").send({
      email: "customer@example.com",
      password: "password123",
    });

    const token = sessionResponse.body.token;
    const user_id = userResponse.body.id;

    const delivery = await prisma.delivery.create({
      data: {
        userId: user_id,
        description: "Entregue",
        status: "delivered",
      },
    });

    const response = await request(app)
      .post("/delivery-logs")
      .set("Authorization", `Bearer ${token}`)
      .send({
        delivery_id: delivery.id,
        description: "Tentativa inválida",
      });

    expect(response.status).toBe(401);
    expect(response.body.message).toBe("Unauthorized");
  });
});
