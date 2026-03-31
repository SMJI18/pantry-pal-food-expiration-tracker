// backend/notificationService.js
const cron = require('node-cron');
const nodemailer = require('nodemailer');
const { Op } = require('sequelize');
const Item = require('./models/Item');
const User = require('./models/User');

// Configure nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendExpiryNotifications = async () => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const threeDaysFromNow = new Date(today);
    threeDaysFromNow.setDate(today.getDate() + 3);

    // Find items expiring within 3 days that haven't been notified yet
    const expiringItems = await Item.findAll({
      where: {
        expiryDate: {
          [Op.between]: [today, threeDaysFromNow],
        },
        notificationSent: false,
      },
      include: [{ model: User, attributes: ['email', 'username'] }],
    });

    if (expiringItems.length === 0) {
      console.log('[Cron] No expiring items to notify.');
      return;
    }

    // Group items by user
    const byUser = {};
    for (const item of expiringItems) {
      const userId = item.userId;
      if (!byUser[userId]) {
        byUser[userId] = { user: item.User, items: [] };
      }
      byUser[userId].items.push(item);
    }

    // Send one email per user
    for (const userId of Object.keys(byUser)) {
      const { user, items } = byUser[userId];

      if (!user?.email) continue;

      const itemList = items
        .map(i => `• ${i.name} (${i.category}) — expires ${new Date(i.expiryDate).toDateString()}`)
        .join('\n');

      const mailOptions = {
        from: `"Pantry Pal" <${process.env.EMAIL_USER}>`,
        to: user.email,
        subject: `⚠️ Pantry Pal: ${items.length} item(s) expiring soon!`,
        text: `Hi ${user.username},\n\nThe following items in your pantry are expiring within 3 days:\n\n${itemList}\n\nPlease use or discard them to avoid waste.\n\n— Pantry Pal`,
        html: `
          <h2>Hi ${user.username} 👋</h2>
          <p>The following items in your pantry are <strong>expiring within 3 days</strong>:</p>
          <ul>${items.map(i => `<li><strong>${i.name}</strong> (${i.category}) — expires <em>${new Date(i.expiryDate).toDateString()}</em></li>`).join('')}</ul>
          <p>Please use or discard them to avoid waste.</p>
          <br/><p>— Pantry Pal 🥦</p>
        `,
      };

      await transporter.sendMail(mailOptions);
      console.log(`[Cron] Email sent to ${user.email} for ${items.length} item(s).`);

      // Mark items as notified
      await Item.update(
        { notificationSent: true },
        { where: { id: items.map(i => i.id) } }
      );
    }
  } catch (err) {
    console.error('[Cron] Error sending notifications:', err.message);
  }
};

const startCronJob = () => {
  // Runs every day at 8:00 AM
  cron.schedule('0 8 * * *', () => {
    console.log('[Cron] Running daily expiry check...');
    sendExpiryNotifications();
  });

  console.log('[Cron] Expiry notification scheduler started (runs daily at 8:00 AM).');
};

module.exports = { startCronJob, sendExpiryNotifications };
