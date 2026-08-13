import { AUTH_ENDPOINTS } from '@/features/auth'
import { api } from '@/shared'

class VerificationService {
	public async newVerification(token: string | null): Promise<void> {
		await api.post(AUTH_ENDPOINTS.emailConfirmation, { token })
	}
}

export const verificationService = new VerificationService()
