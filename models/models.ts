import {
	integer,
	pgTable,
	serial,
	uniqueIndex,
	varchar,
	text,
} from 'drizzle-orm/pg-core';

export const users = pgTable(
	'users',
	{
		userId: serial('userId').primaryKey(),
		name: varchar('name', { length: 256 }),
		email: varchar('email', { length: 256 }),
		password: varchar('password', { length: 256 }),
		username: varchar('username', { length: 256 }),
	},
	(users) => {
		return {
			nameIndex: uniqueIndex('name_idx').on(users.name),
		};
	}
);

export const posts = pgTable('posts', {
	postId: serial('postId').primaryKey(),
	userId: integer('userId').references(() => users.userId),
	title: varchar('title', { length: 256 }),
	content: text('content'),
});

export const readPosts = pgTable('readPosts', {
	userId: integer('user_id')
		.notNull()
		.references(() => users.userId),
	postId: integer('post_id')
		.notNull()
		.references(() => posts.postId),
});
