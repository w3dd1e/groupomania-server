// drizzle.config.ts
import type { Config } from 'drizzle-kit';
import dotenv from 'dotenv';
dotenv.config();

export default {
	schema: './models/schema.ts',
	out: './drizzle',
	driver: 'pg',
	dbCredentials: {
		connectionString: `${process.env.DBURL}`,
	},
	verbose: true,
	strict: true,
} satisfies Config;
