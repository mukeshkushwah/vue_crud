export default function(Vue){
	Vue.auth = {
		setToken:(token,expiration ) =>{
			localStorage.setItem('token',token)
			localStorage.setItem('expiration',expiration)
		},
		getToken:()=>{
			var token = localStorage.getItem('token',token)
			var expiration = localStorage.getItem('expiration',expiration)	

			if(token){
				return token;
			}
			else{
				return null;
			}
		},

		destroyToken:()=>{
			localStorage.removeItem('token',token)
			localStorage.removeItem('expiration',expiration)		
		},

		isAuthenticated:()=>{
			if(this.getToken()){
				return true
			}
			else{
				return false	
			}
		}
	}

	Object.defineProperties(Vue.prototype,{
		$auth:{
			get: ()=>{
				return Vue.auth;
			}
		}
	})
}