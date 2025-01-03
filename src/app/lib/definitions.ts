export interface Post {
	_id: string; // MongoDB ID field
	title: string; // Post title
	desc: string; // Description or content of the post
	img?: string; // Optional image URL
	createdAt: string; // Post creation date
	content: string;
	user: {
		username: string;
		firstName: string;
		lastName: string;
		profileImg?: string; // Optional user image URL
	};
	comments: Comment[];
}

export interface CommentFormValues {
	name: string;
	email: string;
	value: string;
}
export interface Comment {
	_id: string;
	name: string;
	email: string;
	value: string;
	createdAt: string;
}
