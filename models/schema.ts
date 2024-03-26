import { relations } from 'drizzle-orm';
import {
	integer,
	pgTable,
	serial,
	varchar,
	text,
	timestamp,
	primaryKey,
} from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
	userId: serial('userId').primaryKey(),
	name: varchar('name', { length: 64 }),
	email: varchar('email', { length: 64 }).unique().notNull(),
	password: varchar('password', { length: 64 }).notNull(),
	username: varchar('username', { length: 64 }).notNull().unique(),
	department: varchar('department', { length: 64 }),
	location: varchar('location', { length: 64 }),
	bio: text('bio'),
	createdAt: timestamp('createdAt').notNull().defaultNow(),
});

export const userRelations = relations(users, ({ many }) => ({
	posts: many(posts),
	readPosts: many(readPosts),
}));

export const posts = pgTable('posts', {
	postId: serial('postId').primaryKey(),
	authorId: integer('authorId')
		.notNull()
		.references(() => users.userId, { onDelete: 'cascade' }),
	title: varchar('title', { length: 256 }).notNull(),
	content: text('content').notNull(),
	createdAt: timestamp('createdAt').notNull().defaultNow(),
});

export const postRelations = relations(posts, ({ one, many }) => ({
	authorId: one(users),
	readers: many(readPosts),
}));

export const readPosts = pgTable(
	'readPosts',
	{
		userId: integer('user_id')
			.notNull()
			.references(() => users.userId, { onDelete: 'cascade' }),
		postId: integer('post_id')
			.notNull()
			.references(() => posts.postId, { onDelete: 'cascade' }),
	},
	(table) => ({
		pk: primaryKey({ columns: [table.userId, table.postId] }),
	})
);

export const readPostRelations = relations(readPosts, ({ one }) => ({
	user: one(users, {
		fields: [readPosts.userId],
		references: [users.userId],
	}),
	post: one(posts, {
		fields: [readPosts.postId],
		references: [posts.postId],
	}),
}));
