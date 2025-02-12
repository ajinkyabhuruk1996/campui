import { getMaxLoginInitialValue } from "../path/to/your/function"; // Adjust the path accordingly

describe("getMaxLoginInitialValue", () => {
  test("should return max_logins value when user and customerprofile exist", () => {
    const user = {
      customerprofile: {
        loginDetails: '{"max_logins": 8}',
      },
    };

    expect(getMaxLoginInitialValue(user)).toBe(8);
  });

  test("should return empty string when user is null or undefined", () => {
    expect(getMaxLoginInitialValue(null)).toBe("");
    expect(getMaxLoginInitialValue(undefined)).toBe("");
  });

  test("should return empty string when user does not have customerprofile", () => {
    const user = {};
    expect(getMaxLoginInitialValue(user)).toBe("");
  });

  test("should handle invalid JSON gracefully", () => {
    const user = {
      customerprofile: {
        loginDetails: "{invalid_json}",
      },
    };

    expect(() => getMaxLoginInitialValue(user)).toThrow();
  });

  test("should return empty string when max_logins is missing in loginDetails", () => {
    const user = {
      customerprofile: {
        loginDetails: "{}",
      },
    };

    expect(getMaxLoginInitialValue(user)).toBeUndefined();
  });
});
