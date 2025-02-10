import request from 'supertest';
import { app } from './index';
import { beforeAll, afterAll, describe, it, expect } from '@jest/globals';
import { mockFirebaseAdmin } from './__mocks__/firebaseAdmin';

beforeAll(() => {
  jest.mock('firebase-admin', () => mockFirebaseAdmin);
});

afterAll(() => {
  jest.restoreAllMocks();
});

describe('Gemini Routes', () => {
  it('should have a GET / route', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
    expect(response.text).toBe('Welcome to the TypeScript RESTful API!');
  });

  it('should return 404 for unknown routes', async () => {
    const response = await request(app).get('/unknown-route');
    expect(response.status).toBe(404);
  });

  it('should handle POST requests to /api/phrases', async () => {
    const phrases = [
      { id: 1, phrase: 'Stay positive!' },
      { id: 2, phrase: 'Keep going!' },
      { id: 3, phrase: 'You can do it!' }
    ];
  
    const response = await request(app).post('/api/phrases').send(phrases);
  
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Phrases saved successfully!');
  });

  it('should handle GET requests to /api/phrases', async () => {
    const response = await request(app).get('/api/phrases');
    expect(response.status).toBe(200);

    expect(response.body.phrases).toBeDefined();
    expect(Array.isArray(response.body.phrases)).toBe(true);
    expect(response.body.phrases.length).toBeGreaterThan(0);

    const firstPhrase = response.body.phrases[0];
    expect(firstPhrase).toHaveProperty('id');
    expect(firstPhrase).toHaveProperty('phrase');
    expect(typeof firstPhrase.phrase).toBe('string');
    expect(typeof firstPhrase.id).toBe('number');
  });
});