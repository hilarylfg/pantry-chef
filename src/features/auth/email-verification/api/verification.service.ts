import { api } from '@/shared'

class VerificationService {
	public async newVerification(token: string | null) {
		return await api.post('auth/email-confirmation', { token })
	}
}

export const verificationService = new VerificationService()
