jest.mock("firebase-admin/app", () => ({
  initializeApp: jest.fn(),
  cert: jest.fn(),
}));

jest.mock("firebase-admin/firestore", () => ({
  getFirestore: jest.fn(() => ({
    collection: jest.fn(() => ({
      doc: jest.fn(() => ({
        get: jest.fn(),
        set: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
      })),
      get: jest.fn(),
      add: jest.fn(),
      where: jest.fn(() => ({
        get: jest.fn(),
      })),
    })),
  })),
}));

process.env.NODE_ENV = "test";
process.env.FIREBASE_PROJECT_ID = "test-project";
process.env.PORT = "90";
