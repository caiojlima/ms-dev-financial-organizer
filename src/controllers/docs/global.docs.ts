import { UserDocs } from "./user.docs";
import { WalletDocs } from "./wallet.docs";

export class GlobalDocs {
	public static readonly FORBIDDEN = { status: 403, description: 'Forbidden.' };

	public static readonly NOT_FOUND = { status: 404, description: 'Usuário não encontrado.' }

	public static readonly User = UserDocs;

	public static readonly Wallet = WalletDocs;

}
