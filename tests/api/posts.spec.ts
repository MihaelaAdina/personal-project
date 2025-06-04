import { test, expect } from "@playwright/test";

const BASE_URL = "https://jsonplaceholder.typicode.com";

test.describe("GET posts", () => {
  test("return all posts", async ({ request }) => {
    const res = await request.get(`${BASE_URL}/posts`);
    expect(res.status()).toBe(200);
    const resBody = await res.json();
    expect(Array.isArray(resBody)).toBeTruthy();
  });

  test("return a single post with id 1", async ({ request }) => {
    const res = await request.get(`${BASE_URL}/posts/1`);
    expect(res.status()).toBe(200);
    const resBody = await res.json();

    expect(resBody).toMatchObject({
      userId: expect.any(Number),
      id: expect.any(Number),
      title: expect.any(String),
      body: expect.any(String),
    });
  });
});

test("POST - create a new post", async ({ request }) => {
  const reqBody = {
    title: "New post",
    body: "This is a new post",
    userId: 1001,
  };

  const res = await request.post(`${BASE_URL}/posts`, {
    data: reqBody,
  });

  expect(res.status()).toBe(201);

  const resBody = await res.json();

  expect(resBody).toMatchObject({
    title: reqBody.title,
    body: reqBody.body,
    userId: reqBody.userId,
    id: expect.any(Number),
  });

  expect(resBody).toMatchObject({
    title: expect.any(String),
    body: expect.any(String),
    userId: expect.any(Number),
    id: expect.any(Number),
  });
});

test("PUT - update a post", async ({ request }) => {
  const reqBody = {
    title: "Title - edited",
    body: "Body - edited",
    userId: 200,
  };

  const res = await request.put(`${BASE_URL}/posts/1`, {
    data: reqBody,
  });

  expect(res.status()).toBe(200);

  const resBody = await res.json();

  expect(resBody).toMatchObject({
    title: reqBody.title,
    body: reqBody.body,
    userId: reqBody.userId,
  });

  expect(resBody).toMatchObject({
    title: expect.any(String),
    body: expect.any(String),
    userId: expect.any(Number),
  });
});

test("PATCH - partivally update a post", async ({ request }) => {
  const reqBody = {
    title: "Title - patched",
    body: "Body - patched",
  };

  const res = await request.patch(`${BASE_URL}/posts/1`, {
    data: reqBody,
  });

  expect(res.status()).toBe(200);

  const resBody = await res.json();

  expect(resBody).toMatchObject({
    title: reqBody.title,
    body: reqBody.body,
  });

  expect(resBody).toMatchObject({
    title: expect.any(String),
    body: expect.any(String),
    userId: expect.any(Number),
  });
});

test("DELETE - delete a post", async ({ request }) => {
  const res = await request.delete(`${BASE_URL}/posts/10`);

  expect(res.status()).toBe(200);

  const resBody = await res.json();
  expect(resBody).toEqual({});
});
