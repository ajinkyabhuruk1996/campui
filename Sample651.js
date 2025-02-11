import getGroupsFilteredData from "./getGroupsFilteredData";

describe("getGroupsFilteredData", () => {
  const configData = {
    userPageConfig: {
      groups: [
        { id: "9", name: "Advanced Data Administrator" },
        { id: "1", name: "Analyst" },
        { id: "7", name: "Recording Investigator" }, // This should be removed when screencapture is false
        { id: "4", name: "Server Administrator" }
      ]
    }
  };

  test("removes 'Recording Investigator' (id: 7) when screencapture is disabled", () => {
    const featureData = {
      features: [
        { id: "utc_timezone", enabled: false },
        { id: "alert", enabled: true },
        { id: "screencapture", enabled: false }, // Disabled
        { id: "api", enabled: true }
      ]
    };

    const result = getGroupsFilteredData(configData, featureData);

    expect(result).toEqual([
      { id: "9", name: "Advanced Data Administrator" },
      { id: "1", name: "Analyst" },
      { id: "4", name: "Server Administrator" } // "Recording Investigator" should be removed
    ]);
  });

  test("keeps all groups when screencapture is enabled", () => {
    const featureData = {
      features: [
        { id: "utc_timezone", enabled: false },
        { id: "alert", enabled: true },
        { id: "screencapture", enabled: true }, // Enabled
        { id: "api", enabled: true }
      ]
    };

    const result = getGroupsFilteredData(configData, featureData);

    expect(result).toEqual([
      { id: "9", name: "Advanced Data Administrator" },
      { id: "1", name: "Analyst" },
      { id: "7", name: "Recording Investigator" }, // Should NOT be removed
      { id: "4", name: "Server Administrator" }
    ]);
  });

  test("keeps all groups if screencapture feature is missing", () => {
    const featureData = {
      features: [
        { id: "utc_timezone", enabled: false },
        { id: "alert", enabled: true },
        { id: "api", enabled: true } // No "screencapture" feature
      ]
    };

    const result = getGroupsFilteredData(configData, featureData);

    expect(result).toEqual([
      { id: "9", name: "Advanced Data Administrator" },
      { id: "1", name: "Analyst" },
      { id: "7", name: "Recording Investigator" }, // Should NOT be removed
      { id: "4", name: "Server Administrator" }
    ]);
  });
});
