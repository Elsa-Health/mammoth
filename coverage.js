const coveralls = require("./coveralls-merge");
const fs = require("fs");
const path = require("path");
// Create reports and options

const reports = ["apps/mobile-providers", "packages/ui-react-native"].map(
	(p) => ({
		type: "lcov",
		reportFile: path.join(p, "/coverage/lcov.info"),
		workingDirectory: p,
	})
);

coveralls.sendReports(reports, { projectRoot: __dirname });
