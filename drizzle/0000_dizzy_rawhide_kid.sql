CREATE TABLE IF NOT EXISTS "posts" (
	"postId" serial PRIMARY KEY NOT NULL,
	"authorId" integer NOT NULL,
	"title" varchar(256) NOT NULL,
	"content" text NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "readPosts" (
	"user_id" integer NOT NULL,
	"post_id" integer NOT NULL,
	CONSTRAINT "readPosts_user_id_post_id_pk" PRIMARY KEY("user_id","post_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"userId" serial PRIMARY KEY NOT NULL,
	"name" varchar(64),
	"email" varchar(64) NOT NULL,
	"password" varchar(64) NOT NULL,
	"username" varchar(64) NOT NULL,
	"department" varchar(64),
	"location" varchar(64),
	"bio" text,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email"),
	CONSTRAINT "users_username_unique" UNIQUE("username")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "posts" ADD CONSTRAINT "posts_authorId_users_userId_fk" FOREIGN KEY ("authorId") REFERENCES "users"("userId") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "readPosts" ADD CONSTRAINT "readPosts_user_id_users_userId_fk" FOREIGN KEY ("user_id") REFERENCES "users"("userId") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "readPosts" ADD CONSTRAINT "readPosts_post_id_posts_postId_fk" FOREIGN KEY ("post_id") REFERENCES "posts"("postId") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
