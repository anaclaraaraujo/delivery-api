import request from "supertest";
import { prisma } from "@/infra/database/prisma";
import { app } from "@/app";

describe("UsersController", () => {
  let user_id: string;

  beforeEach(async () => {
    await prisma.user.deleteMany();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it("should create a new user successfully", async () => {
    const response = await request(app).post("/users").send({
      name: "Test User",
      email: "testuser@example.com",
      password: "password123",
    });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body.name).toBe("Test User");

    user_id = response.body.id;
  });

  it("should throw an error if user with same email already exists", async () => {
    // Cria o usuário com o email "ana@example.com"
    await request(app).post("/users").send({
      name: "Original User",
      email: "ana@example.com",
      password: "password123",
    });

    // Tenta criar de novo com o mesmo e-mail
    const response = await request(app).post("/users").send({
      name: "Duplicate User",
      email: "ana@example.com",
      password: "password123",
    });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("User with same email already exists");
  });

  it("should throw a validation error if email is invalid", async () => {
    const response = await request(app).post("/users").send({
      name: "Test User",
      email: "invalid-email",
      password: "password123",
    });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("validation error");
  });
});
