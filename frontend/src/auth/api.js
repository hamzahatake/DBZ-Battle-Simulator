// Local mock API to replace backend auth endpoints

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

const generateToken = () => Math.random().toString(36).slice(2) + Date.now().toString(36)

const defaultProfile = {
    username: 'goku',
    email: 'goku@capsule.corp',
    displayName: 'Son Goku',
    avatar: '/profile/Goku Ultra Instinct.jpg'
}

const ensureProfile = () => {
    const raw = localStorage.getItem('user_profile')
    if (!raw) {
        localStorage.setItem('user_profile', JSON.stringify(defaultProfile))
        return defaultProfile
    }
    try {
        return JSON.parse(raw)
    } catch {
        localStorage.setItem('user_profile', JSON.stringify(defaultProfile))
        return defaultProfile
    }
}

const api = {
    async post(path, body) {
        await delay(250)
        if (path === 'token/') {
            // Accept any credentials in mock
            const access = generateToken()
            const refresh = generateToken()
            localStorage.setItem('access', access)
            localStorage.setItem('refresh', refresh)
            ensureProfile()
            return { data: { access, refresh } }
        }
        if (path === 'register/') {
            // Save minimal profile info if provided
            const profile = ensureProfile()
            const updated = { ...profile, username: body?.username || profile.username, email: body?.email || profile.email }
            localStorage.setItem('user_profile', JSON.stringify(updated))
            return { data: { success: true } }
        }
        if (path === 'token/refresh/') {
            const access = generateToken()
            localStorage.setItem('access', access)
            return { data: { access } }
        }
        return { data: {} }
    }
}

export default api
