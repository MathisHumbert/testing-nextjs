module.exports = {
  esModule: true,
  validateToken: jest.fn().mockResolvedValue(true),
};

// to satisfy TS
export {};

// mock module in test using this code
// jest.mock('@/lib/auth/utils')
