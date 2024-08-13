import { UserDocs } from "./user.docs";
import { WalletDocs } from "./wallet.docs";

export class GlobalDocs {
	public static readonly FORBIDDEN = {
		status: 403,
		description:
		'Forbidden',
		example: {
			"statusCode": 403,
			"message": "Forbidden",
			"timestamp": "2024-08-13T18:11:10.226Z",
			"path": "/users"
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

	public static readonly User = UserDocs;

	public static readonly Wallet = WalletDocs;

}
