const mockDatabase = {
  ref: jest.fn().mockReturnThis(),
  child: jest.fn().mockReturnThis(),
  set: jest.fn().mockResolvedValue(true),
  once: jest.fn().mockResolvedValue({ val: jest.fn().mockReturnValue([]) }),
};

export const mockFirebaseAdmin = {
  apps: [],
  initializeApp: jest.fn(),
  database: jest.fn().mockReturnValue(mockDatabase),
  credential: {
    cert: jest.fn(),
  },
};
