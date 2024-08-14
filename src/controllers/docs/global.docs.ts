import { AuthDocs } from "./auth.docs";
import { UserDocs } from "./user.docs";
import { WalletDocs } from "./wallet.docs";

export class GlobalDocs {
	public static readonly FORBIDDEN = {
		status: 403,
		description:
		'Forbidden',
		example: {
			"message": "Acesso negado",
			"error": "Forbidden",
			"statusCode": 403
		  }
	};

	public static readonly NOT_FOUND = {
		status: 404,
		description: 'Usuário não encontrado.',
		example: {
			"statusCode": 404,
			"message": "Usuário não encontrado.",
			"timestamp": "2024-08-13T18:11:10.226Z",
			"path": "/users"
		}
	}
	
	public static readonly CONFLICT = {
		status: 409,
		description: 'Email já cadastrado!',
		example: {
		"statusCode": 409,
		"message": "Email já cadastrado!",
		"timestamp": "2024-08-13T18:11:10.226Z",
		"path": "/users"
	  	}
	};

	public static readonly UNAUTHORIZED = {
		status: 401,
		description: 'Desautorizado',
		example: {
			message: "Id da entrada e do usuário não coincidem",
			error: "Unauthorized",
			statusCode: 401
		}
		
	  }

	public static readonly User = UserDocs;

	public static readonly Wallet = WalletDocs;

	public static readonly Auth = AuthDocs;

}
