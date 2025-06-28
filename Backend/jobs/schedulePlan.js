const cron = require("node-cron");

cron.schedule("0 7 * * *", () => {
  console.log("Trigger daily reminders or plan updates at 7 AM.");
  // Future: Fetch users and update their study plans
});