import request from "supertest";
import { app } from "@/app";
import { prisma } from "@/infra/database/prisma";

describe("DeliveriesController", () => {
  beforeEach(async () => {
    await prisma.delivery.deleteMany();
    await prisma.user.deleteMany();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it("should authenticate a and get acess token", async () => {
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

    const deliveryResponse = await request(app)
      .post("/deliveries")
      .set("Authorization", `Bearer ${token}`)
      .send({
        user_id: `${user_id}`,
        description: "Monitor",
      });

    expect(deliveryResponse.status).toBe(401);
    expect(deliveryResponse.body.message).toBe("Unauthorized");
  });
});
