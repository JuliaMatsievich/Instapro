import { getLike, removeLike } from "../api.js";
import { goToPage } from "../index.js";
import { POSTS_PAGE } from "../routes.js";

export function likeDislike({token,id}) {
	getLike({ token,id})
		.then(data => {
		  console.log(data);
		  console.log(data.post.isLiked);
		  goToPage(POSTS_PAGE)	  
		})
	removeLike ({ token, id })
		.then (data => {
			console.log(data);
			console.log(data.post.isLiked);
		})
}