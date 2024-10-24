// eslint-disable-next-line no-undef
process.env.SEMANTIC_RELEASE_PACKAGE = "Ts.ED VitePress Theme";

export default {
  branches: [
    "main",
    {name: "alpha", prerelease: true, channel: "alpha"},
    {name: "beta", prerelease: true, channel: "beta"},
    {name: "rc", prerelease: true, channel: "rc"}
  ],
  verifyConditions: [
    "@semantic-release/github",
    "@semantic-release/npm",
    "@tsed/monorepo-utils/semantic-release",
    "semantic-release-slack-bot"
  ],
  analyzeCommits: [
    [
      "@semantic-release/commit-analyzer",
      {
        preset: "angular",
        releaseRules: [
          {type: "feat", release: "minor"},
          {type: "fix", release: "patch"},
          {type: "docs", release: "patch"},
          {type: "style", release: "patch"},
          {type: "refactor", release: "patch"},
          {type: "perf", release: "patch"},
          {type: "test", release: "patch"}
        ]
      }
    ]
  ],
  verifyRelease: [],
  generateNotes: ["@semantic-release/release-notes-generator"],
  prepare: ["@tsed/monorepo-utils/semantic-release"],
  publish: ["@tsed/monorepo-utils/semantic-release", "@semantic-release/github"],
  success: [
    "@semantic-release/github",
    "@tsed/monorepo-utils/semantic-release",
    [
      "semantic-release-slack-bot",
      {
        markdownReleaseNotes: true,
        notifyOnSuccess: true
      }
    ]
  ],
  fail: ["@semantic-release/github"],
  npmPublish: false
};
