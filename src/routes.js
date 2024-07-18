import pg from "pg";

const dbURL = process.env.DATABASE_URL;

const client = new pg.Client({
    connectionString: dbURL,
    ssl: true,
});

client.connect();

const setupRoutes = (app) => {

app.get('/timezones', async (req, res) => {
    const dbResult = await client.query('SELECT * FROM global_time_zones');
    res.json(dbResult.rows);
    });
    
    app.post('/timezones', async (req, res) => {
    const newTimeZone = req.body;

    const safeTimeZone = {
        city: newTimeZone.city,
        "utc_offset": newTimeZone.utc_offset
    }

    const dbResult = await client.query(
        "INSERT INTO global_time_zones (city, utc_offset) VALUES ($1, $2)' RETURNING *", [safeTimeZone.city, safeTimeZone.utc_offset]
    );
    
    if (dbResult.rowCount !== 1) {
        res.status(500).json({
            error: "error occured. There are more than 1 row",
        });
        return;
    }
    res.json(dbResult.rows[0]);
    });

}


export {setupRoutes}
