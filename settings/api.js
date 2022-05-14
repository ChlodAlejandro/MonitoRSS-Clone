const config = require("./config.bot.json");
const {Patron, Supporter} = require("monitorss");

module.exports = async () => {
    await new Promise((res) => { setTimeout( () => { res(); }, 10000); });
    Patron.deleteAll();
    Supporter.deleteAll();

    for (const ownerId of config.bot.ownerIDs) {
        if (Patron.get(ownerId)) {
            const patron = new Patron({
                _id: ownerId,
                status: "active_patron",
                lastCharge: new Date().toISOString(),
                pledgeLifetime: 2500,
                pledge: 2000,
                discord: ownerId,
                name: "Dummy Name",
                email: "dummy@example.com"
            });
            await patron.save();
        }

        if (Supporter.get(ownerId)) {
            const supporter = new Supporter({
                _id: ownerId,
                patron: true,
                webhook: true,
                maxGuilds: 200,
                maxFeeds: 5000,
                guilds: [],
                expireAt: new Date(Date.now() * 2),
                comment: "Owner",
                slowRate: false
            });
            await supporter.save();
        }
    }
}; 