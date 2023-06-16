import { getLike } from "../api.js";

export function likeDislike({token,id}) {
	getLike({ token,id})
		.then(data => {
		  console.log(data);
		  console.log(data.post.likes[0].name);		  
		})
}