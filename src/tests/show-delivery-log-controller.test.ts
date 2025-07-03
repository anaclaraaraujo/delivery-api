import request from "supertest";
import { app } from "@/app";
import { prisma } from "@/infra/database/prisma";

describe("ShowDeliveryLogsController", () => {
  beforeEach(async () => {
    await prisma.deliveryLog.deleteMany();
    await prisma.delivery.deleteMany();
    await prisma.user.deleteMany();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it("should not allow a customer to view delivery logs of another user", async () => {
    const customer = await request(app).post("/users").send({
      name: "Customer 1",
      email: "customer1@example.com",
      password: "password123",
      role: "customer",
    });

    const session = await request(app).post("/sessions").send({
      email: "customer1@example.com",
      password: "password123",
    });

    const customerToken = session.body.token;

    const other = await request(app).post("/users").send({
      name: "Customer 2",
      email: "customer2@example.com",
      password: "password123",
      role: "customer",
    });

    const delivery = await prisma.delivery.create({
      data: {
        userId: other.body.id,
        description: "Outro monitor",
      },
    });

    const otherUserDeliveryId = delivery.id;

    const response = await request(app)
      .get(`/delivery-logs/${otherUserDeliveryId}/show`)
      .set("Authorization", `Bearer ${customerToken}`);

    expect(response.status).toBe(401);
    expect(response.body.message).toBe(
      "The user can only view their deliveries"
    );
  });
});
